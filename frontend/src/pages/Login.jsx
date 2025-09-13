import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import "../styles/Auth.css";
import Navbar from "../components/Navbar.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleClose = () => setOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      localStorage.setItem("token", res.data.token);

      setMessage("User logged in");
      setSeverity("success");
      setOpen(true);

      setTimeout(() => {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setMessage("Logged in with Google!");
      setSeverity("success");
      setOpen(true);

      setTimeout(() => {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      }, 1500);
    } catch (error) {
      setMessage(error.message || "Google login failed");
      setSeverity("error");
      setOpen(true);
    }
  };

  useEffect(() => {
    const loginMessage = localStorage.getItem("loginMessage");
    if (loginMessage) {
      setMessage(loginMessage);
      setSeverity("warning");
      setOpen(true);
      localStorage.removeItem("loginMessage");
    }
  }, []);

  return (
    <div className="auth-container" style={{ backgroundColor: "#F5F5DC" }}>
      <Navbar />
      <div className="bubble"></div><div className="bubble"></div>
      <div className="bubble"></div><div className="bubble"></div>
      <div className="bubble"></div><div className="bubble"></div>
      <div className="bubble"></div>

      <div className="auth-box glass-card login-narrow">
        <img src="/ficon.png" alt="Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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

        {/* Google Auth */}
        <div className="google-auth" onClick={handleGoogleLogin}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 488 512">
            <path fill="#4285F4" d="M488 261.8c0-17.8-1.5-35.6-4.8-52.9H249v99.9h134.7c-5.8 31.2-23.4 57.6-49.7 75.3v62.7h80.4c47.2-43.4 73.6-107.5 73.6-185z"/>
            <path fill="#34A853" d="M249 492c67.4 0 124.1-22.4 165.2-60.9l-80.4-62.7c-22.4 15-51 23.9-84.8 23.9-65.1 0-120.3-44.1-140-103.5H26v65.1C67.6 426.2 152.6 492 249 492z"/>
            <path fill="#FBBC05" d="M109 288.8c-4.8-14.4-7.6-29.6-7.6-45.2s2.8-30.8 7.6-45.2v-65.1H26C9.3 164.2 0 204.6 0 243.6c0 39 9.3 79.4 26 110.3l83-65.1z"/>
            <path fill="#EA4335" d="M249 97.2c36.6 0 69.5 12.6 95.3 37.1l71.5-71.5C373.1 23.9 316.4 1.6 249 1.6 152.6 1.6 67.6 67.4 26 133.9l83 65.1C128.7 141.3 183.9 97.2 249 97.2z"/>
          </svg> Continue with Google
        </div>

        <p className="last">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </p>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          severity={severity}
          sx={{ backgroundColor: "#B2B596", color: "black" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
