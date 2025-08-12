"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, Loader2 } from "lucide-react";

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const router = useRouter();
  const { isAuthenticated, logout, isLoading } = useAuth();

  const AuthButtonsDesktop = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-3">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" prefetch={false}>
              <Button className="bg-blue-600 hover:bg-blue-700">Chat</Button>
            </Link>
            <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login" prefetch={false}>
              <Button variant="ghost" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup" prefetch={false}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get&nbsp;Started
              </Button>
            </Link>
          </>
        )}
      </div>
    );
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Activity className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">
            MedAI&nbsp;Assistant
          </span>
        </Link>

        {showAuthButtons && <AuthButtonsDesktop />}
      </div>
    </header>
  );
}