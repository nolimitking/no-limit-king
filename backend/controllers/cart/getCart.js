import Cart from "../../models/Cart.js";

const getCart = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { guestId } = req.body;

    const cart = await Cart.findOne({
      user: userId,
      guestId: userId ? null : guestId,
    }).populate("items.product");

    res.json(cart || { items: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getCart;
