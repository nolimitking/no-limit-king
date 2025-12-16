import Cart from "../../models/Cart.js";
import calculateTotal from "../../utility/calculateTotal.js";

const mergeCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { guestId } = req.body;

    const guestCart = await Cart.findOne({ guestId });
    if (!guestCart) {
      return res.status(400).json({ message: "No guest cart" });
    }

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      guestCart.user = userId;
      guestCart.guestId = null;
      await guestCart.save();
      return res.json(guestCart);
    }

    guestCart.items.forEach((guestItem) => {
      const index = userCart.items.findIndex(
        (item) => item.product.toString() === guestItem.product.toString()
      );

      if (index > -1) {
        userCart.items[index].quantity += quantity;
      } else {
        userCart.items.push(guestItem);
      }
    });

    userCart.totalPrice = calculateTotal(userCart.items);
    await userCart.save();

    await guestCart.deleteOne();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default mergeCart;
