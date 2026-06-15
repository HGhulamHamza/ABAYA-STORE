import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Daily Wear Abayas", image: "/1.jpg" },
    { name: "Exclusive Collection", image: "/2/1.jpg" },
    { name: "Wedding Abayas", image: "/3.jpg" },
    { name: "Hijabs", image: "/4.jpg" },
    { name: "Hijab & Niqab Sets", image: "/8.jpg" },
    { name: "Hijab & Under Cap Sets", image: "/9.jpg" },
    { name: "Niqabs", image: "/6.jpg" },
    { name: "Accessories", image: "/8/3.jpg" },
    { name: "Winter Collection", image: "/7.jpg" },
    { name: "Premium Collection", image: "/new.jpeg" },
  ];

  const handleClick = (category) => {
    navigate(`/catproducts/${encodeURIComponent(category)}`);
  };

  const abayaCategories = categories.filter((_, i) =>
    [0, 1, 2, 8, 9].includes(i)
  );

  const otherCategories = categories.filter((_, i) =>
    ![0, 1, 2, 8, 9].includes(i)
  );

  // Scroll animation for underline
  useEffect(() => {
    const handleScroll = () => {
      const el = document.querySelector(".animated-line");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, 1 - rect.top / windowHeight)
      );

      el.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />

      {/* HEADER */}
      <div style={styles.header}>
        <h1 className="lux-title">Curated Collections</h1>

        <div className="animated-line-wrapper">
          <div className="animated-line" />
        </div>

        <p style={styles.subHeading}>
          Discover timeless elegance crafted for modern modest fashion
        </p>
      </div>

      {/* ABAYA SECTION */}
      <h2 style={styles.sectionTitle}>
        <span style={styles.line}></span>
        <span style={styles.sectionText}>Abayas Collection</span>
        <span style={styles.line}></span>
      </h2>

      <div style={styles.grid} className="categories-grid">
        {abayaCategories.map((cat, index) => (
          <div
            key={index}
            style={styles.card}
            className="lux-card"
            onClick={() => handleClick(cat.name)}
          >
            <img src={cat.image} alt={cat.name} style={styles.image} />

            <div style={styles.overlay}>
              <div style={styles.textBox}>
                <h2 style={styles.overlayText}>{cat.name}</h2>
                <div style={styles.smallLine}></div>
                <p style={styles.subText}>Explore Collection</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* OTHER SECTION */}
      <h2 style={styles.sectionTitle}>
        <span style={styles.line}></span>
        <span style={styles.sectionText}>Hijabs, Niqabs & Accessories</span>
        <span style={styles.line}></span>
      </h2>

      <div style={styles.grid} className="categories-grid">
        {otherCategories.map((cat, index) => (
          <div
            key={index}
            style={styles.card}
            className="lux-card"
            onClick={() => handleClick(cat.name)}
          >
            <img src={cat.image} alt={cat.name} style={styles.image} />

            <div style={styles.overlay}>
              <div style={styles.textBox}>
                <h2 style={styles.overlayText}>{cat.name}</h2>
                <div style={styles.smallLine}></div>
                <p style={styles.subText}>Explore Collection</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STYLE */}
      <style>{`
        .lux-title {
          font-size: 42px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #1a1a1a;
          margin-bottom: 10px;
          position: relative;
          display: inline-block;
        }

        /* Animated underline */
        .animated-line-wrapper {
          width: 220px;
          height: 3px;
          background: #ddd;
          margin: 10px auto;
          overflow: hidden;
        }

        .animated-line {
          height: 100%;
          width: 100%;
          background: #B2B596;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s linear;
        }

        /* SECTION TITLE LINES */
        .section-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 50px 0 20px;
        }

        /* MOBILE FIX: center last row */
        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            justify-content: center !important;
          }
        @media (max-width: 768px) {
  .lux-card h2 {
    font-size: 14px !important;
  }

  .lux-card p {
    font-size: 10px !important;
  }
}
  
        }
    

      `}</style>
    </div>
  );
};

/* ================= STYLES ================= */
const styles = {
  container: {
    textAlign: "center",
    padding: "70px 20px",
    marginTop: "80px",
    // background: "#F5F5DC",
  },

  header: {
    marginBottom: "40px",
  },

  subHeading: {
    fontSize: "16px",
    color: "#333",
    marginTop: "10px",
  },

  /* SECTION TITLE (NEW STYLE) */
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#006400",
    margin: "50px 0 20px",
    textTransform: "uppercase",
  },

  line: {
    flex: 1,
    height: "2px",
    background:
      "linear-gradient(to right, transparent, #006400, transparent)",
    maxWidth: "120px",
  },

  sectionText: {
    whiteSpace: "nowrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "28px",
    justifyItems: "center",
    marginBottom: "40px",
  },

  card: {
    position: "relative",
    width: "100%",
    maxWidth: "220px",
    height: "360px",
    borderRadius: "18px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 25px 50px rgba(0,0,0,0.18)",
    border: "1px solid rgba(0,100,0,0.15)",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scale(1.08)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(111, 43, 0, 0.48), rgba(0,0,0,0.35),rgb(70, 70, 70)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    border: "1px solid rgba(0,100,0,0.25)",
  },

  textBox: {
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  overlayText: {
    fontSize: "17px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },

  smallLine: {
    width: "35px",
    height: "2px",
    background: "#B2B596",
    margin: "8px 0",
    borderRadius: "10px",
  },

  subText: {
    fontSize: "11px",
    letterSpacing: "2px",
    opacity: 0.85,
  },
};

export default ProductCategories;