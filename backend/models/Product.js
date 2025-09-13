import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },

  // ✅ Shared for all categories
  description: { type: String },

  // ✅ Only for categories 1,2,3,9 (Abayas etc.)
  subImages: [{ type: String }],
  sizes: [{ type: String }],
  fabric: { type: String }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
