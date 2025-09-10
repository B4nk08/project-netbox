const { StockModel } = require("../models/stockModel");

exports.getStock = async (req, res) => {
  try {
    const stock = await StockModel.getAll();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStockTable = async (req, res) => {
  try {
    await StockModel.createTable();
    res.send("Table Stock created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStock = async (req, res) => {
  try {
    const { equipment_name, serial_number, stock_quantity } = req.body;
    await StockModel.add(equipment_name, serial_number, stock_quantity);
    res.json({ message: "Stock added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.increaseStock = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    await StockModel.increaseStock(product_id, quantity);
    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletestock = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    await StockModel.deletestock(product_id, quantity);
    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // ❌ แก้จาก React → res
  }
};
