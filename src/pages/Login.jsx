import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/neonLogin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError("Invalid credentials");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-bg">
      <form onSubmit={handleSubmit} className="neon-login-form">
        <h2 className="neon-title">Login</h2>
        {error && <p className="neon-error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="neon-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="neon-input"
        />
        <button type="submit" className="neon-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;