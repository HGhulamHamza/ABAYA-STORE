// src/pages/ProductCategories.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductCategories = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    { name: "Daily Wear Abayas", image: "/1.jpg" },
    { name: "Exclusive Collection", image: "/2.jpg" },
    { name: "Wedding Abayas", image: "/3.jpg" },
    { name: "Georgette Hijabs", image: "/5.jpg" },
    { name: "Hijabs", image: "/4.jpg" },
    { name: "Hijab & Niqab Sets", image: "/.jpg" },
    { name: "Hijab & Under Cap Sets", image: "/.jpg" },
    { name: "Niqabs", image: "/6.jpg" },
    { name: "Accessories", image: "/placeholder9.jpg" },
    { name: "Winter Collection", image: "/7.jpg" },
  ];

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 className="category-heading">ABAYA CATEGORIES</h1>
        <p style={styles.subHeading}>
          Discover timeless elegance — explore our abayas, hijabs, niqabs, and accessories.
        </p>

        <div style={styles.cardContainer}>
          {categories.map((cat, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={() => !isMobile && setHoverIndex(index)}
              onMouseLeave={() => !isMobile && setHoverIndex(null)}
            >
              <img src={cat.image} alt={cat.name} style={styles.image} />

              {/* ✅ Bottom overlay animation only */}
              <div
                style={{
                  ...styles.overlay,
                  background: "#B2B596", // new background
                  transform: hoverIndex === index ? "translateY(0)" : "translateY(100%)",
                  opacity: hoverIndex === index ? 1 : 0,
                }}
              >
                <h3 style={styles.overlayText}>{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Footer only once */}
      {/* <Footer /> */}

      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

          .category-heading {
            font-size: 40px;
            font-weight: 700;
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
            color: #222;
            font-family: 'Lato', sans-serif;
          }

          .category-heading::after {
            content: "";
            position: absolute;
            width: 0;
            height: 3px;
            left: 0;
            bottom: -6px;
            background-color: #B2B596;
            transition: width 0.3s ease;
          }

          .category-heading:hover::after {
            width: 100%;
          }
        `}
      </style>
    </>
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
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "25px",
    justifyItems: "center",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "220px",
    height: "320px",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
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
    transform: "translateY(100%)",
    opacity: 0,
    transition: "all 0.3s ease",
  },
  overlayText: {
    margin: 0,
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.9rem", // smaller font
    fontWeight: "600",
    color: "#fff", // white text over #B2B596 bg
  },
};

export default ProductCategories;
