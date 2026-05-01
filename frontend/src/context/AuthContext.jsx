import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      // Ensure user has all required fields
      if (!parsedUser.id || !parsedUser.role) {
        localStorage.removeItem("user");
        return null;
      }
      return parsedUser;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.id && parsedUser.role) {
          setToken(storedToken);
          setUser(parsedUser);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsInitialized(true);
  }, []);

  // Sync localStorage when token/user changes
  useEffect(() => {
    if (!isInitialized) return;
    
    if (token && user && user.id && user.role) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user, isInitialized]);

  const login = (nextToken, nextUser) => {
    // Validate user object has required fields
    if (!nextUser || !nextUser.id || !nextUser.role) {
      console.error("Invalid user object in login:", nextUser);
      return;
    }
    
    setToken(nextToken);
    setUser(nextUser);
    // Also save immediately to localStorage for immediate availability
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({ user, token, login, logout, setUser, setToken, isInitialized }),
    [user, token, isInitialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
