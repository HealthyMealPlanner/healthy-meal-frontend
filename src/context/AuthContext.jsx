import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  // =========================
  // Login
  // =========================
  const login = (newToken) => {
    if (!newToken) return;

    localStorage.setItem("token", newToken);

    setToken(newToken);
    setIsAuthenticated(true);
  };

  // =========================
  // Logout
  // =========================
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// useAuth Hook
// =========================
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}