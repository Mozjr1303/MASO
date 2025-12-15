const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create Categories Table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT
  )`);

  // Create Nominees Table
  db.run(`CREATE TABLE IF NOT EXISTS nominees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    image TEXT,
    votes INTEGER DEFAULT 0,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  )`);

  // Create Votes/Transactions Table
  db.run(`CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nominee_id INTEGER,
    category_id INTEGER,
    amount REAL,
    payment_method TEXT,
    mobile_number TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(nominee_id) REFERENCES nominees(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
  )`);

  // Create Tickets Table
  db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_code TEXT UNIQUE NOT NULL,
    holder_name TEXT NOT NULL,
    email TEXT,
    ticket_type TEXT NOT NULL,
    price REAL NOT NULL,
    payment_method TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Seed basic data if empty
  db.run(`CREATE TABLE IF NOT EXISTS waiting_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    ticket_type TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    token TEXT,
    verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.get("SELECT count(*) as count FROM categories", [], (err, row) => {
    if (row.count === 0) {
      console.log("Seeding Database with Sample Data...");
      const stmt = db.prepare("INSERT INTO categories (title, slug, icon) VALUES (?, ?, ?)");
      // Values based on typical music awards
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

      categories.forEach(cat => stmt.run(cat));
      stmt.finalize();

      const nomStmt = db.prepare("INSERT INTO nominees (category_id, name, image) VALUES (?, ?, ?)");

      // Seed some nominees for the first 3 categories
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

      nomineesData.forEach(nom => nomStmt.run(nom));
      nomStmt.finalize();

      console.log("Database Seeded Successfully.");
    }
  });
});

module.exports = db;
