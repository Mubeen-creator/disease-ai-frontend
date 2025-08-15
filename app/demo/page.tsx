'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scrollbar';
import { ThemeToggleButton } from '@/components/ui/theme-toggle';
import { Heart, Star, Zap, Shield, Brain, Database } from 'lucide-react';

export default function DemoPage() {
  const demoCards = [
    {
      title: 'Enhanced Card Design',
      description: 'Cards with improved contrast and visual hierarchy',
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Custom Scrollbars',
      description: 'Black background with white carousel scrollbars',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Better Typography',
      description: 'High contrast text with improved readability',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Interactive Elements',
      description: 'Enhanced buttons, inputs, and select components',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const longContent = Array.from({ length: 50 }, (_, i) => (
    `This is line ${i + 1} of scrollable content. The custom scrollbar has a black background with white carousel for better visibility and modern aesthetics.`
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">UI Enhancement Demo</h1>
            <ThemeToggleButton />
          </div>
          <p className="text-xl text-gray-700 font-medium">
            Showcasing enhanced card designs, custom scrollbars, and improved contrast
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {demoCards.map((card, index) => (
            <Card key={index} className="enhanced-card group">
              <CardHeader>
                <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <card.icon className={`w-6 h-6 ${card.color} drop-shadow-sm`} />
                </div>
                <CardTitle className="high-contrast-text group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Form Elements Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="high-contrast-text flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Enhanced Form Elements
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Custom styled inputs and selects with improved contrast
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Enhanced Input</label>
                <Input 
                  placeholder="Type something here..." 
                  className="enhanced-input"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Custom Select</label>
                <Select>
                  <SelectTrigger className="custom-select">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="enhanced-button w-full">
                Enhanced Button
              </Button>
            </CardContent>
          </Card>

          {/* Custom Scrollbar Demo */}
          <Card className="enhanced-card">
            <CardHeader>
              <CardTitle className="high-contrast-text flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Custom Scrollbar Demo
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">
                Black background with white carousel scrollbar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 w-full rounded-md border border-gray-200 p-4">
                <div className="space-y-2">
                  {longContent.map((line, index) => (
                    <p key={index} className="text-sm text-gray-700 font-medium leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Color Contrast Examples */}
        <Card className="enhanced-card mb-12">
          <CardHeader>
            <CardTitle className="high-contrast-text text-center">
              Color Contrast Examples
            </CardTitle>
            <CardDescription className="text-center text-gray-700 font-medium">
              Demonstrating improved text contrast and visual hierarchy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Primary Colors</h3>
                <p className="text-blue-800 font-medium">Enhanced contrast for better readability</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm">
                <h3 className="text-xl font-bold text-green-900 mb-2">Success Colors</h3>
                <p className="text-green-800 font-medium">Improved visibility and accessibility</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 shadow-sm">
                <h3 className="text-xl font-bold text-purple-900 mb-2">Accent Colors</h3>
                <p className="text-purple-800 font-medium">Better contrast ratios for all users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-700 font-medium">
            All enhancements include improved accessibility, better contrast ratios, and modern design patterns.
          </p>
        </div>
      </div>
    </div>
  );
}