import Product from "../../models/Product.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.boy;

    // Use imageURLs from the middleware
    const images = req.imageURLs || [];

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message:
          "Missing required fields: name, description, price, category, images ",
      });
    }

    // If the product already exist with the name
    const existingName = await Product.findOne({ name });

    if (existingName) {
      return res.status(400).json({
        message: `Product already exist with this name ${existingName}`,
      });
    }

    if (price <= 0 && typeof price !== "number") {
      return res
        .status(400)
        .json({ message: "Price must be greater then 0 and must a number" });
    }

    // Trim strings and validate
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedCategory = category.trim();

    // Create product
    const product = await Product.create({
      name: trimmedName,
      description: trimmedDescription,
      price: price,
      category: trimmedCategory,
      images,
    });

    res.status(201).json({
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default createProduct;
