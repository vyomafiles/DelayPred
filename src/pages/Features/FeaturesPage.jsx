import React, { useEffect, useRef } from 'react';
import { Brain, TrendingDown, Clock, Globe, Smartphone, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

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
    title: 'Ensemble ML Model',
    tag: 'Machine Learning',
    description: 'Random Forest (45%) and LSTM neural network (55%) combined in a weighted ensemble achieving 86% accuracy. Each prediction shows how both models voted separately so you can see the confidence split.',
    stat: '86%', statLabel: 'Ensemble Accuracy',
  },
  {
    num: '02',
    icon: BarChart3,
    title: 'Live TfL Status',
    tag: 'TfL Unified API',
    description: 'Pulls the official TfL Unified API on every prediction — Good Service, Minor Delays, Severe Delays — incorporated directly into the model as a live input signal.',
    stat: '14', statLabel: 'Lines Covered',
  },
  {
    num: '03',
    icon: Globe,
    title: 'Live Weather Integration',
    tag: 'Open-Meteo',
    description: 'Open-Meteo fetches London weather in real time on every request: rain intensity, wind gusts, visibility, snowfall, and humidity. Strong gusts and heavy rain are key delay drivers the model weighs heavily.',
    stat: 'Live', statLabel: 'Weather Data',
  },
  {
    num: '04',
    icon: Clock,
    title: '3-Hour Forecast',
    tag: 'Forward Intelligence',
    description: 'Beyond the current probability, see how delay risk is predicted to evolve over the next 3 hours — useful for deciding when to leave and whether conditions are improving or worsening.',
    stat: '3hr', statLabel: 'Forecast Window',
  },
  {
    num: '05',
    icon: TrendingDown,
    title: 'Network Overview',
    tag: 'All Lines at Once',
    description: 'Refresh all 14 TfL lines simultaneously, ranked by delay risk from highest to lowest. Spot disruptions across the network before you commit to a route.',
    stat: '14', statLabel: 'Lines at a Glance',
  },
  {
    num: '06',
    icon: Smartphone,
    title: 'Save Routes & History',
    tag: 'Personalisation',
    description: 'Pin your regular lines for one-tap prediction. Every result is saved to your history so you can track recurring patterns in your commute over time.',
    stat: '~300ms', statLabel: 'Avg Response Time',
  },
];

const benefits = [
  { title: 'Check Before You Leave', desc: 'Know in seconds whether your line is running normally — before you walk out the door.' },
  { title: 'See the Actual Probability', desc: '"73% delay risk" tells you far more than a vague "Minor Delays" status. Act on a number, not a label.' },
  { title: 'Plan Your Departure Time', desc: 'Use the 3-hour forecast to pick the window when delay risk is lowest and leave at the right moment.' },
  { title: 'Understand What\'s Driving Delays', desc: 'Know whether disruption is weather-driven or an operational fault — so you can judge whether conditions will improve.' },
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
            Six capabilities working together — live TfL status, real-time weather, and an ensemble ML model — to give you an instant, accurate picture of your line right now.
          </p>
          <div className="flex items-center gap-8">
            {[
              { value: '14', label: 'TfL Lines' },
              { value: '86%', label: 'Accuracy' },
              { value: '3hr', label: 'Forecast' },
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
