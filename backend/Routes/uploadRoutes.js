import express from "express";
import {
  upload,
  uploadMultipleToCloudinary,
} from "../middleware/uploadImages.js";
import { uploadProductImages } from "../controllers/upload/uploadProductImages.js";

const router = express.Router();

router.post(
  "/upload-multiple",
  upload.array("images", 5),
  uploadMultipleToCloudinary,
  uploadProductImages
);

export default router;
