import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
