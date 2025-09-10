const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.getStudents);
router.post("/create", studentController.createStudentTable);
router.post("/add", studentController.addStudents);


module.exports = router;
