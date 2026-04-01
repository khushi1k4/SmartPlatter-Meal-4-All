const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./DB/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/nutrition", require("./routes/nutritionRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);