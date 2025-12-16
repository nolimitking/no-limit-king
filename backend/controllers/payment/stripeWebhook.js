import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.event;

      const userId = session.metadata.userId;
      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );
      if (!cart) {
        return res.status(400).send("Cart not found");
      }

      const newOrder = new Order({
        user: userId,
        items: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: cart.totalPrice,
        ShippingStatus: "pending",
        paymentStatus: "paid",
        stripePaymentIntent: session.payment_intent,
      });

      await newOrder.save();
      await cart.deleteOne();
    }
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  res.json({ received: true });
};

export default stripeWebhook;
