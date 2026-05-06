import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Home from './pages/Home';
import Schools from './pages/Schools';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

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

  useEffect(() => {
    // Reset background if not on home page, or apply scroll effect
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(navRef.current, { backgroundColor: 'rgba(240, 239, 244, 0.6)', backdropFilter: 'blur(16px)', borderColor: 'rgba(24, 24, 27, 0.1)', color: '#18181B', duration: 0.3 });
          } else if (self.progress === 0 && location.pathname === '/') {
            gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', borderColor: 'transparent', color: '#F0EFF4', duration: 0.3 });
          } else if (self.progress === 0 && location.pathname !== '/') {
             // For non-home pages, keep it styled since there's no dark hero
            gsap.to(navRef.current, { backgroundColor: 'rgba(240, 239, 244, 0.6)', backdropFilter: 'blur(16px)', borderColor: 'rgba(24, 24, 27, 0.1)', color: '#18181B', duration: 0.3 });
          }
        }
      });
      
      // Initial state is handled directly via CSS classes in JSX
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
    ? 'text-[#F0EFF4] border-transparent bg-transparent'
    : 'text-[#18181B] bg-[rgba(240,239,244,0.6)] backdrop-blur-[16px] border-[rgba(24,24,27,0.1)]';

  return (
    <div className="fixed top-6 left-0 w-full flex justify-center z-50 px-4">
      <nav ref={navRef} className={`flex items-center justify-between px-6 py-3 rounded-[3rem] border w-full max-w-4xl transition-colors ${navClass}`}>
        <Link to="/" className="font-bold text-lg tracking-tight">Sama Ecole</Link>
        <div className="hidden md:flex gap-6 font-medium text-sm">
          <Link to="/" className="hover:-translate-y-px transition-transform">Accueil</Link>
          <Link to="/ecoles" className="hover:-translate-y-px transition-transform">Les Écoles</Link>
          <Link to="/#philosophie" className="hover:-translate-y-px transition-transform">Vision</Link>
          <Link to="/#protocole" className="hover:-translate-y-px transition-transform">Processus</Link>
        </div>
        <a href="https://e-concours.ucad.sn" target="_blank" rel="noopener noreferrer" className="magnetic-btn px-5 py-2 bg-[#7B61FF] text-white rounded-full text-sm font-semibold">
          <span className="magnetic-btn-bg"></span>
          <span className="relative z-10">S'inscrire</span>
        </a>
      </nav>
    </div>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-[#05050A] text-[#F0EFF4] pt-24 pb-12 px-6 md:px-12 lg:px-24 rounded-t-[4rem] relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-2xl font-bold mb-4">Sama Ecole</h4>
          <p className="text-[#F0EFF4]/60 max-w-sm">
            La plateforme de référence pour les concours d'ingénieurs au Sénégal, propulsée par le REPFIS.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-4 text-[#7B61FF] font-data text-sm">NAVIGATION</h5>
          <ul className="space-y-3 text-[#F0EFF4]/70">
            <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link to="/ecoles" className="hover:text-white transition-colors">Les Écoles REPFIS</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4 text-[#7B61FF] font-data text-sm">LEGAL</h5>
          <ul className="space-y-3 text-[#F0EFF4]/70">
            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-[#F0EFF4]/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[#F0EFF4]/40 text-sm">
          © {new Date().getFullYear()} Sama Ecole d'Ingenieur. Tous droits réservés.
        </div>
        <div className="flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-full border border-[#F0EFF4]/10">
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
      
      <Routes>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/ecoles" element={<PageWrapper><Schools /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
