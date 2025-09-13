import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Logo from "../../public/logo.jpg";
import "../components/Navbar.css"; // external css

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Snackbar state
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!(token || user));
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    window.addEventListener("authChange", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("authChange", checkLogin);
    };
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowMenu(false);
    window.dispatchEvent(new Event("authChange"));
  };

  // ✅ Handle Cart click
  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setMessage("You must login to access your cart.");
      setOpen(true);
      // delay navigation slightly so snackbar shows before redirect
      setTimeout(() => navigate("/signin"), 800);
    } else {
      navigate("/cart");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </Link>

      {/* Nav Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>About</Link>
        </li>
        <li>
          <Link to="/products" onClick={handleLinkClick}>Products</Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        </li>
      </ul>

      {/* Right side icons */}
      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>

        {/* ✅ Cart with login check */}
        <a href="/cart" onClick={handleCartClick}>
          <FaShoppingCart className="cart-icon" />
        </a>

        {!isLoggedIn ? (
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        ) : (
          <div className="user-menu">
            <FaUser
              className="user-icon"
              size={20}
              onClick={() => setShowMenu((prev) => !prev)}
              style={{ cursor: "pointer" }}
            />
            {showMenu && (
              <div className="dropdown">
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile toggle */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <MuiAlert
          onClose={() => setOpen(false)}
          elevation={6}
          variant="filled"
          severity="warning"
          sx={{ backgroundColor: "#B2B596", color: "black" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>

      {/* Scoped dropdown styles */}
      <style>
        {`
          .user-menu {
            position: relative;
            display: inline-block;
          }

          .user-icon {
            color: #333;
          }

          .dropdown {
            position: absolute;
            right: -10px;
            top: 36px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            min-width: 120px;
            padding: 8px 0;
            z-index: 2000;
            box-shadow: 0px 6px 14px rgba(0,0,0,0.15);
          }

          .dropdown button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #333;
            padding: 10px 14px;
            width: 100%;
            text-align: left;
            transition: background 0.2s;
          }

          .dropdown button:hover {
            background: #f5f5f5;
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
