import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    emergency: { type: String, required: true },
    cart: [
      {
        productId: { type: String },
        name: String,
        price: Number,
        quantity: Number,
        selectedSize: String,
      },
    ],
    subtotal: Number,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
