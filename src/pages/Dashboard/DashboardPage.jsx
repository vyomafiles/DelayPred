import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin, TrendingUp, Clock, AlertTriangle, LogOut,
  ArrowRight, RefreshCw, Trash2, CheckCircle, CloudRain,
  Thermometer, Activity, ChevronDown, Wind, Snowflake,
  Train, Zap, BarChart2, Bell, Eye, Droplets,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import { fetchLines, fetchPrediction, fetchAllPredictions, fetchWeather } from '../../api/predictionApi';

/* ─── helpers ───────────────────────────────────────────────────── */
const jk = 'font-jakarta'; // shorthand — applied everywhere on this page

function todayISO() {
  return new Date().toISOString().split('T')[0] + 'T00:00:00Z';
}
function pct(p) { return p != null ? `${Math.round(p * 100)}%` : '—'; }
function relativeTime(ts) {
  if (!ts) return '';
  const m = Math.floor((Date.now() - new Date(ts)) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function greet() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

/* severity tokens */
function sev(cls) {
  const c = (cls || '').toLowerCase();
  if (c === 'high')     return { text: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-200',     bar: 'bg-red-500',     ring: '#ef4444', label: 'High risk',     tip: 'Delays are very likely.' };
  if (c === 'moderate') return { text: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200',   bar: 'bg-amber-400',   ring: '#f59e0b', label: 'Moderate risk', tip: 'Some chance of delays.' };
  return                       { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500', ring: '#10b981', label: 'Low risk',      tip: 'Unlikely to be delayed.' };
}

function tflDot(s) {
  const v = (s || '').toLowerCase();
  if (v.includes('good'))    return 'bg-emerald-400';
  if (v.includes('minor'))   return 'bg-amber-400';
  if (v.includes('severe') || v.includes('suspended') || v.includes('part')) return 'bg-red-500';
  return 'bg-slate-300';
}

/* weather → plain-English alerts */
function buildAlerts(w) {
  if (!w) return [];
  const out = [];
  if      (w.rain_mm >= 5)   out.push({ level: 'high',     icon: CloudRain,  text: 'Heavy rain — expect slower services and slippery platforms' });
  else if (w.rain_mm >= 0.5) out.push({ level: 'moderate', icon: CloudRain,  text: 'Light rain — some lines may see minor delays' });
  else                        out.push({ level: 'good',     icon: CloudRain,  text: 'No rain — platforms and rails are dry' });
  if      (w.snowfall_cm >= 2)   out.push({ level: 'high',     icon: Snowflake, text: 'Heavy snow — widespread disruption likely' });
  else if (w.snowfall_cm >= 0.1) out.push({ level: 'high',     icon: Snowflake, text: 'Snow falling — significant delays expected' });
  if      (w.wind_gust_ms >= 20) out.push({ level: 'high',     icon: Wind,      text: 'Strong wind gusts — open-air lines (Overground, DLR, Elizabeth) may have speed restrictions' });
  else if (w.wind_gust_ms >= 12) out.push({ level: 'moderate', icon: Wind,      text: 'Gusty winds — some impact on exposed sections' });
  else                            out.push({ level: 'good',     icon: Wind,      text: 'Calm winds — no wind-related disruption expected' });
  if      (w.visibility_m < 1000)  out.push({ level: 'high',     icon: Eye, text: 'Dense fog — speed restrictions on surface lines' });
  else if (w.visibility_m < 3000)  out.push({ level: 'moderate', icon: Eye, text: 'Reduced visibility — surface lines running cautiously' });
  if (w.humidity_pct >= 90) out.push({ level: 'moderate', icon: Droplets, text: 'Very high humidity — rails may be slippery' });
  if (w.is_severe && !out.some(a => a.level === 'high')) out.push({ level: 'high', icon: AlertTriangle, text: 'Severe weather — check TfL before travelling' });
  return out;
}

/* ─── skeleton ──────────────────────────────────────────────────── */
function Sk({ className = '' }) {
  return <div className={`animate-pulse bg-slate-100 rounded-lg ${className}`} />;
}

/* ─── severity badge ────────────────────────────────────────────── */
function SevBadge({ cls }) {
  if (!cls) return null;
  const m = sev(cls);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${m.text} ${m.bg} ${m.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.bar}`} />
      {m.label}
    </span>
  );
}

/* ─── SVG probability ring ──────────────────────────────────────── */
function Ring({ probability, cls }) {
  const m = sev(cls);
  const r = 48, circ = 2 * Math.PI * r;
  const val = Math.round((probability || 0) * 100);
  const dash = ((val / 100) * circ).toFixed(1);
  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="#f1f5f9" strokeWidth="9" />
        <circle cx="56" cy="56" r={r} fill="none" stroke={m.ring} strokeWidth="9"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(.4,0,.2,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-jakarta font-bold text-2xl leading-none ${m.text}`}>{val}%</span>
        <span className="font-jakarta text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">risk</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main dashboard
═══════════════════════════════════════════════════════════════════ */
export function DashboardPage() {
  const { user, logout } = useAuthStore();
  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Commuter';
  const userId = user?.id;

  const [weather, setWeather]           = useState(null);
  const [weatherLoading, setWL]         = useState(true);
  const [weatherRefreshing, setWR]      = useState(false);

  const [stats, setStats]               = useState({ predictionsToday: '—', savedRoutes: '—', avgRisk: '—', highRisk: '—' });
  const [statsLoading, setSL]           = useState(true);

  const [lines, setLines]               = useState([]);
  const [linesLoading, setLL]           = useState(true);
  const [selectedLine, setSelectedLine] = useState('');

  const [prediction, setPrediction]     = useState(null);
  const [predLoading, setPredLoading]   = useState(false);
  const [predError, setPredError]       = useState('');

  const [savedRoutes, setSavedRoutes]   = useState([]);
  const [savedLoading, setSaved]        = useState(true);

  const [recentPreds, setRecent]        = useState([]);
  const [recentLoading, setRL]          = useState(true);

  const [allPreds, setAllPreds]         = useState([]);
  const [allLoading, setAL]             = useState(false);
  const [allError, setAE]               = useState('');

  const [saveLoading, setSaveLoading]   = useState(false);
  const [saveMsg, setSaveMsg]           = useState('');
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertMsg, setAlertMsg]         = useState('');

  /* weather */
  const loadWeather = useCallback(async (isRefresh = false) => {
    if (isRefresh) setWR(true);
    try { const d = await fetchWeather(); setWeather(d); }
    catch { /* silent */ }
    finally { setWL(false); setWR(false); }
  }, []);

  useEffect(() => {
    loadWeather();
    const t = setInterval(() => loadWeather(true), 10 * 60 * 1000);
    return () => clearInterval(t);
  }, [loadWeather]);

  /* lines */
  useEffect(() => {
    fetchLines().then(d => d?.lines && setLines(d.lines)).catch(() => null).finally(() => setLL(false));
  }, []);

  /* stats */
  const loadStats = useCallback(async () => {
    if (!userId) return;
    setSL(true);
    try {
      const today = todayISO();
      const [hR, rR] = await Promise.all([
        supabase.from('prediction_history').select('id,probability,severity_class').eq('user_id', userId).gte('created_at', today),
        supabase.from('user_routes').select('id').eq('user_id', userId),
      ]);
      const h = hR.data || [], r = rR.data || [];
      setStats({
        predictionsToday: String(h.length),
        savedRoutes: String(r.length),
        avgRisk: h.length ? `${Math.round((h.reduce((s, x) => s + (x.probability || 0), 0) / h.length) * 100)}%` : '—',
        highRisk: String(h.filter(x => x.severity_class?.toLowerCase() === 'high').length),
      });
    } catch { /* silent */ }
    finally { setSL(false); }
  }, [userId]);

  useEffect(() => { loadStats(); }, [loadStats]);

  /* saved routes */
  const loadSaved = useCallback(async () => {
    if (!userId) return;
    setSaved(true);
    try {
      const { data } = await supabase.from('user_routes').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      setSavedRoutes(data || []);
    } catch { /* silent */ }
    finally { setSaved(false); }
  }, [userId]);

  useEffect(() => { loadSaved(); }, [loadSaved]);

  /* recent preds */
  const loadRecent = useCallback(async () => {
    if (!userId) return;
    setRL(true);
    try {
      const { data } = await supabase.from('prediction_history')
        .select('id,line_label,severity_class,probability,created_at')
        .eq('user_id', userId).order('created_at', { ascending: false }).limit(5);
      setRecent(data || []);
    } catch { /* silent */ }
    finally { setRL(false); }
  }, [userId]);

  useEffect(() => { loadRecent(); }, [loadRecent]);

  /* run prediction */
  const runPrediction = useCallback(async (lineId, labelOverride) => {
    if (!lineId) return;
    setPredLoading(true); setPredError(''); setSaveMsg(''); setAlertMsg('');
    try {
      const data = await fetchPrediction(lineId);
      setPrediction(data);
      if (userId && data?.line_id) {
        await supabase.from('prediction_history').insert({
          user_id: userId, line_id: data.line_id,
          line_label: data.line_label || labelOverride || lineId,
          probability: data.probability, severity_class: data.severity_class,
          current_tfl_status: data.current_tfl_status, weather_summary: data.weather_summary,
          is_peak_hour: data.is_peak_hour, rf_probability: data.rf_probability,
          lstm_probability: data.lstm_probability, forecast: data.forecast, predicted_at: data.predicted_at,
        });
        await Promise.all([loadStats(), loadRecent()]);
      }
    } catch (e) {
      setPredError(e.message || 'Could not reach the prediction model. Try again.');
    } finally { setPredLoading(false); }
  }, [userId, loadStats, loadRecent]);

  /* save route */
  const saveRoute = useCallback(async () => {
    if (!prediction || !userId) return;
    setSaveLoading(true); setSaveMsg('');
    try {
      const { error } = await supabase.from('user_routes').upsert(
        { user_id: userId, line_id: prediction.line_id, line_label: prediction.line_label },
        { onConflict: 'user_id,line_id' }
      );
      if (error) throw error;
      setSaveMsg('saved');
      await Promise.all([loadSaved(), loadStats()]);
    } catch (e) { setSaveMsg('error:' + (e.message || 'Failed')); }
    finally { setSaveLoading(false); }
  }, [prediction, userId, loadSaved, loadStats]);

  /* set alert */
  const setAlertFn = useCallback(async () => {
    if (!prediction || !userId) return;
    setAlertLoading(true); setAlertMsg('');
    try {
      const { error } = await supabase.from('user_alerts').upsert(
        { user_id: userId, line_id: prediction.line_id, line_label: prediction.line_label, threshold: prediction.probability, is_active: true },
        { onConflict: 'user_id,line_id' }
      );
      if (error) throw error;
      setAlertMsg('saved');
    } catch (e) { setAlertMsg('error:' + (e.message || 'Failed')); }
    finally { setAlertLoading(false); }
  }, [prediction, userId]);

  /* delete route */
  const deleteRoute = useCallback(async (id) => {
    await supabase.from('user_routes').delete().eq('id', id);
    await Promise.all([loadSaved(), loadStats()]);
  }, [loadSaved, loadStats]);

  /* run from saved */
  const runFromSaved = useCallback((lineId, lineLabel) => {
    setSelectedLine(lineId);
    runPrediction(lineId, lineLabel);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [runPrediction]);

  /* all predictions */
  const loadAll = useCallback(async () => {
    setAL(true); setAE('');
    try {
      const data = await fetchAllPredictions();
      setAllPreds([...(data?.predictions || [])].sort((a, b) => (b.probability || 0) - (a.probability || 0)));
    } catch (e) { setAE(e.message || 'Failed to load.'); }
    finally { setAL(false); }
  }, []);

  const handleLogout = async () => { await logout(); window.location.href = '/'; };

  const nowLabel = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  /* weather summary for the compact strip */
  const weatherStrip = weather
    ? [
        weather.temp_c != null && `${weather.temp_c}°C`,
        weather.summary,
        weather.wind_gust_ms >= 20 && '⚠ Strong gusts',
        weather.rain_mm >= 5      && '⚠ Heavy rain',
        weather.snowfall_cm >= 0.1 && '⚠ Snow',
      ].filter(Boolean).join(' · ')
    : null;

  /* ══════════════════════════════════════ render ══════════════════ */
  return (
    <div className={`font-jakarta min-h-screen bg-[#f8f9fa]`}>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span className="font-jakarta font-bold text-slate-900 text-[15px] tracking-tight">UK Delay Predictor</span>
          </a>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-bold text-blue-600 leading-none">
                  {(displayName[0] || 'U').toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-700 max-w-[140px] truncate hidden sm:block">{displayName}</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors duration-150">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="pt-8 pb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Dashboard</p>
            <h1 className="font-jakarta font-bold text-slate-900 text-[28px] leading-tight">
              {greet()}, {displayName}.
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{nowLabel}</p>
          </div>

          {/* Compact weather strip */}
          {weatherLoading
            ? <Sk className="h-9 w-64 rounded-full" />
            : weatherStrip && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                <Thermometer className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <span>{weatherStrip}</span>
                <button onClick={() => loadWeather(true)} className="ml-1 text-slate-300 hover:text-slate-500 transition-colors" title="Refresh weather">
                  <RefreshCw className={`w-3 h-3 ${weatherRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            )}
        </div>

        {/* ── Metrics strip ──────────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-xl mb-6 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-slate-100">
            {[
              { value: stats.predictionsToday, label: 'Predictions today',       sub: "Lines you've checked",                icon: TrendingUp,  color: 'text-blue-600',    bg: 'bg-blue-50' },
              { value: stats.savedRoutes,      label: 'Saved routes',            sub: 'Pinned for quick access',             icon: MapPin,      color: 'text-slate-600',   bg: 'bg-slate-100' },
              { value: stats.avgRisk,          label: 'Avg delay risk',          sub: 'Across today\'s predictions',         icon: Clock,       color: 'text-amber-600',   bg: 'bg-amber-50' },
              { value: stats.highRisk,         label: 'High-risk lines',         sub: 'Over 65% chance of delay today',      icon: AlertTriangle, color: 'text-red-600',   bg: 'bg-red-50' },
            ].map(({ value, label, sub, icon: Icon, color, bg }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-5">
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  {statsLoading
                    ? <Sk className="h-7 w-12 mb-1" />
                    : <p className="font-jakarta font-bold text-slate-900 text-2xl leading-none mb-0.5">{value}</p>}
                  <p className="text-xs font-semibold text-slate-700 leading-tight">{label}</p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* ── Left: predictor (hero) ─────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

              {/* Card header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Train className="w-4 h-4 text-white" strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="font-jakarta font-semibold text-slate-900 text-[15px] leading-tight">Check a Line</h2>
                  <p className="text-xs text-slate-400 mt-0.5">AI-powered delay prediction — live TfL + weather data</p>
                </div>
              </div>

              <div className="p-6">
                {/* Selector */}
                <div className="flex gap-3 mb-5">
                  <div className="relative flex-1">
                    <select
                      value={selectedLine}
                      onChange={e => setSelectedLine(e.target.value)}
                      disabled={linesLoading}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-9 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 cursor-pointer"
                    >
                      <option value="">{linesLoading ? 'Loading lines…' : 'Select a TfL line'}</option>
                      {lines.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <button
                    onClick={() => runPrediction(selectedLine)}
                    disabled={!selectedLine || predLoading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
                  >
                    {predLoading
                      ? <><RefreshCw className="w-4 h-4 animate-spin" /> Predicting…</>
                      : <>Predict <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>

                {/* Error */}
                {predError && (
                  <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-4">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div><p className="font-semibold mb-0.5">Prediction failed</p><p className="text-red-600 font-normal">{predError}</p></div>
                  </div>
                )}

                {/* Loading skeleton */}
                {predLoading && (
                  <div className="space-y-4">
                    <div className="flex gap-5 items-center">
                      <Sk className="w-28 h-28 !rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2.5">
                        <Sk className="h-5 w-36" /> <Sk className="h-4 w-52" /> <Sk className="h-4 w-44" />
                        <div className="flex gap-2 pt-1"><Sk className="h-7 w-20 !rounded-full" /><Sk className="h-7 w-20 !rounded-full" /><Sk className="h-7 w-24 !rounded-full" /></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3"><Sk className="h-20 rounded-xl" /><Sk className="h-20 rounded-xl" /><Sk className="h-20 rounded-xl" /></div>
                  </div>
                )}

                {/* Result */}
                {!predLoading && prediction && (
                  <PredictionResult
                    prediction={prediction}
                    onSave={saveRoute} saveLoading={saveLoading} saveMsg={saveMsg}
                    onAlert={setAlertFn} alertLoading={alertLoading} alertMsg={alertMsg}
                  />
                )}

                {/* Empty state */}
                {!predLoading && !prediction && !predError && (
                  <div className="text-center py-10 text-slate-400">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-5 h-5 text-slate-300" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-1">No prediction yet</p>
                    <p className="text-xs text-slate-400">Pick a line above and click Predict.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Saved Routes */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex-1">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-jakarta font-semibold text-slate-900 text-[15px]">Your Routes</h2>
                <p className="text-xs text-slate-400 mt-0.5">Saved lines for quick prediction</p>
              </div>
              <div className="p-4 max-h-48 overflow-y-auto no-scrollbar">
                {savedLoading ? (
                  <div className="space-y-3">{[1,2].map(i => <div key={i} className="flex items-center gap-3"><Sk className="h-4 flex-1" /><Sk className="h-7 w-14 !rounded-lg" /></div>)}</div>
                ) : savedRoutes.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-4 h-4 text-slate-300" />
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-0.5">No saved routes yet</p>
                    <p className="text-[11px] text-slate-400">Run a prediction and tap "Save route"</p>
                  </div>
                ) : (
                  <ul className="space-y-0.5">
                    {savedRoutes.map(r => (
                      <li key={r.id} className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors group">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-700 flex-1 min-w-0 truncate">{r.line_label}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => runFromSaved(r.line_id, r.line_label)}
                            className="text-[11px] font-semibold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 px-2.5 py-1 rounded-md transition-colors">
                            Run
                          </button>
                          <button onClick={() => deleteRoute(r.id)} className="p-1 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Recent History */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex-1">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-jakarta font-semibold text-slate-900 text-[15px]">Recent History</h2>
                <p className="text-xs text-slate-400 mt-0.5">Last 5 predictions this session</p>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto no-scrollbar">
                {recentLoading ? (
                  <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="flex items-center gap-3"><Sk className="h-4 flex-1" /><Sk className="h-5 w-12 !rounded-full" /></div>)}</div>
                ) : recentPreds.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <BarChart2 className="w-4 h-4 text-slate-300" />
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-0.5">No history yet</p>
                    <p className="text-[11px] text-slate-400">Each prediction is saved here automatically</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {recentPreds.map(r => (
                      <li key={r.id} className="flex items-center justify-between gap-2 py-2.5">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{r.line_label}</p>
                          <p className="text-[11px] text-slate-400">{relativeTime(r.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm font-bold text-slate-900">{pct(r.probability)}</span>
                          <SevBadge cls={r.severity_class} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── Weather impact strip ─────────────────────────────────── */}
        {!weatherLoading && weather && (() => {
          const alerts = buildAlerts(weather);
          const hasHigh = alerts.some(a => a.level === 'high');
          const hasMod  = alerts.some(a => a.level === 'moderate');
          const overallLevel = hasHigh ? 'high' : hasMod ? 'moderate' : 'good';
          const badge = {
            high:     { label: 'Weather may cause delays',  dot: 'bg-red-500',     text: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-200'     },
            moderate: { label: 'Minor weather impact',      dot: 'bg-amber-400',   text: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200'   },
            good:     { label: 'Good travel conditions',    dot: 'bg-emerald-400', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          }[overallLevel];
          const alertStyle = {
            high:     'text-red-700 bg-red-50 border border-red-200',
            moderate: 'text-amber-700 bg-amber-50 border border-amber-200',
            good:     'text-emerald-700 bg-emerald-50 border border-emerald-200',
          };
          const iconStyle = {
            high: 'text-red-500', moderate: 'text-amber-500', good: 'text-emerald-500',
          };
          return (
            <div className="bg-white border border-slate-200 rounded-xl mb-5 overflow-hidden">
              <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-slate-500" />
                  <span className="font-jakarta font-semibold text-slate-800 text-[14px]">Weather impact on your journey</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.text} ${badge.bg} border ${badge.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                  {badge.label}
                </div>
              </div>
              <div className="px-6 py-4 flex flex-wrap gap-2">
                {alerts.map((a, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${alertStyle[a.level]}`}>
                    <a.icon className={`w-3.5 h-3.5 flex-shrink-0 ${iconStyle[a.level]}`} strokeWidth={1.75} />
                    {a.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ── Network overview ─────────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="font-jakarta font-semibold text-slate-900 text-[15px]">Network Overview</h2>
                <p className="text-xs text-slate-400 mt-0.5">All 14 TfL lines ranked by delay risk</p>
              </div>
            </div>
            <button onClick={loadAll} disabled={allLoading}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 hover:border-blue-600 px-4 py-2 rounded-lg transition-all disabled:opacity-50">
              <RefreshCw className={`w-3.5 h-3.5 ${allLoading ? 'animate-spin' : ''}`} />
              {allLoading ? 'Loading…' : 'Load all lines'}
            </button>
          </div>

          <div className="p-6">
            {allError && (
              <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {allError}
              </div>
            )}
            {allLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {Array.from({ length: 14 }).map((_, i) => <Sk key={i} className="h-24 !rounded-xl" />)}
              </div>
            ) : allPreds.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500 mb-1">Network data not loaded</p>
                <p className="text-xs text-slate-400 mb-4">See delay risk across all 14 TfL lines at once.</p>
                <button onClick={loadAll}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" /> Load Network Overview
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {allPreds.map((p, rank) => {
                  const m = sev(p.severity_class);
                  const w = Math.round((p.probability || 0) * 100);
                  return (
                    <div key={p.line_id} className="border border-slate-200 rounded-xl p-3 hover:border-blue-200 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-300">#{rank + 1}</span>
                        <span className={`w-2 h-2 rounded-full ${m.bar}`} />
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500 truncate mb-1">{p.line_label || p.line_id}</p>
                      <p className={`font-jakarta font-bold text-xl leading-none ${m.text} mb-2`}>{pct(p.probability)}</p>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-2">
                        <div className={`h-full rounded-full ${m.bar}`} style={{ width: `${w}%`, transition: 'width 0.6s ease' }} />
                      </div>
                      {p.current_tfl_status && (
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tflDot(p.current_tfl_status)}`} />
                          <span className="text-[10px] text-slate-400 truncate">{p.current_tfl_status}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Prediction result ─────────────────────────────────────────── */
function PredictionResult({ prediction: p, onSave, saveLoading, saveMsg, onAlert, alertLoading, alertMsg }) {
  const m = sev(p.severity_class);

  return (
    <div className={`border ${m.border} rounded-xl overflow-hidden`}>
      <div className={`h-1 ${m.bar}`} />
      <div className="p-5 space-y-5">

        {/* Ring + details row */}
        <div className="flex gap-5 items-start">
          <Ring probability={p.probability} cls={p.severity_class} />

          <div className="flex-1 space-y-2.5 min-w-0 pt-1">
            <div>
              <h3 className="font-jakarta font-bold text-slate-900 text-xl leading-tight">{p.line_label}</h3>
              <p className={`text-sm font-medium mt-0.5 ${m.text}`}>{m.tip}</p>
            </div>

            {/* TfL status */}
            {p.current_tfl_status && (
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tflDot(p.current_tfl_status)}`} />
                <span className="text-sm text-slate-600"><span className="font-semibold">TfL:</span> {p.current_tfl_status}</span>
              </div>
            )}

            {/* Weather */}
            {p.weather_summary && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CloudRain className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                {p.weather_summary}
              </div>
            )}

            {/* Peak hour */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              {p.is_peak_hour
                ? <><span className="font-semibold text-amber-600">Peak hour</span> — higher congestion expected</>
                : <><span className="font-semibold text-emerald-600">Off-peak</span> — quieter travel time</>}
            </div>
          </div>
        </div>

        {/* Model breakdown */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">How the AI models voted</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Random Forest', sub: '45% weight', val: p.rf_probability },
              { label: 'LSTM Neural Net', sub: '55% weight', val: p.lstm_probability },
              { label: 'Final result', sub: 'Ensemble', val: p.ensemble_probability, hi: true },
            ].map(({ label, sub, val, hi }) => (
              <div key={label} className={`rounded-lg p-3 text-center border ${hi ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                <p className={`font-jakarta font-bold text-lg leading-none ${hi ? 'text-blue-600' : 'text-slate-700'}`}>{pct(val)}</p>
                <p className={`text-[11px] font-semibold mt-1 ${hi ? 'text-blue-600' : 'text-slate-500'}`}>{label}</p>
                <p className="text-[10px] text-slate-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-hour forecast */}
        {p.forecast?.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">3-hour forecast</p>
            <div className="grid grid-cols-3 gap-2">
              {p.forecast.slice(0, 3).map(f => {
                const fm = sev(f.severity);
                return (
                  <div key={f.hour} className={`border ${fm.border} ${fm.bg} rounded-lg p-3 text-center`}>
                    <p className="text-[11px] font-semibold text-slate-500 mb-1">{f.hour}</p>
                    <p className={`font-jakarta font-bold text-xl leading-none ${fm.text}`}>{pct(f.probability)}</p>
                    <p className={`text-[10px] font-semibold mt-1 ${fm.text}`}>{fm.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          <button onClick={onSave} disabled={saveLoading}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors">
            <MapPin className="w-3.5 h-3.5" />
            {saveLoading ? 'Saving…' : 'Save route'}
          </button>
          <button onClick={onAlert} disabled={alertLoading}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors bg-white">
            <Bell className="w-3.5 h-3.5" />
            {alertLoading ? 'Setting…' : 'Set alert'}
          </button>
          {saveMsg === 'saved' && (
            <span className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg font-medium text-emerald-700 bg-emerald-50 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" /> Route saved
            </span>
          )}
          {alertMsg === 'saved' && (
            <span className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg font-medium text-emerald-700 bg-emerald-50 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" /> Alert set
            </span>
          )}
          {(saveMsg?.startsWith('error') || alertMsg?.startsWith('error')) && (
            <span className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg font-medium text-red-700 bg-red-50">
              <AlertTriangle className="w-3.5 h-3.5" /> Something went wrong
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
