const pool = require("../config/db");

class StockModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM Stock");
    return rows;
  }

  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Stock (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        equipment_name VARCHAR(255) NOT NULL,
        serial_number VARCHAR(100) UNIQUE,
        stock_quantity INT NOT NULL DEFAULT 0
      ) ENGINE=InnoDB;
    `);
  }

  static async increaseStock(product_id, quantity) {
    await pool.query(
      "UPDATE Stock SET stock_quantity = stock_quantity + ? WHERE product_id = ?",
      [quantity, product_id]
    );
  }

  static async deletestock(product_id, quantity) {
    await pool.query(
      "UPDATE Stock SET stock_quantity = stock_quantity - ? WHERE product_id = ? ",
      [quantity, product_id]
    );
  }

  static async add(equipment_name, serial_number, stock_quantity) {
    await pool.query(
      "INSERT INTO Stock (equipment_name, serial_number, stock_quantity) VALUES (?, ?, ?)",
      [equipment_name, serial_number, stock_quantity]
    );
  }
}

module.exports = {StockModel};
