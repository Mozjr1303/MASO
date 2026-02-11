import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'database.sqlite');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeTables();
  }
});

function initializeTables() {
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT,
      type TEXT,
      level INTEGER,
      joinedDate TEXT
    )
  `;

  const createOrgTable = `
    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT,
      type TEXT,
      description TEXT,
      verified INTEGER,
      eventsCreated INTEGER
    )
  `;

  const createMissionTable = `
    CREATE TABLE IF NOT EXISTS missions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      tags TEXT,
      progress INTEGER,
      color TEXT
    )
  `;

  const createProposalTable = `
    CREATE TABLE IF NOT EXISTS proposals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      status TEXT,
      votes TEXT
    )
  `;

  db.serialize(() => {
    db.run(createUserTable);
    db.run(createOrgTable);
    db.run(createMissionTable);
    db.run(createProposalTable);

    // Seed Data
    db.get("SELECT COUNT(*) as count FROM missions", (err, row) => {
      if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO missions (title, tags, progress, color) VALUES (?, ?, ?, ?)");
        stmt.run("Reforestation 2026", JSON.stringify(["Environment", "Critical"]), 85, "#10b981");
        stmt.run("Clean Water Initiative", JSON.stringify(["Health", "Africa"]), 42, "#3b82f6");
        stmt.run("Tech for Refugees", JSON.stringify(["Education", "Global"]), 67, "#8b5cf6");
        stmt.run("Urban Food Hubs", JSON.stringify(["Sustainability", "DEI"]), 30, "#f59e0b");
        stmt.finalize();
      }
    });

    db.get("SELECT COUNT(*) as count FROM proposals", (err, row) => {
      if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO proposals (title, status, votes) VALUES (?, ?, ?)");
        stmt.run("APP-14: Redirect 5% Protocol Fee to Ocean Cleanup", "Voting", "1.2M / 2.0M");
        stmt.run("APP-15: Expand Governance Staking Rewards", "Draft", "--");
        stmt.run("APP-13: Partner with UNICEF for Data Integrity", "Passed", "1.8M / 2.0M");
        stmt.finalize();
      }
    });
  });
}

// ... helper functions ...

// Endpoints
app.get('/api/missions', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM missions", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    const missions = rows.map(r => ({ ...r, tags: JSON.parse(r.tags) }));
    res.json(missions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/proposals', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM proposals", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper to query database with Promise wrapper
function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

// Health check
app.get('/', (req, res) => {
  res.send('Alchemy Connect Backend is running with SQLite');
});

// Signup Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name, userType, description } = req.body;

    if (!email || !password || !name || !userType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for existing user in both tables
    const existingUser = await dbGet('SELECT email FROM users WHERE email = ?', [email]);
    const existingOrg = await dbGet('SELECT email FROM organizations WHERE email = ?', [email]);

    if (existingUser || existingOrg) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = userType === 'volunteer' ? `user-${Date.now()}` : `org-${Date.now()}`;

    if (userType === 'volunteer') {
      await dbRun(
        `INSERT INTO users (id, email, password, name, type, level, joinedDate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, email, hashedPassword, name, 'volunteer', 1, new Date().toISOString().split('T')[0]]
      );
    } else {
      await dbRun(
        `INSERT INTO organizations (id, email, password, name, type, description, verified, eventsCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, email, hashedPassword, name, 'organization', description || '', 0, 0]
      );
    }

    const newUser = { id, email, name, type: userType };
    const token = jwt.sign({ id, email, type: userType }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ ...newUser, token });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let user;
    if (userType === 'volunteer') {
      user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    } else {
      user = await dbGet('SELECT * FROM organizations WHERE email = ?', [email]);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign({ id: user.id, email: user.email, type: user.type }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ ...userWithoutPassword, token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
