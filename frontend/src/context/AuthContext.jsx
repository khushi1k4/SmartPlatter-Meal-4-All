import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/AuthApi"; // adjust path if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        const res = await API.get("/auth/me"); // ⭐ fixed
        setUser(res.data);
      } catch (err) {
        console.log("Failed to fetch user:", err);
        localStorage.removeItem("token"); // optional safety
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);

    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.log("Failed to fetch user after login", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export a hook for easy access in components
export const useAuth = () => useContext(AuthContext);