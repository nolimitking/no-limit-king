import Stripe from "stripe";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import SendEmail from "../../utility/SendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    const userId = session.metadata.userId;

    let shippingAddress = null;

    // Check shipping_details first
    if (session.customer_details?.address) {
      shippingAddress = {
        name: session.customer_details.name || "",
        address: session.customer_details.address.line1 || "",
        city: session.customer_details.address.city || "",
        state: session.customer_details.address.state || "",
        postalCode: session.customer_details.address.postal_code || "",
        country: session.customer_details.address.country || "",
      };
    }

    // Update existing order
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      shippingStatus: "pending",
      shippingAddress,
      stripePaymentIntent: session.payment_intent,
    });

    try {
      await SendEmail({
        to: "l@nolimitking.com",
        subject: "You have a new order",
        text: `You have a new order from ${session.customer_details?.name}`,
      });
    } catch (err) {
      console.error("Email failed:", err.message);
    }

    // Optional: clear cart AFTER successful payment
    if (userId) {
      await Cart.findOneAndDelete({ user: userId });
    }
  }

  res.status(200).json({ received: true });
};

export default stripeWebhook;
