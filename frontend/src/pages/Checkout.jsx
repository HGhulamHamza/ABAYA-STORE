// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { FaUser, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLock, FaCheckCircle, FaShoppingBag, FaArrowRight } from "react-icons/fa";

const STORE_URL = "https://sumptuousmodesty.com";

const resolveProductImage = (image) => {
  if (!image || typeof image !== "string") return image;
  if (/^https?:\/\//i.test(image)) return image;
  return image.startsWith("/") ? `${STORE_URL}${image}` : `${STORE_URL}/${image}`;
};

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [formData, setFormData] = useState({ name: "", whatsapp: "", email: "", address: "", emergency: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shippingFee = 380;
  const total = subtotal + shippingFee;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp number is required";
    if (!formData.address.trim()) newErrors.address = "Home address is required";
    if (!formData.emergency.trim()) newErrors.emergency = "Emergency contact number is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) { setErrors(formErrors); return; }
    setErrors({});
    setLoading(true);
    try {
      const response = await fetch("https://abaya-store-u56r.vercel.app/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cart: cart.map((item) => ({ ...item, image: resolveProductImage(item.image) })),
          subtotal, shippingFee, total,
        }),
      });
      const data = await response.json();
      if (response.ok) { setOrderDone(true); sessionStorage.removeItem("cart"); }
      else alert(data.msg || "Something went wrong");
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  if (orderDone) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Lato:wght@300;400;700&display=swap');
          .od-page {
            min-height: 100vh; background: #F5F5DC;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 40px 20px; text-align: center;
            font-family: 'Lato', sans-serif;
          }
          .od-ring {
            width: 96px; height: 96px;
            border: 1.5px solid rgba(0,100,0,0.2);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 32px;
            animation: odPop 0.6s cubic-bezier(0.22,1,0.36,1) both;
          }
          .od-ring svg { font-size: 42px; color: #006400; }
          @keyframes odPop { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          .od-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(34px, 5vw, 54px);
            font-weight: 300; font-style: italic; color: #1a1a1a; margin-bottom: 8px;
          }
          .od-title span { font-style: normal; font-weight: 600; color: #006400; }
          .od-ornament { width: 48px; height: 1px; background: #B2B596; margin: 24px auto; }
          .od-text { font-size: 15px; font-weight: 300; color: #666; line-height: 1.8; max-width: 460px; }
        `}</style>
        <div className="od-page">
          <div className="od-ring"><FaCheckCircle /></div>
          <h1 className="od-title">Order <span>Placed!</span></h1>
          <div className="od-ornament" />
          <p className="od-text">
            Thank you for shopping with Sumptuous Modesty. Your order has been received
            and will be processed shortly. We'll reach out on WhatsApp to confirm.
          </p>
        </div>
      </>
    );
  }

  const fields = [
    { name: "name",      label: "Full Name",               icon: <FaUser />,     type: "text",  required: true  },
    { name: "whatsapp",  label: "WhatsApp Number",          icon: <FaWhatsapp />, type: "text",  required: true  },
    { name: "email",     label: "Email (Optional)",         icon: <FaEnvelope />, type: "email", required: false },
    { name: "emergency", label: "Emergency Contact",        icon: <FaPhone />,    type: "text",  required: true  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .co-page {
          min-height: 100vh;
          background: #F5F5DC;
          font-family: 'Lato', sans-serif;
          padding: 110px 6% 90px;
        }

        /* ── Header ── */
        .co-header { text-align: center; margin-bottom: 56px; }
        .co-eyebrow {
          font-size: 10px; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase;
          color: #B2B596; margin-bottom: 12px;
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .co-eyebrow::before, .co-eyebrow::after {
          content: ''; display: block; width: 28px; height: 1px; background: #B2B596;
        }
        .co-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 300; font-style: italic; color: #1a1a1a;
        }
        .co-title span { font-style: normal; font-weight: 600; color: #006400; }

        /* ── Grid ── */
        .co-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }

        /* ── Form Panel ── */
        .co-form-panel {
          background: #fff;
          border: 1px solid rgba(178,181,150,0.22);
          padding: 44px 40px;
        }

        .co-section-head {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 400; color: #1a1a1a;
          margin-bottom: 32px; padding-bottom: 16px;
          border-bottom: 0.5px solid rgba(0,0,0,0.07);
        }
        .co-section-head svg { font-size: 15px; color: #006400; }

        .co-field { margin-bottom: 24px; }
        .co-field-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #006400; margin-bottom: 8px;
        }
        .co-field-label svg { font-size: 11px; opacity: 0.75; }

        .co-input {
          width: 100%; padding: 13px 0;
          border: none; border-bottom: 1px solid rgba(0,0,0,0.13);
          background: transparent;
          font-family: 'Lato', sans-serif; font-size: 14px;
          font-weight: 300; color: #222; outline: none;
          transition: border-color 0.3s; letter-spacing: 0.2px;
        }
        .co-input::placeholder { color: #ccc; }
        .co-input:focus { border-bottom-color: #006400; }
        .co-input.err { border-bottom-color: #c0392b; }
        textarea.co-input { height: 90px; resize: none; display: block; }

        .co-error {
          font-size: 10.5px; color: #c0392b;
          margin-top: 5px; letter-spacing: 0.3px;
          display: flex; align-items: center; gap: 4px;
        }
        .co-error::before { content: '—'; }

        /* Payment */
        .co-payment {
          margin-top: 30px; padding: 18px 20px;
          background: #f7f5ee;
          border-left: 2px solid #B2B596;
          display: flex; align-items: flex-start; gap: 14px;
        }
        .co-payment svg { font-size: 18px; color: #B2B596; flex-shrink: 0; margin-top: 2px; }
        .co-payment-title {
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: #555; margin-bottom: 5px;
        }
        .co-payment-text { font-size: 13px; font-weight: 300; color: #777; line-height: 1.6; }

        /* ── Summary Panel — warm, on-brand ── */
        .co-summary {
          position: sticky; top: 110px;
          background: #fff;
          border: 1px solid rgba(178,181,150,0.25);
          overflow: hidden;
        }

        /* Sage header band */
        .co-summary-band {
          background: #006400;
          padding: 18px 24px;
          display: flex; align-items: center; gap: 10px;
        }
        .co-summary-band svg { font-size: 14px; color: rgba(245,245,220,0.7); }
        .co-summary-band-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 300; font-style: italic;
          color: #F5F5DC; letter-spacing: 0.3px;
        }

        .co-summary-body { padding: 28px 24px; }

        /* Item rows */
        .co-item {
          display: flex; gap: 14px; align-items: flex-start;
          margin-bottom: 16px; padding-bottom: 16px;
          border-bottom: 0.5px solid rgba(178,181,150,0.2);
        }
        .co-item:last-of-type { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

        .co-item-img {
          width: 48px; height: 60px;
          object-fit: cover; flex-shrink: 0;
          background: #f0ede4;
          border: 1px solid rgba(178,181,150,0.2);
        }

        .co-item-info { flex: 1; min-width: 0; }
        .co-item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px; font-weight: 400; color: #1a1a1a;
          line-height: 1.3; margin-bottom: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .co-item-meta {
          font-size: 9px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase; color: #B2B596;
        }
        .co-item-price {
          font-size: 13px; font-weight: 700;
          color: #006400; white-space: nowrap; padding-top: 2px;
        }

        /* Totals */
        .co-totals { padding-top: 20px; border-top: 0.5px solid rgba(178,181,150,0.25); margin-top: 20px; }

        .co-totals-row {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 10px;
        }
        .co-totals-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; color: #aaa;
        }
        .co-totals-val { font-size: 14px; font-weight: 400; color: #555; }

        .co-totals-divider { width: 100%; height: 0.5px; background: rgba(178,181,150,0.25); margin: 16px 0; }

        .co-total-row {
          display: flex; justify-content: space-between; align-items: center;
        }
        .co-total-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-style: italic; font-weight: 300; color: #1a1a1a;
        }
        .co-total-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 600; color: #006400;
        }

        /* Submit */
        .co-submit {
          margin-top: 24px; width: 100%; padding: 16px;
          background: #006400; border: 1px solid #006400;
          color: #F5F5DC;
          font-family: 'Lato', sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.3s;
        }
        .co-submit:hover:not(:disabled) { background: #004d00; border-color: #004d00; }
        .co-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Trust strip */
        .co-trust {
          display: flex;
          border-top: 0.5px solid rgba(178,181,150,0.2);
          margin-top: 20px;
        }
        .co-trust-item {
          flex: 1; padding: 12px 6px;
          display: flex; flex-direction: column;
          align-items: center; gap: 4px; text-align: center;
          border-right: 0.5px solid rgba(178,181,150,0.2);
        }
        .co-trust-item:last-child { border-right: none; }
        .co-trust-item span:first-child { font-size: 13px; color: #006400; }
        .co-trust-item span:last-child {
          font-size: 8px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; color: #bbb; line-height: 1.4;
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .co-grid { grid-template-columns: 1fr; }
          .co-summary { position: static; }
        }
        @media (max-width: 640px) {
          .co-page { padding: 90px 4% 60px; }
          .co-form-panel { padding: 28px 18px; }
          .co-summary-body { padding: 20px 18px; }
        }
      `}</style>

      <div className="co-page">
        <div className="co-header">
          <p className="co-eyebrow">Almost There</p>
          <h1 className="co-title">Complete Your <span>Order</span></h1>
        </div>

        <div className="co-grid">
          {/* ── Form ── */}
          <div className="co-form-panel">
            <div className="co-section-head">
              <FaMapMarkerAlt /> Shipping Details
            </div>

            <form onSubmit={handleCheckout} noValidate>
              {fields.map(({ name, label, icon, type, required }) => (
                <div className="co-field" key={name}>
                  <label className="co-field-label">{icon} {label}{required && " *"}</label>
                  <input
                    type={type} name={name}
                    placeholder={`Enter your ${name === "emergency" ? "backup number" : name}…`}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`co-input${errors[name] ? " err" : ""}`}
                  />
                  {errors[name] && <p className="co-error">{errors[name]}</p>}
                </div>
              ))}

              <div className="co-field">
                <label className="co-field-label"><FaMapMarkerAlt /> Home Address *</label>
                <textarea
                  name="address"
                  placeholder="Street, area, city…"
                  value={formData.address}
                  onChange={handleChange}
                  className={`co-input${errors.address ? " err" : ""}`}
                />
                {errors.address && <p className="co-error">{errors.address}</p>}
              </div>

              <div className="co-payment">
                <FaLock />
                <div>
                  <p className="co-payment-title">Payment Method</p>
                  <p className="co-payment-text">
                    Currently we only support Cash on Delivery (COD).
                    Pay when your order arrives at your door.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* ── Summary ── */}
          <div className="co-summary">
            <div className="co-summary-band">
              <FaShoppingBag />
              <span className="co-summary-band-title">Order Summary</span>
            </div>

            <div className="co-summary-body">
              {cart.map((item) => (
                <div key={item._id || item.id} className="co-item">
                  {item.image && (
                    <img src={resolveProductImage(item.image)} alt={item.name} className="co-item-img" />
                  )}
                  <div className="co-item-info">
                    <p className="co-item-name">{item.name}</p>
                    <p className="co-item-meta">
                      {item.selectedSize ? `Size: ${item.selectedSize} · ` : ""}Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <span className="co-item-price">Rs {item.price * (item.quantity || 1)}</span>
                </div>
              ))}

              <div className="co-totals">
                <div className="co-totals-row">
                  <span className="co-totals-label">Subtotal</span>
                  <span className="co-totals-val">Rs {subtotal}</span>
                </div>
                <div className="co-totals-row">
                  <span className="co-totals-label">Shipping</span>
                  <span className="co-totals-val">Rs {shippingFee}</span>
                </div>
                <div className="co-totals-divider" />
                <div className="co-total-row">
                  <span className="co-total-label">Total</span>
                  <span className="co-total-val">Rs {total}</span>
                </div>
              </div>

              <button className="co-submit" onClick={handleCheckout} disabled={loading}>
                {loading ? "Processing…" : <><span>Place Order</span> <FaArrowRight size={10} /></>}
              </button>

              <div className="co-trust">
                <div className="co-trust-item"><span>✦</span><span>COD<br/>Only</span></div>
                <div className="co-trust-item"><span>✦</span><span>Secure<br/>Order</span></div>
                <div className="co-trust-item"><span>✦</span><span>Nationwide<br/>Ship</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;