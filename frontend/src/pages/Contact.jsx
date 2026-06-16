// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    message: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);

  const locations = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi",
    "Faisalabad", "Multan", "Hyderabad", "Peshawar", "Quetta", "Sialkot",
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
    const whatsappUrl = `https://wa.me/923303454454?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, "_blank");
  };

  const fields = [
    { key: "name", placeholder: "Your Full Name", type: "text", tag: "input" },
    { key: "whatsapp", placeholder: "WhatsApp Number", type: "text", tag: "input" },
    { key: "message", placeholder: "Your Message or Inquiry", tag: "textarea", rows: 5 },
  ];

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');

          *, *::before, *::after { box-sizing: border-box; }

          .contact-page {
            background: #F5F5DC;
            min-height: 100vh;
            font-family: 'Lato', sans-serif;
          }

          .contact-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 80px;
            flex-wrap: wrap;
            padding: 120px 8% 80px;
          }

          /* ─── Left Panel ─── */
          .contact-left {
            flex: 1;
            min-width: 280px;
            max-width: 460px;
            padding-top: 20px;
          }

          .eyebrow {
            font-family: 'Lato', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #006400;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .eyebrow::before {
            content: '';
            display: inline-block;
            width: 32px;
            height: 1px;
            background: #006400;
            flex-shrink: 0;
          }

          .contact-heading {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(52px, 5.5vw, 72px);
            font-weight: 300;
            font-style: italic;
            color: #1a1a1a;
            line-height: 1.05;
            margin: 0 0 12px;
            letter-spacing: -1px;
          }

          .contact-heading span {
            font-style: normal;
            font-weight: 600;
            color: #006400;
          }

          .ornament {
            width: 60px;
            height: 1px;
            background: #B2B596;
            margin: 28px 0;
          }

          .contact-para {
            font-size: 16px;
            line-height: 1.9;
            color: #555;
            font-weight: 300;
            letter-spacing: 0.2px;
            margin: 0 0 40px;
          }

          .info-blocks {
            display: flex;
            flex-direction: column;
            gap: 22px;
          }

          .info-block {
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }

          .info-icon {
            width: 40px;
            height: 40px;
            background: rgba(0,100,0,0.08);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .info-icon svg {
            width: 18px;
            height: 18px;
            stroke: #006400;
          }

          .info-text strong {
            display: block;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #333;
            margin-bottom: 3px;
          }

          .info-text span {
            font-size: 14px;
            color: #666;
            font-weight: 300;
          }

          /* ─── Right Form Panel ─── */
          .contact-right {
            flex: 1;
            min-width: 320px;
            max-width: 520px;
          }

          .glass-form {
            background: rgba(255,255,255,0.48);
            border: 1px solid rgba(178,181,150,0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 2px;
            padding: 52px 48px;
            position: relative;
            overflow: hidden;
          }

          .glass-form::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #006400, transparent);
          }

          .form-group {
            position: relative;
            margin-bottom: 28px;
          }

          .form-label {
            display: block;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2.5px;
            text-transform: uppercase;
            color: #006400;
            margin-bottom: 8px;
            transition: color 0.3s;
          }

          .form-field {
            width: 100%;
            padding: 14px 18px;
            border: none;
            border-bottom: 1px solid rgba(0,0,0,0.18);
            border-radius: 0;
            font-size: 15px;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            outline: none;
            background: transparent;
            color: #222;
            transition: border-color 0.3s ease;
            resize: none;
            appearance: none;
            -webkit-appearance: none;
          }

          .form-field:focus {
            border-bottom-color: #006400;
          }

          .form-field::placeholder {
            color: #aaa;
            font-weight: 300;
          }

          .field-underline {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 1px;
            width: 0;
            background: #006400;
            transition: width 0.4s ease;
          }

          .form-group:focus-within .field-underline {
            width: 100%;
          }

          .form-select-wrapper {
            position: relative;
          }

          .form-select-wrapper::after {
            content: '';
            position: absolute;
            right: 18px;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            border-right: 1px solid #666;
            border-bottom: 1px solid #666;
            transform: translateY(-60%) rotate(45deg);
            pointer-events: none;
          }

          .form-select {
            width: 100%;
            padding: 14px 18px;
            border: none;
            border-bottom: 1px solid rgba(0,0,0,0.18);
            border-radius: 0;
            font-size: 15px;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            outline: none;
            background: transparent;
            color: #222;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            transition: border-color 0.3s;
          }

          .form-select:focus {
            border-bottom-color: #006400;
          }

          .error-msg {
            font-size: 11px;
            color: #c0392b;
            margin-top: 5px;
            letter-spacing: 0.3px;
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .error-msg::before {
            content: '—';
            color: #c0392b;
          }

          .submit-btn {
            width: 100%;
            padding: 18px 28px;
            background: #006400;
            color: #F5F5DC;
            border: none;
            border-radius: 0;
            font-family: 'Lato', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 3.5px;
            text-transform: uppercase;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: background 0.3s ease;
            margin-top: 8px;
          }

          .submit-btn::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.08);
            transform: translateX(-100%);
            transition: transform 0.4s ease;
          }

          .submit-btn:hover {
            background: #004d00;
          }

          .submit-btn:hover::after {
            transform: translateX(0);
          }

          .submit-note {
            text-align: center;
            font-size: 11px;
            color: #888;
            letter-spacing: 0.5px;
            margin-top: 16px;
            font-weight: 300;
          }

          .submit-note span {
            color: #006400;
          }

          @media (max-width: 768px) {
            .contact-wrapper {
              padding: 100px 6% 60px;
              gap: 50px;
            }
            .glass-form {
              padding: 36px 28px;
            }
          }
        `}</style>

        <div className="contact-wrapper">
          {/* Left */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">Get In Touch</p>
            <h1 className="contact-heading">
              Let's Start a<br />
              <span>Conversation</span>
            </h1>
            <div className="ornament" />
            <p className="contact-para">
              Have questions about our Abayas? Want to discuss custom designs or
              collaborations? We'd love to hear from you. Simply fill out the form
              and we'll get back to you shortly.
            </p>

            <div className="info-blocks">
              <motion.div
                className="info-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <div className="info-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                </div>
                <div className="info-text">
                  <strong>WhatsApp</strong>
                  <span>+92 330 345 4454</span>
                </div>
              </motion.div>

              <motion.div
                className="info-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
              >
                <div className="info-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                </div>
                <div className="info-text">
                  <strong>Serving Across</strong>
                  <span>All major cities in Pakistan</span>
                </div>
              </motion.div>

              <motion.div
                className="info-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <div className="info-icon">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="info-text">
                  <strong>Response Time</strong>
                  <span>Within a few hours</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="glass-form" onSubmit={handleSubmit} noValidate>

              {fields.map(({ key, placeholder, type, tag, rows }) => (
                <div className="form-group" key={key}>
                  <label className="form-label" htmlFor={key}>{placeholder}</label>
                  {tag === "textarea" ? (
                    <div style={{ position: "relative" }}>
                      <textarea
                        id={key}
                        rows={rows}
                        className="form-field"
                        placeholder={`Enter your ${key === "message" ? "message" : key}…`}
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      />
                      <div className="field-underline" />
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <input
                        id={key}
                        type={type}
                        className="form-field"
                        placeholder={key === "whatsapp" ? "03XX XXXXXXX" : "Enter your name…"}
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      />
                      <div className="field-underline" />
                    </div>
                  )}
                  <AnimatePresence>
                    {errors[key] && (
                      <motion.p
                        className="error-msg"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {errors[key]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="form-group">
                <label className="form-label" htmlFor="location">Your City</label>
                <div className="form-select-wrapper" style={{ position: "relative" }}>
                  <select
                    id="location"
                    className="form-select"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    <option value="">Select your city…</option>
                    {locations.map((city, idx) => (
                      <option key={idx} value={city}>{city}</option>
                    ))}
                  </select>
                  <div className="field-underline" style={{
                    position: "absolute", bottom: 0, left: 0, height: "1px",
                    background: "#006400", transition: "width 0.4s"
                  }} />
                </div>
                <AnimatePresence>
                  {errors.location && (
                    <motion.p
                      className="error-msg"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {errors.location}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileTap={{ scale: 0.98 }}
              >
                Send via WhatsApp
              </motion.button>

              <p className="submit-note">
                Reaches us on <span>WhatsApp</span> instantly
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Contact;