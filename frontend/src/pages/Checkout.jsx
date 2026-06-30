// src/pages/Checkout.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLock, FaCheckCircle, FaShoppingBag, FaArrowRight, FaCity, FaChevronDown } from "react-icons/fa";

const STORE_URL = "https://sumptuousmodesty.com";

// ── All cities in Pakistan (172 cities) ──
const PAKISTAN_CITIES = [
  "Abbottabad", "Addul Hakeem", "Ahmadpur East", "Ahmed Nager Chatha", "Ahmednagar",
  "Akora Khattak", "Ali Khan Abad", "Alipur", "Alpuri", "Arandu", "Arifwala",
  "Atharan Hazari", "Attock", "Badah", "Badin", "Baghdada", "Bahawalnagar",
  "Bahawalpur", "Banda Daudshah", "Bannu", "Barikot", "Batagram", "Batkhela",
  "Bhakkar", "Bhalwal", "Bhera", "Burewala", "Chak Jhumra", "Chakdara", "Chakwal",
  "Chaman", "Chamla", "Charsadda", "Chichawatni", "Chiniot", "Chishtian",
  "Choa Saidanshah", "Chunian", "Daggar", "Dajkot", "Darya Khan", "Daska",
  "Dera Ghazi Khan", "Dera Ismail Khan", "Dhaular", "Dijkot", "Dina", "Dinga",
  "Dipalpur", "Domel", "Faisalabad", "Fateh Jang", "Ghakhar Mandi", "Ghotki",
  "Gojra", "Gujar Khan", "Gujranwala", "Gujrat", "Hafizabad", "Hangu", "Harappa",
  "Haripur", "Haroonabad", "Hasilpur", "Haveli Lakha", "Havelian", "Hyderabad",
  "Islamabad", "Jalalpur Jattan", "Jampur", "Jaranwala", "Jauharabad", "Jhang",
  "Jhelum", "Kalabagh", "Kalaya", "Kallar Syedan", "Kamalia", "Kāmoke", "Karachi",
  "Karak", "Karor Lal Esan", "Kasur", "Khanewal", "Khanpur", "Khanqah Sharif",
  "Kharian", "Khushab", "Kohat", "Kot Adu", "Kot Addu", "Kot Najibullah", "Lahore",
  "Lakki Marwat", "Lala Musa", "Lalamusa", "Larkana", "Layyah", "Lawa Chakwal",
  "Liaquat Pur", "Lodhran", "Mailsi", "Malakwal", "Mamoori", "Mandi Bahauddin",
  "Mansehra", "Mardan", "Matiari", "Mian Channu", "Mianwali", "Mianwali Bangla",
  "Mingora", "Mirpur", "Mirpur Khas", "Moro", "Multan", "Muridke", "Murree",
  "Muzaffargarh", "Nankana Sahib", "Narowal", "Nawabshah", "Nowshera", "Okara",
  "Pakpattan", "Pattoki", "Peshawar", "Phool Nagar", "Pindi Bhattian",
  "Pind Dadan Khan", "Pir Mahal", "Qaimpur", "Qila Didar Singh", "Quetta",
  "Rabwah", "Rahim Yar Khan", "Raiwind", "Rajanpur", "Rawalpindi", "Renala Khurd",
  "Sadiqabad", "Sagri", "Sahiwal", "Saidu Sharif", "Sambrial", "Samundri",
  "Sangla Hill", "Sargodha", "Shahdadkot", "Shahdadpur", "Shakargarh",
  "Sheikhupura", "Shujaabad", "Sialkot", "Siranwali", "Sohawa", "Sukkur", "Swabi",
  "Talagang", "Tandlianwala", "Tando Muhammad Khan", "Taunsa", "Taxila", "Thatta",
  "Toba Tek Singh", "Turbat", "Umerkot", "Vehari", "Wah Cantonment", "Wazirabad",
  "Yazman", "Zafarwal",
];

