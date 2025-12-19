import Cart from "../../models/Cart.js";
import calculateTotal from "../../utility/calculateTotal.js";

const mergeCart = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId is undefined, authentication required" });
    }

    const { guestId } = req.body;
    if (!guestId) {
      return res.status(400).json({ message: "guestId is required" });
    }

    const guestCart = await Cart.findOne({ guestId }).populate("items.product");
    if (!guestCart) {
      return res.status(404).json({ message: "No guest cart found" });
    }

    let userCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!userCart) {
      guestCart.user = userId;
      guestCart.guestId = null;
      await guestCart.save();
      await guestCart.populate("items.product", "name price image");
      return res.json(guestCart);
    }

    // Merge items
    guestCart.items.forEach((guestItem) => {
      const index = userCart.items.findIndex(
        (item) => item.product.toString() === guestItem.product.toString()
      );

      if (index > -1) {
        userCart.items[index].quantity += guestItem.quantity;
      } else {
        userCart.items.push(guestItem);
      }
    });

    userCart.totalPrice = calculateTotal(userCart.items);
    await userCart.save();

    await guestCart.deleteOne();

    await userCart.populate("items.product", "name price image");

    res.json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default mergeCart;
