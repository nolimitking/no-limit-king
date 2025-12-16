import express from "express";
import createCheckoutSession from "../controllers/payment/createCheckoutSession.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout-session", authMiddleware, createCheckoutSession);

export default router;
