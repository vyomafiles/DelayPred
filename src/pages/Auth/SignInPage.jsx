import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { useAuthStore } from '../../store/authStore';

const brandStats = [
  { value: '68%', label: 'Prediction accuracy' },
  { value: '15K+', label: 'Predictions every day' },
  { value: 'TfL', label: 'Official API source' },
];

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (error) clearError();
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      window.location.href = '/dashboard';
    } catch {
      // error is set in store
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <div className="flex flex-1 min-h-0">

        {/* ── Left — dark brand panel ── */}
        <div className="hidden lg:flex lg:w-[42%] bg-slate-900 flex-col justify-between p-12 xl:p-16">
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-14">
              <div className="w-7 h-7 bg-blue-600 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="font-display font-semibold text-white text-lg">UK Delay Predictor</span>
            </a>

            <h2
              className="font-display font-semibold text-white leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.5rem)' }}
            >
              Know what's coming
              <br />
              <em style={{ fontStyle: 'italic', color: '#93c5fd' }}>before you leave.</em>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              AI-powered delay predictions for every London commuter. Live TfL data, updated every 30 seconds.
            </p>
          </div>

          <div className="divide-y divide-slate-800">
            {brandStats.map(({ value, label }, i) => (
              <div key={i} className="py-5">
                <div className="font-display font-semibold text-white leading-none mb-1" style={{ fontSize: '2rem' }}>
                  {value}
                </div>
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — form panel ── */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[360px]">

            <div className="mb-8">
              <h1 className="font-display font-semibold text-slate-900 leading-tight mb-2" style={{ fontSize: '2rem' }}>
                Welcome back
              </h1>
              <p className="text-sm text-slate-500">Sign in to access your predictions</p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Password
                  </label>
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none pt-0.5">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-500">Remember me for 30 days</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 group mt-1"
              >
                {isLoading ? 'Signing in…' : 'Sign In'}
                {!isLoading && <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
              </button>
            </form>

            {/* Link */}
            <p className="text-center text-sm text-slate-500 mt-7">
              Don't have an account?{' '}
              <a href="/get-started" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign up free
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
