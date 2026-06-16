// src/components/Footer.jsx
import React from "react";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  const links = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Products", href: "/products" },
  ];

  return (
    <footer className="ft">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Lato:wght@300;400;700&display=swap');

        .ft {
          background: #1a1a14;
          color: #B2B596;
          font-family: 'Lato', sans-serif;
          overflow: hidden;
        }

        /* Top band */
        .ft-band {
          background: #006400;
          padding: 16px 8%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ft-band-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          font-style: italic;
          color: #F5F5DC;
          letter-spacing: 0.3px;
        }

        .ft-band-cta {
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #006400;
          background: #F5F5DC;
          padding: 10px 24px;
          text-decoration: none;
          transition: background 0.3s, color 0.3s;
          white-space: nowrap;
        }

        .ft-band-cta:hover {
          background: #B2B596;
          color: #1a1a14;
        }

        /* Main body */
        .ft-body {
          padding: 64px 8% 48px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
        }

        /* Logo col */
        .ft-logo-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ft-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .ft-logo-img {
          height: 42px;
          width: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(178,181,150,0.3);
        }

        .ft-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #F5F5DC;
          letter-spacing: 0.3px;
        }

        .ft-tagline {
          font-size: 13px;
          font-weight: 300;
          color: #888B6E;
          line-height: 1.7;
          letter-spacing: 0.3px;
          max-width: 260px;
          margin-bottom: 28px;
        }

        .ft-ornament {
          width: 40px;
          height: 1px;
          background: #006400;
          margin-bottom: 24px;
        }

        .ft-social-row {
          display: flex;
          gap: 16px;
        }

        .ft-social-btn {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(178,181,150,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B2B596;
          text-decoration: none;
          font-size: 15px;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
          border-radius: 50%;
        }

        .ft-social-btn:hover {
          background: #006400;
          color: #F5F5DC;
          border-color: #006400;
        }

        /* Link columns */
        .ft-col h4 {
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #F5F5DC;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 12px;
        }

        .ft-col h4::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 20px; height: 1px;
          background: #006400;
        }

        .ft-col ul {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ft-col ul li a {
          font-size: 13px;
          font-weight: 300;
          color: #888B6E;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: color 0.3s, padding-left 0.3s;
          display: inline-block;
          position: relative;
        }

        .ft-col ul li a:hover {
          color: #B2B596;
          padding-left: 6px;
        }

        /* Contact col text */
        .ft-contact-item {
          font-size: 13px;
          font-weight: 300;
          color: #888B6E;
          letter-spacing: 0.3px;
          line-height: 1.6;
          margin-bottom: 12px;
          display: block;
        }

        .ft-contact-item a {
          color: #888B6E;
          text-decoration: none;
          transition: color 0.3s;
        }

        .ft-contact-item a:hover { color: #B2B596; }

        /* Bottom bar */
        .ft-bottom {
          border-top: 0.5px solid rgba(178,181,150,0.15);
          padding: 20px 8%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ft-copy {
          font-size: 11px;
          font-weight: 300;
          color: #555;
          letter-spacing: 0.5px;
        }

        .ft-bottom-links {
          display: flex;
          gap: 24px;
        }

        .ft-bottom-links a {
          font-size: 11px;
          font-weight: 300;
          color: #555;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }

        .ft-bottom-links a:hover { color: #B2B596; }

        /* Mobile */
        @media (max-width: 768px) {
          .ft-band {
            flex-direction: column;
            text-align: center;
            padding: 20px 6%;
          }

          .ft-body {
            grid-template-columns: 1fr;
            padding: 48px 6% 40px;
            gap: 36px;
          }

          .ft-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 18px 6%;
          }

          .ft-logo-col { align-items: flex-start; }
        }
      `}</style>

      {/* Top CTA band */}
      <div className="ft-band">
        <p className="ft-band-text">
          Crafted with love — elegance in every fold.
        </p>
        <a href="/contact" className="ft-band-cta">Get in Touch</a>
      </div>

      {/* Main grid */}
      <div className="ft-body">
        {/* Brand column */}
        <motion.div
          className="ft-logo-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="ft-logo-row">
            <img src="https://www.sumptuousmodesty.com/assets/logo-CusW8hyU.jpg" alt="Sumptuous Modesty" className="ft-logo-img" />
            <span className="ft-brand-name">Sumptuous Modesty</span>
          </div>
          <p className="ft-tagline">
            Elegance in Every Fold – Modesty with Style. Redefining modest fashion for the contemporary woman.
          </p>
          <div className="ft-ornament" />
          <div className="ft-social-row">
            <a href="https://www.tiktok.com/@sumptuous_modesty_10?_t=ZS-8z7958qrR5E&_r=1" className="ft-social-btn" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="https://www.facebook.com/share/19n2pPAzia/" className="ft-social-btn" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/sumptuous_modesty_10?igsh=cHBseDlmZ3p2bGNn" className="ft-social-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </motion.div>

        {/* Company links */}
        <motion.div
          className="ft-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h4>Company</h4>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="ft-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h4>Contact</h4>
          <span className="ft-contact-item">Pakistan</span>
          <span className="ft-contact-item">
            <a href="mailto:anoshasaeed408@gmail.com">anoshasaeed408@gmail.com</a>
          </span>
          <span className="ft-contact-item">
            <a href="https://wa.me/923303454454">+92 330 345 4454</a>
          </span>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <p className="ft-copy">© 2025 Sumptuous Modesty. All Rights Reserved.</p>
        <div className="ft-bottom-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/products">Products</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;