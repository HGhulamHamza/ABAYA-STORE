import express from "express";
import Order from "../models/Order.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ✅ Place Order API
router.post("/", async (req, res) => {
  try {
    const { name, whatsapp, email, address, emergency, cart, subtotal } = req.body;

    // Save to DB
    const newOrder = new Order({
      name,
      whatsapp,
      email,
      address,
      emergency,
      cart,
      subtotal,
    });
    await newOrder.save();

    // ✅ Send email using Nodemailer
    if (email) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Order Confirmation",
        html: `
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you <b>${name}</b> for shopping with us.</p>
          <p><b>Order Details:</b></p>
          <ul>
            ${cart
              .map(
                (item) =>
                  `<li>${item.name} (Size: ${item.selectedSize || "N/A"}) x ${
                    item.quantity
                  } - Rs ${item.price * item.quantity}</li>`
              )
              .join("")}
          </ul>
          <p><b>Total: Rs ${subtotal}</b></p>
          <p>We will contact you soon on WhatsApp: ${whatsapp}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ msg: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
