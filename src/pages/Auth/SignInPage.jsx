import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Header } from '../../components/layout/Header';

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const brandStats = [
  { value: '68%', label: 'Prediction accuracy' },
  { value: '15K+', label: 'Predictions every day' },
  { value: 'TfL', label: 'Official API source' },
];

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Welcome back to TransitPredict!');
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
              <span className="font-display font-semibold text-white text-lg">TransitPredict</span>
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
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 group mt-1"
              >
                Sign In
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400">or continue with</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-2.5">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <GoogleIcon /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <GithubIcon /> GitHub
              </button>
            </div>

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
