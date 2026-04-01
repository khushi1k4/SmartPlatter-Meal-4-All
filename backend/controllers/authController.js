const crypto = require("crypto");
const User = require("../models/User.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign up API
exports.signup = async (req, res) => {
  try {
    let { name, email, password, gender, height, weight, age } = req.body;

    email = email.toLowerCase(); // ⭐ FIX

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      height,
      weight,
      gender
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login API
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase(); // ⭐ FIX

    console.log("Searching for email:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1️. Request password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    // Generate token + expiry (15 min)
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Reset link
    const resetLink = `${CLIENT_URL}/reset-password/${token}`;

    // Send email
    try {
      await transporter.sendMail({
        from: `"Meal4All Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset your password",
        text: `Click this link to reset your password: ${resetLink}`,
      });
    } catch (mailError) {
      console.log("MAIL ERROR:", mailError);
      return res.status(500).json({ message: "Email could not be sent" });
    }

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️. Reset password using token
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user with valid token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Validate new password (alphanumeric, min 6)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(newPassword))
      return res.status(400).json({
        message: "Password must be alphanumeric and at least 6 characters",
      });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Remove token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password successfully changed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT auth middleware
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user); // this will include name, age, weight, gender, etc.
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};