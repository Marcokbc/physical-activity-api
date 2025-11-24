const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = process.env.DB_PATH || path.join(__dirname, "..", "dev.db");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Erro ao abrir DB:", err);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS physical_activities (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        duration INTEGER,
        calories INTEGER,
        frequency TEXT,
        difficulty TEXT,
        description TEXT,
        created_by TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY(created_by) REFERENCES users(id)
    )
  `);
});

module.exports = {
  db,
  close: () => db.close(),
};
