import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const routes = [
  {
    line: 'Piccadilly Line',
    route: "King's Cross → Heathrow T5",
    color: '#003688',
    delay: 68,
    risk: 'High',
    riskClass: 'text-red-600 bg-red-50',
    estimate: '5–15 min delay likely',
  },
  {
    line: 'Central Line',
    route: 'Holborn → Liverpool Street',
    color: '#E32017',
    delay: 23,
    risk: 'Low',
    riskClass: 'text-emerald-600 bg-emerald-50',
    estimate: 'On time expected',
  },
  {
    line: 'Elizabeth Line',
    route: 'Farringdon → Paddington',
    color: '#6950A1',
    delay: 45,
    risk: 'Medium',
    riskClass: 'text-amber-600 bg-amber-50',
    estimate: '2–8 min delay likely',
  },
];

const anim = (delay) => ({
  animation: `fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`,
});

export function Hero() {
  return (
    <section className="relative bg-white min-h-[92vh] flex items-center py-20 px-6 lg:px-8 overflow-hidden">

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, white 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 xl:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="lg:col-span-3">

            {/* Label — no pill, just text + dot */}
            <div className="flex items-center gap-2 mb-8" style={anim(60)}>
              <span className="w-1.5 h-1.5 bg-blue-500 flex-shrink-0 animate-pulse" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                AI-Powered · TfL Official
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-semibold text-slate-900 leading-[1.02] mb-0"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', ...anim(150) }}
            >
              Know Delays
              <br />
              <span style={{ fontStyle: 'italic', color: '#2563eb' }}>Before</span> They
              <br />
              Happen.
            </h1>

            {/* Thin rule */}
            <div className="h-px bg-slate-200 my-8" style={anim(220)} />

            {/* Description + CTAs in a 2-col sub-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start mb-12" style={anim(280)}>
              <p className="text-[1rem] text-slate-500 leading-relaxed font-light">
                The world's first AI-powered transport delay forecaster for UK commuters —
                predictive insights for TfL, buses, and trains.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="/get-started"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors duration-200 group"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-600 px-6 py-3 rounded-lg font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 sm:gap-10" style={anim(370)}>
              {[
                { value: '68%', label: 'Accuracy' },
                { value: '24/7', label: 'Live Data' },
                { value: 'TfL', label: 'Official API' },
              ].map(({ value, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div className="w-px h-10 bg-slate-200 flex-shrink-0" />}
                  <div>
                    <div
                      className="font-display font-semibold text-slate-900 leading-none"
                      style={{ fontSize: '1.75rem' }}
                    >
                      {value}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-semibold uppercase tracking-widest">
                      {label}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Prediction Widget ── */}
          <div className="lg:col-span-2 hidden lg:block" style={anim(260)}>
            <div
              className="bg-white rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 4px 40px -4px rgba(15,23,42,0.12), 0 0 0 1px rgba(15,23,42,0.06)',
              }}
            >
              {/* Widget header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    Route Prediction
                  </p>
                  <p className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    King's Cross St. Pancras · Mon 08:15
                  </p>
                </div>
                {/* Live badge — no pill, just a row */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-600">Live</span>
                </div>
              </div>

              {/* Route rows */}
              <div className="divide-y divide-slate-100">
                {routes.map((route, i) => (
                  <div key={i} className="px-5 py-4 hover:bg-slate-50/60 transition-colors cursor-default">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 flex-shrink-0"
                          style={{ backgroundColor: route.color }}
                        />
                        <span className="text-[0.8125rem] font-semibold text-slate-900">
                          {route.line}
                        </span>
                      </div>
                      {/* Risk tag — square, not pill */}
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm ${route.riskClass}`}>
                        {route.risk}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-2.5 ml-[18px]">{route.route}</p>

                    <div className="flex items-center gap-2 ml-[18px]">
                      <div className="flex-1 h-1 bg-slate-100 overflow-hidden">
                        <div
                          className="h-full"
                          style={{ width: `${route.delay}%`, backgroundColor: route.color, opacity: 0.8 }}
                        />
                      </div>
                      <span
                        className="text-xs font-bold tabular-nums w-8 text-right"
                        style={{ color: route.color }}
                      >
                        {route.delay}%
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1 ml-[18px]">{route.estimate}</p>
                  </div>
                ))}
              </div>

              {/* Widget footer */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Updated 30s ago</span>
                <a
                  href="/get-started"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  View all predictions →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
