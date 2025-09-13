// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const initializedCart = storedCart.map((item, idx) => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1,
      _id: item._id || item.id || `local-${idx}`,
    }));
    setCart(initializedCart);
    localStorage.setItem("cart", JSON.stringify(initializedCart));
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantity = (id, action) => {
    const updated = cart.map((item) => {
      if (item._id === id) {
        if (action === "inc") item.quantity += 1;
        if (action === "dec" && item.quantity > 1) item.quantity -= 1;
      }
      return item;
    });
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const clearCart = () => updateCart([]);

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  const shippingFee = cart.length > 0 ? 380 : 0; // ✅ Only once if cart is not empty
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#006400",
          fontSize: "32px",
        }}
      >
        Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#777", fontSize: "18px" }}>Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              borderRadius: "8px",
              backgroundColor: "#B2B596",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
              width: "35%",
              minWidth: "140px",
            }}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="cart-wrapper">
          {/* Cart Table */}
          <div style={{ flex: 2, overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: "8px",
                overflow: "hidden",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr style={{ background: "#B2B596", color: "#fff" }}>
                  <th style={styles.th}></th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item._id}
                    style={{
                      borderBottom: "1px solid #eee",
                      verticalAlign: "middle",
                    }}
                  >
                    <td style={styles.td}>
                      <FaTimes
                        style={{
                          color: "red",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                        onClick={() => removeItem(item._id)}
                      />
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          flexWrap: "wrap",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td style={styles.td}>Rs {item.price}</td>
                    <td style={styles.td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() => handleQuantity(item._id, "dec")}
                          style={styles.qtyBtn}
                        >
                          <FaMinus color="#006400" />
                        </button>
                        <span
                          style={{
                            fontWeight: "500",
                            minWidth: "20px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantity(item._id, "inc")}
                          style={styles.qtyBtn}
                        >
                          <FaPlus color="#006400" />
                        </button>
                      </div>
                    </td>
                    <td style={styles.td}>Rs {item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p
              onClick={clearCart}
              style={{
                marginTop: "20px",
                color: "#B2B596",
                fontWeight: "600",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Clear Shopping Cart
            </p>
          </div>

          {/* Order Summary */}
          <div
            style={{ ...styles.summary, marginTop: "60px" }}
            className="order-summary"
          >
            <h3
              style={{
                marginBottom: "20px",
                color: "#006400",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              Order Summary
            </h3>
            <p style={styles.summaryText}>
              Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p style={styles.summaryText}>Subtotal: Rs {subtotal}</p>
            <p style={styles.summaryText}>Shipping: Rs {shippingFee}</p>
            <h3 style={{ marginTop: "20px", fontSize: "20px" }}>
              Total: Rs {total}
            </h3>
            <button style={styles.checkoutBtn} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* ✅ Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .cart-wrapper {
              display: flex;
              flex-direction: column;
              gap: 30px;
            }
            .order-summary {
              margin-top: 0 !important;
              width: 100% !important;
            }
            table {
              font-size: 14px;
            }
          }
          @media (min-width: 769px) {
            .cart-wrapper {
              display: flex;
              flex-direction: row;
              gap: 40px;
              align-items: flex-start;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  th: {
    padding: "14px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
  },
  td: { padding: "14px", color: "#333", fontSize: "15px" },
  qtyBtn: {
    padding: "6px 10px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  summary: {
    flex: 1,
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fafafa",
    height: "fit-content",
  },
  summaryText: { marginBottom: "10px", color: "#444", fontSize: "15px" },
  checkoutBtn: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#006400",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Cart;
