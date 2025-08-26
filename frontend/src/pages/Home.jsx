// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import About from "../pages/About"; // import About component
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import HeroImg1 from "../../public/H1.jpg";
import HeroImg2 from "../../public/H2.jpg";
import HeroImg3 from "../../public/H3.jpg";
import Footer from "../components/Footer";
import Contact from "../pages/Contact";
import ProductCategories from "./ProductCategories";

function Home() {
  const slides = [
    {
      image: HeroImg1,
      title: "SUMMER BREEZE, ABAYA EASE",
      tagline: "New Collection Out Now",
      button: "Shop Now",
      position: "center 30%",
    },
    {
  image: HeroImg2,
  title: (
    <>
      ELEGANCE IN<br />
      EVERY THREAD
    </>
  ),
  tagline: "Discover Our Exclusive Styles",
  button: "Shop Now",
  position: "top right 30%",
},

    {
      image: HeroImg3,
      title: "MODESTY MEETS FASHION",
      tagline: "Timeless Abayas For Every Occasion",
      button: "Shop Now",
      position: "right 25%",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div style={{ width: "100%", height: "100vh" }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          style={{ height: "100%" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: slide.position,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: "0 5%",
                  color: "#333",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                {/* Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.25)",
                    zIndex: 1,
                  }}
                ></div>

                {/* Text content */}
                <div style={{ maxWidth: "500px", zIndex: 2 }}>
                  <h1
                    style={{
                      fontSize: "48px",
                      fontWeight: "600",
                      color: "#006400",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    style={{
                      fontSize: "20px",
                      margin: "15px 0",
                      color: "#F5F5DC",
                    }}
                  >
                    {slide.tagline}
                  </p>
                  <button
                    style={{
                      backgroundColor: "#006400",
                      color: "#F5F5DC",
                      padding: "12px 26px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "18px",
                      transition: "all 0.3s ease",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* About Section */}
      <About />

      {/* Styles for hero only */}
      <style>
        {`
          .swiper-button-prev,
          .swiper-button-next {
            color: #006400 !important;
          }

          .swiper-pagination-bullet {
            background: #F5F5DC !important;
            opacity: 0.7;
          }

          .swiper-pagination-bullet-active {
            background: #006400 !important;
          }

          body {
            font-family: 'Poppins', sans-serif;
          }
 

        `}
       
      </style>
        <ProductCategories />
        <Contact/>
        <Footer />
        
    </div>
  );
}

export default Home;
