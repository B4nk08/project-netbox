require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const stockRoutes = require("./routes/stockRoutes");
const studentRoutes = require("./routes/studentRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

// 👉 เปิดให้ทุก origin เข้าได้ (ตอน dev)
app.use(cors());

// Routes
app.use("/stock", stockRoutes);
app.use("/students", studentRoutes);
app.use("/borrowings", borrowRoutes);
app.use("/admins", adminRoutes);

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
