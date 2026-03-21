import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

function useInView(threshold = 0.2) {
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

const quickStats = [
  { value: '0%', label: 'Setup fee' },
  { value: '30s', label: 'To sign up' },
  { value: '∞', label: 'Free forever' },
];

export function CTA() {
  const [ref, visible] = useInView(0.15);

  return (
    <section
      id="contact"
      className="relative bg-slate-900 py-28 px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />

      {/* Very faint radial glow, top-left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div
        ref={ref}
        className={`relative max-w-4xl mx-auto transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Split layout: text left, actions right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">

          {/* Left: Heading */}
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-5">
              Get Started
            </p>
            <h2
              className="font-display font-semibold text-white leading-[1.02] mb-6"
              style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)' }}
            >
              Never be late
              <br />
              <em style={{ fontStyle: 'italic', color: '#93c5fd' }}>again.</em>
            </h2>
            <p className="text-slate-400 text-[1.0625rem] leading-relaxed font-light">
              Join thousands of commuters who know delays before they happen.
              No credit card needed.
            </p>
          </div>

          {/* Right: CTAs + quick stats */}
          <div className="space-y-6">
            <div className="flex flex-col gap-3.5">
              <a
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-100 transition-all duration-200 group"
              >
                Start Predicting Free
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 px-8 py-3.5 rounded-full font-semibold text-sm hover:border-slate-500 hover:text-white transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {quickStats.map(({ value, label }) => (
                <div key={label} className="border border-slate-800 rounded-xl p-4 text-center hover:border-slate-700 transition-colors">
                  <div
                    className="font-display font-semibold text-white mb-1"
                    style={{ fontSize: '1.625rem', lineHeight: 1 }}
                  >
                    {value}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom thin divider + trust line */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            Trusted by 2,500+ daily commuters across London
          </p>
          <div className="flex items-center gap-6">
            {['King\'s Cross', 'Paddington', 'Victoria', 'Liverpool St'].map((station) => (
              <span key={station} className="text-xs text-slate-700 font-medium">{station}</span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
