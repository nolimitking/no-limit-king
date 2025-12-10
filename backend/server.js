import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./Routes/productRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

const PORT = process.env.PORT || 3000;

// API
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
