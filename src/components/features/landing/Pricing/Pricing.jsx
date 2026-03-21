import React from 'react';
import { Check, X } from 'lucide-react';

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

const plans = [
  {
    name: 'Explorer',
    monthly: 'Free',
    annual: 'Free',
    description: 'Try the power of predictive transport',
    cta: 'Start for free',
    href: '/get-started',
    features: [
      { text: 'Up to 5 predictions per day', included: true },
      { text: 'Basic accuracy (50%)', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Unlimited predictions', included: false },
      { text: 'Real-time alerts', included: false },
      { text: 'Advanced models (68%+)', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Commuter Pro',
    monthly: '£4.99',
    annual: '£3.99',
    description: 'For serious daily commuters',
    cta: 'Get started',
    href: '/get-started',
    highlighted: true,
    features: [
      { text: 'Unlimited predictions', included: true },
      { text: 'Advanced accuracy (68%)', included: true },
      { text: 'Real-time push alerts', included: true },
      { text: 'Save favourite routes', included: true },
      { text: 'Weather & event data', included: true },
      { text: 'Priority support', included: false },
      { text: 'API access', included: false },
    ],
  },
  {
    name: 'Enterprise',
    monthly: 'Custom',
    annual: 'Custom',
    description: 'For organisations & teams',
    cta: 'Contact us',
    href: '/contact',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team analytics dashboard', included: true },
      { text: 'API access & webhooks', included: true },
      { text: 'Bulk route management', included: true },
      { text: '24/7 priority support', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ],
  },
];

const included = ['TfL Real-time Data', 'Mobile App', 'Secure & Private'];

export function Pricing() {
  const [annual, setAnnual] = React.useState(false);
  const [headerRef, headerVisible] = useInView(0.2);
  const [cardsRef, cardsVisible] = useInView(0.08);

  return (
    <section id="pricing" className="py-24 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Header + toggle */}
        <div
          ref={headerRef}
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="max-w-lg">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="font-display font-semibold text-slate-900 mb-3 leading-tight text-4xl lg:text-5xl">
              Simple, transparent
              <br />
              <em>pricing.</em>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Start free. Upgrade when you need more.
            </p>
          </div>

          {/* Annual / monthly toggle */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className={`text-sm font-medium transition-colors ${!annual ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-blue-600' : 'bg-slate-200'}`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${annual ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${annual ? 'text-slate-900' : 'text-slate-400'}`}>
              Annual
              <span className="ml-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">−20%</span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {plans.map((plan, i) => {
            const price = annual ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.name}
                className={`
                  relative rounded-2xl p-8 flex flex-col
                  transition-all duration-700 ease-out
                  ${plan.highlighted
                    ? 'bg-blue-50/60 border-2 border-blue-500 shadow-lg shadow-blue-100'
                    : 'bg-white border border-slate-200'
                  }
                  ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{ transitionDelay: cardsVisible ? `${i * 80}ms` : '0ms' }}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-[11px] font-bold text-white bg-blue-600 px-3.5 py-1.5 rounded-full whitespace-nowrap tracking-wide">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan info */}
                <div className="mb-7">
                  <h3 className="font-display font-semibold text-slate-900 mb-1" style={{ fontSize: '1.4rem' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-5">{plan.description}</p>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-semibold text-slate-900" style={{ fontSize: '2.75rem', lineHeight: 1 }}>
                      {price}
                    </span>
                    {price !== 'Free' && price !== 'Custom' && (
                      <span className="text-sm text-slate-400">/ mo</span>
                    )}
                  </div>
                  {annual && price !== 'Free' && price !== 'Custom' && (
                    <p className="text-xs text-slate-400 mt-1">Billed annually</p>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={plan.href}
                  className={`block text-center text-sm font-semibold py-3 rounded-full mb-7 transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {plan.cta}
                </a>

                <div className="h-px bg-slate-200/70 mb-6" />

                {/* Features */}
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      {f.included
                        ? <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        : <X className="w-4 h-4 text-slate-200 flex-shrink-0 mt-0.5" />
                      }
                      <span className={`text-sm ${f.included ? 'text-slate-700' : 'text-slate-300'}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* All-plans footer */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <span className="text-sm text-slate-400">All plans include:</span>
          {included.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm text-slate-600">{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
