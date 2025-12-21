import Cart from "../../models/Cart.js";
import calculateTotal from "../../utility/calculateTotal.js";

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity, guestId } = req.body;
    const userId = req.user?.id || null;

    // ADD VALIDATION FOR REQUIRED FIELDS
    if (!productId) {
      return res.status(400).json({
        message: "productId is required",
      });
    }

    if (typeof quantity === "undefined") {
      return res.status(400).json({
        message: "quantity is required",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative",
      });
    }

    // FIXED: Use correct query logic
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

    const cart = await Cart.findOne(query);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Convert productId to string once for consistent comparison
    const productIdStr = productId.toString();

    const itemIndex = cart.items.findIndex((item) => {
      // Check if item or item.product exists
      if (!item || !item.product) return false;

      const itemProductId =
        item.product._id?.toString() || item.product.toString();

      return itemProductId === productIdStr;
    });

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Remove item if quantity is set to 0
        cart.items.splice(itemIndex, 1);
      } else {
        // Set the ABSOLUTE quantity rather than adding to it
        cart.items[itemIndex].quantity = quantity;
      }

      cart.totalPrice = calculateTotal(cart.items);
      await cart.save();

      await cart.populate("items.product", "name price image");

      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default updateCartQuantity;
