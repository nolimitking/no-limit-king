export const verifyAdmin = async (req, res, next) => {
  if (req.user || req.user.role === "admin") {
    next();
  } else {
    res.status(500).json({ message: "Admin access only" });
  }
};
