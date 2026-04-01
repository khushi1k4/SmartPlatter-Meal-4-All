import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authApi from "../api/AuthApi";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApi.post("/forgot-password", { email });

      toast.success("📩 Reset link sent! Check your email.", {
        duration: 3000,
      });

      navigate("/login"); // (you had /auth earlier)
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">

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
      className="
      w-full
      max-w-[320px]     /* mobile */
      sm:max-w-[360px]  /* large mobile */
      md:max-w-[380px]  /* tablet */
      lg:max-w-[420px]  /* laptop */
      bg-[#0e0e0e]/90 backdrop-blur-xl
      p-5 sm:p-6 md:p-7
      rounded-3xl shadow-2xl
      flex flex-col gap-3 sm:gap-4
      "
    >
      {/* Title */}
      <h2 className="
        text-base sm:text-lg md:text-xl
        font-bold text-green-500 text-center
      ">
        Reset Password
      </h2>

      {/* Subtitle */}
      <p className="text-gray-400 text-[11px] sm:text-xs text-center">
        Enter your registered email to receive reset link
      </p>

      {/* Input */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="
        authInput
        text-xs sm:text-sm
        py-2 sm:py-2.5
        "
      />

      {/* Button */}
      <button
        disabled={loading}
        className={`
        mt-2
        text-xs sm:text-sm
        font-semibold
        py-2 sm:py-2.5
        rounded-xl shadow-lg
        transition-all duration-300
        ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-green-700 to-emerald-500 hover:scale-105"
        }`}
      >
        {loading ? "Sending reset link..." : "Send Reset Link"}
      </button>

      <p className="text-[10px] sm:text-[11px] text-gray-500 text-center">
        We’ll email you a secure password reset link.
      </p>
    </form>
  </div>
  );
}