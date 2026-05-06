import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="rejoindre" className="py-32 px-6 bg-[#0A0A14] text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-dramatic text-5xl md:text-7xl text-white mb-8">Votre avenir commence ici.</h2>
        <a href="https://e-concours.ucad.sn" target="_blank" rel="noopener noreferrer" className="magnetic-btn px-10 py-5 bg-[#7B61FF] text-white rounded-full text-xl font-semibold inline-flex items-center gap-3">
          <span className="magnetic-btn-bg"></span>
          <span className="relative z-10 flex items-center gap-2">Choisir mon ecole d'ingenieur <ChevronRight size={24} /></span>
        </a>
      </div>
    </section>
  );
}
