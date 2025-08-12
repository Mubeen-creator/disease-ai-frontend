"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Shield, Zap, Play } from 'lucide-react';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Medical background images (replace with your actual image URLs)
  const slides = [
    {
      image: 'https://thumbs.dreamstime.com/b/i-robot-doctor-taking-care-patient-concept-futuristic-healthcare-artificial-intelligence-medicine-human-380237104.jpg', // Replace with actual medical image
      alt: 'Modern hospital with advanced technology'
    },
    {
      image: 'https://digitalsforhealth.co.uk/wp-content/uploads/2023/07/Will-robots-replace-doctors-1024x683.jpg', // Replace with actual medical image
      alt: 'AI technology in healthcare'
    },
    {
      image: 'https://www.wddty.com/wp-content/uploads/2024/05/robot-doctor.jpg', // Replace with actual medical image
      alt: 'Medical professionals using technology'
    },
    {
      image: 'https://media.istockphoto.com/id/1772875753/vector/artificial-intelligence-in-healthcare-concept.jpg?s=612x612&w=0&k=20&c=0g4N0KN2c0XVFDgn3SmAer_dHyEGw-NzyXxcIxZDDzs=', // Replace with actual medical image
      alt: 'Digital health innovation'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      {/* Full-screen Hero Section with Image Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full opacity-50 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/6 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-bounce delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-70 animate-pulse delay-2000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-[80%] object-cover flex items-center justify-center mt-10">
          <div className="container mx-auto px-6 text-center text-white">
            {/* AI Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-medium mb-8 hover:bg-white/15 transition-all duration-300">
              <Bot className="w-4 h-4 mr-2" />
              <span className="bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                AI-Powered Medical Assistant
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block">Your Personal</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent animate-gradient-x">
                Medical AI Assistant
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Experience the future of healthcare with instant, accurate medical insights. 
              Analyze symptoms, discover treatments, and understand diseases with the power of AI.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-10 py-4 rounded-full shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group border-0 min-w-[280px]"
                >
                  <Play className="mr-3 h-5 w-5" />
                  Start Your Consultation
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-10 py-4 rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 min-w-[240px]"
                >
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Separate Feature Cards Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Assistant?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience cutting-edge medical AI technology designed to provide accurate, reliable healthcare information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Lightning Fast Card */}
            <div className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant medical insights powered by advanced AI algorithms. No waiting, no delays - just immediate, accurate responses to your health questions.
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            {/* AI-Powered Card */}
            <div className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered</h3>
                <p className="text-gray-600 leading-relaxed">
                  Leverage cutting-edge artificial intelligence trained on vast medical databases to provide comprehensive, evidence-based health information.
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-100 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            {/* Secure & Private Card */}
            <div className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your health information is protected with enterprise-grade security. Complete privacy and confidentiality guaranteed at every interaction.
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-100 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}