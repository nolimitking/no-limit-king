import express from "express";
import addToCart from "../controllers/cart/addToCart.js";
import getCart from "../controllers/cart/getCart.js";
import clearCart from "../controllers/cart/clearCart.js";
import mergeCart from "../controllers/cart/mergeCart.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get", getCart);
router.post("/merge", authMiddleware, mergeCart);
router.delete("/clear", authMiddleware, clearCart);

export default router;
