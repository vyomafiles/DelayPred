import React from 'react';

function useInView(threshold = 0.1) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
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

/* ── Visual: mini bar chart (ML Predictions) ── */
function BarChart() {
  const bars = [
    { h: 42, label: 'M' },
    { h: 71, label: 'T' },
    { h: 28, label: 'W' },
    { h: 85, label: 'T' },
    { h: 68, label: 'F', active: true },
    { h: 38, label: 'S' },
    { h: 22, label: 'S' },
  ];
  return (
    <div className="mb-7">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Delay probability — this week
      </p>
      <div className="flex items-end gap-1.5 h-14">
        {bars.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-sm transition-all"
              style={{
                height: `${b.h}%`,
                backgroundColor: b.active ? '#2563eb' : '#e2e8f0',
              }}
            />
            <span className={`text-[9px] font-semibold ${b.active ? 'text-blue-600' : 'text-slate-300'}`}>
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Visual: big percentage ring (Probability Scores) ── */
function ProbabilityRing() {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const fill = (68 / 100) * circ;
  return (
    <div className="flex items-center gap-5 mb-7">
      <div className="relative flex-shrink-0">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#f1f5f9" strokeWidth="6" />
          <circle
            cx="36" cy="36" r={r} fill="none"
            stroke="#2563eb" strokeWidth="6"
            strokeDasharray={`${fill} ${circ - fill}`}
            strokeLinecap="square"
            transform="rotate(-90 36 36)"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display font-semibold text-slate-900 text-sm">
          68%
        </span>
      </div>
      <div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Chance of delay on<br />
          <span className="font-semibold text-slate-700">Piccadilly · Fri 08:00</span>
        </p>
      </div>
    </div>
  );
}

/* ── Visual: notification mockup (Real-time Alerts) ── */
function AlertMockup() {
  return (
    <div className="mb-7 space-y-2">
      {[
        { line: 'Piccadilly Line', msg: '12 min delay expected', color: '#003688', time: 'now' },
        { line: 'Central Line', msg: 'Disruption cleared', color: '#E32017', time: '4m ago' },
      ].map((n, i) => (
        <div
          key={i}
          className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3"
        >
          <span className="w-2 h-2 rounded-sm flex-shrink-0 mt-1" style={{ backgroundColor: n.color }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-800 truncate">{n.line}</span>
              <span className="text-[10px] text-slate-400 flex-shrink-0">{n.time}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">{n.msg}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Visual: before/after comparison (Proactive Planning) ── */
function BeforeAfter() {
  return (
    <div className="mb-7 space-y-3">
      {[
        { label: 'Before', pct: 82, color: '#f87171', bg: '#fef2f2', result: '8 min late' },
        { label: 'After', pct: 18, color: '#34d399', bg: '#ecfdf5', result: 'On time' },
      ].map((r) => (
        <div key={r.label}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{r.label}</span>
            <span className="text-[10px] font-bold" style={{ color: r.color }}>{r.result}</span>
          </div>
          <div className="h-2 rounded-sm overflow-hidden" style={{ backgroundColor: r.bg }}>
            <div className="h-full rounded-sm" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Visual: responsive breakpoints (Mobile Optimised) ── */
function ResponsiveFrames() {
  return (
    <div className="flex items-end gap-3 mb-7">
      {/* Desktop */}
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="w-full h-10 border-2 border-slate-200 rounded-sm bg-slate-50" />
        <span className="text-[9px] text-slate-300 font-medium">Desktop</span>
      </div>
      {/* Tablet */}
      <div className="flex flex-col items-center gap-1" style={{ width: '48%' }}>
        <div className="w-full h-9 border-2 border-slate-200 rounded-sm bg-slate-50" />
        <span className="text-[9px] text-slate-300 font-medium">Tablet</span>
      </div>
      {/* Phone */}
      <div className="flex flex-col items-center gap-1" style={{ width: '28%' }}>
        <div className="w-full h-7 border-2 border-blue-300 rounded-sm bg-blue-50" />
        <span className="text-[9px] text-blue-400 font-medium">Mobile</span>
      </div>
    </div>
  );
}

/* ── Visual: TfL tube lines (full-width) ── */
const tfLines = [
  { line: 'Piccadilly', color: '#003688', delay: 68, risk: 'High', riskColor: 'text-red-500' },
  { line: 'Central', color: '#E32017', delay: 23, risk: 'Low', riskColor: 'text-emerald-500' },
  { line: 'Elizabeth', color: '#6950A1', delay: 45, risk: 'Med', riskColor: 'text-amber-500' },
  { line: 'Jubilee', color: '#6A7278', delay: 31, risk: 'Low', riskColor: 'text-emerald-500' },
  { line: 'Northern', color: '#000000', delay: 55, risk: 'Med', riskColor: 'text-amber-500' },
];

function TfLLines() {
  return (
    <div className="mb-7">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Live across all TfL lines
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {tfLines.map((r) => (
          <div key={r.line}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: r.color }} />
                <span className="text-[11px] font-semibold text-slate-700">{r.line}</span>
              </div>
              <span className={`text-[10px] font-bold ${r.riskColor}`}>{r.delay}%</span>
            </div>
            <div className="h-1 bg-slate-100 overflow-hidden">
              <div className="h-full" style={{ width: `${r.delay}%`, backgroundColor: r.color, opacity: 0.75 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Card wrapper ── */
function Card({ children, className = '' }) {
  return (
    <div className={`bg-white p-7 flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export function Features() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.05);

  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header — 2-col split ── */}
        <div
          ref={headerRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
              What it does
            </p>
            <h2 className="font-display font-semibold text-slate-900 text-4xl lg:text-5xl leading-tight">
              Everything you need
              <br />
              <em>before you travel.</em>
            </h2>
          </div>
          <p className="text-[1rem] text-slate-500 font-light leading-relaxed lg:max-w-sm lg:ml-auto">
            Six capabilities working together to give you certainty on every journey — powered by live TfL data and machine learning.
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div
          ref={gridRef}
          className={`transition-all duration-700 ease-out ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* hairline-grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">

            {/* Row 1 */}

            {/* F1 — ML Predictions (2-col wide) */}
            <Card className="lg:col-span-2">
              <BarChart />
              <h3 className="font-semibold text-slate-900 mb-2">ML-Powered Predictions</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Advanced models analyse 50+ factors — historical patterns, weather, and temporal data — to forecast delays before they occur.
              </p>
            </Card>

            {/* F2 — Probability Scores (1-col) */}
            <Card>
              <ProbabilityRing />
              <h3 className="font-semibold text-slate-900 mb-2">Probability Scores</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Exact delay likelihood — not vague warnings. Know the percentage chance before you leave the house.
              </p>
            </Card>

            {/* Row 2 */}

            {/* F3 — Real-time Alerts (1-col) */}
            <Card>
              <AlertMockup />
              <h3 className="font-semibold text-slate-900 mb-2">Real-time Alerts</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Push notifications the moment predictions change — so you're always ahead of the disruption.
              </p>
            </Card>

            {/* F4 — Proactive Planning (1-col) */}
            <Card>
              <BeforeAfter />
              <h3 className="font-semibold text-slate-900 mb-2">Proactive Planning</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Leave earlier, pick a better route, or stay put — with confidence backed by data, not guesswork.
              </p>
            </Card>

            {/* F5 — Mobile Optimised (1-col) */}
            <Card>
              <ResponsiveFrames />
              <h3 className="font-semibold text-slate-900 mb-2">Works Everywhere</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Optimised for every screen size. Predictions in your pocket, at your desk, wherever you are.
              </p>
            </Card>

            {/* Row 3 */}

            {/* F6 — TfL Integration (full-width) */}
            <Card className="lg:col-span-3">
              <TfLLines />
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Official TfL Integration</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                    Directly connected to the TfL Unified API — real, live data across every Underground line, Overground, Elizabeth line, and bus network in London.
                  </p>
                </div>
                <a
                  href="/get-started"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors self-start sm:self-auto"
                >
                  Start predicting
                </a>
              </div>
            </Card>

          </div>
        </div>

      </div>
    </section>
  );
}
