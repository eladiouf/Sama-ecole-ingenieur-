import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophie" ref={sectionRef} className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#0B120F] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000" 
          alt="Architecture Blueprints" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        <p className="phil-line text-[#F2F0E9]/70 text-xl md:text-2xl font-medium tracking-wide">
          La plupart des plateformes se concentrent sur : la distribution passive d'informations.
        </p>
        <p className="phil-line font-dramatic text-4xl md:text-6xl lg:text-7xl text-[#F2F0E9] leading-tight mt-4">
          Nous nous concentrons sur : <span className="text-[#D4AF37]">l'entrainement strategique</span> pour votre avenir.
        </p>
      </div>
    </section>
  );
}
