"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, Loader2, Menu, X, User, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const router = useRouter();
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
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-gray-600 hidden sm:inline">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="hidden lg:flex items-center space-x-2">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" prefetch={false}>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
              >
                <Activity className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </Link>
            <Link href="/dashboard/profile" prefetch={false}>
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link href="/dashboard/settings" prefetch={false}>
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button 
              onClick={logout} 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
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
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 font-medium"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/signup" prefetch={false}>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium px-6"
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
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
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">MedAI</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeMobileMenu}
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-6 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link href="/dashboard" prefetch={false} onClick={closeMobileMenu}>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 justify-start text-left h-12"
                  >
                    <Activity className="h-5 w-5 mr-3" />
                    Chat Dashboard
                  </Button>
                </Link>
                
                <Link href="/dashboard/profile" prefetch={false} onClick={closeMobileMenu}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left h-12 hover:bg-gray-100 transition-all duration-200"
                  >
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    Profile Settings
                  </Button>
                </Link>
                
                <Link href="/dashboard/settings" prefetch={false} onClick={closeMobileMenu}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left h-12 hover:bg-gray-100 transition-all duration-200"
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-500" />
                    App Settings
                  </Button>
                </Link>
                
                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 justify-start text-left h-12"
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
                    variant="ghost" 
                    className="w-full justify-start text-left h-12 hover:bg-gray-100 transition-all duration-200"
                  >
                    Sign In to Account
                  </Button>
                </Link>
                
                <Link href="/auth/signup" prefetch={false} onClick={closeMobileMenu}>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 justify-start text-left h-12"
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
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-gray-200/50"
            : "bg-white/80 backdrop-blur-md border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 transform hover:scale-105"
            >
              <div className="p-1 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                <Activity className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-1">
                <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  MedAI
                </span>
                <span className="text-sm sm:text-lg font-medium text-gray-600 leading-tight">
                  Assistant
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {showAuthButtons && <AuthButtonsDesktop />}

            {/* Mobile Menu Button */}
            {showAuthButtons && (
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="hover:bg-gray-100 transition-all duration-200 p-2"
                >
                  <Menu className="h-6 w-6" />
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