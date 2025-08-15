'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Send, ArrowRight } from 'lucide-react';

export default function WelcomeDemoPage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            New Welcome Screen Design
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Clean, professional, and no unnecessary scrollbars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Before - Old Design */}
          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="high-contrast-text text-red-600">❌ Before: Card-based Layout</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Cards caused height issues and scrollbars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-600">
                <p className="mb-2">Issues with old design:</p>
                <ul className="text-left space-y-1">
                  <li>• Large cards took too much vertical space</li>
                  <li>• Caused scrollbars in welcome screen</li>
                  <li>• Multiple scrollbars looked unprofessional</li>
                  <li>• Less focus on the main message</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* After - New Design */}
          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="high-contrast-text text-green-600">✅ After: Ultra Professional</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Minimal, clean design with professional typography
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-8 min-h-80 flex items-center justify-center border border-gray-100">
                {/* Ultra Professional Welcome Screen Preview */}
                <div className="text-center max-w-lg">
                  <div className="space-y-6">
                    {/* Main Heading */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-light text-gray-900 tracking-tight">
                        Medical AI Assistant
                      </h2>
                      <p className="text-sm text-gray-600 font-normal leading-relaxed">
                        Ask questions about symptoms, treatments, or medical conditions
                      </p>
                    </div>

                    {/* Simple capabilities */}
                    <div className="space-y-2 text-gray-500">
                      <p className="text-xs font-medium">
                        Symptom Analysis • Treatment Information • Health Education
                      </p>
                    </div>

                    {/* Minimal disclaimer */}
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">
                        Educational information only. Consult healthcare professionals for medical advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Input Field Contrast Demo */}
        <div className="mt-12">
          <Card className="enhanced-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="high-contrast-text">Input Field Contrast Fix</CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Enhanced text visibility and contrast
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Demo Input */}
                <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl border border-gray-300 p-4 shadow-xl">
                  <div className="flex items-end gap-4">
                    <Button
                      size="sm"
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 text-gray-600 hover:text-blue-700 shadow-lg"
                      variant="ghost"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>

                    <div className="flex-1 min-w-0 relative">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your medical question here..."
                        className="border-0 bg-transparent p-0 text-base text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[48px] font-medium"
                        style={{ boxShadow: 'none', color: '#111827' }}
                      />
                    </div>

                    <Button
                      size="sm"
                      className={`h-12 w-12 rounded-full transition-all duration-300 shadow-lg ${
                        inputValue.trim()
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Improvements List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">Ultra Professional Design:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Removed all icons and visual clutter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Clean typography with proper hierarchy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Minimal content that fits in viewport</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Professional spacing and layout</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>No logo or branding distractions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">Input Field Improvements:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Dark text color (#111827) for better contrast</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Proper placeholder color (#6b7280)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>CSS !important rules for consistency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Enhanced readability across all themes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}