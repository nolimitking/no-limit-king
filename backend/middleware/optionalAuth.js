import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const optionalAuth = async (req, res, next) => {
  req.isAuthenticated = false; // Default state

  try {
    const authHeader = req.header("Authorization");

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Only fetch the user if the token is valid
      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = user;
        req.isAuthenticated = true;
      }
    }
  } catch (error) {
    // Log error for debugging, but don't block the request
    console.warn("Optional auth suppressed error:", error.message);
  }

  next();
};
