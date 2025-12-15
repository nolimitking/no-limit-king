import Product from "../../models/Product.js";

const togglePublishProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    product.isPublished = true;
    await product.save();

    res.json({ message: "Product published successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default togglePublishProduct;
