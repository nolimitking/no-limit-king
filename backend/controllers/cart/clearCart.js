import Cart from "../../models/Cart.js";

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id || null;
    const { guestId } = req.body;

    // Build query for user or guest
    let query = {};
    if (userId) {
      query.user = userId;
    } else if (guestId) {
      query.guestId = guestId;
    } else {
      return res.status(400).json({
        message: "User must be logged in or provide guestId",
      });
    }

    await Cart.findOneAndDelete(query);

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default clearCart;
