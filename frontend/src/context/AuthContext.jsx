import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../constants/app";
import { readStorage, removeStorage, writeStorage } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.profile, null));
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(readStorage(STORAGE_KEYS.token, "")));

  useEffect(() => {
    if (user) {
      writeStorage(STORAGE_KEYS.profile, user);
    } else {
      removeStorage(STORAGE_KEYS.profile);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      writeStorage(STORAGE_KEYS.token, "demo-token");
    } else {
      removeStorage(STORAGE_KEYS.token);
    }
  }, [isAuthenticated]);

  const login = (email, name) => {
    const profile = {
      id: 1,
      name: name || "Student",
      email: email || "student@example.com",
      role: "student"
    };

    setUser(profile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
