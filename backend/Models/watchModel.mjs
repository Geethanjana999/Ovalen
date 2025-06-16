import mongoose, { Schema } from "mongoose";

const watchSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

const watchModel =
  mongoose.models.watch || mongoose.model("watch", watchSchema);

export default watchModel;
