import express from "express";
import createProduct from "../controllers/product/createProduct.js";
import getAllProducts from "../controllers/product/getAllProducts.js";
import getAllProductsPublished from "../controllers/product/getAllProductsPublished.js";
import getProductDetails from "../controllers/product/getProductDetails.js";
import getProductDetailsPublished from "../controllers/product/getProductDetailsPublished.js";
import updateProduct from "../controllers/product/updateProduct.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import togglePublishProduct from "../controllers/product/togglePublishProduct.js";

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
router.get("/get-all-publish", getAllProductsPublished);
router.get("/get-details/:id", getProductDetails);
router.get("/get-details-publish/:id", getProductDetailsPublished);
router.put(
  "/update/:id",
  authMiddleware,
  verifyAdmin,
  upload.array("images", 4),
  uploadMultipleToCloudinary,
  updateProduct
);
router.delete("/delete/:id", authMiddleware, verifyAdmin, deleteProduct);
router.put("/publish/:id", authMiddleware, verifyAdmin, togglePublishProduct);

export default router;
