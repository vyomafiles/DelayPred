import React from 'react';
import { Search, Zap, BarChart3, CheckCircle, ArrowRight, Brain, Database, Cpu } from 'lucide-react';

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">How TransitPredict Works</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Understand the technology behind accurate delay predictions
          </p>
        </div>
      </section>

      {/* User Journey */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">4-Step Prediction Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              {
                number: '1',
                icon: <Search className="w-8 h-8" />,
                title: 'Enter Your Route',
                desc: 'Select departure, destination, and time. Our system finds all transport options.'
              },
              {
                number: '2',
                icon: <Database className="w-8 h-8" />,
                title: 'Data Collection',
                desc: 'System gathers real-time data: weather, special events, historical patterns.'
              },
              {
                number: '3',
                icon: <Brain className="w-8 h-8" />,
                title: 'ML Analysis',
                desc: 'Models process 50+ factors to predict delay probability and magnitude.'
              },
              {
                number: '4',
                icon: <CheckCircle className="w-8 h-8" />,
                title: 'Get Results',
                desc: 'Receive probability scores, delay estimates, and smart recommendations.'
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
                {idx < 3 && <div className="hidden md:flex absolute right-0 top-12 text-blue-300"><ArrowRight className="w-6 h-6" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Technology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Machine Learning</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Random Forest Models</li>
                <li>• LSTM Neural Networks</li>
                <li>• Real-time Model Updates</li>
                <li>• Continuous Learning</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Sources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• TfL Unified API</li>
                <li>• Weather APIs</li>
                <li>• Historical Transport Data</li>
                <li>• Event Databases</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-14 h-14 rounded-lg flex items-center justify-center text-white mb-4">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Infrastructure</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Cloud-based Processing</li>
                <li>• Real-time Predictions</li>
                <li>• 99.9% Uptime SLA</li>
                <li>• Secure Data Handling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Prediction Accuracy</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">68%</div>
              <p className="text-blue-100">Current Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Data Factors</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">&lt;500ms</div>
              <p className="text-blue-100">Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Availability</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
