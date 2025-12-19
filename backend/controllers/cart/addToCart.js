import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import calculateTotal from "../../utility/calculateTotal.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, guestId } = req.body;
    const userId = req.user?.id || null;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    let query = {};
    if (userId) {
      query = { user: userId };
    } else {
      if (!guestId) {
        return res
          .status(400)
          .json({ message: "guestId is required for guests" });
      }
      query = { guestId: guestId };
    }

    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = new Cart({
        user: userId || null,
        guestId: userId ? null : guestId,
        items: [],
      });
    }

    // Check if item already exists
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    // Populate product details for response
    await cart.populate("items.product", "name price image");

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default addToCart;
