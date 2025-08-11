"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check auth token on mount
    if (typeof window !== "undefined") {
      setIsAuthenticated(Boolean(localStorage.getItem("access_token")));

      // Listen for other tabs/login changes
      const handleStorage = () => {
        setIsAuthenticated(Boolean(localStorage.getItem("access_token")));
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, []);

  const logout = () => {
    apiClient.logout();
    setIsAuthenticated(false);
    router.push("/");
  };

  return { isAuthenticated, logout };
}
