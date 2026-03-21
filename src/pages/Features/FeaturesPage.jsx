import React from 'react';
import { Brain, TrendingDown, Clock, AlertTriangle, Smartphone, BarChart3, CheckCircle } from 'lucide-react';

export function FeaturesPage() {
  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Advanced ML Predictions',
      description: 'Our machine learning models analyze 50+ factors including historical delays, weather patterns, time of day, special events, and more to provide accurate predictions.',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      longDescription: 'Using Random Forest and LSTM neural networks trained on years of TfL data, our models continuously learn and improve prediction accuracy.'
    },
    {
      icon: <TrendingDown className="w-12 h-12" />,
      title: 'Probability-Based Insights',
      description: 'See exact delay probabilities instead of vague estimates. Know the likelihood and magnitude of potential delays.',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      longDescription: 'Unlike traditional apps, we show you "68% chance of 10-minute delay" instead of just "Service may be disrupted".'
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'Proactive Planning',
      description: 'Know delays BEFORE they happen. Adjust your schedule, take alternate routes, or leave earlier with confidence.',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      longDescription: 'Get predictions 24-48 hours in advance for planned journeys and instant alerts for unexpected changes.'
    },
    {
      icon: <AlertTriangle className="w-12 h-12" />,
      title: 'Real-Time Alerts',
      description: 'Receive instant notifications when predictions change, keeping you informed throughout your commute.',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      longDescription: 'Push notifications, SMS, and email alerts ensure you never miss an important prediction update.'
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: 'Fully Mobile App',
      description: 'Responsive design works seamlessly on all devices. Check predictions on the go with an intuitive interface.',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      longDescription: 'Native iOS and Android apps coming soon with offline support and biometric authentication.'
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'TfL Integration',
      description: 'Connected to official TfL Unified API for real-time data across London\'s entire transport network.',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      longDescription: 'Direct integration with official sources ensures data accuracy and compliance with TfL standards.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Powerful Features</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Advanced AI technology that transforms how you plan your transport
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-8 border border-gray-100">
                <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-500 italic border-t pt-4">
                  {feature.longDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose TransitPredict?</h2>
          <div className="space-y-6">
            {[
              { title: 'Save Time', desc: 'Avoid delays and plan smarter journeys. Save up to 2.5 hours per month.' },
              { title: 'Reduce Stress', desc: 'No more surprises. Know what to expect and plan accordingly.' },
              { title: 'Improve Productivity', desc: 'Arrive on time, every time. Keep your schedule on track.' },
              { title: 'Data-Driven Decisions', desc: 'Make travel choices based on real probabilities, not guesses.' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border-l-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
