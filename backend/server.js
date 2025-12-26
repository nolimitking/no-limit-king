import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./Routes/productRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import checkoutRoutes from "./Routes/checkoutRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

import stripeWebhook from "./controllers/payment/stripeWebhook.js";

const app = express();

// Stripe webhook route (raw body)
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Middleware
app.use(express.json());
app.use(cors());
connectDB();

// --- Redirect non-www to www ---
app.use((req, res, next) => {
  if (req.hostname === "nolimitking.com") {
    return res.redirect(301, "https://www.nolimitking.com" + req.originalUrl);
  }
  next();
});

// API Routes
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", checkoutRoutes);
app.use("/api/order", orderRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
