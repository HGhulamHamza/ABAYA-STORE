// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    message: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  const locations = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Peshawar",
    "Quetta",
    "Sialkot",
  ];

  const validate = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters";
    if (!/^(\+92|0)?3[0-9]{9}$/.test(formData.whatsapp))
      newErrors.whatsapp = "Enter a valid WhatsApp number";
    if (!formData.message || formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    if (!formData.location) newErrors.location = "Please select your location";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  const msg = `New Contact Form Submission:\n\nName: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nLocation: ${formData.location}\nMessage: ${formData.message}`;

  // ✅ Make sure the number is correct & in international format
  const whatsappUrl = `https://wa.me/923303454454?text=${encodeURIComponent(
    msg
  )}`;

  window.open(whatsappUrl, "_blank");
};



  return (
    <div
      style={{
        marginTop:"20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "80px 8%",
        background: "#F5F5DC",
        gap: "60px",
        flexWrap: "wrap",
        minHeight: "100vh",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      {/* Left Side */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ flex: 1, minWidth: "280px" }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#006400",
            marginBottom: "10px",
          }}
        >
          Reach out with your details, and we’ll be in touch soon
        </h2>
        <h2
          className="contact-heading"
          style={{
            fontSize: "40px",
            fontWeight: "700",
            marginBottom: "20px",
            position: "relative",
            display: "inline-block",
            color: "#222",
          }}
        >
          Contact Us
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#444",
            lineHeight: "1.8",
            maxWidth: "500px",
          }}
        >
          Have questions about our Abayas? Want to discuss custom designs or
          collaborations? We’d love to hear from you. Simply fill out the form
          and we’ll get back to you shortly.
        </p>
      </motion.div>

      {/* Right Side (Glass Form) */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ flex: 1, minWidth: "320px" }}
      >
        <form className="glass-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="form-input"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

          <input
            type="text"
            placeholder="WhatsApp Number"
            className="form-input"
            value={formData.whatsapp}
            onChange={(e) =>
              setFormData({ ...formData, whatsapp: e.target.value })
            }
          />
          {errors.whatsapp && (
            <span style={{ color: "red" }}>{errors.whatsapp}</span>
          )}

          <textarea
            rows="5"
            placeholder="Your Message or Issue"
            className="form-input"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          {errors.message && (
            <span style={{ color: "red" }}>{errors.message}</span>
          )}

          {/* Location dropdown instead of free input */}
          <select
            className="form-input"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          >
            <option value="">Select Your Location</option>
            {locations.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.location && (
            <span style={{ color: "red" }}>{errors.location}</span>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-btn"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>

      {/* Keep your exact styles untouched */}
      <style>
        {`
        
          @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

          .contact-heading::after {
           
            content: "";
            position: absolute;
            width: 0;
            height: 3px;
            left: 0;
            bottom: -6px;
            background-color: #B2B596;
            transition: width 0.3s ease;
          }
          .contact-heading:hover::after {
            width: 100%;
          }

          /* Glassmorphic form */
          .glass-form {
            display: flex;
            flex-direction: column;
            gap: 22px;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.4);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 16px;
            padding: 50px;
          }

          .form-input {
            padding: 16px 20px;
            border: 1px solid rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            font-size: 16px;
            font-family: 'Lato', sans-serif;
            outline: none;
            background: rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            color: #222;
          }

          .form-input:focus {
            border-color: #006400;
            box-shadow: 0 0 8px rgba(0, 100, 0, 0.3);
            background: rgba(255, 255, 255, 0.25);
          }

          ::placeholder {
            color: #555;
            font-family: 'Lato', sans-serif;
          }

          .submit-btn {
            background: #006400;
            color: #fff;
            font-weight: 600;
            padding: 16px 28px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
          }

          .submit-btn:hover {
            background: #004d00 !important;
          }

          @media (max-width: 768px) {
            div[style*="display: flex"] {
              flex-direction: column;
              padding: 60px 20px !important;
              gap: 40px !important;
              align-items: stretch !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Contact;
