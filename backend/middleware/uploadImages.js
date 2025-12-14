import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Cloudinary stream upload wrapper
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// MULTIPLE IMAGES UPLOAD MIDDLEWARE
export const uploadMultipleToCloudinary = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadPromises = req.files.map((file) => streamUpload(file.buffer));

    const results = await Promise.all(uploadPromises);

    req.imageURLs = results.map((r) => r.secure_url);

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cloudinary upload failed" });
  }
};
