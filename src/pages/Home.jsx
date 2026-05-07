import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap, BookOpen, Trophy, Users } from 'lucide-react';
import AdBanner from '../components/AdBanner';

gsap.registerPlugin(ScrollTrigger);

// ── HERO ──────────────────────────────────────
const Hero = () => {
  const heroRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-el', { y: 50, opacity: 0, duration: 1, stagger: 0.18, ease: 'power3.out', delay: 0.15 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-24 bg-[#0B120F] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070"
          alt="Ingénieur Sénégal"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B120F] via-[#0B120F]/70 to-[#0B120F]/30" />
      </div>

      {/* Badge */}
      <div className="hero-el relative z-10 mb-6 inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
        <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
        <span className="text-[#D4AF37] text-xs font-data font-semibold uppercase tracking-widest">REPFIS — 8 Grandes Écoles Publiques</span>
      </div>

      {/* Main headline */}
      <div className="relative z-10 max-w-5xl">
        <h1 className="text-[#F2F0E9] mb-4">
          <span className="hero-el block text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Demain, vous serez
          </span>
          <span className="hero-el block font-dramatic text-7xl md:text-9xl text-[#D4AF37] leading-none">
            Ingénieur.
          </span>
        </h1>
        <p className="hero-el text-[#F2F0E9]/70 text-lg md:text-xl max-w-2xl leading-relaxed mt-4 mb-8">
          Un seul concours commun. Huit écoles d'excellence. Des milliers d'étudiants sénégalais ont déjà choisi leur avenir. 
          Préparez-vous avec Sama Ecole d'Ingénieur — la plateforme des futurs bâtisseurs du Sénégal.
        </p>
        <div className="hero-el flex flex-col sm:flex-row gap-4">
          <Link to="/entrainement" className="magnetic-btn px-8 py-4 bg-[#D4AF37] text-white rounded-full text-base font-semibold inline-flex items-center gap-2">
            <span className="magnetic-btn-bg"></span>
            <span className="relative z-10 flex items-center gap-2">Commencer l'entraînement <Zap size={18} /></span>
          </Link>
          <Link to="/ecoles" className="px-8 py-4 bg-white/10 border border-white/20 text-white backdrop-blur-sm rounded-full text-base font-semibold inline-flex items-center gap-2 hover:bg-white/20 transition-colors">
            Explorer les 8 écoles <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-el relative z-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
        {[
          { val: '8', label: 'Écoles publiques' },
          { val: '5', label: 'Matières au concours' },
          { val: '100%', label: 'Gratuit & accessible' },
          { val: 'IA', label: 'Assistant Sama IA' },
        ].map(s => (
          <div key={s.label} className="border-l-2 border-[#D4AF37]/40 pl-4">
            <p className="text-3xl font-bold text-[#D4AF37]">{s.val}</p>
            <p className="text-xs text-[#F2F0E9]/50 font-data mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── WHY SECTION ────────────────────────────────
const Why = () => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-card', { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      icon: <BookOpen size={28} className="text-[#D4AF37]" />,
      title: "Information Continue",
      text: "Dates officielles du REPFIS, alertes d'ouverture des dépôts, nouvelles des 8 écoles — tout centralisé en temps réel.",
      link: '/actualites', cta: 'Voir les actualités'
    },
    {
      icon: <Zap size={28} className="text-[#D4AF37]" />,
      title: "Entraînement Ciblé",
      text: "QCM de niveau concours en Mathématiques, Physique, Chimie, Logique et Génie. Questions brassées aléatoirement à chaque session.",
      link: '/entrainement', cta: 'S\'entraîner maintenant'
    },
    {
      icon: <Users size={28} className="text-[#D4AF37]" />,
      title: "Connaître les Écoles",
      text: "Filières, avantages, débouchés et conditions d'entrée des 8 grandes écoles du REPFIS — vérifiées et mises à jour.",
      link: '/ecoles', cta: 'Explorer les écoles'
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-[#F2F0E9]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-data font-semibold text-[#D4AF37] tracking-widest uppercase mb-3">Pourquoi Sama Ecole ?</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1A3326] leading-tight">
            Tout ce qu'il vous faut<br/>pour réussir.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div key={i} className="why-card bg-white p-8 rounded-[2rem] border border-[#1A3326]/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 bg-[#1A3326] rounded-2xl flex items-center justify-center mb-6">
                {c.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1A3326] mb-3">{c.title}</h3>
              <p className="text-[#1A3326]/60 leading-relaxed text-sm flex-1">{c.text}</p>
              <Link to={c.link} className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:gap-3 transition-all">
                {c.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── SCHOOLS PREVIEW ────────────────────────────
const SchoolsPreview = () => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.school-pill', { x: -30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const schools = [
    { name: 'ESP', loc: 'Dakar', color: 'bg-emerald-100 text-emerald-800', logo: "https://esp.sn/wp-content/uploads/2019/11/logo-esp.png" },
    { name: 'EPT', loc: 'Thiès', color: 'bg-blue-100 text-blue-800', logo: "https://upload.wikimedia.org/wikipedia/commons/1/14/EPT_logo.svg" },
    { name: 'IPSL', loc: 'Saint-Louis', color: 'bg-purple-100 text-purple-800', logo: "https://www9.ugb.sn/ipsl/wp-content/uploads/2018/11/logo-ipsl.png" },
    { name: 'UFR-SI', loc: 'Thiès', color: 'bg-amber-100 text-amber-800', logo: "https://ufrsi.uidt.sn/wp-content/uploads/2021/04/logo-ufr-si-300x300.png" },
    { name: 'ENSA', loc: 'Thiès', color: 'bg-green-100 text-green-800', logo: "https://upload.wikimedia.org/wikipedia/fr/b/b2/Logo_ENSA_%28Ecole_Nationale_Sup%C3%A9rieure_d%27Agriculture%29.jpg" },
    { name: 'ENSMG', loc: 'Dakar', color: 'bg-red-100 text-red-800', logo: "https://ensmg.ucad.sn/sites/default/files/logo_ensmg.png" },
    { name: 'ISFAR', loc: 'Bambey', color: 'bg-orange-100 text-orange-800', logo: "https://uadb.edu.sn/sites/default/files/logo_isfar.png" },
    { name: 'Polytech', loc: 'Diamniadio', color: 'bg-indigo-100 text-indigo-800', logo: "https://polytech.sn/wp-content/uploads/2023/10/logo_polytech_diamniadio.png" },
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-[#1A3326]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <p className="text-xs font-data font-semibold text-[#D4AF37] tracking-widest uppercase mb-3">Le Réseau</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#F2F0E9]">
              8 écoles.<br/>Un seul concours.
            </h2>
          </div>
          <Link to="/ecoles" className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-full font-semibold text-sm hover:bg-[#D4AF37]/90 transition-colors shrink-0">
            Tout découvrir <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {schools.map(s => (
            <div key={s.name} className="school-pill bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-white rounded-xl mb-4 p-2 flex items-center justify-center overflow-hidden">
                <img src={s.logo} alt={s.name} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className={`text-xs font-data font-bold px-2 py-1 rounded-lg ${s.color} mb-2 block w-fit`}>{s.name}</span>
              <p className="text-[#F2F0E9]/70 text-xs font-data">{s.loc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── MANIFESTO ─────────────────────────────────
const Manifesto = () => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-line', { y: 40, opacity: 0, duration: 0.9, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#F2F0E9] overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="manifesto-line text-sm font-data text-[#1A3326]/40 uppercase tracking-widest mb-8">Notre conviction</p>
        <p className="manifesto-line text-2xl md:text-3xl text-[#1A3326]/50 leading-relaxed mb-6">
          La plupart des étudiants choisissent leur école par hasard, sans information.
        </p>
        <p className="manifesto-line font-dramatic text-4xl md:text-6xl text-[#1A3326] leading-tight">
          Nous croyons que chaque étudiant sénégalais mérite de choisir son avenir avec{' '}
          <em className="text-[#D4AF37] not-italic">lucidité.</em>
        </p>
      </div>
    </section>
  );
};

// ── PROCESS ────────────────────────────────────
const Process = () => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const steps = [
    { n: '01', title: "S'informer", text: "Explorez les 8 écoles du REPFIS, leurs filières et leurs débouchés.", link: '/ecoles', icon: <BookOpen size={24} /> },
    { n: '02', title: "S'entraîner", text: "Répondez à des QCM de niveau concours dans 5 matières clés.", link: '/entrainement', icon: <Zap size={24} /> },
    { n: '03', title: "Réussir", text: "Passez le concours commun et rejoignez les grandes écoles du Sénégal.", link: 'https://e-concours.ucad.sn', icon: <Trophy size={24} />, external: true },
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-[#0B120F]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-data font-semibold text-[#D4AF37] tracking-widest uppercase mb-3">Le chemin</p>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#F2F0E9] mb-14">3 étapes vers<br/>l'excellence.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="step-card bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-data text-5xl font-bold text-[#D4AF37]/20">{s.n}</span>
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center text-[#D4AF37]">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#F2F0E9] mb-3">{s.title}</h3>
              <p className="text-[#F2F0E9]/50 text-sm leading-relaxed flex-1">{s.text}</p>
              {s.external ? (
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:gap-3 transition-all">
                  S'inscrire au concours <ArrowRight size={16} />
                </a>
              ) : (
                <Link to={s.link} className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:gap-3 transition-all">
                  Commencer <ArrowRight size={16} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA FINAL ─────────────────────────────────
const FinalCTA = () => (
  <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#1A3326] text-center">
    <div className="max-w-3xl mx-auto">
      <p className="text-xs font-data font-semibold text-[#D4AF37] tracking-widest uppercase mb-6">Prêt ?</p>
      <h2 className="font-dramatic text-5xl md:text-7xl text-[#F2F0E9] mb-4 leading-tight">
        Votre avenir<br/>commence ici.
      </h2>
      <p className="text-[#F2F0E9]/50 text-lg mb-12 max-w-xl mx-auto">
        Des milliers d'étudiants sénégalais bâtissent chaque année l'Afrique de demain depuis ces 8 écoles. 
        Votre place vous attend.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/entrainement" className="magnetic-btn px-10 py-5 bg-[#D4AF37] text-white rounded-full text-lg font-semibold inline-flex items-center justify-center gap-2">
          <span className="magnetic-btn-bg"></span>
          <span className="relative z-10 flex items-center gap-2">Commencer l'entraînement <Zap size={20} /></span>
        </Link>
        <a href="https://e-concours.ucad.sn" target="_blank" rel="noopener noreferrer"
          className="px-10 py-5 border border-white/20 text-white rounded-full text-lg font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
          S'inscrire au concours <ArrowRight size={20} />
        </a>
      </div>
    </div>
  </section>
);

// ── HOME PAGE ─────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Why />
      <div className="px-6 md:px-12 lg:px-24 bg-[#F2F0E9]"><AdBanner /></div>
      <SchoolsPreview />
      <Manifesto />
      <Process />
      <FinalCTA />
    </>
  );
}
