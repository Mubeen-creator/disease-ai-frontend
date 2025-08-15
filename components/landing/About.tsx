'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Shield, Users, Award, Globe } from 'lucide-react';

export function About() {
  const stats = [
    { label: 'Medical Conditions', value: '10,000+', icon: Database },
    { label: 'Research Papers', value: '50,000+', icon: Brain },
    { label: 'Users Helped', value: '100,000+', icon: Users },
    { label: 'Countries', value: '50+', icon: Globe },
  ];

  const achievements = [
    {
      title: 'Advanced AI Technology',
      description: 'Powered by state-of-the-art LangGraph agents and RAG (Retrieval-Augmented Generation) for accurate medical information.',
      icon: Brain,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Evidence-Based Medicine',
      description: 'All information is sourced from peer-reviewed medical literature and trusted databases like PubMed.',
      icon: Award,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Privacy & Security',
      description: 'Your health information is protected with enterprise-grade encryption and privacy-first design.',
      icon: Shield,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Global Accessibility',
      description: 'Available 24/7 worldwide, breaking down barriers to quality health information access.',
      icon: Globe,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            About MedAI Assistant
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Revolutionizing Healthcare Information Access
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MedAI Assistant combines cutting-edge artificial intelligence with comprehensive medical knowledge 
            to provide instant, accurate health information. Our platform bridges the gap between complex 
            medical literature and accessible health guidance.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-primary/20">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-blue-700 drop-shadow-sm" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We believe everyone deserves access to reliable, understandable health information. 
              Our AI-powered platform democratizes medical knowledge, helping people make informed 
              decisions about their health while emphasizing the importance of professional medical care.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="font-bold text-gray-900 mb-2">Accessibility</h4>
                <p className="text-sm text-gray-700 font-medium">Making medical information accessible to everyone, regardless of location or background.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="font-bold text-gray-900 mb-2">Accuracy</h4>
                <p className="text-sm text-gray-700 font-medium">Providing evidence-based information sourced from trusted medical databases and research.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="font-bold text-gray-900 mb-2">Empowerment</h4>
                <p className="text-sm text-gray-700 font-medium">Empowering individuals to better understand their health and communicate with healthcare providers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-primary/20 hover:transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${achievement.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Powered by Advanced Technology</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['LangGraph AI Agents', 'RAG Technology', 'PubMed Integration', 'Natural Language Processing', 'Machine Learning', 'Cloud Infrastructure'].map((tech, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}