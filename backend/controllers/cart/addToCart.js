import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import calculateTotal from "../../utility/calculateTotal.js";

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, guestId } = req.body;
    const userId = req.user?.id || null;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({
      user: userId,
      guestId: userId ? null : guestId,
    });

    if (!cart) {
      cart = new Cart({
        user: userId,
        guestId: userId ? null : guestId,
        items: [],
      });
    }

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

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default addToCart;
