import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: { type: Number },
    shippingStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    shippingAddress: {
      name: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    stripePaymentIntent: {
      type: String,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
