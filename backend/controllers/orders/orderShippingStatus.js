import SendEmail from "../../utility/SendEmail.js";
import Order from "../../models/Order.js";

const orderShippingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ message: "Order ID and status are required" });
    }

    // 2️⃣ Find order
    const order = await Order.findById(orderId).populate("user", "email name");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 3️⃣ Update shipping status
    order.shippingStatus = status;
    await order.save();

    // 4️⃣ Prepare email content based on status
    let subject = "";
    let text = "";

    switch (status) {
      case "processing":
        subject = "Your order is being processed";
        text = `Hi ${order.user.name}, your order #${order._id} is now being processed.`;
        break;

      case "shipped":
        subject = "Your order has been shipped 🚚";
        text = `Good news ${order.user.name}! Your order #${order._id} has been shipped.`;
        break;

      case "delivered":
        subject = "Order delivered ✅";
        text = `Hi ${order.user.name}, your order #${order._id} has been successfully delivered.`;
        break;

      // case "cancelled":
      //   subject = "Order cancelled";
      //   text = `Hi ${order.user.name}, your order #${order._id} has been cancelled.`;
      //   break;
    }

    // 5️⃣ Send email to customer
    await SendEmail({
      to: order.user.email,
      subject,
      text,
    });

    // 6️⃣ Respond to admin
    res.status(200).json({
      message: `Shipping status updated and email sent to your client ${order.user.name}`,
      shippingStatus: status,
    });
  } catch (error) {
    console.error("Shipping status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default orderShippingStatus;
