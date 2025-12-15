const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve Static Frontend Files
app.use(express.static(path.join(__dirname, '../dist')));

// Get All Categories
app.get('/api/categories', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM categories");
        res.json({
            "message": "success",
            "data": rows
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Get Category by Slug (and its nominees)
app.get('/api/categories/:slug', async (req, res) => {
    const slug = req.params.slug;
    try {
        const { rows: categories } = await db.query("SELECT * FROM categories WHERE slug = $1", [slug]);
        const category = categories[0];

        if (!category) {
            res.status(404).json({ "error": "Category not found" });
            return;
        }

        const { rows: nominees } = await db.query("SELECT * FROM nominees WHERE category_id = $1", [category.id]);

        res.json({
            "message": "success",
            "category": category,
            "nominees": nominees
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Vote/Payment Endpoint
app.post('/api/vote', async (req, res) => {
    const { nominee_id, category_id, amount, payment_method, mobile_number } = req.body;

    // In a real app, integrate Payment Gateway here

    const sql = 'INSERT INTO votes (nominee_id, category_id, amount, payment_method, mobile_number, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id';
    const params = [nominee_id, category_id, amount, payment_method, mobile_number, 'completed'];

    try {
        const { rows } = await db.query(sql, params);

        // Increment nominee votes
        await db.query("UPDATE nominees SET votes = votes + 1 WHERE id = $1", [nominee_id]);

        res.json({
            "message": "success",
            "data": { id: rows[0].id }
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// --- ADMIN ENDPOINTS ---

// Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        const { rows: voteRows } = await db.query("SELECT count(*) as count FROM votes");
        const { rows: nomineeRows } = await db.query("SELECT count(*) as count FROM nominees");
        const { rows: ticketRows } = await db.query("SELECT count(*) as count FROM tickets");

        const stats = {
            totalVotes: parseInt(voteRows[0].count),
            nominees: parseInt(nomineeRows[0].count),
            ticketsSold: parseInt(ticketRows[0].count)
        };

        res.json({
            "message": "success",
            "data": [
                { title: "Total Votes", value: stats.totalVotes, change: "+12%" },
                { title: "Nominees", value: stats.nominees, change: "0%" },
                { title: "Tickets Sold", value: stats.ticketsSold, change: "+5%" },
                { title: "Revenue", value: "MK " + (stats.ticketsSold * 20000 / 1000000).toFixed(1) + "M", change: "+8%" }
            ]
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Recent Votes
app.get('/api/admin/recent-votes', async (req, res) => {
    const query = `
        SELECT v.id, v.amount, v.created_at as time, n.name as nominee, c.title as category 
        FROM votes v
        JOIN nominees n ON v.nominee_id = n.id
        JOIN categories c ON v.category_id = c.id
        ORDER BY v.created_at DESC
        LIMIT 10
    `;
    try {
        const { rows } = await db.query(query);
        res.json({ "message": "success", "data": rows });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Manage Nominees
app.get('/api/nominees', async (req, res) => {
    const query = `
        SELECT n.*, c.title as category_name 
        FROM nominees n
        LEFT JOIN categories c ON n.category_id = c.id
        ORDER BY n.name ASC
    `;
    try {
        const { rows } = await db.query(query);
        res.json({ "message": "success", "data": rows });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

app.post('/api/nominees', async (req, res) => {
    const { name, category_id, image } = req.body;
    try {
        const { rows } = await db.query(
            "INSERT INTO nominees (name, category_id, image) VALUES ($1,$2,$3) RETURNING id",
            [name, category_id, image]
        );
        res.json({ "message": "success", "data": { id: rows[0].id } });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

app.delete('/api/nominees/:id', async (req, res) => {
    try {
        await db.query("DELETE FROM nominees WHERE id = $1", [req.params.id]);
        res.json({ "message": "success" });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Submit Nomination
app.post('/api/nominate', (req, res) => {
    // In real app, save to nomination table
    // For now success
    res.json({ "message": "success" });
});

// Buy Ticket Endpoint
app.post('/api/buy-ticket', async (req, res) => {
    const { name, email, ticketType, paymentMethod } = req.body;
    const ticketCode = 'T-' + Math.floor(10000 + Math.random() * 90000); // Simple random code
    const price = ticketType === 'vip' ? 70000 : 20000;

    const sql = `INSERT INTO tickets (ticket_code, holder_name, email, ticket_type, price, payment_method) 
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

    try {
        await db.query(sql, [ticketCode, name, email, ticketType, price, paymentMethod]);
        res.json({
            "message": "success",
            "ticket_url": "/assets/img/standard-ticket.png", // In real app, generate PDF dynamic url
            "ticket_code": ticketCode
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Join Waiting List Endpoint
app.post('/api/waiting-list', async (req, res) => {
    const { name, mobile, ticketType, email } = req.body;
    // In real world, generate token and send email
    const token = 'mock_token_' + Date.now();

    const sql = "INSERT INTO waiting_list (name, mobile, ticket_type, email, token) VALUES ($1, $2, $3, $4, $5) RETURNING id";

    try {
        await db.query(sql, [name, mobile, ticketType, email, token]);
        res.json({ "message": "success", "token": token });
    } catch (err) {
        // Likely duplicate email or similar error
        res.status(400).json({ "error": "Email already in waiting list or invalid data: " + err.message });
    }
});

// Admin Ticket Routes
app.get('/api/admin/tickets', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM tickets ORDER BY created_at DESC");
        res.json({ "message": "success", "data": rows });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Admin Waiting List Routes
app.get('/api/admin/waiting-list', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM waiting_list ORDER BY created_at DESC");
        res.json({ "message": "success", "data": rows });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
});

// Handle SPA (React) Routes - Catch all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
