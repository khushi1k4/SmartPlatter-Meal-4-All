import './App.css'
import { Route, Routes, Outlet, useLocation } from 'react-router-dom'
import { LanguageProvider } from "./context/LanguageContext"; // ✅ import provider
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Scanner from './pages/Scanner' 
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Toaster } from "react-hot-toast";
import NutriScan from './pages/NutriScan';
import Loader from './pages/Loader';
import { useState, useEffect } from 'react';
import NutriCalculator from './pages/NutriCalculator';

function Layout() {
  const location = useLocation()
  const is404 = location.pathname === '/404' || location.pathname === '*'

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 sec loader

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader onFinish={() => setLoading(false)} />;

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
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
      <NavBar />
      <Outlet />
      {!is404 && <Footer />}
    </>
  )
}

function App() {
  return (
    // ✅ Wrap Routes with LanguageProvider
    <LanguageProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='scanner' element={<Scanner />} />
          <Route path='nutri-scan' element={<NutriScan />} />
          <Route path='nutri-calculator' element={<NutriCalculator />} />
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App