// src/pages/About.jsx
import Navbar from "../components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div style={{ background: "#F5F5DC", minHeight: "100vh", fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');

        .about-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 100vh;
          padding: 120px 8% 80px;
          gap: 80px;
          flex-wrap: wrap;
        }

        .about-left {
          flex: 1;
          min-width: 300px;
          max-width: 540px;
        }

        .eyebrow {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #006400;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .eyebrow::before {
          content: '';
          display: inline-block;
          width: 32px;
          height: 1px;
          background: #006400;
        }

        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 6vw, 80px);
          font-weight: 300;
          font-style: italic;
          color: #1a1a1a;
          line-height: 1.05;
          margin: 0 0 12px;
          letter-spacing: -1px;
        }

        .about-heading span {
          font-style: normal;
          font-weight: 600;
          color: #006400;
        }

        .ornament {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, #B2B596, transparent);
          margin: 28px 0;
        }

        .about-para {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          line-height: 1.9;
          color: #555;
          font-weight: 300;
          letter-spacing: 0.3px;
          margin: 0;
        }

        .stat-row {
          display: flex;
          gap: 40px;
          margin-top: 48px;
          padding-top: 36px;
          border-top: 0.5px solid rgba(0,0,0,0.12);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 600;
          color: #006400;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          font-weight: 400;
        }

        .about-right {
          flex: 1;
          min-width: 300px;
          max-width: 480px;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .video-frame {
          position: relative;
          width: 380px;
          height: 480px;
        }

        .video-border-accent {
          position: absolute;
          top: -16px;
          right: -16px;
          width: 100%;
          height: 100%;
          border: 5px solid #B2B596;
          border-radius: 4px;
          z-index: 0;
          transition: transform 0.5s ease;
        }

        .video-frame:hover .video-border-accent {
          transform: translate(-6px, -6px);
        }

        .video-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 4px;
          background: #e8e4d0;
        }

        .about-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
        }

        .video-inner:hover .about-video {
          transform: scale(1.03);
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(0,40,0,0.18) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .video-tag {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 3;
          background: rgba(245, 245, 220, 0.92);
          padding: 10px 18px;
          border-left: 7px solid #006400;
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #333;
          font-weight: 700;
          backdrop-filter: blur(6px);
        }

        @media (max-width: 768px) {
          .about-wrapper {
            padding: 100px 6% 60px;
            gap: 50px;
          }
          .video-frame {
            width: 100%;
            max-width: 340px;
            height: 400px;
          }
          .stat-row {
            gap: 24px;
          }
        }
      `}</style>

      <div className="about-wrapper" ref={containerRef}>
        {/* Left Side */}
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Our Story</p>

          <h1 className="about-heading">
            Redefining<br />
            <span>Elegance</span><br />
            in Modesty
          </h1>

          <div className="ornament" />

          <p className="about-para">
            Sumptuous Modesty is a modest abaya and hijab brand that redefines
            elegance and sophistication. Our collections blend timeless designs
            with modern twists, offering stylish and comfortable pieces for the
            contemporary woman. With a focus on quality, detail, and
            inclusivity, Sumptuous Modesty empowers women to express their faith
            and individuality with confidence and poise.
          </p>

          <div className="stat-row">
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <span className="stat-number">50+</span>
              <span className="stat-label">Designs</span>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
            >
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Clients</span>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <span className="stat-number">100%</span>
              <span className="stat-label">Handcrafted</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ y }}
        >
          <div className="video-frame">
            <div className="video-border-accent" />
            <div className="video-inner">
              <video
                src="/abaya.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="about-video"
              />
              <div className="video-overlay" />
              <div className="video-tag">Sumptuous Modesty</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;