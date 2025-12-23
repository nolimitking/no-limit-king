import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./Routes/productRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import checkoutRoutes from "./Routes/checkoutRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

const app = express();

import stripeWebhook from "./controllers/payment/stripeWebhook.js";

app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.json());
app.use(cors());
connectDB();

const PORT = process.env.PORT || 3000;

// API
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", checkoutRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
