import React from 'react';
import { Star } from 'lucide-react';

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

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Daily Commuter',
    line: 'Central Line',
    content:
      'TransitPredict has saved me from being late three times already. I get alerts before delays happen — a genuine game changer for my morning.',
    initials: 'SJ',
    stars: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Project Manager',
    line: 'Jubilee Line',
    content:
      "Finally something that tells me when delays are coming, not after I'm already stuck. The accuracy is impressive for real-world conditions.",
    initials: 'MC',
    stars: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'University Student',
    line: 'Elizabeth Line',
    content:
      'Used it for two weeks — made every lecture on time. The probability scores help me decide whether to take an earlier train.',
    initials: 'ER',
    stars: 5,
  },
  {
    name: 'James Wilson',
    role: 'Business Owner',
    line: 'Northern Line',
    content:
      "Integrated predictions into my team's commute planning. We've cut lateness by 40%. The TfL data integration is seamless.",
    initials: 'JW',
    stars: 5,
  },
];

const socialProof = [
  { value: '2.5K+', label: 'Active users' },
  { value: '15K+', label: 'Predictions daily' },
  { value: '4.8', label: 'Average rating' },
];

export function Testimonials() {
  const [leftRef, leftVisible] = useInView(0.15);
  const [rightRef, rightVisible] = useInView(0.1);

  return (
    <section id="testimonials" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">

          {/* ─── LEFT: sticky label + stats ─── */}
          <div
            ref={leftRef}
            className={`lg:sticky lg:top-24 transition-all duration-700 ease-out ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="font-display font-semibold text-slate-900 leading-tight text-4xl lg:text-5xl mb-8">
              What
              <br />
              commuters
              <br />
              <em>say.</em>
            </h2>

            {/* Stats stacked */}
            <div className="space-y-6">
              {socialProof.map(({ value, label }, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 ease-out ${leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: leftVisible ? `${(i + 1) * 100}ms` : '0ms' }}
                >
                  <div className="font-display font-semibold text-slate-900 leading-none" style={{ fontSize: '2.75rem' }}>
                    {value}
                  </div>
                  <p className="text-sm text-slate-500 mt-1.5">{label}</p>
                  {i < socialProof.length - 1 && <div className="h-px bg-slate-100 mt-6" />}
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: testimonial cards (2-col grid) ─── */}
          <div ref={rightRef} className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`
                  relative bg-white border rounded-2xl p-6 flex flex-col
                  hover:shadow-md transition-all duration-300 ease-out
                  ${i === 0 ? 'border-blue-100 bg-blue-50/30' : 'border-slate-200'}
                  ${rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
                `}
                style={{ transitionDelay: rightVisible ? `${i * 70}ms` : '0ms', transitionDuration: '650ms' }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[0.875rem] text-slate-600 leading-relaxed flex-1 mb-6">
                  "{t.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${i === 0 ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.role} · {t.line}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
