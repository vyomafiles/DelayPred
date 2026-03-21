import React from 'react';
import { Hero } from '../../components/features/landing/Hero';
import { Features } from '../../components/features/landing/Features';
import { HowItWorks } from '../../components/features/landing/HowItWorks';

export function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
    </>
  );
}
