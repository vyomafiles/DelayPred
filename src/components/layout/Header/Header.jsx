import React from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_12px_rgba(15,23,42,0.06)]'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[62px] flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-200">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="font-display font-semibold text-[1.1rem] text-slate-900 tracking-tight">
              UK Delay Predictor
            </span>
          </a>

          {/* ── Desktop nav — floating pill ── */}
          <nav className="hidden md:flex items-center gap-0.5 bg-slate-100/70 rounded-full px-1.5 py-1.5 border border-slate-200/60">
            {navLinks.map(({ label, href }) => {
              const active = path === href;
              return (
                <a
                  key={label}
                  href={href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/80'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/70'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop actions ── */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            <a
              href="/sign-in"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-4 py-2 rounded-full hover:bg-slate-100"
            >
              Sign In
            </a>
            <a
              href="/get-started"
              className="text-sm font-semibold bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>

        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel — slides down from top */}
        <div
          className={`absolute top-[62px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ease-out ${
            mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
          }`}
        >
          {/* Nav links */}
          <nav className="px-5 pt-4 pb-2">
            {navLinks.map(({ label, href }, i) => {
              const active = path === href;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 py-3 text-sm font-medium transition-colors border-b border-slate-100 last:border-0 ${
                    active ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                  {!active && <span className="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0" />}
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="px-5 pt-3 pb-5 flex flex-col gap-2.5">
            <a
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="block text-center py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="block text-center py-3 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
