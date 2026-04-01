const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight:{
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);