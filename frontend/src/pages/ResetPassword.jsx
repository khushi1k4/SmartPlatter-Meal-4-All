import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authApi from "../api/AuthApi";

export default function ResetPassword() {
  const { token } = useParams(); // ⭐ get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await authApi.post("/reset-password", {
        token,
        newPassword: password,
      });

      alert("Password reset successful!");
      navigate("/auth");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
    
    {/* Background */}
    <div className="absolute inset-0 -z-10">
      <img
        src="/meal-4-all.webp"
        alt="bg"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 backdrop-blur-md bg-black/70"></div>
    </div>

    {/* Card */}
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-[#0e0e0e]/90 backdrop-blur-xl
      p-6 sm:p-8 rounded-3xl flex flex-col gap-4 shadow-2xl"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-1">
        Set New Password
      </h2>

      <p className="text-gray-400 text-xs sm:text-sm text-center mb-3">
        Enter your new password below
      </p>

      {/* New password */}
      <input
        type="password"
        placeholder="New password"
        className="authInput text-xs py-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Confirm password */}
      <input
        type="password"
        placeholder="Confirm password"
        className="authInput text-xs py-1"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button
        className="mt-2 bg-gradient-to-r from-green-700 to-emerald-500
        text-white text-sm sm:text-base font-semibold
        py-1 sm:py-2 rounded-xl shadow-lg
        hover:scale-105 transition-all duration-300"
      >
        Reset Password
      </button>

      <p className="text-gray-500 text-xs text-center mt-2">
        Your password must be at least 6 characters long.
      </p>
    </form>
  </div>
  );
}