require("dotenv").config();
const mysql = require("mysql2/promise");

// ✅ สร้าง pool แค่ครั้งเดียว
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,  // จำกัดจำนวน connection ที่เปิดได้
  queueLimit: 0
});

// ✅ ใช้ทดสอบการเชื่อมต่อ
pool.getConnection()
  .then(conn => {
    console.log("Connected to MySQL database (via pool)!");
    conn.release(); // คืน connection กลับ pool
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
  });

module.exports = pool;
