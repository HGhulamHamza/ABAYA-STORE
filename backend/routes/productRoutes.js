// backend/routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//
// ✅ Add product
//
router.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// ✅ Get all products
//
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// ✅ Get products by category
//
router.get("/products/category/:category", async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.category);
    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: "i" } // case-insensitive
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//
// ✅ Get single product by ID
//
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// ✅ Bulk delete by category
// Example: DELETE /api/products?category=Daily%20Wear%20Abayas
//
router.delete("/products", async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category query param is required" });
    }

    const result = await Product.deleteMany({ category });
    res.json({
      message: `${result.deletedCount} products deleted successfully from category '${category}'`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// ✅ Delete single product by ID
//
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
