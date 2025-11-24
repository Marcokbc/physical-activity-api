const { db } = require("../db");

function createUser({ id, username, password_hash, created_at }) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO users (id, username, password_hash, created_at)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(id, username, password_hash, created_at, function (err) {
      if (err) return reject(err);
      resolve({ id, username, created_at });
    });

    stmt.finalize();
  });
}

function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

module.exports = {
  createUser,
  findUserByUsername
};
