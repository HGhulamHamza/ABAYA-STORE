// src/components/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios
      .get(`https://abaya-store-u56r.vercel.app/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Lato:wght@300;400;700&display=swap');

          .pd-loader-page {
            min-height: 100vh;
            background: #F5F5DC;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0;
            position: relative;
            overflow: hidden;
          }

          /* Soft radial glow behind the emblem */
          .pd-loader-page::before {
            content: '';
            position: absolute;
            width: 380px;
            height: 380px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(178,181,150,0.18) 0%, transparent 70%);
            animation: glowPulse 3s ease-in-out infinite;
          }

          @keyframes glowPulse {
            0%, 100% { transform: scale(1);   opacity: 0.7; }
            50%       { transform: scale(1.15); opacity: 1;   }
          }

          /* ── Central floral emblem ── */
          .pd-loader-emblem {
            position: relative;
            width: 90px;
            height: 90px;
            margin-bottom: 36px;
          }

          /* Four petals, each rotated 90° apart */
          .pd-petal-arm {
            position: absolute;
            top: 50%; left: 50%;
            width: 28px;
            height: 46px;
            margin-left: -14px;
            margin-top: -46px;
            transform-origin: center bottom;
            animation: petalBloom 2.4s ease-in-out infinite;
          }

          .pd-petal-arm:nth-child(1) { transform: rotate(0deg);   animation-delay: 0s;    }
          .pd-petal-arm:nth-child(2) { transform: rotate(90deg);  animation-delay: 0.2s;  }
          .pd-petal-arm:nth-child(3) { transform: rotate(180deg); animation-delay: 0.4s;  }
          .pd-petal-arm:nth-child(4) { transform: rotate(270deg); animation-delay: 0.6s;  }

          /* Diagonal petals smaller */
          .pd-petal-arm:nth-child(5) {
            width: 20px; height: 34px;
            margin-left: -10px; margin-top: -34px;
            transform: rotate(45deg);
            animation-delay: 0.1s;
            opacity: 0.55;
          }
          .pd-petal-arm:nth-child(6) { transform: rotate(135deg); animation-delay: 0.3s; opacity: 0.55; width:20px;height:34px;margin-left:-10px;margin-top:-34px; }
          .pd-petal-arm:nth-child(7) { transform: rotate(225deg); animation-delay: 0.5s; opacity: 0.55; width:20px;height:34px;margin-left:-10px;margin-top:-34px; }
          .pd-petal-arm:nth-child(8) { transform: rotate(315deg); animation-delay: 0.7s; opacity: 0.55; width:20px;height:34px;margin-left:-10px;margin-top:-34px; }

          @keyframes petalBloom {
            0%, 100% { opacity: 0.25; transform-origin: center bottom; }
            50%       { opacity: 1;    }
          }

          /* Overwrite transform for each child separately so rotation is preserved */
          .pd-petal-arm:nth-child(1) { animation-name: petalBloom1; }
          .pd-petal-arm:nth-child(2) { animation-name: petalBloom2; }
          .pd-petal-arm:nth-child(3) { animation-name: petalBloom3; }
          .pd-petal-arm:nth-child(4) { animation-name: petalBloom4; }
          .pd-petal-arm:nth-child(5) { animation-name: petalBloom5; }
          .pd-petal-arm:nth-child(6) { animation-name: petalBloom6; }
          .pd-petal-arm:nth-child(7) { animation-name: petalBloom7; }
          .pd-petal-arm:nth-child(8) { animation-name: petalBloom8; }

          @keyframes petalBloom1 { 0%,100%{opacity:.25;transform:rotate(0deg)   scaleY(0.8);} 50%{opacity:1;transform:rotate(0deg)   scaleY(1);} }
          @keyframes petalBloom2 { 0%,100%{opacity:.25;transform:rotate(90deg)  scaleY(0.8);} 50%{opacity:1;transform:rotate(90deg)  scaleY(1);} }
          @keyframes petalBloom3 { 0%,100%{opacity:.25;transform:rotate(180deg) scaleY(0.8);} 50%{opacity:1;transform:rotate(180deg) scaleY(1);} }
          @keyframes petalBloom4 { 0%,100%{opacity:.25;transform:rotate(270deg) scaleY(0.8);} 50%{opacity:1;transform:rotate(270deg) scaleY(1);} }
          @keyframes petalBloom5 { 0%,100%{opacity:.15;transform:rotate(45deg)  scaleY(0.8);} 50%{opacity:.6;transform:rotate(45deg)  scaleY(1);} }
          @keyframes petalBloom6 { 0%,100%{opacity:.15;transform:rotate(135deg) scaleY(0.8);} 50%{opacity:.6;transform:rotate(135deg) scaleY(1);} }
          @keyframes petalBloom7 { 0%,100%{opacity:.15;transform:rotate(225deg) scaleY(0.8);} 50%{opacity:.6;transform:rotate(225deg) scaleY(1);} }
          @keyframes petalBloom8 { 0%,100%{opacity:.15;transform:rotate(315deg) scaleY(0.8);} 50%{opacity:.6;transform:rotate(315deg) scaleY(1);} }

          /* Centre dot */
          .pd-loader-dot {
            position: absolute;
            top: 50%; left: 50%;
            width: 10px; height: 10px;
            background: #006400;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: dotPulse 2.4s ease-in-out infinite;
          }

          @keyframes dotPulse {
            0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
            50%      { transform: translate(-50%,-50%) scale(1.35); opacity: 1;   }
          }

          /* Outer orbit ring */
          .pd-loader-ring {
            position: absolute;
            top: 50%; left: 50%;
            width: 86px; height: 86px;
            margin-top: -43px; margin-left: -43px;
            border-radius: 50%;
            border: 1px solid rgba(178,181,150,0.4);
            animation: ringRotate 8s linear infinite;
          }

          /* Tiny notch on the ring to show rotation */
          .pd-loader-ring::before {
            content: '';
            position: absolute;
            top: -2px; left: 50%;
            width: 4px; height: 4px;
            background: #006400;
            border-radius: 50%;
            transform: translateX(-50%);
          }

          @keyframes ringRotate {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          /* ── Brand name ── */
          .pd-loader-brand {
            font-family: 'Cormorant Garamond', serif;
            font-size: 26px;
            font-weight: 300;
            font-style: italic;
            color: #1a1a1a;
            letter-spacing: 1px;
            margin: 0 0 8px;
          }

          /* ── Animated dots text ── */
          .pd-loader-label {
            font-family: 'Lato', sans-serif;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 3.5px;
            text-transform: uppercase;
            color: #B2B596;
            display: flex;
            align-items: center;
            gap: 2px;
          }

          .pd-loader-label span {
            animation: dotFade 1.4s ease-in-out infinite;
            font-size: 14px;
            line-height: 1;
            margin-top: -2px;
          }

          .pd-loader-label span:nth-child(2) { animation-delay: 0.2s; }
          .pd-loader-label span:nth-child(3) { animation-delay: 0.4s; }

          @keyframes dotFade {
            0%,80%,100% { opacity: 0.2; }
            40%          { opacity: 1;   }
          }

          /* ── Thin progress line ── */
          .pd-loader-bar-wrap {
            width: 120px;
            height: 1px;
            background: rgba(178,181,150,0.25);
            margin-top: 28px;
            overflow: hidden;
          }

          .pd-loader-bar {
            height: 100%;
            background: #006400;
            animation: barSlide 1.8s ease-in-out infinite;
            transform-origin: left;
          }

          @keyframes barSlide {
            0%   { transform: translateX(-100%) scaleX(0.4); }
            50%  { transform: translateX(60%)   scaleX(0.6); }
            100% { transform: translateX(220%)  scaleX(0.3); }
          }
        `}</style>

        <div className="pd-loader-page">
          {/* Floral emblem */}
          <div className="pd-loader-emblem">
            {/* 8 petals */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="pd-petal-arm">
                <svg viewBox="0 0 28 46" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <ellipse cx="14" cy="28" rx="11" ry="24" fill="#B2B596" />
                </svg>
              </div>
            ))}
            <div className="pd-loader-ring" />
            <div className="pd-loader-dot" />
          </div>

          <p className="pd-loader-brand">Sumptuous Modesty</p>

          <p className="pd-loader-label">
            Curating your piece
            <span>.</span><span>.</span><span>.</span>
          </p>

          <div className="pd-loader-bar-wrap">
            <div className="pd-loader-bar" />
          </div>
        </div>
      </>
    );

  const advancedCategories = [
    "Daily Wear Abayas",
    "Exclusive Collection",
    "Wedding Abayas",
    "Winter Collection",
    "Premium Collection",
  ];
  const isAdvanced = advancedCategories.includes(product.category);

  const defaultSizes = ["XS", "S", "M", "L", "XL"];
  let sizesToShow = [];
  if (product.category === "Winter Collection") {
    sizesToShow = product.sizes || [];
  } else if (
    ["Daily Wear Abayas", "Exclusive Collection", "Wedding Abayas", "Premium Collection"].includes(
      product.category
    )
  ) {
    sizesToShow = product.sizes?.length > 0 ? product.sizes : defaultSizes;
  }

  const addItemToCart = () => {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const productId = product._id;
    const existingIndex = cart.findIndex(
      (item) => item._id === productId && item.selectedSize === (selectedSize || null)
    );
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        _id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedSize: selectedSize || null,
        quantity: 1,
      });
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddToCart = () => {
    addItemToCart();
    setSnackbarOpen(true);
    setTimeout(() => navigate("/cart"), 800);
  };

  const handleBuyNow = () => {
    addItemToCart();
    navigate("/checkout");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Loading ── */
        .pd-loading {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #F5F5DC;
          gap: 18px;
        }

        .pd-spinner {
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(0,100,0,0.15);
          border-top-color: #006400;
          border-radius: 50%;
          animation: pdSpin 0.9s linear infinite;
        }

        @keyframes pdSpin { to { transform: rotate(360deg); } }

        .pd-loading-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          font-weight: 300;
          color: #888;
        }

        /* ── Page wrapper ── */
        .pd-page {
          min-height: 100vh;
          background: #F5F5DC;
          font-family: 'Lato', sans-serif;
          padding: 120px 7% 80px;
          position: relative;
          overflow: hidden;
        }

        /* ── Animated background ── */
        .pd-bg-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* Floating petals / crescent shapes */
        .pd-petal {
          position: absolute;
          opacity: 0;
          animation: petalFloat linear infinite;
        }

        .pd-petal svg {
          display: block;
        }

        @keyframes petalFloat {
          0%   { opacity: 0;    transform: translateY(110vh) rotate(0deg)   scale(1); }
          8%   { opacity: 0.18; }
          92%  { opacity: 0.18; }
          100% { opacity: 0;    transform: translateY(-12vh) rotate(280deg) scale(0.85); }
        }

        /* Content sits above bg */
        .pd-content {
          position: relative;
          z-index: 1;
        }

        /* Breadcrumb */
        .pd-breadcrumb {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 48px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: color 0.3s;
        }

        .pd-breadcrumb:hover { color: #006400; }

        /* ── Layout ── */
        .pd-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          max-width: 1060px;
          margin: 0 auto;
          align-items: start;
        }

        /* ── Images ── */
        .pd-images { display: flex; flex-direction: column; gap: 14px; }

        .pd-main-img-wrap {
          position: relative;
          overflow: hidden;
          background: #e8e4d8;
          aspect-ratio: 3/4;
        }

        .pd-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        .pd-main-img-wrap:hover .pd-main-img { transform: scale(1.04); }

        .pd-img-badge {
          position: absolute;
          top: 16px; left: 16px;
          background: rgba(245,245,220,0.92);
          backdrop-filter: blur(6px);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #333;
          padding: 6px 12px;
        }

        .pd-sub-images { display: flex; gap: 10px; flex-wrap: wrap; }

        .pd-sub-img {
          width: 68px; height: 68px;
          object-fit: cover;
          cursor: pointer;
          opacity: 0.55;
          border: 1.5px solid transparent;
          transition: opacity 0.25s, border-color 0.25s;
          flex-shrink: 0;
        }

        .pd-sub-img:hover { opacity: 0.8; }
        .pd-sub-img.active { opacity: 1; border-color: #006400; }

        /* ── Details panel ── */
        .pd-details { display: flex; flex-direction: column; padding-top: 6px; }

        .pd-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #B2B596;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pd-eyebrow::before {
          content: '';
          display: block;
          width: 22px; height: 1px;
          background: #B2B596;
          flex-shrink: 0;
        }

        .pd-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 400;
          color: #1a1a1a;
          line-height: 1.1;
          margin: 0 0 8px;
          letter-spacing: -0.3px;
        }

        .pd-price {
          font-size: 20px;
          font-weight: 700;
          color: #006400;
          letter-spacing: 0.5px;
          margin: 0 0 28px;
        }

        .pd-divider {
          width: 100%; height: 1px;
          background: rgba(0,0,0,0.07);
          margin-bottom: 26px;
        }

        .pd-description {
          font-size: 14px;
          font-weight: 300;
          color: #555;
          line-height: 1.85;
          letter-spacing: 0.2px;
          margin: 0 0 30px;
        }

        /* Sizes */
        .pd-size-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #333;
          margin-bottom: 12px;
        }

        .pd-size-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 26px;
        }

        .pd-size-btn {
          width: 46px; height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,0,0,0.16);
          background: transparent;
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #333;
          cursor: pointer;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
        }

        .pd-size-btn:hover { border-color: #006400; color: #006400; }
        .pd-size-btn.selected { background: #006400; border-color: #006400; color: #F5F5DC; }

        /* Fabric */
        .pd-fabric {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: #555;
          font-weight: 300;
          margin-bottom: 32px;
          padding: 13px 16px;
          background: rgba(178,181,150,0.12);
          border-left: 2px solid #B2B596;
        }

        .pd-fabric strong {
          font-weight: 700;
          color: #333;
          font-size: 9.5px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        /* Buttons */
        .pd-actions { display: flex; gap: 12px; }

        .pd-btn-cart {
          flex: 1;
          padding: 16px 20px;
          border: 1px solid #1a1a1a;
          background: transparent;
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #1a1a1a;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }

        .pd-btn-cart:hover { background: #1a1a1a; color: #F5F5DC; }

        .pd-btn-buy {
          flex: 1;
          padding: 16px 20px;
          border: 1px solid #006400;
          background: #006400;
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #F5F5DC;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s;
        }

        .pd-btn-buy:hover { background: #004d00; border-color: #004d00; }

        /* Trust badges */
        .pd-trust {
          display: flex;
          gap: 0;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(0,0,0,0.07);
        }

        .pd-trust-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 0 8px;
          text-align: center;
          border-right: 0.5px solid rgba(0,0,0,0.07);
        }

        .pd-trust-item:last-child { border-right: none; }

        .pd-trust-icon {
          font-size: 17px;
          color: #006400;
          line-height: 1;
        }

        .pd-trust-label {
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #888;
          line-height: 1.5;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .pd-page { padding: 100px 5% 60px; }

          .pd-container {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .pd-details { padding-top: 0; }
          .pd-actions { flex-direction: column; }
          .pd-trust { gap: 0; }
        }
      `}</style>

      {/* ── Floating petal background ── */}
      <div className="pd-bg-canvas" aria-hidden="true">
        {[
          { left: "8%",  delay: "0s",   dur: "18s", size: 18 },
          { left: "19%", delay: "3.5s", dur: "22s", size: 12 },
          { left: "33%", delay: "7s",   dur: "16s", size: 22 },
          { left: "47%", delay: "1.2s", dur: "20s", size: 14 },
          { left: "58%", delay: "9s",   dur: "24s", size: 10 },
          { left: "68%", delay: "4.8s", dur: "17s", size: 20 },
          { left: "78%", delay: "2s",   dur: "21s", size: 16 },
          { left: "88%", delay: "6s",   dur: "19s", size: 11 },
          { left: "25%", delay: "11s",  dur: "23s", size: 13 },
          { left: "72%", delay: "13s",  dur: "15s", size: 24 },
          { left: "42%", delay: "15s",  dur: "20s", size: 9  },
          { left: "90%", delay: "8s",   dur: "18s", size: 17 },
        ].map((p, i) => (
          <div
            key={i}
            className="pd-petal"
            style={{
              left: p.left,
              bottom: "-5%",
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          >
            {/* Elegant 4-petal floral motif */}
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2 C12 2, 15 7, 12 12 C9 7, 12 2, 12 2Z"
                fill="#B2B596"
                opacity="0.5"
              />
              <path
                d="M22 12 C22 12, 17 15, 12 12 C17 9, 22 12, 22 12Z"
                fill="#B2B596"
                opacity="0.5"
              />
              <path
                d="M12 22 C12 22, 9 17, 12 12 C15 17, 12 22, 12 22Z"
                fill="#B2B596"
                opacity="0.5"
              />
              <path
                d="M2 12 C2 12, 7 9, 12 12 C7 15, 2 12, 2 12Z"
                fill="#B2B596"
                opacity="0.5"
              />
              <circle cx="12" cy="12" r="1.5" fill="#006400" opacity="0.4" />
            </svg>
          </div>
        ))}
      </div>

      <div className="pd-page">
        <div className="pd-content">
          <div className="pd-breadcrumb" onClick={() => navigate(-1)}>
            ← Back to Collection
          </div>

          <div className="pd-container">
            {/* Images */}
            <div className="pd-images">
              <div className="pd-main-img-wrap">
                <img src={mainImage} alt={product.name} className="pd-main-img" />
                {product.category && (
                  <span className="pd-img-badge">{product.category}</span>
                )}
              </div>

              {product.subImages?.length > 0 && (
                <div className="pd-sub-images">
                  {product.subImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="sub"
                      onClick={() => setMainImage(img)}
                      className={`pd-sub-img${mainImage === img ? " active" : ""}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="pd-details">
              <p className="pd-eyebrow">{product.category || "Collection"}</p>
              <h1 className="pd-title">{product.name}</h1>
              <p className="pd-price">Rs {product.price}</p>
              <div className="pd-divider" />

              {product.description && (
                <p className="pd-description">{product.description}</p>
              )}

              {isAdvanced && sizesToShow.length > 0 && (
                <div>
                  <p className="pd-size-label">Select Size</p>
                  <div className="pd-size-grid">
                    {sizesToShow.map((size, i) => (
                      <button
                        key={i}
                        className={`pd-size-btn${selectedSize === size ? " selected" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isAdvanced && product.fabric && (
                <div className="pd-fabric">
                  <strong>Fabric</strong>
                  <span>{product.fabric}</span>
                </div>
              )}

              <div className="pd-actions">
                <button className="pd-btn-cart" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="pd-btn-buy" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>

              {/* Trust badges — no "free delivery" */}
              <div className="pd-trust">
                <div className="pd-trust-item">
                  <span className="pd-trust-icon">✦</span>
                  <span className="pd-trust-label">Premium<br/>Fabric</span>
                </div>
                <div className="pd-trust-item">
                  <span className="pd-trust-icon">✦</span>
                  <span className="pd-trust-label">Handcrafted<br/>Quality</span>
                </div>
                <div className="pd-trust-item">
                  <span className="pd-trust-icon">✦</span>
                  <span className="pd-trust-label">Cash On<br/>Delivery</span>
                </div>
                <div className="pd-trust-item">
                  <span className="pd-trust-icon">✦</span>
                  <span className="pd-trust-label">Nationwide<br/>Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            fontFamily: "'Lato', sans-serif",
            background: "#006400",
            color: "#F5F5DC",
            letterSpacing: "0.5px",
          }}
        >
          Product added to cart
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ProductDetails;