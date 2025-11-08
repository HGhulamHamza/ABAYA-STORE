import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

/* ----------------------------------------
 ✅ CORS
---------------------------------------- */
app.use(
  cors({
    origin: [
      "https://sumptuousmodesty.com",
      "https://www.sumptuousmodesty.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* ----------------------------------------
 ✅ MongoDB Connection (serverless-safe)
---------------------------------------- */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

// ✅ For Vercel → connect on every request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

/* ----------------------------------------
 ✅ User Schema
---------------------------------------- */
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

/* ----------------------------------------
 ✅ Health route
---------------------------------------- */
app.get("/", (req, res) => {
  res.json({ message: "API running ✅" });
});

/* ----------------------------------------
 ✅ Signup API
---------------------------------------- */
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });

    if (exist) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.json({ msg: "Signup success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ----------------------------------------
 ✅ Login API
---------------------------------------- */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* ----------------------------------------
 ✅ Order Email
---------------------------------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

app.post("/order", async (req, res) => {
  const { name, email, whatsapp, address, emergency, cart, subtotal } = req.body;

  try {
    await transporter.sendMail({
      from: `"Sumptuous Modesty Orders" <${process.env.GMAIL_USER}>`,
      to: "anoshasaeed408@gmail.com",
      subject: "New Order Received",
      text: `
A new order has been placed.

Name: ${name}
WhatsApp: ${whatsapp}
Email: ${email || "Not provided"}
Address: ${address}
Emergency Contact: ${emergency}

Products:
${cart
  .map(
    (item) =>
      `- ${item.name} ${
        item.selectedSize ? `(Size: ${item.selectedSize})` : ""
      } x${item.quantity || 1} - Rs ${item.price * (item.quantity || 1)}`
  )
  .join("\n")}

Subtotal: Rs ${subtotal}
Shipping: Free
Total: Rs ${subtotal}
`,
    });

    res.json({ msg: "Order placed successfully ✅" });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ msg: "Failed to send order email" });
  }
});

/* ----------------------------------------
 ✅ Product & Order Routes
---------------------------------------- */
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

/* ----------------------------------------
 ✅ 404 Handler
---------------------------------------- */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* ----------------------------------------
 ✅ LOCAL SERVER ONLY (Skip for Vercel)
---------------------------------------- */
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;

  // ✅ Connect DB immediately for local dev
  connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Local server running on port ${PORT}`);
  });
}

export default app;