const resolveProductImage = (image) => {
  if (!image || typeof image !== "string") return image;
  if (/^https?:\/\//i.test(image)) return image;
  return image.startsWith("/") ? `${STORE_URL}${image}` : `${STORE_URL}/${image}`;
};

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "", whatsapp: "", email: "", address: "", emergency: "", city: ""
  });
  const [errors, setErrors] = useState({});

  // ── City combobox state ──
  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [cityFiltered, setCityFiltered] = useState([]);
  const cityInputRef = useRef(null);
  const cityListRef = useRef(null);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Filter cities as user types
  useEffect(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) {
      setCityFiltered([]);
      return;
    }
    const matches = PAKISTAN_CITIES.filter(c =>
      c.toLowerCase().includes(q)
    ).slice(0, 8); // max 8 suggestions
    setCityFiltered(matches);
  }, [cityQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        cityListRef.current && !cityListRef.current.contains(e.target) &&
        cityInputRef.current && !cityInputRef.current.contains(e.target)
      ) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
    if (!formData.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCityInputChange = (e) => {
    const val = e.target.value;
    setCityQuery(val);
    setFormData(prev => ({ ...prev, city: val }));
    if (errors.city) setErrors(prev => ({ ...prev, city: "" }));
    setCityOpen(true);
  };

  const handleCitySelect = (cityName) => {
    setCityQuery(cityName);
    setFormData(prev => ({ ...prev, city: cityName }));
    setCityOpen(false);
    if (errors.city) setErrors(prev => ({ ...prev, city: "" }));
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
            and will be processed shortly. We\'ll reach out on WhatsApp to confirm.
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

        .co-field { margin-bottom: 24px; position: relative; }
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

        /* ── City Combobox ── */
        .co-city-wrap { position: relative; }
        .co-city-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .co-city-input-wrap .co-input {
          padding-right: 28px;
        }
        .co-city-chevron {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          color: #B2B596;
          cursor: pointer;
          transition: transform 0.2s, color 0.2s;
          padding: 4px;
        }
        .co-city-chevron.open {
          transform: translateY(-50%) rotate(180deg);
          color: #006400;
        }
        .co-city-list {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          max-height: 220px;
          overflow-y: auto;
          background: #fff;
          border: 1px solid rgba(178,181,150,0.35);
          border-top: none;
          z-index: 50;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          animation: citySlide 0.2s ease both;
        }
        @keyframes citySlide {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .co-city-item {
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 300;
          color: #444;
          cursor: pointer;
          border-bottom: 0.5px solid rgba(178,181,150,0.12);
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.2px;
        }
        .co-city-item:last-child { border-bottom: none; }
        .co-city-item:hover,
        .co-city-item.highlight {
          background: #f7f5ee;
          color: #006400;
        }
        .co-city-item mark {
          background: transparent;
          font-weight: 700;
          color: #006400;
        }
        .co-city-empty {
          padding: 14px;
          font-size: 12px;
          color: #aaa;
          text-align: center;
          font-style: italic;
        }

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

              {/* ── City Combobox ── */}
              <div className="co-field co-city-wrap">
                <label className="co-field-label"><FaCity /> City *</label>
                <div className="co-city-input-wrap">
                  <input
                    ref={cityInputRef}
                    type="text"
                    name="city"
                    placeholder="Type or select your city…"
                    value={cityQuery}
                    onChange={handleCityInputChange}
                    onFocus={() => setCityOpen(true)}
                    autoComplete="off"
                    className={`co-input${errors.city ? " err" : ""}`}
                  />
                  <FaChevronDown
                    className={`co-city-chevron${cityOpen ? " open" : ""}`}
                    onClick={() => {
                      setCityOpen(prev => !prev);
                      cityInputRef.current?.focus();
                    }}
                  />
                </div>

                {cityOpen && (
                  <div ref={cityListRef} className="co-city-list">
                    {cityFiltered.length > 0 ? (
                      cityFiltered.map((city) => {
                        const idx = city.toLowerCase().indexOf(cityQuery.toLowerCase());
                        const before = city.slice(0, idx);
                        const match = city.slice(idx, idx + cityQuery.length);
                        const after = city.slice(idx + cityQuery.length);
                        return (
                          <div
                            key={city}
                            className="co-city-item"
                            onClick={() => handleCitySelect(city)}
                            onMouseEnter={(e) => e.currentTarget.classList.add("highlight")}
                            onMouseLeave={(e) => e.currentTarget.classList.remove("highlight")}
                          >
                            {before}<mark>{match}</mark>{after}
                          </div>
                        );
                      })
                    ) : cityQuery.trim() ? (
                      <div className="co-city-empty">No city found — you can still type freely</div>
                    ) : (
                      <div className="co-city-empty">Start typing to see city suggestions…</div>
                    )}
                  </div>
                )}
                {errors.city && <p className="co-error">{errors.city}</p>}
              </div>

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