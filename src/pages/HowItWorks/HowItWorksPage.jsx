import React, { useEffect, useRef } from 'react';
import { Search, Database, Brain, CheckCircle, ArrowRight, Cpu } from 'lucide-react';

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

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Pick a Line',
    desc: 'Select one of 14 TfL lines from a dropdown — Bakerloo, Central, Circle, District, Hammersmith & City, Jubilee, Metropolitan, Northern, Piccadilly, Victoria, Waterloo & City, Elizabeth, Overground, or DLR — then click Predict.',
    tags: ['Line Selection', '14 TfL Lines', 'One Click'],
  },
  {
    number: '02',
    icon: Database,
    title: 'Live Data Fetched',
    desc: 'The model server simultaneously pulls two live sources in parallel: TfL Unified API for current service status on that line, and Open-Meteo for current London weather (temperature, rainfall, wind speed, gusts, visibility, snowfall, humidity). Both are fetched fresh on every single prediction — nothing is cached.',
    tags: ['TfL Unified API', 'Open-Meteo', 'Parallel Fetch'],
  },
  {
    number: '03',
    icon: Brain,
    title: 'Ensemble Model Runs',
    desc: 'A Random Forest (45% weight) and LSTM neural network (55% weight) both analyse the live inputs independently. Their outputs are combined into a weighted ensemble probability. Peak hour status is also factored in. Total compute: ~300ms.',
    tags: ['Random Forest 45%', 'LSTM 55%', 'Peak Hour', '~300ms'],
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Results Delivered',
    desc: 'You receive delay probability (0–100%), severity class (Low / Moderate / High), TfL live status, weather summary, peak hour indicator, RF vs LSTM individual votes, and a 3-hour forecast showing how risk evolves. The result is automatically saved to your prediction history.',
    tags: ['Probability', 'Severity', '3-Hour Forecast', 'Saved to History'],
  },
];

const techCards = [
  {
    icon: Brain,
    title: 'Machine Learning',
    items: ['Random Forest Classifier (45% weight)', 'LSTM Neural Network (55% weight)', 'Weighted ensemble output', 'Trained on historical TfL delay data'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Database,
    title: 'Live Data Sources',
    items: ['TfL Unified API (service status, live)', 'Open-Meteo (London weather, live)', 'Both fetched in parallel per request', 'No caching — always fresh'],
    color: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
  },
  {
    icon: Cpu,
    title: 'Infrastructure',
    items: ['Model hosted on HuggingFace Spaces', 'React 18 + Vite frontend', 'Supabase (auth + prediction history)', '~300ms average response'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
];

const stats = [
  { value: '86%', label: 'Ensemble Accuracy' },
  { value: '89%', label: 'Random Forest Accuracy' },
  { value: '~300ms', label: 'Avg Response Time' },
  { value: '14', label: 'TfL Lines Covered' },
];

export function HowItWorksPage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [stepsRef, stepsVisible] = useInView(0.05);
  const [techRef, techVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.1);

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
            Technical Overview
          </p>
          <h1 className="font-display font-semibold text-slate-900 leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            How <em className="text-blue-600">UK Delay Predictor</em> works.
          </h1>
          <p className="text-[1rem] text-slate-500 font-light leading-relaxed max-w-xl mb-10">
            From line selection to ensemble model output — understand the pipeline that powers accurate TfL delay predictions in ~300ms.
          </p>
          <div className="flex items-center gap-8">
            {[
              { value: '4', label: 'Stage Pipeline' },
              { value: '86%', label: 'Ensemble Accuracy' },
              { value: '~300ms', label: 'Response Time' },
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

      {/* STEPS */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50">
        <div
          ref={stepsRef}
          className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">The Process</p>
              <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight">
                4-step prediction <em>pipeline.</em>
              </h2>
            </div>
            <p className="text-[1rem] text-slate-500 font-light leading-relaxed lg:max-w-sm lg:ml-auto">
              Every prediction runs through the same four stages — each one essential to the accuracy of the final result.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connector line */}
            <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-slate-200" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isRight = idx % 2 === 1;
                return (
                  <div
                    key={step.number}
                    className={`bg-white border border-slate-200 rounded-xl p-7 hover:border-blue-100 hover:shadow-sm transition-all duration-200 ${isRight ? 'lg:mt-10' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 text-2xl mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{step.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="py-20 px-6 lg:px-8 bg-white border-t border-slate-100">
        <div
          ref={techRef}
          className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${techVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Under the Hood</p>
              <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight">
                Our <em>technology.</em>
              </h2>
            </div>
            <p className="text-[1rem] text-slate-500 font-light leading-relaxed lg:max-w-sm lg:ml-auto">
              Three layers of technology working in concert — from ML models to the infrastructure that serves predictions at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {techCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-white p-8">
                  <div className={`w-12 h-12 rounded-lg ${card.bg} border ${card.border} flex items-center justify-center mb-5`}>
                    <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 text-xl mb-4">{card.title}</h3>
                  <ul className="space-y-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-500">
                        <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div
          ref={statsRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">By the Numbers</p>
            <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight">
              Prediction <em>accuracy.</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-8 text-center">
                <div className="font-display font-semibold text-blue-600 text-4xl leading-none mb-2">{stat.value}</div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors duration-200 group"
            >
              Try it free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
