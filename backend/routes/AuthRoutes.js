const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");

const {
    signup, login,
  requestPasswordReset,
  resetPassword,
  getCurrentUser,
} = require("../controllers/authController");


router.get("/me", protect, getCurrentUser);

// -------- AUTH ROUTES --------
router.post("/signup", signup);
router.post("/login", login);

// -------- PASSWORD RESET ROUTES --------
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;