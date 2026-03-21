import React, { useEffect, useRef } from 'react';
import { Target, Users, Globe, Lightbulb, Heart, Award, ArrowRight } from 'lucide-react';

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

const values = [
  { icon: Target, title: 'Accuracy', desc: 'We strive for the highest prediction accuracy using cutting-edge ML models continuously trained on real TfL data.' },
  { icon: Users, title: 'User-Centric', desc: 'Every product decision is made with commuters at the centre — from alert timing to interface clarity.' },
  { icon: Globe, title: 'Transparency', desc: 'We show probabilities, not platitudes. "68% chance of delay" is more useful than "service may be disrupted."' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Constantly pushing the boundary of what\'s possible in transport intelligence, from model architectures to UX design.' },
  { icon: Heart, title: 'Reliability', desc: '99.9% uptime commitment. When your commute depends on us, downtime isn\'t an option.' },
  { icon: Award, title: 'Excellence', desc: 'Premium intelligence at an accessible price — great tools shouldn\'t be gatekept behind enterprise budgets.' },
];

const expertise = [
  { title: 'Machine Learning', desc: 'Developing and training advanced prediction models using real TfL delay datasets — Random Forest, LSTM, and ensemble approaches.' },
  { title: 'Software Engineering', desc: 'Building scalable, cloud-native systems capable of serving millions of predictions daily with sub-500ms latency.' },
  { title: 'Data Science', desc: 'Extracting signal from noise across weather, events, historical patterns, and live feeds to power reliable forecasts.' },
];

const impact = [
  { value: '2.5K+', label: 'Active Users' },
  { value: '15K+', label: 'Predictions Daily' },
  { value: '150+', label: 'Hours Saved Monthly' },
  { value: '4.8/5', label: 'User Rating' },
];

export function AboutPage() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [missionRef, missionVisible] = useInView(0.1);
  const [valuesRef, valuesVisible] = useInView(0.05);
  const [teamRef, teamVisible] = useInView(0.1);
  const [impactRef, impactVisible] = useInView(0.1);

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
            Our Story
          </p>
          <h1 className="font-display font-semibold text-slate-900 leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Built for the commuter who{' '}
            <em className="text-blue-600">refuses to guess.</em>
          </h1>
          <p className="text-[1rem] text-slate-500 font-light leading-relaxed max-w-xl">
            Vyoma is an AI-powered TfL delay prediction platform — built by a team of computer science researchers who got tired of being caught off guard by a network that rarely communicates clearly.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 border-b border-slate-100">
        <div
          ref={missionRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-5">Our Mission</p>
          <p className="font-display font-semibold text-slate-900 leading-tight mb-8" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            To empower UK commuters with predictive transport intelligence — allowing them to plan smarter journeys and reclaim valuable time from an unpredictable network.
          </p>
          <div className="border-l-4 border-blue-600 pl-7 bg-blue-50/50 py-5 pr-5 rounded-r-xl">
            <p className="text-[1rem] text-slate-600 leading-relaxed font-light">
              Unlike every app that tells you about delays{' '}
              <strong className="text-slate-800 font-semibold">after they happen</strong>, Vyoma predicts them{' '}
              <strong className="text-blue-600 font-semibold">before they occur</strong> — giving you the time to adjust, reroute, or simply leave earlier with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-6 lg:px-8 bg-white border-b border-slate-100">
        <div
          ref={valuesRef}
          className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">What We Stand For</p>
              <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight">
                Core <em>values.</em>
              </h2>
            </div>
            <p className="text-[1rem] text-slate-500 font-light leading-relaxed lg:max-w-sm lg:ml-auto">
              The principles that guide every decision we make — from model design to the words we choose in a delay alert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 hover:bg-slate-50/80 transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  <Icon className="w-4.5 h-4.5 text-blue-600" strokeWidth={1.75} />
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-xl mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 border-b border-slate-100">
        <div
          ref={teamRef}
          className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-5">Who We Are</p>
              <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight mb-6">
                The team behind <em>Vyoma.</em>
              </h2>
              <p className="text-[1rem] text-slate-500 font-light leading-relaxed">
                A BSc Computer Science AI final year project developed at a top UK university. We combine deep technical expertise with a genuine frustration at how poorly London's transport network communicates with its 5 million daily users.
              </p>
            </div>

            <div className="space-y-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {expertise.map((ex, i) => (
                <div key={i} className="bg-white p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display font-semibold text-slate-900 text-lg">{ex.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{ex.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div
          ref={impactRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Impact So Far</p>
            <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight">
              Real numbers, <em>real commuters.</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden mb-12">
            {impact.map((item) => (
              <div key={item.label} className="bg-white p-8 text-center">
                <div className="font-display font-semibold text-blue-600 text-4xl leading-none mb-2">{item.value}</div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors duration-200 group"
            >
              Join them — it's free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
