const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header (removes "Bearer " prefix)
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to the request object
      // (This is what provides req.user.age, req.user.weight etc. to Gemini)
      req.user = decoded; 

      next(); // Move to the controller
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };