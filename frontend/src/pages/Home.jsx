// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import About from "../pages/About";
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
          ELEGANCE IN <br />
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
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
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
                {/* Overlay */}
                <div className="overlay"></div>

                {/* Text content */}
                <div className="hero-text">
                  <h1>{slide.title}</h1>
                  <p>{slide.tagline}</p>
                  <button>{slide.button}</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* About Section */}
      <About />

      {/* Other Sections */}
      <ProductCategories />
      <Contact />
      <Footer />

      {/* Scoped CSS */}
      <style>
        {`
          /* General Page Styling */
          .home {
            margin: 0;
            padding: 0;
            width: 100%;
          }

          /* Hero Container */
          .hero-container {
            width: 100%;
            height: 100vh;
            margin: 0;
            padding: 0;
          }

          .hero-swiper {
            width: 100%;
            height: 100%;
          }

          .hero-slide {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 5%;
            color: #333;
            text-align: left;
            position: relative;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.25);
            z-index: 1;
          }

          .hero-text {
            max-width: 500px;
            z-index: 2;
          }

          .hero-text h1 {
            font-size: 48px;
            font-weight: 600;
            color: #006400;
          }

          .hero-text p {
            font-size: 20px;
            margin: 15px 0;
            color: #F5F5DC;
          }

         .hero-text button {
  background-color: #006400;
  color: #F5F5DC;
  padding: 12px 26px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);
  
  width: 180px;   /* ✅ fixed size for consistency */
  text-align: center;
}


          /* Swiper buttons & bullets */
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

          /* Mobile Responsive */
          @media (max-width: 768px) {

          .home{
          margin-top:-60px;
          padding:0;
          wodth:110%;
        }
            .hero-container {
              height: 80vh;
              
            }

            .hero-slide {
              justify-content: center;
              text-align: center;
              padding: 0 20px;
            }

            .hero-text {
              max-width: 100%;
            }

            .hero-text h1 {
              font-size: 28px;
            }

            .hero-text p {
              font-size: 16px;
            }

            .hero-text button {
              font-size: 16px;
              padding: 10px 20px;
            }
          }

         @media (max-width: 768px) {
  .home {
    margin-top: -60px;
    padding: 0;
    width: 100%;       /* ✅ make sure it fits screen */
    overflow-x: hidden; /* ✅ prevent horizontal scroll/whitespace */
  }

  .hero-container {
    height: 80vh;
    width: 100%;       /* ✅ ensure hero fills full width */
  }

  .hero-slide {
    width: 100%;       /* ✅ ensure slide covers screen */
  }
}
  @media (max-width: 768px) {
  .hero-text button {
    width: 140px;  /* ✅ slightly smaller on mobile */
    font-size: 16px;
    padding: 10px 20px;
  }
}


          }
        `}
      </style>
    </div>
  );
}

export default Home;
