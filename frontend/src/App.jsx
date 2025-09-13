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
import Checkout from "./pages/Checkout"; // ✅ Import Checkout Page

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
            <Route path="/checkout" element={<Checkout />} /> {/* ✅ New Checkout Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
