import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] flex items-end pb-24 px-6 md:px-12 lg:px-24 bg-[#0A0A14] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
          alt="Biotech Neon Cyber" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="text-[#F0EFF4] flex flex-col gap-2">
          <span className="hero-text text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight uppercase">
            Sama Ecole d'Ingenieur au-delà de
          </span>
          <span className="hero-text font-dramatic text-7xl md:text-8xl lg:text-9xl text-[#7B61FF] leading-none mt-2">
            l'innovation.
          </span>
        </h1>
        <p className="hero-text text-[#F0EFF4]/80 mt-6 max-w-xl text-lg md:text-xl">
          Passez le concours commun du Réseau des Établissements Publics de Formation d'Ingénieurs du Sénégal (REPFIS) et intégrez l'une des 8 grandes écoles publiques.
        </p>
        <div className="hero-text mt-10">
          <a href="https://e-concours.ucad.sn" target="_blank" rel="noopener noreferrer" className="magnetic-btn px-8 py-4 bg-[#7B61FF] text-white rounded-full text-lg font-semibold inline-flex items-center gap-2">
            <span className="magnetic-btn-bg"></span>
            <span className="relative z-10 flex items-center gap-2">Choisir mon ecole d'ingenieur <ArrowRight size={20} /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
