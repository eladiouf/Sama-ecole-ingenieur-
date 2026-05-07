import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Home from './pages/Home';
import Schools from './pages/Schools';
import NotFound from './pages/NotFound';
import News from './pages/News';
import Training from './pages/Training';
import ScrollToTop from './components/ScrollToTop';
import AiChat from './components/AiChat';

gsap.registerPlugin(ScrollTrigger);

// --- Page Transition Wrapper ---
const PageWrapper = ({ children }) => {
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Fade in effect on route change
    gsap.fromTo(pageRef.current, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return <div ref={pageRef}>{children}</div>;
};

// --- Noise Overlay Component ---
const NoiseOverlay = () => (
  <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
  </svg>
);

// --- Navbar Component ---
const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(242,240,233,0.85)', backdropFilter: 'blur(16px)', borderColor: 'rgba(26,51,38,0.12)', color: '#1A3326', duration: 0.3 });
          } else if (self.progress === 0 && location.pathname === '/') {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', borderColor: 'transparent', color: '#F2F0E9', duration: 0.3 });
          } else if (self.progress === 0 && location.pathname !== '/') {
            gsap.to(navRef.current, { backgroundColor: 'rgba(242,240,233,0.85)', backdropFilter: 'blur(16px)', borderColor: 'rgba(26,51,38,0.12)', color: '#1A3326', duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const navClass = location.pathname === '/'
    ? 'text-[#F2F0E9] border-transparent bg-transparent'
    : 'text-[#1A3326] bg-[rgba(242,240,233,0.85)] backdrop-blur-[16px] border-[rgba(26,51,38,0.12)]';

  const linkClass = 'hover:-translate-y-px transition-transform font-medium text-sm';

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/ecoles', label: 'Les Écoles' },
    { to: '/actualites', label: 'Actualités' },
    { to: '/entrainement', label: 'Entraînement' },
  ];

  return (
    <>
      {/* Main pill navbar */}
      <div className="fixed top-4 left-0 w-full flex justify-center z-50 px-4">
        <nav ref={navRef} className={`flex items-center justify-between px-5 py-3 rounded-[3rem] border w-full max-w-4xl transition-colors ${navClass}`}>
          
          {/* Logo */}
          <Link to="/" className="font-bold text-lg tracking-tight">Sama Ecole</Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) =>
                `${linkClass} ${isActive ? 'opacity-100 font-semibold' : 'opacity-70'}`
              }>{label}</NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://e-concours.ucad.sn"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex magnetic-btn px-5 py-2 bg-[#D4AF37] text-white rounded-full text-sm font-semibold"
            >
              <span className="magnetic-btn-bg"></span>
              <span className="relative z-10">S'inscrire</span>
            </a>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-xl border border-current/20 p-2"
              aria-label="Menu"
            >
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile slide-down menu */}
      <div className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        
        {/* Menu panel */}
        <div className={`relative bg-[#1A3326] text-[#F2F0E9] pt-24 pb-8 px-6 flex flex-col gap-2 transition-transform duration-300 ${
          mobileOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-4 px-4 text-xl font-semibold border-b border-white/10 flex items-center justify-between ${
                  isActive ? 'text-[#D4AF37]' : 'text-[#F2F0E9]/80'
                }`
              }
            >
              {label}
              <span className="text-[#D4AF37] text-2xl">&rsaquo;</span>
            </NavLink>
          ))}
          
          <a
            href="https://e-concours.ucad.sn"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 py-4 px-6 bg-[#D4AF37] text-[#1A3326] rounded-2xl text-lg font-bold text-center"
          >
            S'inscrire au concours
          </a>
        </div>
      </div>
    </>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-[#05050A] text-[#F2F0E9] pt-24 pb-12 px-6 md:px-12 lg:px-24 rounded-t-[4rem] relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-2xl font-bold mb-4">Sama Ecole</h4>
          <p className="text-[#F2F0E9]/60 max-w-sm">
            La plateforme de référence pour les concours d'ingénieurs au Sénégal, propulsée par le REPFIS.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-4 text-[#D4AF37] font-data text-sm">NAVIGATION</h5>
          <ul className="space-y-3 text-[#F2F0E9]/70">
            <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link to="/ecoles" className="hover:text-white transition-colors">Les Écoles REPFIS</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4 text-[#D4AF37] font-data text-sm">LEGAL</h5>
          <ul className="space-y-3 text-[#F2F0E9]/70">
            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-[#F2F0E9]/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[#F2F0E9]/40 text-sm">
          © {new Date().getFullYear()} Sama Ecole d'Ingenieur. Tous droits réservés.
        </div>
        <div className="flex items-center gap-2 bg-[#1A3326] px-4 py-2 rounded-full border border-[#F2F0E9]/10">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-data font-semibold">Système Opérationnel</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <NoiseOverlay />
      <Navbar />
      
      <ScrollToTop />
      <AiChat />
      
      <Routes>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/ecoles" element={<PageWrapper><Schools /></PageWrapper>} />
        <Route path="/actualites" element={<PageWrapper><News /></PageWrapper>} />
        <Route path="/entrainement" element={<PageWrapper><Training /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
