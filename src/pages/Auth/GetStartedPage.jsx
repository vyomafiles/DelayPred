import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Header } from '../../components/layout/Header';

const stepMeta = [
  { number: 1, label: 'Your details' },
  { number: 2, label: 'Security' },
  { number: 3, label: 'Preferences' },
];

const transportOptions = [
  { value: 'all', label: 'All transport', sub: 'Tube, Bus & Train' },
  { value: 'tube', label: 'Underground', sub: 'TfL Tube only' },
  { value: 'bus', label: 'Bus', sub: 'London Bus network' },
  { value: 'train', label: 'Rail', sub: 'National Rail' },
];

const locationOptions = [
  { value: 'central', label: 'Central London' },
  { value: 'north', label: 'North London' },
  { value: 'south', label: 'South London' },
  { value: 'east', label: 'East London' },
  { value: 'west', label: 'West London' },
  { value: 'suburbs', label: 'Greater London' },
];

/* ── Step indicator ── */
function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {stepMeta.map(({ number, label }, i) => {
        const done = number < current;
        const active = number === current;
        return (
          <React.Fragment key={number}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                  done
                    ? 'bg-blue-600 text-white'
                    : active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : number}
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${active ? 'text-slate-700' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {i < stepMeta.length - 1 && (
              <div className={`flex-1 h-px mx-3 mb-5 transition-colors ${done ? 'bg-blue-600' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Shared field label ── */
function FieldLabel({ children }) {
  return (
    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
      {children}
    </label>
  );
}

/* ── Shared text input ── */
function TextInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
      />
    </div>
  );
}

export function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    transport: 'all',
    agreeTerms: false,
    newsletter: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(s => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Welcome to TransitPredict! Check your email to verify your account.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Subtle top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-60" />

      <div className="flex-1 flex items-start justify-center px-6 py-12 lg:py-16">
        <div className="w-full max-w-lg">

          {/* Page heading */}
          <div className="mb-8">
            <h1 className="font-display font-semibold text-slate-900 leading-tight mb-2" style={{ fontSize: '2rem' }}>
              Create your account
            </h1>
            <p className="text-sm text-slate-500">
              Start predicting delays in three quick steps.
            </p>
          </div>

          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* Step content */}
          <form onSubmit={step === 3 ? handleSubmit : handleNext}>

            {/* ── Step 1: Basic info ── */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <FieldLabel>Full name</FieldLabel>
                  <TextInput
                    icon={User}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Sarah Johnson"
                  />
                </div>
                <div>
                  <FieldLabel>Email address</FieldLabel>
                  <TextInput
                    icon={Mail}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <p className="text-xs text-slate-400 pt-1">
                  We'll send a verification link to this address.
                </p>
              </div>
            )}

            {/* ── Step 2: Password & location ── */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <FieldLabel>Password</FieldLabel>
                  <TextInput
                    icon={Lock}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Minimum 8 characters"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    Use a mix of letters, numbers, and symbols.
                  </p>
                </div>
                <div>
                  <FieldLabel>Your area</FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
                    >
                      <option value="">Select your area</option>
                      {locationOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">
                    We'll optimise predictions for your commute zone.
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 3: Preferences ── */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <FieldLabel>Transport type</FieldLabel>
                  <div className="grid grid-cols-2 gap-2.5">
                    {transportOptions.map(opt => (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-3 p-3.5 border rounded-lg cursor-pointer transition-colors ${
                          formData.transport === opt.value
                            ? 'border-blue-500 bg-blue-50/50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="transport"
                          value={opt.value}
                          checked={formData.transport === opt.value}
                          onChange={handleChange}
                          className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800 leading-tight">{opt.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{opt.sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600 leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Privacy Policy</a>
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-500">Send me tips and new feature updates</span>
                  </label>
                </div>
              </div>
            )}

            {/* ── Navigation buttons ── */}
            <div className={`flex gap-3 mt-7 ${step > 1 ? 'grid grid-cols-2' : ''}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 group w-full"
              >
                {step === 3 ? 'Create Account' : 'Continue'}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-8 pt-8 border-t border-slate-100">
            {['Free forever plan', 'No credit card', 'GDPR compliant'].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs text-slate-400 font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{' '}
            <a href="/sign-in" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Sign in
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
