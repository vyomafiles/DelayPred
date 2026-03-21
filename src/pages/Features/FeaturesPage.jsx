import React, { useEffect, useRef } from 'react';
import { Brain, TrendingDown, Clock, AlertTriangle, Smartphone, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

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

const features = [
  {
    num: '01',
    icon: Brain,
    title: 'ML-Powered Predictions',
    tag: 'Machine Learning',
    description: 'Random Forest and LSTM neural networks trained on years of TfL data analyse 50+ factors — historical patterns, weather, time of day, special events — to forecast delays before they happen.',
    stat: '50+', statLabel: 'Factors Analysed',
  },
  {
    num: '02',
    icon: TrendingDown,
    title: 'Probability-Based Insights',
    tag: 'Precision Scores',
    description: 'See exact delay probabilities, not vague warnings. "68% chance of a 10-minute delay on the Piccadilly line" gives you something to act on.',
    stat: '~68%', statLabel: 'Current Accuracy',
  },
  {
    num: '03',
    icon: Clock,
    title: 'Proactive Planning',
    tag: 'Forward Intelligence',
    description: 'Predictions are available 24–48 hours before your journey. Adjust your departure, pick an alternative route, or simply leave earlier — with data behind your decision.',
    stat: '48hr', statLabel: 'Look-ahead Window',
  },
  {
    num: '04',
    icon: AlertTriangle,
    title: 'Real-Time Alerts',
    tag: 'Live Notifications',
    description: 'Push, SMS, and email alerts fire the moment a prediction changes — so you stay one step ahead of the network, wherever you are.',
    stat: '<30s', statLabel: 'Alert Latency',
  },
  {
    num: '05',
    icon: Smartphone,
    title: 'Fully Responsive',
    tag: 'Cross-Platform',
    description: 'Works seamlessly on every screen size today. Native iOS and Android apps with offline support and biometric authentication are coming soon.',
    stat: '100%', statLabel: 'Device Coverage',
  },
  {
    num: '06',
    icon: BarChart3,
    title: 'Official TfL Integration',
    tag: 'TfL Unified API',
    description: 'Connected directly to the official TfL Unified API — real, live data across every Underground line, Overground, Elizabeth line, DLR, and bus network.',
    stat: 'TfL', statLabel: 'Authoritative Source',
  },
];

const benefits = [
  { title: 'Save Time', desc: 'Avoid delays and plan smarter. Save up to 2.5 hours per month.' },
  { title: 'Reduce Stress', desc: 'No more surprises. Know what to expect and plan accordingly.' },
  { title: 'Stay Productive', desc: 'Arrive on time, every time. Keep your schedule on track.' },
  { title: 'Decide with Data', desc: 'Make travel choices based on real probabilities, not guesswork.' },
];

export function FeaturesPage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [gridRef, gridVisible] = useInView(0.05);
  const [benefitsRef, benefitsVisible] = useInView(0.1);

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
            Platform Capabilities
          </p>
          <h1 className="font-display font-semibold text-slate-900 leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Everything you need,{' '}
            <em className="text-blue-600">before you travel.</em>
          </h1>
          <p className="text-[1rem] text-slate-500 font-light leading-relaxed max-w-xl mb-10">
            Six capabilities working together to give you certainty on every journey — powered by live TfL data and machine learning trained on years of network history.
          </p>
          <div className="flex items-center gap-8">
            {[
              { value: '6', label: 'Core Features' },
              { value: '50+', label: 'ML Factors' },
              { value: '48hr', label: 'Look-ahead' },
            ].map(({ value, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="w-px h-10 bg-slate-200 flex-shrink-0" />}
                <div>
                  <div className="font-display font-semibold text-slate-900 text-2xl leading-none">{value}</div>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-semibold uppercase tracking-widest">{label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES LIST */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50">
        <div
          ref={gridRef}
          className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.num} className="bg-white p-8 flex gap-6 group hover:bg-slate-50/80 transition-colors duration-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{f.num}</span>
                      <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">{f.tag}</span>
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 text-xl mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{f.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-semibold text-blue-600 text-2xl leading-none">{f.stat}</span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{f.statLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-6 lg:px-8 bg-white border-t border-slate-100">
        <div
          ref={benefitsRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Why it matters</p>
            <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight">
              Real outcomes for <em>real commuters.</em>
            </h2>
          </div>
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-4 p-6 border border-slate-200 rounded-xl bg-white hover:border-blue-100 hover:bg-blue-50/30 transition-colors duration-200">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <h3 className="font-display font-semibold text-slate-900 text-lg mb-1">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors duration-200 group"
            >
              Start predicting free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
