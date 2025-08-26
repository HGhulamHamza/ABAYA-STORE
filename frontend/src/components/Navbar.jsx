import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import Logo from "../../public/logo.jpg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
navbar: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 40px",
  backgroundColor: "transparent",  // 👈 Always transparent
  backdropFilter: "none",

  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  transition: "all 0.3s ease",
  boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
}
,
    logo: {
      height: "55px",
      borderRadius: "12px",
    },
    navContainer: {
      display: "flex",
      alignItems: "center",
      marginLeft: "60px",
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      gap: "35px",
    },
    link: {
      textDecoration: "none",
      color: scrolled ? "#333" : "black", // white links when transparent
      fontWeight: "500",
      fontSize: "16px",
      position: "relative",
      transition: "color 0.3s ease",
    },
    searchWrapper: {
      position: "relative",
      marginLeft: "40px",
      marginRight: "25px",
    },
    searchInput: {
      padding: "8px 40px 8px 14px",
      borderRadius: "20px",
      border: "1px solid #ddd",
      outline: "none",
      fontSize: "14px",
      width: "190px",
      background: scrolled ? "#fff" : "rgba(255,255,255,0.8)",
      color: "#333",
    },
    searchIcon: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "14px",
      color: "#666",
      cursor: "pointer",
    },
    signupBtn: {
      padding: "8px 18px",
      backgroundColor: "#006400",
      color: "#F5F5DC",
      textDecoration: "none",
      borderRadius: "20px",
      fontWeight: "600",
      fontSize: "14px",
      transition: "background 0.3s",
      marginLeft: "25px",
    },
    cart: {
      fontSize: "24px",
      marginLeft: "25px",
      marginRight: "15px",
      cursor: "pointer",
      color: "#B2B596",
    },
    hamburger: {
      display: "none",
      fontSize: "26px",
      cursor: "pointer",
      color: scrolled ? "#006400" : "#fff", // white hamburger on top
      marginLeft: "20px",
    },
    mobileNav: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      position: "absolute",
      top: "70px",
      left: 0,
      right: 0,
      // backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      zIndex: 999,
    },
    mobileLink: {
      padding: "12px 0",
      textDecoration: "none",
      color: "#333",
      fontWeight: "600",
      fontSize: "16px",
    },
    rightSide: {
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/">
        <img src={Logo} alt="Logo" style={styles.logo} />
      </Link>

      {/* Desktop Nav */}
      <div style={styles.navContainer} className="desktop-nav">
        <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.link} className="nav-link">Home</Link></li>
          <li><Link to="/about" style={styles.link} className="nav-link">About</Link></li>
          <li><Link to="/products" style={styles.link} className="nav-link">Products</Link></li>
          <li><Link to="/contact" style={styles.link} className="nav-link">Contact</Link></li>
        </ul>

        {/* Search bar */}
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />
          <FaSearch style={styles.searchIcon} />
        </div>
      </div>

      {/* Right side */}
      <div style={styles.rightSide}>
        <Link to="/cart">
          <FaShoppingCart style={styles.cart} />
        </Link>
        <Link to="/signup" style={styles.signupBtn}>Sign Up</Link>

        {/* Hamburger */}
        <div
          style={styles.hamburger}
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Nav */}
      <div style={styles.mobileNav}>
        <Link to="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/products" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/contact" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>

      {/* Hover underline */}
      <style>
        {`
          .nav-link::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            left: 0;
            bottom: -4px;
            background-color: #B2B596;
            transition: width 0.3s ease;
          }
          .nav-link:hover::after {
            width: 100%;
          }
          .nav-link:hover {
            color: #B2B596;
          }

          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .hamburger {
              display: block !important;
            }
            .rightSide {
              gap: 15px;
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
