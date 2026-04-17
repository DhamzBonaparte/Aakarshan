import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/admin/login", {
        username,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token); // store JWT
      navigate("/admin");
      setSuccess(true);
      setShow(true);
    } catch (err) {
      setSuccess(false);
      setShow(true);
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "90%",
                padding: "12px",
                borderRadius: "25px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "90%",
                padding: "12px",
                borderRadius: "25px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "25px",
              border: "none",
              background: "#4a90e2",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#357ABD")}
            onMouseOut={(e) => (e.target.style.background = "#4a90e2")}
          >
            Login
          </button>
          <p
            style={{
              marginTop: "15px",
              color: success ? "green" : "red",
              fontSize: "14px",
              display: show ? "block" : "none",
            }}
          >
            {success ? "Login successful!" : "Invalid username or password"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
