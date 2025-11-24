const { db } = require("../db");

function insertPhysicalActivity(data) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO physical_activities
        (id, name, duration, calories, frequency, difficulty, description, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      data.id,
      data.name,
      data.duration,
      data.calories,
      data.frequency,
      data.difficulty,
      data.description,
      data.created_by,
      data.created_at,
      function (err) {
        if (err) return reject(err);
        resolve(data);
      }
    );

    stmt.finalize();
  });
}

function getAllPhysicalActivities() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM physical_activities ORDER BY created_at DESC", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getPhysicalActivityById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM physical_activities WHERE id = ?", [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function updatePhysicalActivity(id, fields) {
  return new Promise((resolve, reject) => {
    const updates = [];
    const values = [];

    Object.entries(fields).forEach(([key, val]) => {
      updates.push(`${key} = ?`);
      values.push(val);
    });

    if (updates.length === 0) return resolve(null);

    values.push(id);

    db.run(
      `UPDATE physical_activities SET ${updates.join(", ")} WHERE id = ?`,
      values,
      function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
}

function deletePhysicalActivity(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM physical_activities WHERE id = ?", [id], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
}

module.exports = {
  insertPhysicalActivity,
  getAllPhysicalActivities,
  getPhysicalActivityById,
  updatePhysicalActivity,
  deletePhysicalActivity
};
