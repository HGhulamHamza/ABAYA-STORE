// src/components/Footer.jsx
import React from "react";
import { FaTiktok, FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  const styles = {
    footer: { background: "#B2B596", color: "black", padding: "30px 8%" },
    top: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "25px",
      fontSize: "14px", // smaller font
    },
    logo: {
      flex: 1,
      minWidth: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      fontSize: "14px",
    },
    img: {
      height: "50px", // professional size
      width: "auto",
      marginBottom: "8px",
    },
    links: { flex: 1, minWidth: "160px" },
    contact: { flex: 1, minWidth: "160px" },
    bottom: {
      marginTop: "25px",
      borderTop: "1px solid rgba(255,255,255,0.4)",
      paddingTop: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      fontSize: "12px",
    },
    social: { display: "flex", gap: "15px", fontSize: "20px" },
    link: { textDecoration: "none", color: "black", position: "relative" },
    heading: { color: "white", marginBottom: "8px" },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.top}>
        {/* Logo + Tagline */}
        <motion.div
          style={styles.logo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src="/ficon.png" alt="Sumptuous Modesty Logo" style={styles.img} />
          <h2 style={styles.heading}>Sumptuous Modesty</h2>
          <p>Elegance in Every Fold – Modesty with Style.</p>
        </motion.div>

        {/* Links */}
        <div style={styles.links}>
          <h3 style={styles.heading}>Company</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
            <li><a href="/products" className="footer-link">Products</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div style={styles.contact}>
          <h3 style={styles.heading}>Contact</h3>
          <p>Pakistan</p>
          <p>Email: info@sumptuousmodesty.com</p>
          <p>WhatsApp: +92 330 3454454</p>
        </div>
      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        <p>© 2025 Sumptuous Modesty. All Rights Reserved</p>
        <div style={styles.social}>
          <a href="https://www.tiktok.com/@sumptuous_modesty_10?_t=ZS-8z7958qrR5E&_r=1" className="social-link"><FaTiktok /></a>
          <a href="https://www.facebook.com/share/19n2pPAzia/" className="social-link"><FaFacebookF /></a>
          <a href="https://www.instagram.com/sumptuous_modesty_10?igsh=cHBseDlmZ3p2bGNn" className="social-link"><FaInstagram /></a>
        </div>
      </div>

      {/* Hover Styles */}
      <style>
        {`
          /* Normal links (About, Contact, Products) */
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

          /* Social icons */
          .social-link {
            color: #006400;
            transition: color 0.3s ease;
          }
          .social-link:hover {
            color: white;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
