import Link from 'next/link';
import { Activity, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">MedAI Assistant</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted AI-powered medical assistant providing accurate health information and guidance.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link href="/docs" className="block text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/auth/signup" className="block text-gray-400 hover:text-white transition-colors">
                Get Started
              </Link>
              <Link href="#features" className="block text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <div className="space-y-3">
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/disclaimer" className="block text-gray-400 hover:text-white transition-colors">
                Medical Disclaimer
              </Link>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3" />
                support@medai.com
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 MedAI Assistant. All rights reserved.
          </p>
          <div className="text-gray-400 text-sm">
            <strong className="text-yellow-400">Medical Disclaimer:</strong> This AI assistant provides educational information only and is not a substitute for professional medical advice.
          </div>
        </div>
      </div>
    </footer>
  );
}