"use client"
import { Search, FileText, Users, Clock, Shield, Sparkles, Brain, Database, Zap, CheckCircle, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Features() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const features = [
    {
      id: 1,
      icon: Search,
      title: 'Symptom Analysis',
      description: 'Describe your symptoms and get AI-powered analysis of possible conditions and recommendations.',
      color: 'text-blue-600 bg-blue-100',
      details: ['Multi-symptom correlation', 'Severity assessment', 'Risk factor analysis', 'Differential diagnosis'],
    },
    {
      id: 2,
      icon: FileText,
      title: 'Disease Information',
      description: 'Get comprehensive information about diseases, including causes, symptoms, and treatments.',
      color: 'text-green-600 bg-green-100',
      details: ['Detailed pathophysiology', 'Clinical presentations', 'Diagnostic criteria', 'Prognosis information'],
    },
    {
      id: 3,
      icon: Sparkles,
      title: 'Treatment Suggestions',
      description: 'Receive evidence-based treatment options and management strategies for various conditions.',
      color: 'text-purple-600 bg-purple-100',
      details: ['First-line treatments', 'Alternative therapies', 'Lifestyle modifications', 'Follow-up care'],
    },
    {
      id: 4,
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access medical information and guidance whenever you need it, day or night.',
      color: 'text-orange-600 bg-orange-100',
      details: ['Instant responses', 'No appointment needed', 'Global accessibility', 'Multi-language support'],
    },
    {
      id: 5,
      icon: Users,
      title: 'Expert Knowledge',
      description: 'Powered by medical databases and peer-reviewed research from trusted sources.',
      color: 'text-teal-600 bg-teal-100',
      details: ['PubMed integration', 'Clinical guidelines', 'Medical textbooks', 'Research papers'],
    },
    {
      id: 6,
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data is encrypted and secure. We never share your personal information.',
      color: 'text-red-600 bg-red-100',
      details: ['End-to-end encryption', 'HIPAA compliance', 'No data sharing', 'Anonymous processing'],
    },
  ];

  const advancedFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered RAG System',
      description: 'Advanced Retrieval-Augmented Generation searches local medical knowledge base first, then queries PubMed for the latest research.',
      highlight: 'LangGraph Technology',
    },
    {
      icon: Database,
      title: 'Comprehensive Medical Database',
      description: 'Access to over 50,000 medical research papers and 10,000+ documented medical conditions with real-time updates.',
      highlight: 'Always Up-to-Date',
    },
    {
      icon: Zap,
      title: 'Intelligent Query Processing',
      description: 'Smart algorithms understand context, medical terminology, and provide personalized responses based on your specific situation.',
      highlight: 'Context-Aware AI',
    },
  ];

  // Improved auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        if (!isHovered && !isTransitioning) {
          setIsTransitioning(true);
          setCurrentIndex((prevIndex) => {
            return prevIndex >= features.length - 1 ? 0 : prevIndex + 1;
          });
          
          // Reset transitioning state after animation completes
          setTimeout(() => setIsTransitioning(false), 600);
        }
      }, 4000); // Increased to 4 seconds for better UX
    };

    if (!isHovered) {
      startAutoScroll();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, isTransitioning, features.length]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex <= 0 ? features.length - 1 : prevIndex - 1);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex >= features.length - 1 ? 0 : prevIndex + 1);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index:any) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const getCardStyle = (position:any) => {
    const baseStyle = "transition-all duration-700 ease-in-out transform";
    
    switch(position) {
      case -1: // Left card
        return `${baseStyle} w-72 scale-95 opacity-75 z-10 -translate-x-4`;
      case 0: // Center card
        return `${baseStyle} w-80 scale-105 z-20 -translate-y-8 shadow-2xl`;
      case 1: // Right card
        return `${baseStyle} w-72 scale-95 opacity-75 z-10 translate-x-4`;
      default:
        return `${baseStyle} w-72 scale-90 opacity-0 z-0`;
    }
  };

  const getVisibleCards = () => {
    const cards = [];
    
    // Get the three visible cards (left, center, right)
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + features.length) % features.length;
      cards.push({
        ...features[index],
        position: i,
        key: `${features[index].id}-${currentIndex}-${i}`
      });
    }
    
    return cards;
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Better Health
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive medical assistance with cutting-edge technology
          </p>
        </div>

        {/* Main Features Carousel */}
        <div className="relative mb-20 px-4">
          <div
            className="flex justify-center items-end gap-8 h-96 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {getVisibleCards().map((feature) => {
              const isCenter = feature.position === 0;
              return (
                <div
                  key={feature.key}
                  className={getCardStyle(feature.position)}
                >
                  <div className={`group p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 h-full ${
                    isCenter ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                  } transition-all duration-300`}>
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7" />
                    </div>

                    <h3 className={`font-semibold text-gray-900 mb-3 ${isCenter ? 'text-2xl' : 'text-xl'}`}>
                      {feature.title}
                    </h3>

                    <p className={`text-gray-600 leading-relaxed mb-4 ${isCenter ? 'text-base' : 'text-sm'}`}>
                      {feature.description}
                    </p>

                    <div className="space-y-2">
                      {feature.details.slice(0, isCenter ? 4 : 2).map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-xs">{detail}</span>
                        </div>
                      ))}
                      {!isCenter && feature.details.length > 2 && (
                        <div className="text-xs text-gray-400 mt-2">
                          +{feature.details.length - 2} more features
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110 z-30 ${
              isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous features"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110 z-30 ${
              isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next features"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator with Progress */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-scroll indicator */}
          {!isHovered && (
            <div className="flex justify-center mt-4">
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Auto-scrolling • Hover to pause
              </div>
            </div>
          )}
        </div>

        {/* Advanced Features Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced AI Technology
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the cutting-edge technology that powers our medical AI assistant
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding our AI-powered medical assistance process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Describe Your Symptoms</h4>
                  <p className="text-gray-600 text-sm">Tell our AI about your symptoms, concerns, or medical questions in natural language.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
                  <p className="text-gray-600 text-sm">Our LangGraph agents search medical databases and analyze your input using advanced algorithms.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Get Insights</h4>
                  <p className="text-gray-600 text-sm">Receive comprehensive information about possible conditions, treatments, and next steps.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
              <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Powered by Advanced AI
              </h4>
              <p className="text-gray-600 mb-4">
                Our system combines local medical knowledge with real-time PubMed research for the most accurate and up-to-date information.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Response Time:</strong> &lt; 3 seconds<br />
                <strong>Accuracy Rate:</strong> 95%+<br />
                <strong>Data Sources:</strong> 50,000+ papers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;