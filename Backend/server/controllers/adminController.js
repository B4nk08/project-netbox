const AdminModel = require("../models/adminModel");

exports.createAdminTable = async (req, res) => {
  await AdminModel.createTable();
  res.send("Table Admins created");
};
