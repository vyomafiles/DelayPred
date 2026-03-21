import React from 'react';
import { Search, Zap, BarChart3, CheckCircle } from 'lucide-react';

function useInView(threshold = 0.1) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
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
    icon: <Search className="w-5 h-5" />,
    title: 'Enter Your Route',
    description:
      'Select your departure point, destination, and travel time. We find every relevant transport option.',
  },
  {
    number: '02',
    icon: <Zap className="w-5 h-5" />,
    title: 'AI Analysis',
    description:
      'Machine learning processes 50+ factors: historical delays, weather, time of day, and live events.',
  },
  {
    number: '03',
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Get Predictions',
    description:
      'Receive probability scores per route — exact delay estimates with confidence levels.',
  },
  {
    number: '04',
    icon: <CheckCircle className="w-5 h-5" />,
    title: 'Make Smart Decisions',
    description:
      'Pick the most reliable option. Get alerts if predictions update before you travel.',
  },
];

const stats = [
  { value: '50+', label: 'Data factors analysed per prediction' },
  { value: '<500ms', label: 'Average prediction response time' },
  { value: 'TfL API', label: 'Powered by real official data' },
];

export function HowItWorks() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [stepsRef, stepsVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.2);

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`max-w-xl mb-16 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">How It Works</p>
          <h2 className="font-display font-semibold text-slate-900 mb-4 leading-tight text-4xl lg:text-5xl">
            From route to insight,
            <br />
            <em>in seconds.</em>
          </h2>
          <p className="text-lg text-slate-500 font-light">
            Four steps from selection to smart planning.
          </p>
        </div>

        {/* Steps grid */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden mb-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`
                relative bg-white p-8 overflow-hidden
                transition-all duration-700 ease-out
                ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
              `}
              style={{ transitionDelay: stepsVisible ? `${index * 80}ms` : '0ms' }}
            >
              {/* Giant faded background number */}
              <div
                className="absolute -top-3 -right-2 font-display font-bold text-slate-100 leading-none select-none pointer-events-none"
                style={{ fontSize: '6.5rem' }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative z-10 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-semibold text-slate-900 mb-3 text-[0.9375rem]">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector dot (right edge, desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-blue-600 z-20 hidden lg:block" />
              )}
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className={`bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-700 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map(({ value, label }, i) => (
              <div key={i} className={`py-3 ${i > 0 ? 'md:pl-8' : ''}`}>
                <div className="font-display font-semibold text-slate-900 mb-1" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                  {value}
                </div>
                <p className="text-sm text-slate-500 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
