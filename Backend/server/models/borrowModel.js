const pool = require("../config/db");

class BorrowModel {
  // static async getAll() {
  //   const conn = await connectToDatabase();
  //   const [rows] = await conn.execute(`
  //     SELECT
  //       s.student_id,
  //       b.borrow_id,
  //       s.full_name AS student_name,
  //       s.nickname,
  //       p.equipment_name,
  //       b.borrow_date
  //     FROM Borrowings b
  //     JOIN Students s ON b.student_id = s.student_id
  //     JOIN Stock p ON b.product_id = p.product_id
  //   `);
  //   return rows;
  // }
  static async getAll() {
    const [rows] = await pool.query(`
    SELECT 
      s.student_id,
      s.full_name AS student_name,
      CONVERT_TZ(b.borrow_date, '+00:00', '+07:00') AS borrow_date,
      p.equipment_name,
      b.borrow_status
    FROM Borrowings b
    JOIN Students s ON b.student_id = s.student_id
    JOIN Stock p ON b.product_id = p.product_id
  `);
    return rows;
  }

  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Borrowings (
        borrow_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(10) NOT NULL,
        product_id INT NOT NULL,
        borrow_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES Students(student_id),
        FOREIGN KEY (product_id) REFERENCES Stock(product_id)
      ) ENGINE=InnoDB;
    `);
  }

  static async add(student_id, product_id, borrow_status = "Borrowed") {
    const validStatus = ["Borrowed", "Returned", "Overdue", "Lost"];
    if (!validStatus.includes(borrow_status)) borrow_status = "Borrowed";

    await pool.query(
      "INSERT INTO Borrowings (student_id, product_id, borrow_status) VALUES (?, ?, ?)",
      [student_id, product_id, borrow_status]
    );
  }

  static async checkStudent(student_id) {
    const [rows] = await pool.query(
      "SELECT 1 FROM Students WHERE student_id = ?",
      [student_id]
    );
    return rows.length > 0;
  }

  static async checkProduct(product_id) {
    const [rows] = await pool.query(
      "SELECT 1 FROM Stock WHERE product_id = ?",
      [product_id]
    );
    return rows.length > 0;
  }
}

module.exports = { BorrowModel };
