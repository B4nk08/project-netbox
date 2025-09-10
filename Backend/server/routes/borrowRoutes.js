const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

router.get("/", borrowController.getBorrowings);
router.post("/create", borrowController.createBorrowingTable);
router.post("/add", borrowController.addBorrowing);

module.exports = router;
