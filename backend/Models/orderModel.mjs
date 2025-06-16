import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Watch Item Processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false },
    tracking: [
      {
        step: { type: String, required: true, default: "Order Received" }, // “Order Placed”, “Packed”, “Shipped”, “Delivered”
        timestamp: { type: Date, default: Date.now() }, // When this step was updated
        details: { type: String }, // Optional details like courier name, tracking number, etc.
      },
    ],
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
