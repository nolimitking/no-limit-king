import Order from "../../models/Order.js";

const myOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "User id not found in token" });
    }

    const orders = await Order.find({ user: userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default myOrders;
