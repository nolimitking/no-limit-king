import Cart from "../../models/Cart.js";
import calculateTotal from "../../utility/calculateTotal.js";

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity, guestId } = req.body;
    const userId = req.user?.id || null;

    // 1. Find the specific cart
    const cart = await Cart.findOne({
      user: userId,
      guestId: userId ? null : guestId,
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // 2. Find the item index
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Option: Remove item if quantity is set to 0
        cart.items.splice(itemIndex, 1);
      } else {
        // Set the ABSOLUTE quantity rather than adding to it
        cart.items[itemIndex].quantity = quantity;
      }

      cart.totalPrice = calculateTotal(cart.items);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateCartQuantity;
