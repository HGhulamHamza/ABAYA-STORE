// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
 
const Products = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!categoryName) return;
    setLoading(true);
    fetch(
      `https://abaya-store-u56r.vercel.app/api/products/category/${encodeURIComponent(categoryName)}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [categoryName]);
 
  const addToCart = (product) => {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item._id === product._id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    setToast({ visible: true, message: "Added to cart" });
    setTimeout(() => setToast({ visible: false, message: "" }), 2800);
  };
 
  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
 
        .prd-page {
          min-height: 100vh;
          background: #F5F5DC;
          font-family: 'Lato', sans-serif;
          padding-bottom: 80px;
        }
 
        /* ── Toast ── */
        .prd-toast {
          position: fixed;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: #1a1a14;
          color: #F5F5DC;
          padding: 14px 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-left: 3px solid #006400;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          white-space: nowrap;
          box-shadow: 0 8px 32px rgba(0,0,0,0.22);
        }
 
        .prd-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
 
        .prd-toast-icon {
          width: 22px;
          height: 22px;
          background: #006400;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 11px;
        }
 
        /* ── Hero ── */
        .prd-hero {
          background: #1a1a14;
          padding: 160px 8% 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
 
        .prd-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #B2B596, transparent);
        }
 
        .prd-hero-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #B2B596;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
 
        .prd-hero-eyebrow::before,
        .prd-hero-eyebrow::after {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: #B2B596;
        }
 
        .prd-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 300;
          font-style: italic;
          color: #F5F5DC;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }
 
        .prd-hero-title span {
          font-style: normal;
          font-weight: 600;
          color: #B2B596;
        }
 
        /* ── Search ── */
        .prd-search-wrap {
          display: flex;
          justify-content: center;
          padding: 48px 8% 0;
        }
 
        .prd-search {
          position: relative;
          width: 100%;
          max-width: 480px;
        }
 
        .prd-search input {
          width: 100%;
          padding: 14px 48px 14px 20px;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.18);
          background: transparent;
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: #222;
          outline: none;
          letter-spacing: 0.3px;
          transition: border-color 0.3s;
        }
 
        .prd-search input::placeholder { color: #aaa; }
        .prd-search input:focus { border-bottom-color: #006400; }
 
        .prd-search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: #888;
        }
 
        .prd-count {
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #888;
          margin: 28px 0 0;
        }
 
        /* ── Grid ── */
        .prd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          padding: 40px 5% 0;
          max-width: 1300px;
          margin: 0 auto;
        }
 
        /* ── Card ── */
        .prd-card {
          background: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.35s, transform 0.35s;
          border: 1px solid rgba(178,181,150,0.18);
        }
 
        .prd-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.11);
          transform: translateY(-4px);
          z-index: 2;
        }
 
        .prd-card-img-wrap {
          position: relative;
          overflow: hidden;
          height: 300px;
          background: #f0ede4;
        }
 
        .prd-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
        }
 
        .prd-card:hover .prd-card-img {
          transform: scale(1.06);
        }
 
        .prd-card-tag {
          position: absolute;
          top: 12px; left: 12px;
          background: rgba(245,245,220,0.92);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #333;
          padding: 5px 10px;
          backdrop-filter: blur(4px);
        }
 
        /* ── Card body ── */
        .prd-card-body {
          padding: 16px 18px 18px;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
 
        .prd-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.2;
          margin: 0 0 12px;
        }
 
        /* Price + Cart row */
        .prd-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
 
        .prd-card-price {
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #006400;
          margin: 0;
        }
 
        .prd-cart-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0,100,0,0.2);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #006400;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.2s;
          flex-shrink: 0;
        }
 
        .prd-cart-btn:hover {
          background: #006400;
          color: #F5F5DC;
          border-color: #006400;
          transform: scale(1.1);
        }
 
        .prd-cart-btn:active {
          transform: scale(0.92);
        }
 
        /* ── Loader ── */
        .prd-loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 0;
          gap: 20px;
        }
 
        .prd-spinner {
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(0,100,0,0.15);
          border-top-color: #006400;
          border-radius: 50%;
          animation: prdSpin 0.9s linear infinite;
        }
 
        @keyframes prdSpin { to { transform: rotate(360deg); } }
 
        .prd-loader-text {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
        }
 
        .prd-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-style: italic;
          font-weight: 300;
          color: #888;
        }
 
        /* ── Mobile ── */
        @media (max-width: 768px) {
          .prd-hero { padding: 130px 6% 50px; }
          .prd-search-wrap { padding: 36px 6% 0; }
 
          .prd-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            padding: 32px 4% 0;
          }
 
          .prd-card-img-wrap { height: 200px; }
          .prd-card-body { padding: 12px 12px 14px; }
          .prd-card-name { font-size: 15px; margin-bottom: 8px; }
          .prd-card-price { font-size: 12px; }
          .prd-cart-btn { width: 30px; height: 30px; font-size: 12px; }
        }
 
        @media (max-width: 380px) {
          .prd-grid { grid-template-columns: 1fr; }
          .prd-card-img-wrap { height: 260px; }
        }
      `}</style>
 
      {/* Custom toast */}
      <div className={`prd-toast${toast.visible ? " show" : ""}`}>
        <span className="prd-toast-icon">✓</span>
        {toast.message}
      </div>
 
      <div className="prd-page">
        <Navbar />
 
        <div className="prd-hero">
          <p className="prd-hero-eyebrow">Collection</p>
          <h1 className="prd-hero-title">
            <span>{categoryName || "Our Products"}</span>
          </h1>
        </div>
 
        <div className="prd-search-wrap">
          <div className="prd-search">
            <input
              type="text"
              placeholder={`Search in ${categoryName || "products"}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="prd-search-icon" />
          </div>
        </div>
 
        {!loading && (
          <p className="prd-count">
            {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        )}
 
        {loading ? (
          <div className="prd-loader-wrap">
            <div className="prd-spinner" />
            <p className="prd-loader-text">Loading {categoryName}…</p>
          </div>
        ) : (
          <div className="prd-grid">
            {filteredProducts.length === 0 ? (
              <p className="prd-empty">No pieces available in this collection.</p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="prd-card"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="prd-card-img-wrap">
                    <img
                      src={product.image || "https://via.placeholder.com/250"}
                      alt={product.name || "Product"}
                      className="prd-card-img"
                    />
                    {product.category && (
                      <span className="prd-card-tag">{product.category}</span>
                    )}
                  </div>
                  <div className="prd-card-body">
                    <p className="prd-card-name">{product.name || "Unnamed Product"}</p>
                    <div className="prd-card-footer">
                      <p className="prd-card-price">
                        {product.price ? `Rs ${product.price}` : "Price N/A"}
                      </p>
                      <button
                        className="prd-cart-btn"
                        title="Add to cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};
 
export default Products;