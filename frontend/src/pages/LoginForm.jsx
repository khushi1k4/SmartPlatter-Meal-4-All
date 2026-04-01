import { useState, useEffect } from "react";
import { loginUser, signupUser } from "../api/AuthApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { login, user, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // 🔒 Auth Guard — prevents logged in users from seeing Auth page
  if (authLoading) return null;

  if (user) {
    navigate("/", { replace: true });
    return null;
  }
  
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // At least 1 letter, at least 1 number, min 6 characters
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const validateForm = () => {
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!passwordRegex.test(form.password)) {
      alert("Password must be at least 6 characters and alphanumeric only");
      return false;
    }

    if (!isLogin && form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    if (!isLogin) {
      if (!form.age || form.age <= 0) {
        alert("Enter a valid age");
        return false;
      }
      if (!form.height || form.height <= 0) {
        alert("Enter a valid height in cm");
        return false;
      }
      if (!form.weight || form.weight <= 0) {
        alert("Enter a valid weight in kg");
        return false;
      }
      if (!form.gender) {
        alert("Select gender");
        return false;
      }
    }

    return true;
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) navigate("/");
  // }, [navigate]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const res = await loginUser({ email: form.email, password: form.password });
        localStorage.setItem("token", res.data.token);
        await login(res.data.token);
        navigate("/", { replace: true });
      } else {
        const res = await signupUser({
          name: form.name,
          email: form.email,
          password: form.password,
          age: form.age,
          height: form.height,
          weight: form.weight,
          gender: form.gender,
        });
        localStorage.setItem("token", res.data.token);
        await login(res.data.token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Email or Password is wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center 
      px-4 sm:px-6 lg:px-8 
      py-8 sm:py-12 md:py-16 
      overflow-hidden">
      
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
        max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[420px]
        bg-[#0e0e0e]/90 backdrop-blur-xl border border-[#3b2f2f]
        p-5 sm:p-6 md:p-7
        rounded-3xl shadow-2xl
        flex flex-col gap-3 sm:gap-4
        "
      >
        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-green-500">
          {isLogin ? "Meal4All Smart Platter" : "Create Account"}
        </h2>

        {/* NAME */}
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <label className="text-base text-[#9c7c5b]">Full Name</label>
            <input
              name="name"
              onChange={handleChange}
              className="authInput text-xs py-1"
              required
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-base text-[#9c7c5b]">Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="authInput text-xs py-1"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <label className="text-base text-[#9c7c5b]">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="authInput text-xs py-1"
            required
          />
        </div>

        {/* CONFIRM PASSWORD */}
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <label className="text-base text-[#9c7c5b]">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              className="authInput text-xs py-1"
              required
            />
          </div>
        )}

        {/* AGE + GENDER ROW */}
        {!isLogin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    
          {/* AGE */}
          <div className="flex flex-col gap-1">
            <label className="text-base text-[#9c7c5b]">Age</label>
            <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className="authInput text-xs py-1 w-full"
            min={1}
            required
            />
          </div>

          {/* GENDER */}
          <div className="flex flex-col gap-1">
            <label className="text-base text-[#9c7c5b]">Gender</label>
            <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="authInput text-xs py-1 w-full"
            required
            >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            </select>
          </div>
        </div>
        )}

        {/* HEIGHT + WEIGHT ROW */}
        {!isLogin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* HEIGHT */}
          <div className="flex flex-col gap-1">
            <label className="text-base text-[#9c7c5b]">Height (cm)</label>
            <input
              name="height"
              type="number"
              value={form.height}
              onChange={handleChange}
              className="authInput text-xs py-1 w-full"
              min={91}
              max={275}
              required
            />
          </div>

          {/* WEIGHT */}
          <div className="flex flex-col gap-1">
            <label className="text-base text-[#9c7c5b]">Weight (kg)</label>
            <input
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              className="authInput text-xs py-1 w-full"
              min={5}
              required
            />
          </div>

        </div>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className={`
          mt-2 text-xs sm:text-sm font-semibold py-1 sm:py-2
          rounded-xl shadow-lg transition-all duration-300
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-700 to-emerald-500 hover:scale-105"
          }`}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Forgot Password */}
        {isLogin && (
          <p
            className="text-center text-xs sm:text-sm text-blue-400 cursor-pointer hover:text-blue-500 transition"
            onClick={() => {
              if (!form.email) {
                alert("Enter email first to reset password");
                return;
              }
              navigate("/forgot-password", { state: { email: form.email } });
            }}
          >
            Forgot Password?
          </p>
        )}

        {/* Toggle */}
        <p
          className="text-center text-xs sm:text-sm text-gray-300 cursor-pointer hover:text-green-400 transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Create an account"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}