import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const footerLinks = {
  Product: [
    ['Features', '/features'],
    ['How It Works', '/how-it-works'],
    ['Pricing', '#pricing'],
    ['Security', '#'],
  ],
  Company: [
    ['About Us', '/about'],
    ['Blog', '#'],
    ['Careers', '#'],
    ['Press', '#'],
  ],
  Legal: [
    ['Privacy Policy', '#'],
    ['Terms of Service', '#'],
    ['Cookie Policy', '#'],
    ['GDPR', '#'],
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-full" />
              <span className="font-display font-semibold text-xl text-slate-900">TransitPredict</span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6 font-light">
              AI-powered transport delay predictions for UK commuters. Know delays before they happen.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-300 hover:text-slate-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © 2026 TransitPredict. All rights reserved.
          </p>
          <a
            href="mailto:hello@transitpredict.com"
            className="text-xs text-slate-400 hover:text-slate-900 transition-colors"
          >
            hello@transitpredict.com
          </a>
        </div>
      </div>
    </footer>
  );
}
