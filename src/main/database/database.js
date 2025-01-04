const sqlite3 = require('sqlite3').verbose();
const dbConfig = require('../config/database')[process.env.NODE_ENV || 'development'];

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbConfig.storage);
    this.initialize();
  }

  initialize() {
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
}

module.exports = new Database();
