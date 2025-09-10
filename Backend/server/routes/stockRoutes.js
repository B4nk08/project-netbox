const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.get("/", stockController.getStock);
router.post("/create", stockController.createStockTable);
router.post("/add", stockController.addStock);
router.post("/increase", stockController.increaseStock); //บวกของในstock
router.post("/deletestock", stockController.deletestock); //ลบของในstock

module.exports = router;
