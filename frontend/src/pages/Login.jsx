import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import "../styles/Auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="auth-container"
      style={{ backgroundColor: "#F5F5DC" }}

    >
      <div className="bubble"></div>
  <div className="bubble"></div>
  <div className="bubble"></div>
  <div className="bubble"></div>
   <div className="bubble"></div>
  <div className="bubble"></div>
  <div className="bubble"></div>
      {/* <Link to="/" className="back-home">← Back to Home</Link> */}
      <div className="auth-box glass-card login-narrow">
        <img src="/ficon.png" alt="Logo" className="logo" />
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
 
          <button type="submit" className="bt">Login</button>
        </form>

        <div className="google-auth">
          <FaGoogle /> Continue with Google
        </div>

        <p>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
