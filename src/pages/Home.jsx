import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import CTA from '../components/CTA';
import AdBanner from '../components/AdBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Philosophy />
      <div className="px-6 md:px-12 lg:px-24 bg-[#0B120F]">
        <AdBanner />
      </div>
      <Protocol />
      <CTA />
    </>
  );
}
