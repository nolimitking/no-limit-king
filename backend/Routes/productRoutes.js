import express from "express";
import createProduct from "../controllers/product/createProduct.js";
import getAllProducts from "../controllers/product/getAllProducts.js";
import getProductDetails from "../controllers/product/getProductDetails.js";
import updateProduct from "../controllers/product/updateProduct.js";
import deleteProduct from "../controllers/product/deleteProduct.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import {
  upload,
  uploadMultipleToCloudinary,
} from "../middleware/uploadImages.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  verifyAdmin,
  upload.array("images", 4),
  uploadMultipleToCloudinary,
  createProduct
);
router.get("/get-all", getAllProducts);
router.get("/get-details/:id", getProductDetails);
router.put("/update/:id", authMiddleware, verifyAdmin, updateProduct);
router.delete("/delete/:id", authMiddleware, verifyAdmin, deleteProduct);

export default router;
