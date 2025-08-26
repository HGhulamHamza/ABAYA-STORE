import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/ProductCategories"; 
// import CategoryProducts from "./pages/CategoryProducts";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
         <Navbar />
        {/* Page content */}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
             <Route path="/products" element={<Categories />} />
            {/* <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} /> */} 

            {/* Auth Pages */}
            {/* <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} /> */}
          </Routes>
        </div>

        {/* Footer always visible */}
      
      </div>
    </Router>
  );
}

export default App;
