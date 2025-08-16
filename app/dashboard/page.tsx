"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatDashboard } from "@/components/dashboard/ChatDashboard";
import { useAuth } from "@/app/auth/AuthContext";
import { LoadingScreen } from "@/components/ui/loading";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Only redirect if we're done loading and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Don't render dashboard if not authenticated (while redirecting)
  if (!isAuthenticated) {
    return null;
  }

  return <ChatDashboard />;
}
