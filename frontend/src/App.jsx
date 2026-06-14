import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/ProductCategories";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import SignIn from "./pages/Login";
import SignUp from "./pages/Signup";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <div
        className="app-container"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ flex: 1 }}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Categories />} />
            <Route path="/catproducts/:categoryName" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

          {/* Floating WhatsApp Button */}
     {/* Premium Floating WhatsApp CTA */}
<a
  href="https://wa.me/923303454454?text=Asalamolaikum!%20I%20wanted%20to%20have%20a%20customized%20abaya"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: "fixed",
    bottom: "25px",
    right: "25px",
    zIndex: 999999,
    textDecoration: "none",
  }}
>
  <div className="lux-chat-pill">
    <div className="lux-icon">
      {/* chat bubble SVG (premium icon) */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <div className="lux-text">
      <div className="lux-title">Custom Abaya Design</div>
      <div className="lux-sub">Chat with us on WhatsApp</div>
    </div>
  </div>
</a>
<style>
{`
.lux-chat-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #006400, #0b3d2e);
  padding: 12px 16px;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

/* subtle luxury glow */
.lux-chat-pill::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.08), transparent 60%);
  transform: rotate(25deg);
}

/* hover effect */
.lux-chat-pill:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0,0,0,0.35);
}

.lux-icon {
  width: 38px;
  height: 38px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* text styling */
.lux-text {
  display: flex;
  flex-direction: column;
  color: #F5F5DC;
}

.lux-title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.lux-sub {
  font-size: 11px;
  opacity: 0.85;
}

/* subtle pulse (luxury, not flashy) */
.lux-chat-pill {
  animation: luxPulse 3s infinite;
}

@keyframes luxPulse {
  0% { box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
  50% { box-shadow: 0 10px 35px rgba(0,100,0,0.25); }
  100% { box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
}

@media (max-width: 768px) {
  .lux-chat-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 40px;
    max-width: 190px;
  }

  .lux-icon {
    width: 30px;
    height: 30px;
  }

  .lux-icon svg {
    width: 14px;
    height: 14px;
  }

  .lux-text {
    display: flex;
    flex-direction: column;
  }

  .lux-title {
    font-size: 11px;
    font-weight: 600;
    color: #F5F5DC;
  }

  .lux-sub {
    font-size: 8px;
    color: rgba(245,245,220,0.8);
  }
}
`}
</style>

        </div>
      </div>
    </Router>
  );
}

export default App;