import React from 'react';
import { Award, Users, Target, Lightbulb, Heart, Globe } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">About TransitPredict</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Transforming UK transport with AI-powered delay predictions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            To empower UK commuters with predictive transport intelligence, allowing them to plan smarter journeys and reclaim valuable time. We believe transport delays shouldn't catch you off guard—they should be predicted, planned for, and avoided.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg">
            <p className="text-lg text-gray-700">
              Unlike existing apps that tell you about delays <strong>after they happen</strong>, TransitPredict predicts delays <strong>before they occur</strong>, giving you time to adjust your plans.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: 'Accuracy',
                desc: 'We strive for the highest prediction accuracy using cutting-edge ML'
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: 'User-Centric',
                desc: 'Every decision is made with commuters\' needs at the center'
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: 'Transparency',
                desc: 'We show probabilities, not vague estimates'
              },
              {
                icon: <Lightbulb className="w-10 h-10" />,
                title: 'Innovation',
                desc: 'Constantly pushing boundaries in transport tech'
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: 'Reliability',
                desc: '99.9% uptime and always available when you need us'
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: 'Excellence',
                desc: 'Delivering premium service at accessible prices'
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md">
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">About the Team</h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TransitPredict is a BSc Computer Science AI final year project developed at a top UK university. Our team combines expertise in:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Machine Learning</h3>
                <p className="text-gray-700">Developing and training advanced prediction models using real TfL data</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Software Engineering</h3>
                <p className="text-gray-700">Building scalable, reliable systems for millions of predictions</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Data Science</h3>
                <p className="text-gray-700">Analyzing transport patterns and extracting actionable insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Impact Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">2.5K+</div>
              <p className="text-blue-100">Active Users</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">15K+</div>
              <p className="text-blue-100">Predictions Daily</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+ Hours</div>
              <p className="text-blue-100">Time Saved Monthly</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8/5</div>
              <p className="text-blue-100">User Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
