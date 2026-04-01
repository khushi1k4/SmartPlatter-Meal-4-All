// models/Meal.js
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  mealType: { type: String, required: true }, // Breakfast, Snack, Lunch, Dinner
  items: { type: String, default: "" },       // comma-separated items
  portion: { type: String, default: "medium" } 
});

const dailyNutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dayNumber: { type: Number, required: true },
  meals: [mealSchema],
  activityLevel: { type: String, default: "medium" }, // lowest, medium, heavy
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  segment: String, // Healthy / Moderate / Unhealthy
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", dailyNutritionSchema);