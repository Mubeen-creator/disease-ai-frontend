"use client";

import { useAuth } from "@/app/auth/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, Loader2, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const AuthButtonsDesktop = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-2 px-4 py-2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            <span className="text-sm text-gray-500 hidden sm:inline font-medium">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="hidden lg:flex items-center space-x-3">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" prefetch={false}>
              <Button
                className="bg-black hover:bg-gray-800 text-white border border-black shadow-sm hover:shadow-md transition-all duration-200 font-medium px-6 py-2 h-10 rounded-lg"
              >
                <Activity className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/profile" prefetch={false}>
              <Button
                variant="outline"
                className="text-white hover:text-black hover:bg-gray-50 border-gray-300 hover:border-gray-400 transition-all duration-200 font-medium px-6 py-2 h-10 rounded-lg"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button
              onClick={logout}
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-black border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200 font-medium px-6 py-2 h-10 rounded-lg"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login" prefetch={false}>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200 font-medium px-6 py-2 h-10 rounded-lg"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup" prefetch={false}>
              <Button
                className="bg-black hover:bg-gray-800 text-white border border-black shadow-sm hover:shadow-md transition-all duration-200 font-medium px-8 py-2 h-10 rounded-lg"
              >
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    );
  };

  const MobileMenu = () => (
    <div
      className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
        isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeMobileMenu}
      />

      {/* Menu Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-black" />
              <span className="text-xl font-bold text-black">MedAI</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeMobileMenu}
              className="hover:bg-gray-200 p-2 rounded-lg"
            >
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-6 space-y-3 bg-white">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-600 font-medium">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link href="/dashboard" prefetch={false} onClick={closeMobileMenu}>
                  <Button
                    className="w-full bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md transition-all duration-200 justify-start text-left h-12 rounded-lg font-medium"
                  >
                    <Activity className="h-5 w-5 mr-3" />
                    Dashboard
                  </Button>
                </Link>

                <Link href="/dashboard/profile" prefetch={false} onClick={closeMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 hover:bg-gray-50 border-gray-300 hover:border-gray-400 transition-all duration-200 rounded-lg font-medium text-gray-700 hover:text-black"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile Settings
                  </Button>
                </Link>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 hover:text-black border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200 justify-start text-left h-12 rounded-lg font-medium"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" prefetch={false} onClick={closeMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-12 hover:bg-gray-50 border-gray-300 hover:border-gray-400 transition-all duration-200 rounded-lg font-medium text-gray-700 hover:text-black"
                  >
                    Sign In to Account
                  </Button>
                </Link>

                <Link href="/auth/signup" prefetch={false} onClick={closeMobileMenu}>
                  <Button
                    className="w-full bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md transition-all duration-200 justify-start text-left h-12 rounded-lg font-medium"
                  >
                    Create New Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`border-b sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-xl shadow-sm border-gray-300"
            : "bg-white/95 backdrop-blur-md border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 group">
                <Image src="/logo2.png" alt="Logo" width={70} height={70} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            {showAuthButtons && <AuthButtonsDesktop />}

            {/* Mobile Menu Button */}
            {showAuthButtons && (
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="hover:bg-gray-100 transition-all duration-200 p-2 rounded-lg"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showAuthButtons && <MobileMenu />}
    </>
  );
}