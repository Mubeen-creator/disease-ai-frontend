"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { useAuth } from "@/app/auth/AuthContext"; // Update import path

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
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated (while redirecting)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">
          AI Medical Assistant
        </h1>
        <p className="text-gray-600">
          Ask me about symptoms, diseases, or treatments
        </p>
      </div>
      <div className="flex-1 bg-gray-50">
        <ChatInterface />
      </div>
    </div>
  );
}