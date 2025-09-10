const pool = require("../config/db");

class StudentModel {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM Students");
    return rows;
  }

  static async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Students (
        student_id VARCHAR(10) PRIMARY KEY UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(15),
        major VARCHAR(100)
      );
    `);
  }

  static async checkStudentId(student_id) {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as found FROM Students WHERE student_id = ?",
      [student_id]
    );
    return rows[0].found > 0; // true = มี, false = ไม่มี
  }
}

module.exports = { StudentModel };
