"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check auth token on mount
    if (typeof window !== "undefined") {
      const hasToken = Boolean(localStorage.getItem("access_token"));
      setIsAuthenticated(hasToken);
      setIsLoading(false);

      // Listen for other tabs/login changes
      const handleStorage = () => {
        const hasToken = Boolean(localStorage.getItem("access_token"));
        setIsAuthenticated(hasToken);
      };
      
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    apiClient.logout();
    setIsAuthenticated(false);
    router.push("/");
  }, [router]);

  return { isAuthenticated, logout, isLoading };
}