const { StudentModel } = require("../models/studentModel");

exports.getStudents = async (req, res) => {
  try {
    const students = await StudentModel.getAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStudentTable = async (req, res) => {
  try {
    await StudentModel.createTable();
    res.send("Table Students created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addStudents = async (req, res) => {
  try {
    const { student_id, first_name, last_name, phone_number, major } = req.body;

    // เรียก model
    await StudentModel.add(student_id, first_name, last_name, phone_number, major);

    res.json({ message: "Student added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
