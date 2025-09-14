// src/components/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
  axios
  .get(
    `https://abaya-store-omkn-m6erx9r8n-hamzas-projects-5008c1de.vercel.app/api/products/${id}`
  )
  .then((res) => {
    setProduct(res.data);
    setMainImage(res.data.image);
  })
  .catch((err) => console.error(err));

  }, [id]);

  if (!product)
    return (
      <p style={{ padding: "20px", fontFamily: "Poppins" }}>Loading...</p>
    );

  const advancedCategories = [
    "Daily Wear Abayas",
    "Exclusive Collection",
    "Wedding Abayas",
    "Winter Collection",
  ];
  const isAdvanced = advancedCategories.includes(product.category);

  const defaultSizes = ["XS", "S", "M", "L", "XL"];
  let sizesToShow = [];
  if (product.category === "Winter Collection") {
    sizesToShow = product.sizes || [];
  } else if (
    product.category === "Daily Wear Abayas" ||
    product.category === "Exclusive Collection" ||
    product.category === "Wedding Abayas"
  ) {
    sizesToShow = product.sizes?.length > 0 ? product.sizes : defaultSizes;
  }

  // ✅ Add to Cart Handler
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, selectedSize, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/cart");
    }, 1200);
  };

  // ✅ Buy Now Handler
  const handleBuyNow = () => {
    localStorage.setItem(
      "checkoutItem",
      JSON.stringify({ ...product, selectedSize, quantity: 1 })
    );
    navigate("/checkout");
  };

  return (
    <>
      <div className="product-page">
        <div className="product-container">
          {/* Main Product Image */}
          <div className="product-image-section">
            <img
              src={mainImage}
              alt={product.name}
              className="main-product-img"
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />

            {/* Sub Images */}
            {product.subImages?.length > 0 && (
              <div className="sub-images">
                {product.subImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="sub"
                    onClick={() => setMainImage(img)}
                    className={`sub-img ${mainImage === img ? "active" : ""}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">Rs {product.price}</p>

            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            {/* Sizes Dropdown */}
            {isAdvanced && sizesToShow.length > 0 && (
              <div className="size-section">
                <h3>Available Sizes:</h3>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select Size</option>
                  {sizesToShow.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Fabric */}
            {isAdvanced && product.fabric && (
              <p className="product-fabric">
                <span>Fabric:</span> {product.fabric}
              </p>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn-outline" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn-filled" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ fontFamily: "Poppins" }}
        >
          Product added to cart
        </MuiAlert>
      </Snackbar>

      {/* Responsive Styles */}
      <style>
        {`
          .product-page {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
            font-family: Poppins, sans-serif;
            background: #fff;
          }

          .product-container {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: 50px;
            max-width: 1100px;
            width: 100%;
          }

          .main-product-img {
            width: 380px;
            height: 500px;
            object-fit: cover;
            border-radius: 14px;
            transition: transform 0.3s ease;
          }

          .sub-images {
            margin-top: 20px;
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .sub-img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 8px;
            cursor: pointer;
            border: 1px solid #e0e0e0;
            transition: all 0.2s ease;
          }

          .sub-img.active {
            border: 2px solid #006400;
          }

          .product-details {
            flex: 1;
            text-align: left;
          }

          .product-title {
            font-size: 28px;
            font-weight: 700;
            color: #006400;
            margin-bottom: 12px;
          }

          .product-price {
            font-size: 22px;
            font-weight: 500;
            color: #555;
            margin-bottom: 20px;
          }

          .product-description {
            font-size: 15px;
            color: #444;
            line-height: 1.7;
            margin-bottom: 25px;
            max-width: 550px;
          }

          .size-section {
            margin-bottom: 20px;
          }

          .size-section h3 {
            font-weight: 600;
            margin-bottom: 8px;
            color: #006400;
          }

          .size-section select {
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            font-size: 15px;
            font-family: Poppins, sans-serif;
            cursor: pointer;
            width: 55%;
            background: #fafafa;
          }

          .product-fabric {
            margin-bottom: 20px;
            font-size: 15px;
            color: #333;
          }

          .product-fabric span {
            font-weight: 600;
          }

          .action-buttons {
            display: flex;
            gap: 20px;
            margin-top: 35px;
          }

          .btn-outline {
            flex: 0 0 30%;
            padding: 12px;
            border-radius: 6px;
            border: 2px solid #B2B596;
            background-color: #fff;
            color: #333;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-outline:hover {
            background: #f9f9f9;
          }

          .btn-filled {
            flex: 0 0 30%;
            padding: 12px;
            border-radius: 6px;
            border: none;
            background-color: #B2B596;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-filled:hover {
            background-color: #9ba07c;
          }

          /* ✅ Mobile Styles */
          @media (max-width: 768px) {
            .product-container {
              flex-direction: column;
              align-items: center;
              gap: 30px;
            }

            .main-product-img {
              width: 100%;
              max-width: 350px;
              height: auto;
            }

            .product-details {
              text-align: center;
            }

            .product-description {
              max-width: 100%;
              margin: 0 auto 25px auto;
            }

            .size-section select {
              width: 100%;
            }

            .action-buttons {
              flex-direction: column;
              gap: 15px;
              align-items: center;
            }

            .btn-outline,
            .btn-filled {
              flex: none;
              width: 80%;
            }
          }
        `}
      </style>
    </>
  );
};

export default ProductDetails;
