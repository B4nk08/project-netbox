const { BorrowModel } = require("../models/borrowModel");

exports.getBorrowings = async (req, res) => {
  try {
    const borrowings = await BorrowModel.getAll();
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBorrowingTable = async (req, res) => {
  try {
    await BorrowModel.createTable();
    res.send("Table Borrowings created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBorrowing = async (req, res) => {
  try {
    const { student_id, product_id, due_date, borrow_status } = req.body;

    // เวลาปัจจุบัน (ไทย)
    const borrow_date = new Date().toLocaleString("sv-SE", { timeZone: "Asia/Bangkok" });

    // ✅ ตรวจสอบ student_id
    if (!(await BorrowModel.checkStudent(student_id))) {
      return res.status(400).json({ error: "NOTPASS" });
    }

    // ✅ ตรวจสอบ product_id
    if (!(await BorrowModel.checkProduct(product_id))) {
      return res.status(400).json({ error: "product_id ไม่ถูกต้อง" });
    }

    // ✅ บันทึกข้อมูลการยืม
    await BorrowModel.add(student_id, product_id, borrow_date, due_date, borrow_status);
    res.json({ message: "PASS" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
