import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, MapPin, Send, ArrowRight, ChevronDown } from 'lucide-react';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const faqs = [
  {
    q: 'How accurate are your predictions?',
    a: 'Our current model achieves 68% accuracy. We continuously improve by analysing prediction outcomes and retraining on new TfL data.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use enterprise-grade encryption and follow GDPR compliance standards. Your journey data is never sold to third parties.',
  },
  {
    q: 'Which transport networks are supported?',
    a: "We currently support TfL across all lines — Underground, Overground, Elizabeth line, DLR, and buses. UK-wide expansion is planned.",
  },
  {
    q: 'Can I plan trips weeks in advance?',
    a: 'For short-term trips (24–48 hours) we provide live predictions. For longer horizons we provide historical averages and trend data.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50/80 transition-colors duration-200"
      >
        <span className="font-display font-semibold text-slate-900 text-[1rem] pr-4">{q}</span>
        <ChevronDown
          className="w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? '200px' : '0px' }}
      >
        <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{a}</p>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const [heroRef, heroVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.1);
  const [formRef, formVisible] = useInView(0.05);
  const [faqRef, faqVisible] = useInView(0.05);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputClass = "w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200";

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-white py-20 px-6 lg:px-8 overflow-hidden border-b border-slate-100">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.4,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, white 100%)' }}
        />
        <div
          ref={heroRef}
          className={`relative max-w-7xl mx-auto transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-5">
            Contact
          </p>
          <h1 className="font-display font-semibold text-slate-900 leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            We'd love to <em className="text-blue-600">hear from you.</em>
          </h1>
          <p className="text-[1rem] text-slate-500 font-light leading-relaxed max-w-xl">
            Questions about predictions, the platform, or just want to say hello? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="py-16 px-6 lg:px-8 bg-slate-50 border-b border-slate-100">
        <div
          ref={cardsRef}
          className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {[
              {
                icon: Mail,
                title: 'Email',
                detail: 'hello@vyoma.ai',
                sub: 'Response within 24 hours',
              },
              {
                icon: MessageSquare,
                title: 'Live Chat',
                detail: 'Mon–Fri, 9am–6pm GMT',
                sub: 'Average wait under 2 minutes',
              },
              {
                icon: MapPin,
                title: 'Location',
                detail: 'London, United Kingdom',
                sub: 'Based in the heart of London',
              },
            ].map(({ icon: Icon, title, detail, sub }) => (
              <div key={title} className="bg-white p-8 flex gap-5 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-blue-600" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-slate-900 text-lg mb-1">{title}</h3>
                  <p className="text-sm text-slate-700 font-medium mb-0.5">{detail}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + FAQ */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* FORM */}
          <div
            ref={formRef}
            className={`transition-all duration-700 ease-out ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Send a Message</p>
            <h2 className="font-display font-semibold text-slate-900 text-3xl lg:text-4xl leading-tight mb-8">
              Get in <em>touch.</em>
            </h2>

            {submitted ? (
              <div className="border border-blue-100 bg-blue-50 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-xl mb-2">Message sent!</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                <div className="p-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <div className="px-7 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">We respond within 24 hours.</p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors duration-200 group flex-shrink-0"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div
            ref={faqRef}
            className={`transition-all duration-700 ease-out delay-100 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Common Questions</p>
            <h2 className="font-display font-semibold text-slate-900 text-3xl lg:text-4xl leading-tight mb-8">
              FAQs.
            </h2>
            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <FaqItem key={idx} q={item.q} a={item.a} />
              ))}
            </div>

            <div className="mt-8 p-6 border border-slate-200 rounded-xl bg-slate-50">
              <p className="text-sm font-semibold text-slate-700 mb-1">Still have questions?</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Can't find what you're looking for? Send us a message and we'll help you out.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
