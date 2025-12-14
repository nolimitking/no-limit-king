import Product from "../../models/Product.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // images from Cloudinary middleware
    const images = req.imageURLs || [];

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Missing required fields: name, description, price, category",
      });
    }

    // Convert price (form-data sends strings)
    const parsedPrice = Number(price);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: "Price must be a number greater than 0",
      });
    }

    // Check if product exists
    const existingProduct = await Product.findOne({ name: name.trim() });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists with this name",
      });
    }

    // Create product
    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      category: category.trim(),
      images,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default createProduct;
