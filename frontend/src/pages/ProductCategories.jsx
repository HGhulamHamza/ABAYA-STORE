// src/pages/ProductCategories.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {
  const navigate = useNavigate();
  const lineRef = useRef(null);

  const categories = [
    { name: "Daily Wear Abayas",       image: "/1.jpg"     },
    { name: "Exclusive Collection",     image: "/2/1.jpg"   },
    { name: "Wedding Abayas",           image: "/3.jpg"     },
    { name: "Hijabs",                   image: "/4.jpg"     },
    { name: "Hijab & Niqab Sets",       image: "/8.jpg"     },
    { name: "Hijab & Under Cap Sets",   image: "/9.jpg"     },
    { name: "Niqabs",                   image: "/6.jpg"     },
    { name: "Accessories",              image: "/8/3.jpg"   },
    { name: "Winter Collection",        image: "/7.jpg"     },
    { name: "Premium Collection",       image: "/new.jpeg"  },
  ];

  const handleClick = (category) => navigate(`/catproducts/${encodeURIComponent(category)}`);

  const abayaCategories = categories.filter((_, i) => [0,1,2,8,9].includes(i));
  const otherCategories  = categories.filter((_, i) => ![0,1,2,8,9].includes(i));

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
      el.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const Card = ({ cat }) => (
    <div className="pc-card" onClick={() => handleClick(cat.name)}>
      <div className="pc-card-img-wrap">
        <img src={cat.image} alt={cat.name} className="pc-card-img" />
      </div>
      {/* Gradient overlay */}
      <div className="pc-overlay" />
      {/* Text */}
      <div className="pc-card-body">
        <p className="pc-card-name">{cat.name}</p>
        <span className="pc-card-rule" />
        <p className="pc-card-cta">Explore Collection</p>
      </div>
      {/* Corner brackets */}
      <span className="pc-bracket pc-bracket--tl" />
      <span className="pc-bracket pc-bracket--br" />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Section wrapper ── */
        .pc-section {
          // background: #F5F5DC;
          padding: 96px 5% 80px;
          font-family: 'Lato', sans-serif;
        }

        /* ── Section header ── */
        .pc-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .pc-eyebrow {
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
        .pc-eyebrow::before, .pc-eyebrow::after {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: #B2B596;
        }

        .pc-main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5vw, 64px);
          font-weight: 300;
          font-style: italic;
          color: #1a1a1a;
          margin: 0 0 10px;
          letter-spacing: -0.5px;
          line-height: 1.05;
        }
        .pc-main-title span {
          font-style: normal;
          font-weight: 600;
          color: #006400;
        }

        /* Animated underline */
        .pc-line-wrap {
          width: 200px;
          height: 1px;
          background: rgba(0,0,0,0.08);
          margin: 18px auto 20px;
          overflow: hidden;
        }
        .pc-line {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #006400, #B2B596);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.15s linear;
        }

        .pc-subtitle {
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 1.5px;
          color: #888;
          margin: 0;
        }

        /* ── Sub-section divider ── */
        .pc-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin: 64px 0 32px;
        }

        .pc-divider-line {
          flex: 1;
          max-width: 100px;
          height: 0.5px;
          background: linear-gradient(90deg, transparent, rgba(0,100,0,0.35));
        }
        .pc-divider-line:last-child {
          background: linear-gradient(270deg, transparent, rgba(0,100,0,0.35));
        }

        .pc-divider-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          font-style: italic;
          color: #1a1a1a;
          white-space: nowrap;
          letter-spacing: 0.3px;
        }
        .pc-divider-title span {
          font-style: normal;
          font-weight: 600;
          color: #006400;
        }

        /* ── Grid ── */
        .pc-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          margin-bottom: 12px;
        }

        /* ── Card ── */
        .pc-card {
          position: relative;
          height: 380px;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a14;
          /* Arch top shape */
          border-radius: 50% 50% 4px 4px / 12% 12% 4px 4px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.45s ease;
        }

        .pc-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,0.18);
        }

        .pc-card-img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
        }

        .pc-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
          transform: scale(1.06);
        }
        .pc-card:hover .pc-card-img { transform: scale(1.12); }

        /* ── Elegant two-tone overlay ──
           Top: very light dark vignette to keep top readable
           Bottom: rich deep gradient so text is always clear
           Centre: nearly transparent so image shows beautifully */
        .pc-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(10,15,10,0.28)  0%,
              rgba(10,15,10,0.04) 35%,
              rgba(10,15,10,0.04) 52%,
              rgba(10,20,10,0.55) 72%,
              rgba(5,12,5,0.82)   100%
            );
          z-index: 1;
          border-radius: inherit;
          transition: background 0.4s ease;
        }
        .pc-card:hover .pc-overlay {
          background:
            linear-gradient(
              180deg,
              rgba(10,15,10,0.20)  0%,
              rgba(10,15,10,0.02) 35%,
              rgba(10,15,10,0.02) 48%,
              rgba(0,60,0,0.50)   72%,
              rgba(0,40,0,0.80)   100%
            );
        }

        /* Corner decorative brackets */
        .pc-bracket {
          position: absolute;
          width: 14px; height: 14px;
          z-index: 3; pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .pc-card:hover .pc-bracket { opacity: 1; }

        .pc-bracket--tl {
          top: 12px; left: 12px;
          border-top: 1.5px solid rgba(245,245,220,0.55);
          border-left: 1.5px solid rgba(245,245,220,0.55);
        }
        .pc-bracket--br {
          bottom: 12px; right: 12px;
          border-bottom: 1.5px solid rgba(245,245,220,0.55);
          border-right: 1.5px solid rgba(245,245,220,0.55);
        }

        /* ── Card text ── */
        .pc-card-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 2;
          padding: 0 16px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transform: translateY(6px);
          transition: transform 0.4s ease;
        }
        .pc-card:hover .pc-card-body { transform: translateY(0); }

        .pc-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 400;
          color: #F5F5DC;
          letter-spacing: 0.5px;
          line-height: 1.2;
          margin: 0 0 8px;
        }

        .pc-card-rule {
          display: block;
          width: 28px; height: 1px;
          background: #B2B596;
          margin: 0 auto 8px;
          transition: width 0.35s ease;
        }
        .pc-card:hover .pc-card-rule { width: 44px; }

        .pc-card-cta {
          font-family: 'Lato', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #B2B596;
          margin: 0;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s 0.05s ease, transform 0.35s 0.05s ease;
        }
        .pc-card:hover .pc-card-cta { opacity: 1; transform: translateY(0); }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .pc-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
          .pc-card { height: 320px; }
        }

        /* ── Mobile: exactly 2 per row ── */
        @media (max-width: 768px) {
          .pc-section { padding: 72px 4% 60px; }

          .pc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .pc-card {
            height: 300px;
            border-radius: 50% 50% 4px 4px / 10% 10% 4px 4px;
          }

          /* Always show text on mobile — no hover needed */
          .pc-card-cta   { opacity: 1; transform: translateY(0); }
          .pc-bracket    { opacity: 0 !important; }
          .pc-card-body  { transform: translateY(0); }

          .pc-card-name { font-size: 14px; }
          .pc-card-cta  { font-size: 8px; letter-spacing: 1.5px; }

          .pc-divider-title { font-size: 18px; }
          .pc-divider { margin: 44px 0 24px; }
          .pc-divider-line { max-width: 60px; }
        }

        @media (max-width: 400px) {
          .pc-card { height: 220px; }
          .pc-card-name { font-size: 13px; }
        }
      `}</style>

      <div className="pc-section">

        {/* ── Header ── */}
        <div className="pc-header">
          <p className="pc-eyebrow">Our Collections</p>
          <h2 className="pc-main-title">
            Curated <span>Collections</span>
          </h2>
          <div className="pc-line-wrap">
            <div className="pc-line" ref={lineRef} />
          </div>
          <p className="pc-subtitle">Timeless elegance crafted for modern modest fashion</p>
        </div>

        {/* ── Abayas ── */}
        <div className="pc-divider">
          <span className="pc-divider-line" />
          <h3 className="pc-divider-title">Abayas <span>Collection</span></h3>
          <span className="pc-divider-line" />
        </div>

        <div className="pc-grid">
          {abayaCategories.map((cat, i) => <Card key={i} cat={cat} />)}
        </div>

        {/* ── Others ── */}
        <div className="pc-divider">
          <span className="pc-divider-line" />
          <h3 className="pc-divider-title">Hijabs, Niqabs <span>&amp; Accessories</span></h3>
          <span className="pc-divider-line" />
        </div>

        <div className="pc-grid">
          {otherCategories.map((cat, i) => <Card key={i} cat={cat} />)}
        </div>

      </div>
    </>
  );
};

export default ProductCategories;