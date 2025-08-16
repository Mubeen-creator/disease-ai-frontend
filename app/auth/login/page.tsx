"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/auth/AuthContext";
import { Header } from '@/components/common/Header';
import LoginForm from '@/components/auth/LoginForm';
import { LoadingScreen } from '@/components/ui/loading';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Don't render login page if already authenticated (AuthContext will handle redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header showAuthButtons={false} />
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <LoginForm />
      </div>
    </main>
  );
}