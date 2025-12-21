import Cart from "../../models/Cart.js";

const getCart = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { guestId } = req.query;

    let query = {};

    if (userId) {
      query.user = userId;
    } else if (guestId) {
      query.guestId = guestId;
    } else {
      // No user or guestId, return empty cart
      return res.json({ items: [], totalPrice: 0 });
    }

    const cart = await Cart.findOne(query).populate({
      path: "items.product",
      select: "name price images",
    });
    res.json(cart || { items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getCart;
