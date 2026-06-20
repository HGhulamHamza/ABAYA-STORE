// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus, FaMinus, FaShoppingBag, FaTrashAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const initializedCart = storedCart.map((item, idx) => ({
        ...item,
        quantity: item.quantity ? item.quantity : 1,
        _id: item._id || `local-${idx}`,
      }));
      setCart(initializedCart);
    };
    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("focus", loadCart);
    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("focus", loadCart);
    };
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
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

  const removeItem = (id) => updateCart(cart.filter((item) => item._id !== id));
  const clearCart = () => updateCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const shippingFee = cart.length > 0 ? 380 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cart-page {
          min-height: 100vh;
          background: #F5F5DC;
          font-family: 'Lato', sans-serif;
          padding: 110px 6% 90px;
        }

        /* ── Page Header ── */
        .cart-header { text-align: center; margin-bottom: 60px; }

        .cart-eyebrow {
          font-size: 10px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: #B2B596; margin-bottom: 12px;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .cart-eyebrow::before, .cart-eyebrow::after {
          content: ''; display: block; width: 28px; height: 1px; background: #B2B596;
        }

        .cart-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5vw, 60px);
          font-weight: 300; font-style: italic;
          color: #1a1a1a; letter-spacing: -0.5px;
        }
        .cart-title span { font-style: normal; font-weight: 600; color: #006400; }

        /* ── Empty State ── */
        .cart-empty {
          text-align: center; padding: 80px 20px;
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .cart-empty-icon {
          width: 80px; height: 80px;
          border: 1.5px solid rgba(178,181,150,0.4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 30px; color: #B2B596;
          margin-bottom: 28px;
        }
        .cart-empty-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-style: italic; font-weight: 300;
          color: #888; margin-bottom: 32px;
        }
        .cart-empty-btn {
          font-family: 'Lato', sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #F5F5DC; background: #006400;
          border: 1px solid #006400; padding: 16px 40px;
          cursor: pointer; transition: background 0.3s, color 0.3s;
        }
        .cart-empty-btn:hover { background: transparent; color: #006400; }

        /* ── Layout ── */
        .cart-wrapper {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
          max-width: 1120px;
          margin: 0 auto;
        }

        /* ── Items Panel ── */
        .cart-items-panel { background: #fff; border: 1px solid rgba(178,181,150,0.22); }

        .cart-items-head {
          display: grid;
          grid-template-columns: 28px 1fr 100px 120px 100px;
          padding: 13px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: #f7f5ee;
        }
        .cart-items-head span {
          font-size: 9px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; color: #aaa;
        }
        .cart-items-head span:nth-child(n+3) { text-align: center; }

        /* Row */
        .cart-row {
          display: grid;
          grid-template-columns: 28px 1fr 100px 120px 100px;
          padding: 20px 24px;
          border-bottom: 0.5px solid rgba(0,0,0,0.05);
          align-items: center;
          transition: background 0.2s;
        }
        .cart-row:hover { background: #fdfcf7; }
        .cart-row:last-child { border-bottom: none; }

        .cart-row-remove {
          background: none; border: none; cursor: pointer;
          color: #ddd; padding: 0; font-size: 12px;
          display: flex; align-items: center;
          transition: color 0.25s;
        }
        .cart-row-remove:hover { color: #c0392b; }

        .cart-row-product { display: flex; align-items: center; gap: 16px; }

        .cart-row-img {
          width: 58px; height: 74px;
          object-fit: cover; flex-shrink: 0;
          background: #f0ede4;
        }

        .cart-row-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px; font-weight: 400; color: #1a1a1a;
          line-height: 1.2; margin-bottom: 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 200px;
        }
        .cart-row-size {
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase; color: #B2B596;
        }

        .cart-row-price { font-size: 14px; font-weight: 700; color: #006400; text-align: center; }

        .cart-qty {
          display: flex; align-items: center; justify-content: center;
          gap: 0; border: 1px solid rgba(0,0,0,0.1);
          width: fit-content; margin: 0 auto;
        }
        .cart-qty-btn {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer;
          color: #006400; font-size: 10px;
          transition: background 0.2s;
        }
        .cart-qty-btn:hover { background: rgba(0,100,0,0.07); }
        .cart-qty-val {
          width: 30px; text-align: center;
          font-size: 13px; font-weight: 700; color: #1a1a1a;
          border-left: 1px solid rgba(0,0,0,0.08);
          border-right: 1px solid rgba(0,0,0,0.08);
          line-height: 30px;
        }

        .cart-row-subtotal { font-size: 14px; font-weight: 700; color: #1a1a1a; text-align: center; }

        .cart-clear {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: #ccc; cursor: pointer;
          padding: 18px 24px 0;
          transition: color 0.25s; background: none; border: none;
        }
        .cart-clear:hover { color: #c0392b; }

        /* ── Summary Card — warm beige/sage palette ── */
        .cart-summary {
          position: sticky; top: 110px;
          background: #fff;
          border: 1px solid rgba(178,181,150,0.3);
          overflow: hidden;
        }

        /* Green top accent stripe */
        .cart-summary::before {
          content: '';
          display: block;
          height: 3px;
          background: linear-gradient(90deg, #006400, #B2B596);
        }

        .cart-summary-inner { padding: 32px 28px; }

        .cart-summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 28px;
          padding-bottom: 18px;
          border-bottom: 0.5px solid rgba(178,181,150,0.3);
          display: flex; align-items: center; justify-content: space-between;
        }

        .cart-summary-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px;
          background: #006400; border-radius: 50%;
          font-size: 10px; font-weight: 700; color: #fff;
          font-family: 'Lato', sans-serif;
        }

        .cart-summary-row {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 14px;
        }
        .cart-summary-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; color: #999;
        }
        .cart-summary-val { font-size: 14px; font-weight: 400; color: #444; }

        .cart-summary-divider {
          width: 100%; height: 0.5px;
          background: rgba(178,181,150,0.3);
          margin: 20px 0;
        }

        .cart-summary-total-row {
          display: flex; justify-content: space-between; align-items: center;
        }
        .cart-summary-total-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-style: italic; font-weight: 300; color: #1a1a1a;
        }
        .cart-summary-total-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 600; color: #006400;
        }

        .cart-checkout-btn {
          margin-top: 24px; width: 100%; padding: 16px;
          background: #006400; border: 1px solid #006400;
          color: #F5F5DC;
          font-family: 'Lato', sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.3s;
        }
        .cart-checkout-btn:hover { background: #004d00; border-color: #004d00; }

        .cart-summary-note {
          font-size: 10px; font-weight: 300;
          letter-spacing: 0.5px; color: #B2B596;
          text-align: center; margin-top: 14px; line-height: 1.6;
        }

        /* Trust strip at bottom */
        .cart-trust {
          display: flex;
          border-top: 0.5px solid rgba(178,181,150,0.2);
        }
        .cart-trust-item {
          flex: 1; padding: 14px 8px;
          display: flex; flex-direction: column;
          align-items: center; gap: 4px; text-align: center;
          border-right: 0.5px solid rgba(178,181,150,0.2);
        }
        .cart-trust-item:last-child { border-right: none; }
        .cart-trust-item span:first-child { font-size: 14px; color: #006400; }
        .cart-trust-item span:last-child {
          font-size: 8px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; color: #aaa;
          line-height: 1.4;
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .cart-wrapper { grid-template-columns: 1fr; }
          .cart-summary { position: static; }
        }
        @media (max-width: 640px) {
          .cart-page { padding: 90px 4% 60px; }
          .cart-items-head { display: none; }
          .cart-row {
            grid-template-columns: 1fr;
            padding: 16px; gap: 10px; position: relative;
          }
          .cart-row-remove { position: absolute; top: 16px; right: 16px; }
          .cart-row-price, .cart-row-subtotal { text-align: left; }
          .cart-row-price::before { content: 'Price: '; color: #aaa; font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
          .cart-row-subtotal::before { content: 'Subtotal: '; color: #aaa; font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
          .cart-qty { margin: 0; }
          .cart-summary-inner { padding: 24px 20px; }
        }
      `}</style>

      <div className="cart-page">
        <div className="cart-header">
          <p className="cart-eyebrow">Your Selection</p>
          <h1 className="cart-title">Shopping <span>Cart</span></h1>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon"><FaShoppingBag /></div>
            <p className="cart-empty-text">Your cart is empty</p>
            <button className="cart-empty-btn" onClick={() => navigate("/products")}>Explore Collection</button>
          </div>
        ) : (
          <div className="cart-wrapper">
            {/* Items */}
            <div>
              <div className="cart-items-panel">
                <div className="cart-items-head">
                  <span></span>
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Subtotal</span>
                </div>

                {cart.map((item) => (
                  <div key={item._id} className="cart-row">
                    <button className="cart-row-remove" onClick={() => removeItem(item._id)}><FaTimes /></button>
                    <div className="cart-row-product">
                      <img src={item.image} alt={item.name} className="cart-row-img" />
                      <div>
                        <p className="cart-row-name">{item.name}</p>
                        {item.selectedSize && <span className="cart-row-size">Size: {item.selectedSize}</span>}
                      </div>
                    </div>
                    <div className="cart-row-price">Rs {item.price}</div>
                    <div className="cart-qty">
                      <button className="cart-qty-btn" onClick={() => handleQuantity(item._id, "dec")}><FaMinus /></button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => handleQuantity(item._id, "inc")}><FaPlus /></button>
                    </div>
                    <div className="cart-row-subtotal">Rs {item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <button className="cart-clear" onClick={clearCart}><FaTrashAlt size={10} /> Clear Cart</button>
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="cart-summary-inner">
                <div className="cart-summary-title">
                  Order Summary
                  <span className="cart-summary-badge">{cart.reduce((a, i) => a + i.quantity, 0)}</span>
                </div>

                <div className="cart-summary-row">
                  <span className="cart-summary-label">Items</span>
                  <span className="cart-summary-val">{cart.reduce((a, i) => a + i.quantity, 0)}</span>
                </div>
                <div className="cart-summary-row">
                  <span className="cart-summary-label">Subtotal</span>
                  <span className="cart-summary-val">Rs {subtotal}</span>
                </div>
                <div className="cart-summary-row">
                  <span className="cart-summary-label">Shipping</span>
                  <span className="cart-summary-val">Rs {shippingFee}</span>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-total-row">
                  <span className="cart-summary-total-label">Total</span>
                  <span className="cart-summary-total-val">Rs {total}</span>
                </div>

                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Checkout <FaArrowRight size={10} />
                </button>
                <p className="cart-summary-note">Cash on Delivery · Nationwide Shipping</p>
              </div>

              <div className="cart-trust">
                <div className="cart-trust-item">
                  <span>✦</span>
                  <span>Secure<br/>Order</span>
                </div>
                <div className="cart-trust-item">
                  <span>✦</span>
                  <span>Cash on<br/>Delivery</span>
                </div>
                <div className="cart-trust-item">
                  <span>✦</span>
                  <span>Nationwide<br/>Shipping</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;