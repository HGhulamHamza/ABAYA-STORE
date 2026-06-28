// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Footer from "../components/Footer";
import Contact from "../pages/Contact";
import ProductCategories from "./ProductCategories";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import HeroImg1 from "../../public/H1.jpg";
import HeroImg2 from "../../public/H2.jpg";
import HeroImg3 from "../../public/H3.jpg";

const slides = [
  { image: HeroImg1, label: "New Collection",   title: "Summer",     titleItalic: "Breeze",        tagline: "New Collection Out Now"            },
  { image: HeroImg2, label: "Exclusive Styles",  title: "Elegance in",titleItalic: "Every Thread",  tagline: "Discover Our Exclusive Styles"     },
  { image: HeroImg3, label: "Timeless Design",   title: "Modesty",    titleItalic: "Meets Fashion", tagline: "Timeless Abayas For Every Occasion" },
];

function Home() {
  const [active, setActive]     = useState(0);
  const [prev, setPrev]         = useState(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setPrev(active);
    setActive(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(autoAdvance, 5000);
  };

  const autoAdvance = () => {
    setAnimating(true);
    setPrev(null);
    setActive(a => {
      const next = (a + 1) % slides.length;
      return next;
    });
    setTimeout(() => setAnimating(false), 900);
  };

  useEffect(() => {
    timerRef.current = setInterval(autoAdvance, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleGoTo = (idx) => { goTo(idx); resetTimer(); };

  const s   = slides[active];
  const sm1 = slides[(active + 1) % slides.length];
  const sm2 = slides[(active + 2) % slides.length];

  return (
    <div className="home">
      <Navbar />

      <section className="hero">

        {/* ── Background decoration ── */}
        <div className="hero-bg-circle hero-bg-circle--1" />
        <div className="hero-bg-circle hero-bg-circle--2" />
        <div className="hero-shimmer" />
        <div className="hero-shimmer-2" />
        {/* Floating botanical particles */}
        <div className="hero-particles" aria-hidden="true">
          {[
            {l:"7%",  b:"0",   dur:"20s", del:"0s",   s:14},
            {l:"18%", b:"0",   dur:"25s", del:"4s",   s:9 },
            {l:"29%", b:"0",   dur:"18s", del:"8s",   s:16},
            {l:"41%", b:"0",   dur:"22s", del:"2s",   s:11},
            {l:"55%", b:"0",   dur:"28s", del:"10s",  s:13},
            {l:"67%", b:"0",   dur:"19s", del:"6s",   s:10},
            {l:"78%", b:"0",   dur:"24s", del:"14s",  s:17},
            {l:"88%", b:"0",   dur:"21s", del:"3s",   s:8 },
            {l:"14%", b:"0",   dur:"26s", del:"16s",  s:12},
            {l:"50%", b:"0",   dur:"17s", del:"11s",  s:15},
          ].map((p,i) => (
            <div key={i} className="hp" style={{left:p.l, bottom:p.b, animationDuration:p.dur, animationDelay:p.del}}>
              <svg width={p.s} height={p.s} viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2,15 8,12 12C9 8,12 2,12 2Z"    fill="#B2B596" opacity="0.5"/>
                <path d="M22 12C22 12,16 15,12 12C16 9,22 12,22 12Z" fill="#B2B596" opacity="0.5"/>
                <path d="M12 22C12 22,9 16,12 12C15 16,12 22,12 22Z" fill="#B2B596" opacity="0.5"/>
                <path d="M2 12C2 12,8 9,12 12C8 15,2 12,2 12Z"    fill="#B2B596" opacity="0.5"/>
                <circle cx="12" cy="12" r="1.5" fill="#006400" opacity="0.5"/>
              </svg>
            </div>
          ))}
        </div>

        {/* ══ LEFT TEXT ══ */}
        <div className="hero-left">

          <div className="hero-kicker" key={`kicker-${active}`}>
            <span className="kicker-line" />
            <span className="kicker-label">{s.label}</span>
          </div>

          <h1 className="hero-h" key={`h-${active}`}>
            <span className="h-thin">{s.title}</span>
            <span className="h-bold">{s.titleItalic}</span>
          </h1>

          <p className="hero-tagline" key={`tl-${active}`}>{s.tagline}</p>

          <div className="hero-actions">
            <Link to="/products">
              <button className="btn-solid">Shop Now</button>
            </Link>
            <Link to="/about" className="btn-link">Our Story</Link>
          </div>

          {/* Progress dots */}
          <div className="dot-row">
            {slides.map((_, i) => (
              <button key={i} className={`dot${i === active ? " on" : ""}`}
                onClick={() => handleGoTo(i)} aria-label={`Slide ${i+1}`} />
            ))}
          </div>
        </div>

        {/* ══ RIGHT GALLERY ══ */}
        <div className="gallery">

          {/* ── MAIN ARCH FRAME ── */}
          <div className="arch-wrap">
            {/* Offset border frame behind image */}
            <div className="arch-shadow" />

            {/* Actual arch with images */}
            <div className="arch-frame">
              {slides.map((sl, i) => (
                <img key={i} src={sl.image} alt={sl.label}
                  className={`arch-img${i === active ? " in" : i === prev ? " out" : ""}`} />
              ))}

              {/* Ornamental corner brackets */}
              <span className="bracket bracket--tl" />
              <span className="bracket bracket--tr" />
              <span className="bracket bracket--bl" />
              <span className="bracket bracket--br" />

              {/* Collection tag */}
              <div className="arch-tag" key={`tag-${active}`}>
                <span className="arch-tag-dot" />
                <span>{s.label}</span>
              </div>
            </div>

            {/* Counter badge floating outside frame */}
            <div className="arch-counter">
              <span className="ac-cur" key={`ac-${active}`}>0{active + 1}</span>
              <span className="ac-line" />
              <span className="ac-tot">0{slides.length}</span>
            </div>
          </div>

          {/* ── TWO SMALL OVAL FRAMES ── */}
          <div className="side-frames">
            <div className="oval-wrap" onClick={() => handleGoTo((active+1)%slides.length)}>
              <div className="oval-border" />
              <div className="oval-frame">
                <img src={sm1.image} alt={sm1.label} className="oval-img" />
                <div className="oval-shine" />
              </div>
              <span className="oval-label">{sm1.label}</span>
            </div>

            <div className="oval-wrap" onClick={() => handleGoTo((active+2)%slides.length)}>
              <div className="oval-border" />
              <div className="oval-frame">
                <img src={sm2.image} alt={sm2.label} className="oval-img" />
                <div className="oval-shine" />
              </div>
              <span className="oval-label">{sm2.label}</span>
            </div>
          </div>

        </div>

        {/* Scroll cue */}
        <div className="scroll-cue">
          <span className="scroll-line" />
          <span className="scroll-word">Scroll</span>
        </div>

      </section>

      <About />
      <ProductCategories />
      <Contact />
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home { width: 100%; }

        /* ═══════════════════════════════
           HERO — dark luxury background
        ═══════════════════════════════ */
        .hero {
          min-height: 100vh;
          background: #12180f;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 120px 5% 60px 7%;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }

        /* Slow-rotating deep green conic wash */
        .hero::before {
          content: '';
          position: absolute;
          inset: -60%;
          background: conic-gradient(
            from 180deg at 60% 50%,
            #0a120a 0deg,
            #152215 50deg,
            #1e301a 100deg,
            #152215 150deg,
            #0d180d 200deg,
            #12180f 260deg,
            #0a120a 360deg
          );
          animation: slowSpin 50s linear infinite;
          pointer-events: none;
          z-index: 0;
          opacity: 0.9;
        }
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Warm amber + green radial glows */
        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 65% 70% at 75% 50%, rgba(178,150,60,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 55% at 18% 28%, rgba(0,120,0,0.09) 0%, transparent 58%),
            radial-gradient(ellipse 45% 45% at 85% 88%, rgba(178,181,150,0.05) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        /* Floating orbs */
        .hero-bg-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .hero-bg-circle--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(178,181,150,0.06) 0%, transparent 65%);
          top: -140px; right: -120px;
          animation: orb1 14s ease-in-out infinite;
        }
        .hero-bg-circle--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,100,0,0.09) 0%, transparent 65%);
          bottom: -80px; left: 20%;
          animation: orb2 18s 3s ease-in-out infinite;
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(-28px, 18px) scale(1.1); }
          70%     { transform: translate(16px, -12px) scale(0.93); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(22px, -16px) scale(1.14); }
        }

        /* Shimmering horizontal lines */
        .hero-shimmer {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(178,181,150,0.18) 30%, rgba(178,181,150,0.45) 50%, rgba(178,181,150,0.18) 70%, transparent 100%);
          pointer-events: none; z-index: 1;
          animation: shimmerMove 7s ease-in-out infinite;
          top: 36%;
        }
        .hero-shimmer-2 {
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,100,0,0.12) 40%, rgba(0,100,0,0.28) 50%, rgba(0,100,0,0.12) 60%, transparent 100%);
          pointer-events: none; z-index: 1;
          animation: shimmerMove 11s 2.5s ease-in-out infinite reverse;
          top: 68%;
        }
        @keyframes shimmerMove {
          0%   { opacity: 0.2; transform: scaleX(0.5) translateX(-12%); }
          50%  { opacity: 1;   transform: scaleX(1)   translateX(0); }
          100% { opacity: 0.2; transform: scaleX(0.5) translateX(12%); }
        }

        /* Botanical particle floaters */
        .hero-particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .hp { position: absolute; opacity: 0; animation: particleFloat linear infinite; }
        @keyframes particleFloat {
          0%   { opacity: 0;    transform: translateY(0)     rotate(0deg)   scale(0.7); }
          8%   { opacity: 0.45; }
          92%  { opacity: 0.45; }
          100% { opacity: 0;    transform: translateY(-95vh) rotate(260deg) scale(1.1); }
        }

        /* ── All text goes light on dark bg ── */
        .h-thin        { color: rgba(245,245,220,0.5) !important; }
        .h-bold        { color: #F5F5DC !important; }
        .hero-tagline  { color: rgba(245,245,220,0.4) !important; }
        .kicker-label  { color: #B2B596 !important; }
        .kicker-line   { background: #B2B596 !important; }
        .btn-link      { color: rgba(245,245,220,0.45) !important; border-bottom-color: rgba(245,245,220,0.18) !important; }
        .btn-link:hover{ color: #B2B596 !important; border-color: #B2B596 !important; }
        .dot           { background: rgba(245,245,220,0.18) !important; }
        .dot.on        { background: #B2B596 !important; }
        .scroll-line   { background: rgba(245,245,220,0.18) !important; }
        .scroll-word   { color: rgba(245,245,220,0.22) !important; }
        .ac-cur        { color: #F5F5DC !important; }
        .ac-line       { background: rgba(245,245,220,0.2) !important; }
        .ac-tot        { color: rgba(245,245,220,0.3) !important; }
        .oval-label    { color: rgba(245,245,220,0.3) !important; }
        .oval-wrap:hover .oval-label { color: #B2B596 !important; }
        .oval-border   { border-color: rgba(245,245,220,0.15) !important; }
        .oval-wrap:hover .oval-border { border-color: rgba(178,181,150,0.5) !important; }
        .arch-shadow   { border-color: rgba(178,181,150,0.2) !important; }

        /* ── Left Text ── */
        .hero-left {
          position: relative; z-index: 2;
          padding-right: 32px;
        }

        .hero-kicker {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 22px;
          animation: riseIn 0.7s ease both;
        }
        .kicker-line {
          display: block; width: 32px; height: 1px;
          background: #006400; flex-shrink: 0;
        }
        .kicker-label {
          font-family: 'Lato', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: #006400;
        }

        .hero-h { margin: 0 0 20px; }

        .h-thin {
          display: block;
          font-family: 'Lato', sans-serif;
          font-size: clamp(36px, 4vw, 58px);
          font-weight: 300; color: #666;
          letter-spacing: 0.5px; line-height: 1.1;
          animation: riseIn 0.7s 0.1s ease both;
        }
        .h-bold {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 6vw, 86px);
          font-weight: 600; font-style: italic;
          color: #1a1a1a; letter-spacing: -2px; line-height: 0.95;
          animation: riseIn 0.7s 0.18s ease both;
        }

        .hero-tagline {
          font-family: 'Lato', sans-serif;
          font-size: 11px; font-weight: 300;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #999; margin: 0 0 40px;
          animation: riseIn 0.7s 0.28s ease both;
        }

        .hero-actions {
          display: flex; align-items: center; gap: 28px;
          margin-bottom: 52px;
          animation: riseIn 0.7s 0.38s ease both;
        }
        .btn-solid {
          font-family: 'Lato', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #F5F5DC; background: #006400;
          border: 1px solid #006400; padding: 15px 36px;
          cursor: pointer;
          transition: background 0.35s, color 0.35s;
        }
        .btn-solid:hover { background: transparent; color: #006400; }
        .btn-link {
          font-family: 'Lato', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: #aaa; text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.14); padding-bottom: 3px;
          transition: color 0.3s, border-color 0.3s;
        }
        .btn-link:hover { color: #006400; border-color: #006400; }

        .dot-row { display: flex; gap: 8px; }
        .dot {
          width: 24px; height: 2px; border: none; padding: 0;
          background: rgba(0,0,0,0.14); cursor: pointer;
          transition: background 0.35s, width 0.35s;
        }
        .dot.on { background: #006400; width: 44px; }

        /* ══════════════════════════════
           GALLERY RIGHT
        ══════════════════════════════ */
        .gallery {
          position: relative; z-index: 2;
          display: flex;
          align-items: center;
          gap: 20px;
          height: min(75vh, 660px);
        }

        /* ── Main arch wrap ── */
        .arch-wrap {
          position: relative;
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Ghost offset border behind the arch */
        .arch-shadow {
          position: absolute;
          top: 18px; left: 18px;
          right: -18px; bottom: -18px;
          border: 1.5px solid rgba(178,181,150,0.55);
          border-radius: 50% 50% 4px 4px / 30% 30% 4px 4px;
          pointer-events: none;
          transition: transform 0.6s ease;
          z-index: 0;
        }
        .arch-wrap:hover .arch-shadow {
          transform: translate(-4px, -4px);
        }

        /* The arch frame itself */
        .arch-frame {
          position: relative;
          width: 100%; height: 100%;
          overflow: hidden;
          /* arch top = large border-radius on top two corners */
          border-radius: 50% 50% 4px 4px / 22% 22% 4px 4px;
          background: #e8e4d8;
          z-index: 1;
          box-shadow: 0 20px 60px rgba(0,0,0,0.13);
        }

        /* Images */
        .arch-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.07);
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1),
                      transform 0.9s cubic-bezier(0.4,0,0.2,1);
          will-change: opacity, transform;
        }
        .arch-img.in  { opacity: 1; transform: scale(1); }
        .arch-img.out { opacity: 0; transform: scale(0.96); }

        /* Corner ornaments */
        .bracket {
          position: absolute; z-index: 3;
          width: 16px; height: 16px;
          pointer-events: none;
        }
        .bracket--tl { top: 14px; left: 14px;
          border-top: 1.5px solid rgba(245,245,220,0.65);
          border-left: 1.5px solid rgba(245,245,220,0.65); }
        .bracket--tr { top: 14px; right: 14px;
          border-top: 1.5px solid rgba(245,245,220,0.65);
          border-right: 1.5px solid rgba(245,245,220,0.65); }
        .bracket--bl { bottom: 14px; left: 14px;
          border-bottom: 1.5px solid rgba(245,245,220,0.65);
          border-left: 1.5px solid rgba(245,245,220,0.65); }
        .bracket--br { bottom: 14px; right: 14px;
          border-bottom: 1.5px solid rgba(245,245,220,0.65);
          border-right: 1.5px solid rgba(245,245,220,0.65); }

        /* Collection label inside arch */
        .arch-tag {
          position: absolute; bottom: 22px; left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          background: rgba(245,245,220,0.94);
          backdrop-filter: blur(10px);
          padding: 8px 18px;
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap;
          animation: tagUp 0.55s 0.5s ease both;
        }
        .arch-tag-dot {
          width: 6px; height: 6px;
          background: #006400; border-radius: 50%; flex-shrink: 0;
        }
        .arch-tag span:last-child {
          font-family: 'Lato', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; color: #333;
        }
        @keyframes tagUp {
          from { opacity:0; transform: translateX(-50%) translateY(10px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }

        /* Counter badge */
        .arch-counter {
          position: absolute;
          bottom: -32px; right: 12px;
          display: flex; align-items: center; gap: 8px;
          z-index: 5;
        }
        .ac-cur {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 300; color: #1a1a1a; line-height: 1;
          animation: riseIn 0.5s ease both;
        }
        .ac-line { display:block; width:20px; height:1px; background: rgba(0,0,0,0.22); }
        .ac-tot {
          font-family: 'Lato', sans-serif;
          font-size: 11px; font-weight: 300; color: #aaa; letter-spacing: 1px;
        }

        /* ── Side oval frames ── */
        .side-frames {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          justify-content: center;
        }

        .oval-wrap {
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        /* Ghost border ring offset from oval */
        .oval-border {
          position: absolute;
          inset: -7px;
          border-radius: 50%;
          border: 1.5px solid rgba(178,181,150,0.4);
          transition: border-color 0.35s, transform 0.4s ease;
          pointer-events: none;
        }
        .oval-wrap:hover .oval-border {
          border-color: #B2B596;
          transform: scale(1.06);
        }

        /* Oval frame */
        .oval-frame {
          width: 100px; height: 130px;
          border-radius: 50px 50px 50px 50px / 60px 60px 50px 50px;
          overflow: hidden;
          background: #e8e4d8;
          position: relative;
          transition: box-shadow 0.4s ease, transform 0.4s ease;
          box-shadow: 0 6px 20px rgba(0,0,0,0.10);
        }
        .oval-wrap:hover .oval-frame {
          box-shadow: 0 12px 36px rgba(0,0,0,0.16);
          transform: translateY(-4px);
        }

        .oval-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s ease;
        }
        .oval-wrap:hover .oval-img { transform: scale(1.08); }

        /* Shine overlay */
        .oval-shine {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Label below oval */
        .oval-label {
          font-family: 'Lato', sans-serif;
          font-size: 8px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #B2B596; text-align: center;
          transition: color 0.3s;
        }
        .oval-wrap:hover .oval-label { color: #006400; }

        /* Scroll cue */
        .scroll-cue {
          position: absolute;
          bottom: 28px; left: 7%;
          display: flex; flex-direction: column;
          align-items: center; gap: 8px; z-index: 5;
        }
        .scroll-line {
          display: block; width: 1px; height: 38px;
          background: rgba(0,0,0,0.18);
          animation: pulse 2.2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:0.3; transform: scaleY(1); }
          50%      { opacity:1;   transform: scaleY(0.5); }
        }
        .scroll-word {
          font-family: 'Lato', sans-serif;
          font-size: 8px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(0,0,0,0.25);
          writing-mode: vertical-rl; transform: rotate(180deg);
        }

        @keyframes riseIn {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* ═══════════════════════════════
           TABLET  900px
        ═══════════════════════════════ */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 110px 5% 80px;
            gap: 48px;
            min-height: 100svh;
          }
          .hero-left { padding-right: 0; text-align: center; }
          .hero-kicker  { justify-content: center; }
          .hero-actions { justify-content: center; }
          .dot-row      { justify-content: center; }
          .h-thin { font-size: clamp(28px, 6vw, 44px); }
          .h-bold { font-size: clamp(44px, 9vw, 68px); }
          .scroll-cue { display: none; }
          .arch-counter { display: none; }

          /* ── Mobile gallery: horizontal trio ── */
          .gallery {
            height: auto;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            gap: 12px;
          }

          /* Main arch fills most width */
          .arch-wrap {
            flex: 0 0 auto;
            width: 52%;
            height: 320px;
          }

          .arch-shadow {
            top: 10px; left: 10px;
            right: -10px; bottom: -10px;
          }

          /* Side ovals stack vertically next to arch */
          .side-frames {
            flex: 0 0 auto;
            width: 38%;
            flex-direction: column;
            gap: 12px;
            height: 320px;
            justify-content: space-between;
          }

          .oval-frame { width: 100%; height: 148px; border-radius: 40% 40% 8px 8px / 30% 30% 8px 8px; }
          .oval-border { border-radius: 40% 40% 8px 8px / 30% 30% 8px 8px; }

          .arch-tag { padding: 6px 12px; bottom: 14px; }
          .arch-tag span:last-child { font-size: 8px; letter-spacing: 1.5px; }
        }

        /* ═══════════════════════════════
           MOBILE  540px  — SPECIAL LAYOUT
        ═══════════════════════════════ */
        @media (max-width: 540px) {
          .hero {
            padding: 96px 4% 70px;
            gap: 36px;
          }

          .h-thin { font-size: 26px; }
          .h-bold { font-size: 42px; letter-spacing: -1px; }
          .hero-tagline { font-size: 9.5px; }
          .btn-solid { padding: 13px 28px; }

          /* Gallery becomes a stacked composition:
             big arch centred, two ovals peeking out at sides */
          .gallery {
            position: relative;
            height: 300px;
            justify-content: center;
            align-items: center;
            gap: 0;
          }

          /* Arch centred and tall */
          .arch-wrap {
            position: absolute;
            left: 50%; top: 0;
            transform: translateX(-50%);
            width: 52%;
            height: 100%;
            z-index: 2;
          }

          .arch-shadow {
            top: 8px; left: 8px;
            right: -8px; bottom: -8px;
          }

          /* Left oval peeks from left edge */
          .side-frames {
            position: absolute;
            inset: 0;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            gap: 0;
            z-index: 1;
          }

          /* First oval: left */
          .oval-wrap:nth-child(1) {
            margin-left: 0;
            transform: rotate(-4deg) translateX(10px);
          }

          /* Second oval: right */
          .oval-wrap:nth-child(2) {
            margin-right: 0;
            transform: rotate(4deg) translateX(-10px);
          }

          .oval-frame { width: 90px; height: 130px; border-radius: 45px 45px 6px 6px / 50% 50% 6px 6px; }
          .oval-border { border-radius: 45px 45px 6px 6px / 50% 50% 6px 6px; inset: -5px; }
          .oval-label { display: none; }

          .arch-tag { bottom: 16px; }
        }

        @media (max-width: 360px) {
          .gallery { height: 260px; }
          .arch-wrap { width: 56%; }
          .oval-frame { width: 74px; height: 110px; }
          .h-bold { font-size: 36px; }
        }
      `}</style>
    </div>
  );
}

export default Home;