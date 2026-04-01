import "./App.css";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";   // ⭐ ADD THIS
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Scanner from "./pages/Scanner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import NutriScan from "./pages/NutriScan";
import Loader from "./pages/Loader";
import { useState, useEffect } from "react";
import NutriCalculator from "./pages/NutriCalculator";
import ReportAnalysis from "./pages/ReportAnalysis";
import LoginForm from "./pages/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// 🔹 Layout (Navbar + Footer wrapper)
function Layout() {
  const location = useLocation();
  const is404 = location.pathname === "/404" || location.pathname === "*";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <NavBar />
      <Outlet />
      {!is404 && <Footer />}
    </>
  );
}


function App() {
  return (
    <LanguageProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#166535",
            padding: "16px 20px",
            fontSize: "12px",
            borderRadius: "14px",
          },
        }}
      />
      <Routes>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="nutri-scan" element={<NutriScan />} />
          <Route path="nutri-calculator" element={<NutriCalculator />} />
          <Route path="report-analysis" element={<ReportAnalysis />} />
          <Route path="*" element={<NoPage />} />
        </Route>

      </Routes>
    </LanguageProvider>
  );
}

export default App;