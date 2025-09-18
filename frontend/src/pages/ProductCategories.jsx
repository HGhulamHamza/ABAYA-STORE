import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductCategories = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
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
  ];

  const handleClick = (category) => {
    navigate(`/catproducts/${encodeURIComponent(category)}`);
  };

  return (

    <div style={styles.container}>
      <Navbar />
      {/* Title with left margin + hover underline */}
      <h1 className="category-heading">PRODUCT CATEGORIES</h1>

      {/* Subheading */}
      <p style={styles.subHeading}>
        Discover timeless elegance — explore our abayas, hijabs, niqabs, and accessories.
      </p>

      <div style={styles.grid} className="categories-grid">
        {categories.map((cat, index) => (
      <div
  key={index}
  style={{
    ...styles.card,
    marginLeft: index >= 5 ? "40px" : "0px",
  }}
  className="category-card"
  onClick={() => handleClick(cat.name)}
>
  <img src={cat.image} alt={cat.name} style={styles.image} />
  <div style={styles.overlay}>
    <h3 style={styles.overlayText}>{cat.name}</h3>
  </div>
</div>

        ))}
      </div>

      {/* Scoped CSS */}
      <style>
        {`
          .category-heading {
            font-size: 2rem;
            font-weight: 700;
            position: relative;
            display: inline-block;
            cursor: pointer;
            margin-right: -10px;
            margin-bottom: 25px;
          }

          .category-heading::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 0%;
            height: 3px;
            background-color: #666666;
            transition: width 0.3s ease-in-out;
          }

          .category-heading:hover::after {
            width: 100%;
          }

          @media (max-width: 768px) {
            .category-heading {
              font-size: 1.5rem;
              margin-left: 20px;
              margin-bottom: 20px;
            }

            /* ✅ Grid: 1 card per row */
            .categories-grid {
              grid-template-columns: 1fr !important;
              gap: 20px;
            }

            /* ✅ Card resize + reset margin-left */
            .category-card {
              max-width: 90% !important;
              height: 280px !important;
              margin: 0 auto !important; /* center horizontally */
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px 20px",
    background: "white",
    marginTop: "80px",
  },
  subHeading: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "40px",
    fontFamily: "'Lato', sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // ✅ desktop: 5 cards
    gap: "30px",
    justifyItems: "center",
    flexWrap: "wrap",
  },
  card: {
    position: "relative",
    width: "90%",
    maxWidth: "200px",
    height: "370px",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
    transition: "transform 0.4s ease-in-out",
  },
  overlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "10px",
  textAlign: "center",
  background: "#B2B596",   // always visible
  transform: "translateY(0)", // no hide/show
  opacity: 1,                // always visible
},

  overlayText: {
    margin: 0,
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#fff",
  },
};

export default ProductCategories;
