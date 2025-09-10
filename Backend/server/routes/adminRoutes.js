const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/create", adminController.createAdminTable);

module.exports = router;
