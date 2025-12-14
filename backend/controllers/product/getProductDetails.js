import Product from "../../models/Product.js";

const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).json({ message: "Product not found" });
    }
    return res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getProductDetails;
