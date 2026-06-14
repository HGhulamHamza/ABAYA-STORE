import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Logo from "../../public/logo.jpg";
import "../components/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLinkClick = () => setMenuOpen(false);

  // ✅ Direct cart access (NO LOGIN CHECK)
  const handleCartClick = (e) => {
    e.preventDefault();
    navigate("/cart");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </Link>

      {/* Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        <li><Link to="/products" onClick={handleLinkClick}>Products</Link></li>
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
      </ul>

      {/* Right side */}
      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>

        {/* Cart (no login restriction) */}
        <a href="/cart" onClick={handleCartClick}>
          <FaShoppingCart className="cart-icon" />
        </a>

        {/* Mobile toggle */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Snackbar (kept for future use) */}
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
  );
}

export default Navbar;