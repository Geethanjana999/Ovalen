import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }, // by default cart is empty object
    stripeCustomerId: { type: String }, // storing Stripe customer ID
    subscriptionStatus: { type: String, default: "Inactive" }, // this for subscription status, default is "Inactive"
  },
  { minimize: false, timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
