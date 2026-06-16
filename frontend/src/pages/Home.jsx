// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import About from "../pages/About";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import HeroImg1 from "../../public/H1.jpg";
import HeroImg2 from "../../public/H2.jpg";
import HeroImg3 from "../../public/H3.jpg";
import Footer from "../components/Footer";
import Contact from "../pages/Contact";
import ProductCategories from "./ProductCategories";
import { Link } from "react-router-dom";

function Home() {
  const slides = [
    {
      image: HeroImg1,
      label: "New Collection",
      title: "Summer Breeze,",
      titleItalic: "Abaya Ease",
      tagline: "New Collection Out Now",
      button: "Shop Now",
      position: "center 30%",
    },
    {
      image: HeroImg2,
      label: "Exclusive Styles",
      title: "Elegance in",
      titleItalic: "Every Thread",
      tagline: "Discover Our Exclusive Styles",
      button: "Shop Now",
      position: "top right 30%",
    },
    {
      image: HeroImg3,
      label: "Timeless Design",
      title: "Modesty Meets",
      titleItalic: "Fashion",
      tagline: "Timeless Abayas For Every Occasion",
      button: "Shop Now",
      position: "right 25%",
    },
  ];

  return (
    <div className="home">
      <Navbar />

      {/* ── Hero ── */}
      <div className="hero-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          speed={1200}
          className="hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundPosition: slide.position,
                }}
              >
                {/* Layered overlays for depth */}
                <div className="overlay-base" />
                <div className="overlay-gradient" />
                <div className="overlay-left" />

                {/* Slide counter */}
                <div className="slide-counter">
                  <span className="counter-current">0{index + 1}</span>
                  <span className="counter-divider" />
                  <span className="counter-total">0{slides.length}</span>
                </div>

                {/* Text */}
                <div className="hero-text">
                  <div className="hero-eyebrow">
                    <span className="eyebrow-line" />
                    <span className="eyebrow-label">{slide.label}</span>
                  </div>

                  <h1 className="hero-title">
                    <span className="title-regular">{slide.title}</span>
                    <br />
                    <span className="title-italic">{slide.titleItalic}</span>
                  </h1>

                  <p className="hero-tagline">{slide.tagline}</p>

                  <div className="hero-actions">
                    <Link to="/products">
                      <button className="btn-primary">{slide.button}</button>
                    </Link>
                    <Link to="/about" className="btn-ghost">Our Story</Link>
                  </div>
                </div>

                {/* Decorative vertical text */}
                <div className="hero-vert-text">
                  Sumptuous&nbsp;Modesty
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll cue */}
        <div className="scroll-cue">
          <span className="scroll-cue-line" />
          <span className="scroll-cue-label">Scroll</span>
        </div>
      </div>

      <About />
      <ProductCategories />
      <Contact />
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Lato:wght@300;400;700&display=swap');

        .home {
          margin: 0;
          padding: 0;
          width: 100%;
        }

        /* ─── Hero Container ─── */
        .hero-container {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
        }

        .hero-swiper {
          width: 100%;
          height: 100%;
        }

        /* ─── Slide ─── */
        .hero-slide {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          padding: 0 8%;
          position: relative;
          overflow: hidden;
        }

        /* Three overlay layers */
        .overlay-base {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 1;
        }

        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.62) 0%,
            rgba(0,0,0,0.28) 55%,
            rgba(0,0,0,0.04) 100%
          );
          z-index: 2;
        }

        .overlay-left {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: #006400;
          z-index: 3;
        }

        /* ─── Slide counter (top-right) ─── */
        .slide-counter {
          position: absolute;
          top: 50%;
          right: 6%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 4;
        }

        .counter-current {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: #fff;
          line-height: 1;
        }

        .counter-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.35);
          display: block;
        }

        .counter-total {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          letter-spacing: 1px;
        }

        /* ─── Hero Text ─── */
        .hero-text {
          position: relative;
          z-index: 5;
          max-width: 600px;
        }

        /* Eyebrow */
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
          animation: fadeUp 0.9s ease both;
          animation-delay: 0.2s;
        }

        .eyebrow-line {
          display: block;
          width: 36px;
          height: 1px;
          background: #B2B596;
          flex-shrink: 0;
        }

        .eyebrow-label {
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #B2B596;
        }

        /* Heading */
        .hero-title {
          margin: 0 0 20px;
          line-height: 1.0;
          animation: fadeUp 0.9s ease both;
          animation-delay: 0.35s;
        }

        .title-regular {
          font-family: 'Lato', sans-serif;
          font-size: clamp(42px, 5.5vw, 72px);
          font-weight: 300;
          color: #F5F5DC;
          letter-spacing: 1px;
          display: block;
        }

        .title-italic {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 600;
          font-style: italic;
          color: #fff;
          display: block;
          line-height: 1.0;
          letter-spacing: -1px;
        }

        /* Tagline */
        .hero-tagline {
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(245,245,220,0.7);
          margin: 0 0 40px;
          animation: fadeUp 0.9s ease both;
          animation-delay: 0.5s;
        }

        /* Buttons */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 28px;
          animation: fadeUp 0.9s ease both;
          animation-delay: 0.65s;
        }

        .btn-primary {
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #F5F5DC;
          background: #006400;
          border: 1px solid #006400;
          padding: 16px 36px;
          cursor: pointer;
          border-radius: 0;
          transition: background 0.35s, color 0.35s;
          white-space: nowrap;
        }

        .btn-primary:hover {
          background: transparent;
          color: #F5F5DC;
          border-color: #F5F5DC;
        }

        .btn-ghost {
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(245,245,220,0.7);
          text-decoration: none;
          border-bottom: 1px solid rgba(245,245,220,0.3);
          padding-bottom: 3px;
          transition: color 0.3s, border-color 0.3s;
          white-space: nowrap;
        }

        .btn-ghost:hover {
          color: #F5F5DC;
          border-color: rgba(245,245,220,0.8);
        }

        /* ─── Vertical brand text (right side) ─── */
        .hero-vert-text {
          position: absolute;
          right: 3.2%;
          bottom: 80px;
          z-index: 4;
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          font-weight: 300;
          font-style: italic;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.25);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          user-select: none;
        }

        /* ─── Scroll cue ─── */
        .scroll-cue {
          position: absolute;
          bottom: 32px;
          left: 8%;
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .scroll-cue-line {
          display: block;
          width: 1px;
          height: 44px;
          background: rgba(245,245,220,0.4);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        .scroll-cue-label {
          font-family: 'Lato', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(245,245,220,0.4);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(0.6); }
        }

        /* ─── Per-slide fade-up animation ─── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Reset animation on slide change */
        .swiper-slide .hero-eyebrow,
        .swiper-slide .hero-title,
        .swiper-slide .hero-tagline,
        .swiper-slide .hero-actions {
          opacity: 0;
        }

        .swiper-slide-active .hero-eyebrow,
        .swiper-slide-active .hero-title,
        .swiper-slide-active .hero-tagline,
        .swiper-slide-active .hero-actions {
          animation: fadeUp 0.9s ease both;
        }

        .swiper-slide-active .hero-eyebrow  { animation-delay: 0.25s; }
        .swiper-slide-active .hero-title    { animation-delay: 0.45s; }
        .swiper-slide-active .hero-tagline  { animation-delay: 0.62s; }
        .swiper-slide-active .hero-actions  { animation-delay: 0.78s; }

        /* ─── Swiper controls ─── */
        .swiper-button-prev,
        .swiper-button-next {
          color: rgba(245,245,220,0.7) !important;
          width: 44px !important;
          height: 44px !important;
          border: 1px solid rgba(245,245,220,0.25) !important;
          border-radius: 50% !important;
          transition: background 0.3s, color 0.3s !important;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #006400 !important;
          border-color: #006400 !important;
          color: #fff !important;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 14px !important;
          font-weight: 700 !important;
        }

        .swiper-button-prev { left: 8% !important; bottom: 36px !important; top: auto !important; }
        .swiper-button-next { left: calc(8% + 60px) !important; bottom: 36px !important; top: auto !important; }

        .swiper-pagination {
          right: 6% !important;
          left: auto !important;
          bottom: auto !important;
          top: 50% !important;
          transform: translateY(-50%) translateX(60px) !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
          width: auto !important;
        }

        .swiper-pagination-bullet {
          background: rgba(245,245,220,0.35) !important;
          opacity: 1 !important;
          width: 6px !important;
          height: 6px !important;
          border-radius: 50% !important;
          transition: all 0.35s !important;
          display: block !important;
          margin: 0 !important;
        }

        .swiper-pagination-bullet-active {
          background: #006400 !important;
          transform: scale(1.4) !important;
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .home { margin-top: 0; }

          .hero-container { height: 100svh; min-height: 560px; }

          .hero-slide {
            padding: 0 6% 80px;
            align-items: flex-end;
            justify-content: center;
            text-align: center;
          }

          .hero-text { max-width: 100%; }

          .hero-eyebrow { justify-content: center; }

          .title-regular { font-size: 30px; }
          .title-italic  { font-size: 44px; }

          .hero-tagline { font-size: 11px; letter-spacing: 1.5px; }

          .hero-actions { justify-content: center; }

          .slide-counter,
          .hero-vert-text,
          .scroll-cue { display: none; }

          .swiper-button-prev { left: 4% !important; bottom: 24px !important; }
          .swiper-button-next { left: calc(4% + 56px) !important; bottom: 24px !important; }

          .swiper-pagination {
            right: 4% !important;
            transform: translateY(-50%) translateX(50px) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;