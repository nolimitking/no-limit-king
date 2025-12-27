import Order from "../../models/Order.js";

const orderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate(
      "user",
      "email name shippingAddress"
    );

    if (!order) {
      return res.status(400).json({ message: "Order details not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default orderDetails;
