"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import apiClient, { getToken, setToken, clearToken } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await apiClient.get(endpoints.profile);
      setUser(data.user);
    } catch {
      clearToken();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    if (isLoading) return;
    if (!user && pathname !== "/login") {
      router.replace("/login");
    }
    if (user && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [user, isLoading, pathname, router]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await apiClient.post(endpoints.login, { login: email, password });
      setToken(data.token);
      setUser(data.user);
      router.replace("/dashboard");
      return { success: true };
    } catch (err) {
      return { success: false, message: err instanceof Error ? err.message : "Login failed" };
    }
  }, [router]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    router.replace("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
