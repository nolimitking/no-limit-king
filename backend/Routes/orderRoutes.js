import express from "express";
import orders from "../controllers/orders/orders.js";
import myOrders from "../controllers/orders/myOrders.js";
import orderDetails from "../controllers/orders/orderDetails.js";
import orderShippingStatus from "../controllers/orders/orderShippingStatus.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/all", authMiddleware, verifyAdmin, orders);
router.get("/details/:id", orderDetails);
router.get("/my", authMiddleware, myOrders);
router.put(
  "/update-status-shipping/:id",
  authMiddleware,
  verifyAdmin,
  orderShippingStatus
);

export default router;
