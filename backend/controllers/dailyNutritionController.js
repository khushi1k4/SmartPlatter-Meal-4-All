const DailyNutrition = require("../models/Meal");
const analyzeMealsWithGemini = require("../lib/gemini");

/**
 * Submit daily meals and get AI analysis
 */
async function submitDailyMeal(req, res) {
  try {
    // 1. Auth Check - Ensure req.user exists from your JWT middleware
    const userId = req.user?._id || req.user?.id; 
    if (!userId) {
      return res.status(401).json({ message: "User session not found. Please login again." });
    }

    const { breakfast, snacks, lunch, dinner, portion, activityLevel } = req.body;

    // 2. Simple Validation
    if (!breakfast || !lunch || !dinner) {
      return res.status(400).json({ message: "Please provide at least Breakfast, Lunch, and Dinner." });
    }

    // 3. Call Gemini Service
    // Pass the user object so Gemini knows Age/Weight/Height for calorie calculation
    // console.log(`🟡 Requesting AI analysis for user: ${userId}`);
    const analysis = await analyzeMealsWithGemini(req.user, {
      breakfast,
      snacks,
      lunch,
      dinner,
      portion,
    });

    if (!analysis) {
      return res.status(500).json({ message: "AI failed to analyze nutrition. Please try again." });
    }

    // 4. Format data for the Mongoose Array Schema
    const mealsArray = [
      { mealType: "Breakfast", items: breakfast, portion: portion || "medium" },
      { mealType: "Snack", items: snacks || "None", portion: portion || "medium" },
      { mealType: "Lunch", items: lunch, portion: portion || "medium" },
      { mealType: "Dinner", items: dinner, portion: portion || "medium" }
    ];

    // 5. Create the Database Entry
    // We map Gemini's JSON keys (calories, protein, etc.) to your Schema fields
    const dailyEntry = await DailyNutrition.create({
      userId: userId,
      dayNumber: 1, // You can dynamically increment this if you track a plan
      meals: mealsArray,
      activityLevel: activityLevel || "medium",
      
      // Data from Gemini
      calories: analysis.calories,
      carbs: analysis.carbs,
      protein: analysis.protein,
      fat: analysis.fat,
      
      // Map healthScore to your 'segment' field
      segment: analysis.healthScore > 75 ? "Healthy" : 
               analysis.healthScore > 40 ? "Moderate" : "Unhealthy",
      
      // Optional: If you add 'advice' to your Schema later, uncomment this:
      // advice: analysis.advice 
    });

    console.log("✅ Daily record saved successfully");
    res.status(201).json({ 
      message: "Nutrition analysis complete!", 
      dailyEntry 
    });

  } catch (err) {
    console.error("🔥 submitDailyMeal critical error:", err.message);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: err.message 
    });
  }
}

/**
 * Get all history for current user
 */
async function getDailyNutrition(req, res) {
  try {
    const userId = req.user?._id || req.user?.id;
    const entries = await DailyNutrition.find({ userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch history" });
  }
}

// Get Weekly Summary (Last 7 Days)
// backend/controllers/dailyNutritionController.js
async function getWeeklyNutrition(req, res) {
  try {
    const userId = req.user?._id || req.user?.id;

    // Create a timestamp for exactly 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const entries = await DailyNutrition.find({
      userId: userId,
      createdAt: { $gte: sevenDaysAgo } // $gte = Greater Than or Equal to
    }).sort({ createdAt: -1 }); // Show newest first

    res.json({ entries });
  } catch (err) {
    res.status(500).json({ message: "Error fetching weekly logs" });
  }
}

// Get Monthly Summary (Last 30 Days)
async function getMonthlyNutrition(req, res) {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const entries = await DailyNutrition.find({
      userId: userId,
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 });

    res.json({
      period: "Monthly",
      count: entries.length,
      entries
    });
  } catch (err) {
    console.error("getMonthlyNutrition error:", err.message);
    res.status(500).json({ message: "Error fetching monthly data" });
  }
}

// At the very end of controllers/dailyNutritionController.js
module.exports = {
  submitDailyMeal,
  getDailyNutrition,
  getWeeklyNutrition,
  getMonthlyNutrition
};