import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import Product from "./models/Product.js";

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
       "http://localhost:5173",
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
  console.error("❌ MongoDB connection error");
  console.error("message:", err.message);
  console.error("code:", err.code);
  console.error(err);
}}

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

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const STORE_BASE_URL =
  process.env.STORE_URL || "https://sumptuousmodesty.com";

const resolveImageUrl = (image) => {
  if (!image || typeof image !== "string") return null;
  const trimmed = image.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  const base = STORE_BASE_URL.replace(/\/$/, "");
  if (trimmed.startsWith("/")) return `${base}${trimmed}`;
  return `${base}/${trimmed}`;
};

async function enrichCartWithImages(cart) {
  return Promise.all(
    cart.map(async (item) => {
      let image = item.image;

      if (item._id) {
        try {
          const product = await Product.findById(item._id).select("image").lean();
          if (product?.image) image = product.image;
        } catch (err) {
          console.error("Product lookup failed:", err.message);
        }
      }

      return { ...item, imageUrl: resolveImageUrl(image) };
    })
  );
}

async function fetchImageBuffer(imageUrl) {
  const urlsToTry = [imageUrl];

  if (
    imageUrl.includes("sumptuousmodesty.com") &&
    !imageUrl.includes("www.")
  ) {
    urlsToTry.push(
      imageUrl.replace("sumptuousmodesty.com", "www.sumptuousmodesty.com")
    );
  }

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      const buffer = Buffer.from(await response.arrayBuffer());
      const contentType = response.headers.get("content-type") || "image/jpeg";
      return { buffer, contentType };
    } catch (err) {
      console.error(`Image fetch failed for ${url}:`, err.message);
    }
  }

  return null;
}

async function buildInlineImageAttachments(items) {
  const attachments = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.imageUrl) continue;

    const fetched = await fetchImageBuffer(item.imageUrl);
    if (!fetched) continue;

    const { buffer, contentType } = fetched;
    const ext = contentType.includes("png")
      ? "png"
      : contentType.includes("webp")
        ? "webp"
        : "jpg";
    const cid = `product-image-${i}`;

    attachments.push({
      filename: `${i + 1}-${String(item.name || "product").replace(/[^a-z0-9]/gi, "_")}.${ext}`,
      content: buffer,
      cid,
      contentType,
    });

    item.imageCid = cid;
  }

  return attachments;
}

const buildProductImageHtml = (item) => {
  if (item.imageCid) {
    return `<img src="cid:${item.imageCid}" alt="${escapeHtml(item.name)}" width="120" height="120" style="object-fit:cover;border-radius:8px;display:block;" />`;
  }

  if (item.imageUrl) {
    return `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" width="120" height="120" style="object-fit:cover;border-radius:8px;display:block;" />`;
  }

  return `<div style="width:120px;height:120px;background:#f0f0f0;border-radius:8px;color:#999;font-size:12px;display:flex;align-items:center;justify-content:center;text-align:center;">No image</div>`;
};

app.post("/order", async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    address,
    emergency,
    cart,
    subtotal,
    shippingFee = 380,
    total,
  } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ msg: "Cart is empty" });
  }

  const orderTotal = total ?? subtotal + shippingFee;
  const enrichedCart = await enrichCartWithImages(cart);
  const attachments = await buildInlineImageAttachments(enrichedCart);

  const productRowsHtml = enrichedCart
    .map((item) => {
      const qty = item.quantity || 1;
      const lineTotal = item.price * qty;

      return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #eee;vertical-align:top;">${buildProductImageHtml(item)}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;vertical-align:top;">
            <strong>${escapeHtml(item.name)}</strong><br/>
            ${item.selectedSize ? `Size: ${escapeHtml(item.selectedSize)}<br/>` : ""}
            Quantity: ${qty}<br/>
            Price: Rs ${lineTotal}
            ${item.imageUrl ? `<br/><a href="${escapeHtml(item.imageUrl)}">View image</a>` : ""}
          </td>
        </tr>
      `;
    })
    .join("");

  const productLinesText = enrichedCart
    .map((item) => {
      const qty = item.quantity || 1;
      const sizeText = item.selectedSize ? `(Size: ${item.selectedSize})` : "";
      const imageText = item.imageUrl ? `\n  Image: ${item.imageUrl}` : "";
      return `- ${item.name} ${sizeText} x${qty} - Rs ${item.price * qty}${imageText}`;
    })
    .join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#333;max-width:640px;">
      <h2 style="color:#006400;">New Order Received</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
      <p><strong>Address:</strong> ${escapeHtml(address)}</p>
      <p><strong>Emergency Contact:</strong> ${escapeHtml(emergency)}</p>

      <h3 style="color:#006400;margin-top:24px;">Ordered Products</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:10px;text-align:left;">Image</th>
            <th style="padding:10px;text-align:left;">Details</th>
          </tr>
        </thead>
        <tbody>
          ${productRowsHtml}
        </tbody>
      </table>

      <p style="margin-top:20px;"><strong>Subtotal:</strong> Rs ${subtotal}</p>
      <p><strong>Shipping:</strong> Rs ${shippingFee}</p>
      <p><strong>Total:</strong> Rs ${orderTotal}</p>
      ${
        attachments.length > 0
          ? `<p style="color:#666;font-size:13px;">Product images are also attached to this email.</p>`
          : ""
      }
    </div>
  `;

  const text = `
A new order has been placed.

Name: ${name}
WhatsApp: ${whatsapp}
Email: ${email || "Not provided"}
Address: ${address}
Emergency Contact: ${emergency}

Products:
${productLinesText}

Subtotal: Rs ${subtotal}
Shipping: Rs ${shippingFee}
Total: Rs ${orderTotal}
`;

  try {
    await transporter.sendMail({
      from: `"Sumptuous Modesty Orders" <${process.env.GMAIL_USER}>`,
      to: "anoshasaeed408@gmail.com",
      subject: "New Order Received",
      text,
      html,
      attachments,
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
