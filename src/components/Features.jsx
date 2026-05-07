import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Activity, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card1Mixer = () => {
  const [items, setItems] = useState(['Concours commun (8 écoles)', 'Dépôt jusqu\'au 20 mai', 'Épreuves 1er et 2 juin']);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-[#1A3326]/10 shadow-lg relative overflow-hidden flex flex-col h-80">
      <h3 className="text-xl font-semibold mb-2">Information Continue</h3>
      <p className="text-sm text-[#1A3326]/60 mb-6">Restez connecté aux dernières annonces des concours.</p>
      
      <div className="relative flex-1">
        {items.map((item, idx) => {
          const yPos = idx * 20;
          const scale = 1 - idx * 0.05;
          const opacity = 1 - idx * 0.2;
          const zIndex = 10 - idx;
          
          return (
            <div 
              key={item}
              className="absolute w-full p-4 rounded-xl bg-[#F2F0E9] border border-[#1A3326]/10 flex items-center gap-3"
              style={{
                transform: `translateY(${yPos}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <Activity size={18} className="text-[#D4AF37]" />
              <span className="font-data text-sm font-semibold">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Card2Typewriter = () => {
  const text = "> Initialisation module d'entrainement...\n> Chargement des annales...\n> Preparation des tests logiques...\n> Pret pour la simulation.";
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setTimeout(() => { index = 0; setDisplayedText(''); }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-[#1A3326]/10 shadow-lg h-80 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Entrainement Intensif</h3>
          <p className="text-sm text-[#1A3326]/60">Préparez-vous avec précision.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#F2F0E9] px-3 py-1 rounded-full border border-[#1A3326]/5">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
          <span className="text-xs font-data font-semibold">Flux en Direct</span>
        </div>
      </div>
      <div className="flex-1 bg-[#1A3326] rounded-xl p-4 overflow-hidden relative">
        <Terminal size={16} className="text-[#D4AF37] mb-2" />
        <pre className="font-data text-xs text-[#F2F0E9]/80 whitespace-pre-wrap leading-relaxed">
          {displayedText}
          <span className="inline-block w-2 h-4 bg-[#D4AF37] ml-1 align-middle animate-pulse"></span>
        </pre>
      </div>
    </div>
  );
};

const Card3Planner = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set(cursorRef.current, { x: 0, y: 0, scale: 1 });
      tl.to(cursorRef.current, { x: 80, y: 40, duration: 0.8, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to('.day-cell-target', { backgroundColor: '#D4AF37', color: 'white', duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 160, y: 120, duration: 0.8, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to('.save-btn', { scale: 0.95, backgroundColor: '#5c46cc', duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to('.save-btn', { scale: 1, backgroundColor: '#1A3326', duration: 0.1 }, "<")
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to('.day-cell-target', { backgroundColor: '#F2F0E9', color: '#1A3326', duration: 0.1 }, "<")
        .set(cursorRef.current, { opacity: 1, x: 0, y: 0 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div ref={containerRef} className="bg-white p-6 rounded-[2rem] border border-[#1A3326]/10 shadow-lg h-80 flex flex-col relative">
      <h3 className="text-xl font-semibold mb-2">Ambition Planifiée</h3>
      <p className="text-sm text-[#1A3326]/60 mb-6">Visualisez et atteignez vos objectifs.</p>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, i) => (
          <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-data font-semibold bg-[#F2F0E9] ${i === 2 ? 'day-cell-target' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-end">
        <div className="save-btn bg-[#1A3326] text-white text-xs font-semibold px-4 py-2 rounded-lg font-data">
          Valider Objectif
        </div>
      </div>
      <svg ref={cursorRef} className="absolute w-6 h-6 z-20 pointer-events-none drop-shadow-md" style={{ left: '20%', top: '30%' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" stroke="#1A3326" />
      </svg>
    </div>
  );
};

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-24 px-6 md:px-12 lg:px-24 bg-[#F2F0E9]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-[#1A3326] tracking-tight">Le système d'excellence.</h2>
          <p className="text-lg text-[#1A3326]/60 mt-4 max-w-2xl">Tout ce dont vous avez besoin pour réussir les concours d'ingénieurs au Sénégal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/actualites" className="block hover:-translate-y-2 transition-transform duration-300">
            <Card1Mixer />
          </Link>
          <Link to="/entrainement" className="block hover:-translate-y-2 transition-transform duration-300">
            <Card2Typewriter />
          </Link>
          <Link to="/ecoles" className="block hover:-translate-y-2 transition-transform duration-300">
            <Card3Planner />
          </Link>
        </div>
      </div>
    </section>
  );
}
