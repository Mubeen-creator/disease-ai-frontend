import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Family Physician',
      content: 'This AI assistant has been incredibly helpful for my patients to understand their conditions better. The information is accurate and well-presented.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Healthcare Student',
      content: 'As a medical student, I find this tool invaluable for learning about various conditions and treatments. The AI responses are comprehensive and educational.',
      rating: 5,
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Patient Advocate',
      content: 'Finally, a reliable source for medical information that\'s easy to understand. It helps me prepare better questions for doctor visits.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users say about their experience with our AI medical assistant
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 relative border border-gray-200 hover:border-primary/20 hover:transform hover:-translate-y-1 group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-300 group-hover:text-blue-400 transition-colors duration-300 drop-shadow-sm" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500 drop-shadow-sm" />
                ))}
              </div>
              
              <p className="text-gray-800 mb-6 leading-relaxed italic font-medium">
                "{testimonial.content}"
              </p>
              
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-700 text-sm font-medium">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}