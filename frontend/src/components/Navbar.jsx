// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Logo from "../../public/ficon.png";

const ADS = [
  "✦  Free delivery on orders above Rs. 2,000  ✦",
  "✦  New Eid collection now available — shop now  ✦",
  "✦  Handcrafted with love — 100% premium fabric  ✦",
  "✦  Custom designs available — contact us on WhatsApp  ✦",
  "✦  Serving all major cities across Pakistan  ✦",
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const handleCartClick = (e) => {
    e.preventDefault();
    navigate("/cart");
  };

  const marqueeText = ADS.join("          ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ─────────────────────────────────────────
           ANNOUNCEMENT BAR
        ───────────────────────────────────────── */
        .nb-announce {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 34px;
          background: #006400;
          z-index: 10001;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .nb-announce-track {
          display: flex;
          white-space: nowrap;
          animation: nbMarquee 30s linear infinite;
          will-change: transform;
        }

        .nb-announce-track:hover {
          animation-play-state: paused;
        }

        .nb-announce-text {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #F5F5DC;
          padding-right: 80px;
          flex-shrink: 0;
        }

        @keyframes nbMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ─────────────────────────────────────────
           NAVBAR — always visible glass bg
        ───────────────────────────────────────── */
        .navbar {
          position: fixed;
          top: 34px; /* sit below announce bar */
          left: 0;
          width: 100%;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6%;
          height: 72px;
          /* Always-on glass — solves dark hero visibility */
          background: rgba(245, 245, 220, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(178,181,150,0.3);
          transition: background 0.4s ease, box-shadow 0.4s ease, height 0.35s ease;
        }

        .navbar.scrolled {
          background: rgba(245, 245, 220, 0.97);
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
          height: 62px;
        }

        /* ── Logo ── */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          flex-shrink: 0;
          z-index: 10001;
        }

        .navbar-logo img {
          height: 42px;
          width: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(178,181,150,0.5);
          transition: height 0.35s, width 0.35s;
        }

        .navbar.scrolled .navbar-logo img {
          height: 34px;
          width: 34px;
        }

        .navbar-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .navbar-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: 0.4px;
          white-space: nowrap;
        }

        .navbar-brand-sub {
          font-family: 'Lato', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #006400;
        }

        /* ── Desktop Links ── */
        .navbar-links {
          list-style: none;
          display: flex;
          gap: 38px;
          margin: 0; padding: 0;
        }

        .navbar-links li a {
          font-family: 'Lato', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #222;
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.3s;
        }

        .navbar-links li a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #006400;
          transition: width 0.35s ease;
        }

        .navbar-links li a:hover { color: #006400; }
        .navbar-links li a:hover::after { width: 100%; }

        /* ── Right actions ── */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box input {
          padding: 6px 34px 6px 12px;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.18);
          background: transparent;
          font-family: 'Lato', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #222;
          outline: none;
          width: 150px;
          transition: border-color 0.3s, width 0.35s;
          letter-spacing: 0.3px;
        }

        .search-box input::placeholder { color: #aaa; }
        .search-box input:focus {
          border-bottom-color: #006400;
          width: 190px;
        }

        .search-icon {
          position: absolute;
          right: 8px;
          font-size: 13px;
          color: #888;
          cursor: pointer;
          transition: color 0.3s;
        }

        .search-icon:hover { color: #006400; }

        .navbar-right > a {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .cart-icon {
          font-size: 20px;
          color: #444;
          cursor: pointer;
          transition: color 0.3s;
        }

        .cart-icon:hover { color: #006400; }

        .menu-toggle {
          display: none;
          font-size: 22px;
          color: #333;
          cursor: pointer;
          transition: color 0.3s;
          z-index: 10001;
        }

        .menu-toggle:hover { color: #006400; }

        /* ── Mobile overlay ── */
        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(2px);
          z-index: 9997;
          opacity: 0;
          transition: opacity 0.35s;
        }

        .mobile-overlay.open {
          display: block;
          opacity: 1;
        }

        /* ── Mobile drawer ── */
        .navbar-links.active {
          display: flex !important;
          flex-direction: column;
          position: fixed;
          top: 0; right: 0;
          width: min(300px, 82vw);
          height: 100vh;
          background: #F5F5DC;
          z-index: 9998;
          padding: 110px 40px 50px;
          gap: 0;
          box-shadow: -4px 0 32px rgba(0,0,0,0.12);
          border-left: 1px solid rgba(178,181,150,0.35);
          animation: slideIn 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }

        .navbar-links.active li {
          border-bottom: 0.5px solid rgba(0,0,0,0.09);
        }

        .navbar-links.active li a {
          display: block;
          font-family: 'Cormorant Garamond', serif !important;
          font-size: 26px !important;
          font-weight: 300 !important;
          font-style: italic !important;
          letter-spacing: 0.3px !important;
          text-transform: none !important;
          color: #1a1a1a !important;
          padding: 15px 0;
          transition: color 0.3s, padding-left 0.3s;
        }

        .navbar-links.active li a:hover {
          color: #006400 !important;
          padding-left: 8px;
        }

        .navbar-links.active li a::after { display: none; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nb-announce { height: 28px; }
          .nb-announce-text { font-size: 9.5px; letter-spacing: 1px; }

          .navbar {
            top: 28px;
            padding: 0 5%;
            height: 62px;
          }

          .navbar-links { display: none; }
          .navbar-brand-sub { display: none; }
          .navbar-logo img { height: 36px; width: 36px; }
          .search-box { display: none; }
          .menu-toggle { display: block; }
        }

        @media (min-width: 769px) {
          .menu-toggle { display: none; }
          .mobile-overlay { display: none !important; }
          .navbar-links { display: flex !important; }
        }
      `}</style>

      {/* ── Announcement bar ── */}
      <div className="nb-announce" aria-label="Announcements">
        <div className="nb-announce-track">
          {/* Duplicate text so the loop is seamless */}
          {[0, 1].map((i) => (
            <span key={i} className="nb-announce-text">{marqueeText}</span>
          ))}
        </div>
      </div>

      {/* ── Overlay ── */}
      <div
        className={`mobile-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Navbar ── */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="Logo" />
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">Sumptuous Modesty</span>
            <span className="navbar-brand-sub">Elegance · Modesty · Style</span>
          </div>
        </Link>

        <ul className={`navbar-links${menuOpen ? " active" : ""}`}>
          <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
          <li><Link to="/products" onClick={handleLinkClick}>Products</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        </ul>

        <div className="navbar-right">
          <div className="search-box">
            <input type="text" placeholder="Search…" />
            <FaSearch className="search-icon" />
          </div>

          <a href="/cart" onClick={handleCartClick}>
            <FaShoppingCart className="cart-icon" />
          </a>

          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Snackbar — logic untouched */}
        <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
          <MuiAlert
            onClose={() => setOpen(false)}
            severity="warning"
            sx={{ backgroundColor: "#B2B596", color: "black" }}
          >
            {message}
          </MuiAlert>
        </Snackbar>
      </nav>
    </>
  );
}

export default Navbar;