import React from "react";
import { FaTiktok, FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo + Tagline */}
        <motion.div
          className="footer-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src="/ficon.png" alt="Sumptuous Modesty Logo" />
          <h2>Sumptuous Modesty</h2>
          <p>Elegance in Every Fold – Modesty with Style.</p>
        </motion.div>

        {/* Links */}
        <div className="footer-links">
          <h3>Company</h3>
          <ul>
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
            <li><a href="/products" className="footer-link">Products</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Pakistan</p>
          <a>Email: anoshasaeed408@gmail.com</a>
          <p>WhatsApp: +92 330 3454454</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Sumptuous Modesty. All Rights Reserved</p>
        <div className="footer-social">
          <a href="https://www.tiktok.com/@sumptuous_modesty_10?_t=ZS-8z7958qrR5E&_r=1" className="social-link"><FaTiktok /></a>
          <a href="https://www.facebook.com/share/19n2pPAzia/" className="social-link"><FaFacebookF /></a>
          <a href="https://www.instagram.com/sumptuous_modesty_10?igsh=cHBseDlmZ3p2bGNn" className="social-link"><FaInstagram /></a>
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .footer {
            background: #B2B596;
            color: black;
            padding: 30px 5%;
          }

          .footer-top {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 25px;
            font-size: 14px;
          }

          .footer-logo {
            flex: 1;
            min-width: 200px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-logo img {
            height: 50px;
            width: auto;
            margin-bottom: 8px;
          }

          .footer-links, .footer-contact {
            flex: 1;
            min-width: 160px;
          }

          .footer-links ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer-bottom {
            margin-top: 25px;
            border-top: 1px solid rgba(0,0,0,0.2);
            padding-top: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            font-size: 12px;
          }

          .footer-social {
            display: flex;
            gap: 15px;
            font-size: 20px;
          }

          /* Hover links */
          .footer-link {
            color: black;
            text-decoration: none;
            position: relative;
          }

          .footer-link::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            left: 0;
            bottom: -3px;
            background-color: #006400;
            transition: width 0.3s ease;
          }

          .footer-link:hover::after {
            width: 100%;
          }

          .footer-link:hover {
            color: #006400;
          }

          .social-link {
            color: #006400;
            transition: color 0.3s ease;
          }

          .social-link:hover {
            color: white;
          }

          /* ✅ Mobile fix */
          @media (max-width: 768px) {
            .footer {
              text-align: center;
            }
            .footer-top {
              flex-direction: column;
              align-items: center;
            }
            .footer-logo, .footer-links, .footer-contact {
              align-items: center;
              text-align: center;
            }
            .footer-bottom {
              flex-direction: column;
              text-align: center;
            }
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
