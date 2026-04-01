const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/dailyNutritionController');
const { protect } = require('../middlewares/authMiddleware'); // If you have auth

// Check line 14 specifically! 
// Ensure the function name matches what we exported above.
router.post('/daily', protect, nutritionController.submitDailyMeal);
router.get('/daily', protect, nutritionController.getDailyNutrition);
router.get('/weekly', protect, nutritionController.getWeeklyNutrition);
router.get('/monthly', protect, nutritionController.getMonthlyNutrition);

module.exports = router;