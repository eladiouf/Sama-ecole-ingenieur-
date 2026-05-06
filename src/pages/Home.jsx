import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Activity, Terminal, Crosshair, CheckCircle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

gsap.registerPlugin(ScrollTrigger);

// --- Hero Section ---
const Hero = () => {
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
};

// --- Features Section ---
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
    <div className="bg-white p-6 rounded-[2rem] border border-[#18181B]/10 shadow-lg relative overflow-hidden flex flex-col h-80">
      <h3 className="text-xl font-semibold mb-2">Information Continue</h3>
      <p className="text-sm text-[#18181B]/60 mb-6">Restez connecté aux dernières annonces des concours.</p>
      
      <div className="relative flex-1">
        {items.map((item, idx) => {
          const yPos = idx * 20;
          const scale = 1 - idx * 0.05;
          const opacity = 1 - idx * 0.2;
          const zIndex = 10 - idx;
          
          return (
            <div 
              key={item}
              className="absolute w-full p-4 rounded-xl bg-[#F0EFF4] border border-[#18181B]/10 flex items-center gap-3"
              style={{
                transform: `translateY(${yPos}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <Activity size={18} className="text-[#7B61FF]" />
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
    <div className="bg-white p-6 rounded-[2rem] border border-[#18181B]/10 shadow-lg h-80 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Entrainement Intensif</h3>
          <p className="text-sm text-[#18181B]/60">Préparez-vous avec précision.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0EFF4] px-3 py-1 rounded-full border border-[#18181B]/5">
          <div className="w-2 h-2 rounded-full bg-[#7B61FF] animate-pulse"></div>
          <span className="text-xs font-data font-semibold">Flux en Direct</span>
        </div>
      </div>
      <div className="flex-1 bg-[#18181B] rounded-xl p-4 overflow-hidden relative">
        <Terminal size={16} className="text-[#7B61FF] mb-2" />
        <pre className="font-data text-xs text-[#F0EFF4]/80 whitespace-pre-wrap leading-relaxed">
          {displayedText}
          <span className="inline-block w-2 h-4 bg-[#7B61FF] ml-1 align-middle animate-pulse"></span>
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
        .to('.day-cell-target', { backgroundColor: '#7B61FF', color: 'white', duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 160, y: 120, duration: 0.8, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to('.save-btn', { scale: 0.95, backgroundColor: '#5c46cc', duration: 0.1 }, "<")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to('.save-btn', { scale: 1, backgroundColor: '#18181B', duration: 0.1 }, "<")
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to('.day-cell-target', { backgroundColor: '#F0EFF4', color: '#18181B', duration: 0.1 }, "<")
        .set(cursorRef.current, { opacity: 1, x: 0, y: 0 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div ref={containerRef} className="bg-white p-6 rounded-[2rem] border border-[#18181B]/10 shadow-lg h-80 flex flex-col relative">
      <h3 className="text-xl font-semibold mb-2">Ambition Planifiée</h3>
      <p className="text-sm text-[#18181B]/60 mb-6">Visualisez et atteignez vos objectifs.</p>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, i) => (
          <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-data font-semibold bg-[#F0EFF4] ${i === 2 ? 'day-cell-target' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-end">
        <div className="save-btn bg-[#18181B] text-white text-xs font-semibold px-4 py-2 rounded-lg font-data">
          Valider Objectif
        </div>
      </div>
      <svg ref={cursorRef} className="absolute w-6 h-6 z-20 pointer-events-none drop-shadow-md" style={{ left: '20%', top: '30%' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white" stroke="#18181B" />
      </svg>
    </div>
  );
};

const Features = () => {
  return (
    <section id="fonctionnalites" className="py-24 px-6 md:px-12 lg:px-24 bg-[#F0EFF4]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-[#18181B] tracking-tight">Le système d'excellence.</h2>
          <p className="text-lg text-[#18181B]/60 mt-4 max-w-2xl">Tout ce dont vous avez besoin pour réussir les concours d'ingénieurs au Sénégal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card1Mixer />
          <Card2Typewriter />
          <Card3Planner />
        </div>
      </div>
    </section>
  );
};

// --- Philosophy Section ---
const Philosophy = () => {
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
    <section id="philosophie" ref={sectionRef} className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#0A0A14] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
          alt="Microscopy Abstract" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        <p className="phil-line text-[#F0EFF4]/70 text-xl md:text-2xl font-medium tracking-wide">
          La plupart des plateformes se concentrent sur : la distribution passive d'informations.
        </p>
        <p className="phil-line font-dramatic text-4xl md:text-6xl lg:text-7xl text-[#F0EFF4] leading-tight mt-4">
          Nous nous concentrons sur : <span className="text-[#7B61FF]">l'entrainement strategique</span> pour votre avenir.
        </p>
      </div>
    </section>
  );
};

// --- Protocol Section ---
const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: 'top top+=100',
          endTrigger: cards[index + 1],
          end: 'top top+=100',
          pin: true,
          pinSpacing: false,
          animation: gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(20px)',
            ease: 'none'
          }),
          scrub: true,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocole" ref={containerRef} className="py-24 bg-[#F0EFF4] px-4">
      <div className="max-w-4xl mx-auto space-y-24">
        {/* Card 1 */}
        <div className="protocol-card bg-white p-12 rounded-[3rem] shadow-xl min-h-[60vh] flex flex-col md:flex-row items-center gap-12 border border-[#18181B]/5">
          <div className="flex-1">
            <div className="font-data text-[#7B61FF] font-bold text-xl mb-4">01</div>
            <h3 className="text-3xl font-semibold mb-4">S'informer</h3>
            <p className="text-[#18181B]/70 text-lg leading-relaxed">
              Le REPFIS regroupe les 8 écoles d'ingénieurs publiques du Sénégal (ESP, EPT, IPSL, etc.). Informez-vous pour passer un seul concours commun d'accès.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <svg className="w-48 h-48 animate-[spin_10s_linear_infinite] text-[#7B61FF] opacity-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" strokeDasharray="5 5" />
              <circle cx="50" cy="50" r="20" />
              <path d="M50 10 L50 90 M10 50 L90 50" />
            </svg>
          </div>
        </div>

        {/* Card 2 */}
        <div className="protocol-card bg-white p-12 rounded-[3rem] shadow-xl min-h-[60vh] flex flex-col md:flex-row items-center gap-12 border border-[#18181B]/5">
          <div className="flex-1">
            <div className="font-data text-[#7B61FF] font-bold text-xl mb-4">02</div>
            <h3 className="text-3xl font-semibold mb-4">S'entrainer</h3>
            <p className="text-[#18181B]/70 text-lg leading-relaxed">
              Préparez-vous avec notre base de données d'annales, d'exercices ciblés et de simulations d'examens conçus pour l'excellence.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center w-full relative h-48 bg-[#0A0A14] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex space-x-1 p-4 opacity-30">
              {Array.from({length: 20}).map((_, i) => (
                <div key={i} className="flex-1 bg-[#7B61FF] rounded-full"></div>
              ))}
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-[#7B61FF] shadow-[0_0_15px_rgba(123,97,255,0.8)] animate-[ping_2s_ease-in-out_infinite_alternate]" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="protocol-card bg-white p-12 rounded-[3rem] shadow-xl min-h-[60vh] flex flex-col md:flex-row items-center gap-12 border border-[#18181B]/5">
          <div className="flex-1">
            <div className="font-data text-[#7B61FF] font-bold text-xl mb-4">03</div>
            <h3 className="text-3xl font-semibold mb-4">Reussir</h3>
            <p className="text-[#18181B]/70 text-lg leading-relaxed">
              Transformez votre ambition en succès. Choisissez votre école d'ingénieur et bâtissez la fondation de votre carrière professionnelle.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <svg className="w-full h-32" viewBox="0 0 200 100" fill="none" stroke="#7B61FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path className="animate-[dash_2s_linear_infinite]" strokeDasharray="1000" strokeDashoffset="1000" d="M0 50 L40 50 L50 20 L70 80 L80 50 L200 50">
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Call to Action (Start) ---
const CTA = () => {
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
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Philosophy />
      <div className="px-6 md:px-12 lg:px-24 bg-[#0A0A14]">
        <AdBanner />
      </div>
      <Protocol />
      <CTA />
    </>
  );
}
