const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./DB/db");

dotenv.config();
connectDB();

const app = express();
// app.use(cors());
app.use(cors({
  origin: "https://smartplatter-meal4all.netlify.app/",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/nutrition", require("./routes/nutritionRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${PORT}`)
);