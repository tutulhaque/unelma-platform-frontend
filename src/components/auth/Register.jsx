// Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Define the Strapi URL constant ---
const STRAPI_BASE_URL = "https://unelma-platform-backend.onrender.com";
const API_URL = `${STRAPI_BASE_URL}/api/auth/local/register`;
const GOOGLE_LOGIN_URL = `${STRAPI_BASE_URL}/api/connect/google`;
// ----------------------------------------

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (Your existing standard registration logic) ...
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.jwt);
        setMessage("Registration successful!");
        navigate("/login");
      } else {
        setMessage(data.error?.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Network error.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (Standard registration form inputs) ... */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <button
          type="submit"
          className="w-full bg-[#3780B2] text-white py-2 rounded-lg"
        >
          Register
        </button>
      </form>

      {/* --- ADD GOOGLE REGISTER BUTTON --- */}
      <div className="text-center">
        <p className="my-3 text-gray-500">OR</p>
        <a href={GOOGLE_LOGIN_URL} className="block">
          <button
            type="button"
            className="w-full bg-[#000000] hover:bg-[#3780B2] text-white py-2 rounded-lg transition duration-150 ease-in-out flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.8-1.5-35-4.3-51.7H272v97.8h146.9c-6.3 34-25.3 62.8-53.9 82.1v68.2h87c50.9-46.9 80.5-115.8 80.5-196.4z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c72.6 0 133.6-24 178.2-65.4l-87-68.2c-24.3 16.4-55.6 26-91.2 26-70 0-129.3-47.3-150.5-111.1h-89v69.7c44.6 88.4 136.3 149 239.5 149z"
                fill="#34A853"
              />
              <path
                d="M121.5 325.3c-10.5-31.6-10.5-65.5 0-97.1V158.5h-89c-37.6 73.5-37.6 160.3 0 233.8l89-67z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c37.8-0.6 74.1 13 101.5 37.7l76-76C404.4 25.3 343.3 0 272 0 168.8 0 77 60.6 32.4 149l89 69.7C142.7 155 202 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign Up with Google</span>
          </button>
        </a>
      </div>
      {/* ---------------------------------- */}

      <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
    </div>
  );
};

export default Register;
