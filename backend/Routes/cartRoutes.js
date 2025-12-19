import express from "express";
import addToCart from "../controllers/cart/addToCart.js";
import getCart from "../controllers/cart/getCart.js";
import clearCart from "../controllers/cart/clearCart.js";
import mergeCart from "../controllers/cart/mergeCart.js";
import updateCartQuantity from "../controllers/cart/updateCartQuantity.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = express.Router();

router.put("/update-quantity", updateCartQuantity);
router.post("/add", addToCart);
router.get("/get", optionalAuth, getCart);
router.post("/merge", authMiddleware, mergeCart);
router.delete("/clear", authMiddleware, clearCart);

export default router;
