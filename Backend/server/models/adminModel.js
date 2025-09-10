const pool = require("../config/db");

class AdminModel {
  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Admins (
        admin_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      ) ENGINE=InnoDB;
    `);
  }
}

module.exports = { AdminModel };
