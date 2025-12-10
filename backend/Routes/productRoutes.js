import express from "express";
import createProduct from "../controllers/product/createProduct.js";
import getAllProducts from "../controllers/product/getAllProducts.js";
import getProductsDetails from "../controllers/product/getProductsDetails.js";
import updateProducts from "../controllers/product/updateProducts.js";
import deleteProducts from "../controllers/product/deleteProducts.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/create", authMiddleware, verifyAdmin, createProduct);
router.get("/get-all", authMiddleware, getAllProducts);
router.get("/get-details/:id", authMiddleware, getProductsDetails);
router.put("/update/:id", authMiddleware, verifyAdmin, updateProducts);
router.delete("/delete/:id", authMiddleware, verifyAdmin, deleteProducts);

export default router;
