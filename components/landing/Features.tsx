import { Search, FileText, Users, Clock, Shield, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Search,
      title: 'Symptom Analysis',
      description: 'Describe your symptoms and get AI-powered analysis of possible conditions and recommendations.',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: FileText,
      title: 'Disease Information',
      description: 'Get comprehensive information about diseases, including causes, symptoms, and treatments.',
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: Sparkles,
      title: 'Treatment Suggestions',
      description: 'Receive evidence-based treatment options and management strategies for various conditions.',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access medical information and guidance whenever you need it, day or night.',
      color: 'text-orange-600 bg-orange-100',
    },
    {
      icon: Users,
      title: 'Expert Knowledge',
      description: 'Powered by medical databases and peer-reviewed research from trusted sources.',
      color: 'text-teal-600 bg-teal-100',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data is encrypted and secure. We never share your personal information.',
      color: 'text-red-600 bg-red-100',
    },
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}