const { Pool } = require('pg');

// Create a new pool using the connection string from environment variables
// This is standard for Render / Heroku deployments
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const initDb = async () => {
  try {
    const client = await pool.connect();
    try {
      console.log("Initializing Database Schema...");

      // Create Categories Table
      await client.query(`CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                slug TEXT UNIQUE NOT NULL,
                icon TEXT
            )`);

      // Create Nominees Table
      await client.query(`CREATE TABLE IF NOT EXISTS nominees (
                id SERIAL PRIMARY KEY,
                category_id INTEGER REFERENCES categories(id),
                name TEXT NOT NULL,
                image TEXT,
                votes INTEGER DEFAULT 0
            )`);

      // Create Votes/Transactions Table
      await client.query(`CREATE TABLE IF NOT EXISTS votes (
                id SERIAL PRIMARY KEY,
                nominee_id INTEGER REFERENCES nominees(id),
                category_id INTEGER REFERENCES categories(id),
                amount REAL,
                payment_method TEXT,
                mobile_number TEXT,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);

      // Create Tickets Table
      await client.query(`CREATE TABLE IF NOT EXISTS tickets (
                id SERIAL PRIMARY KEY,
                ticket_code TEXT UNIQUE NOT NULL,
                holder_name TEXT NOT NULL,
                email TEXT,
                ticket_type TEXT NOT NULL,
                price REAL NOT NULL,
                payment_method TEXT,
                status TEXT DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);

      // Create Waiting List Table
      await client.query(`CREATE TABLE IF NOT EXISTS waiting_list (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                mobile TEXT NOT NULL,
                ticket_type TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                token TEXT,
                verified INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);

      // Seed Data
      const res = await client.query("SELECT count(*) as count FROM categories");
      if (parseInt(res.rows[0].count) === 0) {
        console.log("Seeding Database with Sample Data...");

        const categories = [
          ["Artist of the Year", "artist-of-the-year", "/assets/img/category-star.png"],
          ["Song of the Year", "song-of-the-year", "/assets/img/category-star.png"],
          ["Best New Artist", "best-new-artist", "/assets/img/category-star.png"],
          ["Album of the Year", "album-of-the-year", "/assets/img/category-star.png"],
          ["Best Male Artist", "best-male-artist", "/assets/img/category-star.png"],
          ["Best Female Artist", "best-female-artist", "/assets/img/category-star.png"],
          ["Best Group / Duo", "best-group", "/assets/img/category-star.png"],
          ["Best Hip Hop Artist", "best-hip-hop", "/assets/img/category-star.png"],
          ["Best Gospel Artist", "best-gospel", "/assets/img/category-star.png"],
          ["Best Reggae / Dancehall", "best-reggae", "/assets/img/category-star.png"]
        ];

        for (const cat of categories) {
          await client.query(
            "INSERT INTO categories (title, slug, icon) VALUES ($1, $2, $3)",
            cat
          );
        }

        // Get IDs for seeding nominees (assuming sequential IDs 1-10 for simplicity, 
        // but real app should fetch them. For seed script, we rely on SERIAL starting at 1 usually)

        const nomineesData = [
          // Artist of the Year (ID 1)
          [1, "Driemo", "/assets/img/user.png"],
          [1, "Eli Njuchi", "/assets/img/user.png"],
          [1, "Kell Kay", "/assets/img/user.png"],
          [1, "Tay Grin", "/assets/img/user.png"],

          // Song of the Year (ID 2)
          [2, "Popo", "/assets/img/user.png"],
          [2, "Guwe", "/assets/img/user.png"],
          [2, "Ndaona", "/assets/img/user.png"],

          // Best New Artist (ID 3)
          [3, "Pop Young", "/assets/img/user.png"],
          [3, "Merchah", "/assets/img/user.png"],
          [3, "Giddes Chalamanda", "/assets/img/user.png"]
        ];

        for (const nom of nomineesData) {
          await client.query(
            "INSERT INTO nominees (category_id, name, image) VALUES ($1, $2, $3)",
            nom
          );
        }
        console.log("Database Seeded Successfully.");
      }

    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Database Initialization Error:", err);
  }
};

// Start initialization
initDb();

module.exports = {
  query: (text, params) => pool.query(text, params),
};

