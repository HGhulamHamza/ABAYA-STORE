import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//
// ✅ Add product
//
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/category/:category", async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.category);
    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: "i" }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
// ✅ Get single product by ID
//
router.get("/:id", async (req, res) => {
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
//
router.delete("/", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
