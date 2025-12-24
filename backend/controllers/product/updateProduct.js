import Product from "../../models/Product.js";

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const { name, description, price, category } = req.body;

    // Update text fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;

    // Upload images if new ones are uploaded
    if (req.imageURLs && req.imageURLs.length > 0) {
      product.images = req.imageURLs;
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default updateProduct;
