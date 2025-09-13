import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Products = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch products by category
  useEffect(() => {
    if (!categoryName) return;

    setLoading(true);
    fetch(
      `http://localhost:5000/api/products/category/${encodeURIComponent(
        categoryName
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  const addToCart = (product) => {
    // ✅ Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ Check if item already exists
    const existingIndex = cart.findIndex((item) => item._id === product._id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // ✅ Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ Snackbar feedback
    setSnackbar({ open: true, message: "Successfully added to cart!" });
  };

  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.heading}>{categoryName || "Our Products"}</h2>

      {/* Search bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder={`Search in ${categoryName || "products"}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? (
        <div style={styles.loaderWrapper}>
          <div className="scarf-loader"></div>
          <p style={{ marginTop: "15px", color: "#5c4033", fontWeight: "600" }}>
            Loading {categoryName}...
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={styles.card}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image || "https://via.placeholder.com/250"}
                alt={product.name || "Product"}
                style={styles.image}
              />

              <h3 style={styles.title}>{product.name || "Unnamed Product"}</h3>

              <div style={styles.priceCart}>
                <p style={styles.price}>
                  {product.price ? `Rs ${product.price}` : "Price N/A"}
                </p>
                <FaShoppingCart
                  style={styles.cartIcon}
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ Prevent card navigation
                    addToCart(product);  // ✅ Save to localStorage
                  }}
                />
              </div>
            </div>
          ))}

          {!loading && filteredProducts.length === 0 && (
            <p style={styles.noProducts}>
              No products available in this category.
            </p>
          )}
        </div>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#4CAF50", color: "#fff" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <style>
        {`
          .scarf-loader {
            width: 60px;
            height: 60px;
            border: 6px solid #d2b48c;
            border-top: 6px solid #5c4033;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: { maxWidth: "1200px", margin: "40px auto", padding: "20px" },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "60px",
    marginBottom: "30px",
    color: "#333",
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  },
  searchInput: {
    width: "50%",
    padding: "12px 16px",
    border: "1px solid #ccc",
    borderRadius: "25px",
    fontSize: "16px",
    outline: "none",
  },
  loaderWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 280px))",
    justifyContent: "center",
    gap: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    transition: "all 0.2s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "380px",
    width: "100%",
    maxWidth: "280px",
    margin: "0 auto",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    background: "#f4f4f4",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    margin: "15px 20px 5px",
  },
  priceCart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px 20px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2e7d32",
    margin: 0,
  },
  cartIcon: {
    fontSize: "22px",
    color: "#555",
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
  noProducts: {
    gridColumn: "1 / -1",
    textAlign: "center",
    fontSize: "16px",
    color: "#888",
  },
};

export default Products;
