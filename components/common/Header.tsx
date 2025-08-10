'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity, Menu, X } from 'lucide-react';

interface HeaderProps {
  showAuthButtons?: boolean;
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Activity className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">MedAI Assistant</span>
        </Link>
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/docs" className="text-gray-600 hover:text-blue-600 transition-colors">
            Documentation
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
        </nav>

        {showAuthButtons && (
          <div className="flex items-center space-x-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/docs" 
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link 
              href="#features" 
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#about" 
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            {showAuthButtons && (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}