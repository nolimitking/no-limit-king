import Product from "../../models/Product.js";

const getProductDetailsPublished = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isPublished: true,
    });
    if (!product) {
      res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getProductDetailsPublished;
