// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    address: "",
    emergency: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutItem = JSON.parse(localStorage.getItem("checkoutItem"));

    if (checkoutItem) {
      setCart([{ ...checkoutItem, quantity: 1 }]);
    } else {
      setCart(storedCart);
    }
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const shippingFee = 380;
  const total = subtotal + shippingFee;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.whatsapp.trim())
      newErrors.whatsapp = "WhatsApp number is required";
    if (!formData.address.trim()) newErrors.address = "Home address is required";
    if (!formData.emergency.trim())
      newErrors.emergency = "Emergency contact number is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Backend integration
  const handleCheckout = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("https://abaya-store-m2t2.vercel.app/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, cart, subtotal, shippingFee, total }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderDone(true);
        localStorage.removeItem("cart");
        localStorage.removeItem("checkoutItem");
      } else {
        alert(data.msg || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  if (orderDone) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1 style={{ color: "#006400", fontSize: "32px", marginBottom: "20px" }}>
          🎉 Order Placed Successfully!
        </h1>
        <p style={{ fontSize: "18px", color: "#444" }}>
          Thank you for shopping with us. Your order has been received and will
          be processed shortly.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container} className="checkout-container">
      {/* Left: User Details */}
      <div style={styles.formSection} className="checkout-form">
        <h2 style={{ color: "#006400", marginBottom: "20px" }}>
          Shipping Details
        </h2>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          onSubmit={handleCheckout}
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>

          <div>
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp Number *"
              value={formData.whatsapp}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.whatsapp && <p style={styles.error}>{errors.whatsapp}</p>}
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <div>
            <textarea
              name="address"
              placeholder="Home Address *"
              value={formData.address}
              onChange={handleChange}
              style={{ ...styles.input, height: "100px", resize: "none" }}
            />
            {errors.address && <p style={styles.error}>{errors.address}</p>}
          </div>

          <div>
            <input
              type="text"
              name="emergency"
              placeholder="Emergency Contact Number *"
              value={formData.emergency}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.emergency && <p style={styles.error}>{errors.emergency}</p>}
          </div>

          <div style={styles.paymentBox}>
            <h4 style={{ marginBottom: "8px", color: "#333" }}>
              Payment Method
            </h4>
            <p style={{ margin: 0, color: "#B2B596", fontWeight: "600" }}>
              Currently we only support Cash on Delivery (COD)
            </p>
          </div>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div style={styles.summary} className="checkout-summary">
        <h3 style={{ marginBottom: "20px", color: "#006400" }}>
          Order Summary
        </h3>
        {cart.map((item) => (
          <div
            key={item._id || item.id}
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              {item.name}{" "}
              {item.selectedSize ? `(Size: ${item.selectedSize})` : ""} (x
              {item.quantity || 1})
            </span>
            <span>Rs {item.price * (item.quantity || 1)}</span>
          </div>
        ))}
        <hr />
        <p style={{ fontWeight: "600", marginTop: "10px" }}>
          Subtotal: Rs {subtotal}
        </p>
        <p style={{ color: "#555" }}>Shipping: Rs {shippingFee}</p>
        <h3 style={{ marginTop: "15px" }}>Total: Rs {total}</h3>

        <button
          onClick={handleCheckout}
          disabled={loading}
          style={styles.checkoutBtn}
        >
          {loading ? "Processing..." : "Save & Continue"}
        </button>
      </div>

      {/* Inline Mobile CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .checkout-container {
              flex-direction: column;
            }
            .checkout-form, .checkout-summary {
              flex: none;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "50px auto",
    padding: "20px",
    display: "flex",
    gap: "40px",
    fontFamily: "Poppins, sans-serif",
  },
  formSection: {
    flex: 2,
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  summary: {
    flex: 1,
    background: "#fafafa",
    padding: "25px",
    borderRadius: "10px",
    border: "1px solid #eee",
    height: "fit-content",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "5px",
  },
  paymentBox: {
    marginTop: "15px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
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

export default Checkout;
