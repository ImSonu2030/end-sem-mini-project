import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../api/api";

import "./Login.css"

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await signUpUser(formData);
      setSuccess("Sign Up Successful! You can now log in.");
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (err) {
      setError("Sign Up Failed. Please check your details.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="user-input">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required placeholder=""
            />
            <label>Username</label>
        </div>
        <div className="user-input">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required placeholder=""
            />
            <label>Email</label>
        </div>
        <div className="user-input">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required placeholder=""
            />
            <label>Password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
