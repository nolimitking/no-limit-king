import Product from "../../models/Product.js";

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    // Update text fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;

    // Upload images if new ones are uploaded
    if (req.imageURLs && req.imageURLs.length > 0) {
      product.images = req.imageURLs;
    }

    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default updateProduct;
