// src/pages/About.jsx
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function About() {
  return (
    <div>
     

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "100vh",
          padding: "100px 5%",

          backgroundColor: "#F5F5DC", // Beige background
          flexWrap: "wrap",
        }}
      >
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1, paddingRight: "40px", minWidth: "300px" }}
        >
          {/* Tagline */}
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#006400", // emerald green
              marginBottom: "10px",
            }}
          >
            Redefining Elegance in Modesty
          </h2>

          {/* Heading */}
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "20px",
              display: "inline-block",
              position: "relative",
              cursor: "pointer",
            }}
            className="about-heading"
          >
            About Us
          </h1>

          {/* Paragraph */}
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "#555",
              maxWidth: "600px",
            }}
          >
            Sumptuous Modesty is a modest abaya and hijab brand that redefines
            elegance and sophistication. Our collections blend timeless designs
            with modern twists, offering stylish and comfortable pieces for the
            contemporary woman. With a focus on quality, detail, and
            inclusivity, Sumptuous Modesty empowers women to express their faith
            and individuality with confidence and poise.
          </p>
        </motion.div>

        {/* Right Side Video */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            minWidth: "300px",
          }}
        >
          <div className="video-container">
            <video
              src="/abaya.mp4"
              autoPlay
              loop
              muted
              className="about-video"
            />
          </div>
        </motion.div>
      </div>

      {/* Styling */}
      <style>
        {`
          .about-heading::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 0;
            height: 3px;
            background-color: #B2B596;
            transition: width 0.3s ease;
          }
          .about-heading:hover::after {
            width: 100%;
          }

          .video-container {
            position: relative;
            width: 400px;
            height: 400px;
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.4s ease-in-out;
          }

          .about-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
          }

          /* Hover effect */
          .video-container:hover {
            background: #006400; /* emerald green */
            transform: scale(1.02);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          }
            @media (max-width: 768px) {
  .about-container {
    padding: 60px 15px !important; /* no side gaps */
  }
}

        `}
      </style>
    </div>
  );
}

export default About;
