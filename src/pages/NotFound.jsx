import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B120F] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#1A3326] p-8 rounded-3xl border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
        
        {/* Ligne lumineuse en haut */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37] animate-pulse"></div>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#F2F0E9]/5 rounded-2xl flex items-center justify-center border border-[#F2F0E9]/10">
            <Terminal size={32} className="text-[#D4AF37]" />
          </div>
        </div>

        <h1 className="font-dramatic text-6xl text-[#F2F0E9] mb-2">404</h1>
        <h2 className="font-data tracking-widest text-[#D4AF37] text-xs uppercase mb-6">Systeme non trouve</h2>
        
        <p className="text-[#F2F0E9]/60 mb-8 leading-relaxed">
          Le répertoire que vous essayez d'atteindre n'existe pas dans la base de données du REPFIS. La simulation a été interrompue.
        </p>

        <Link to="/" className="magnetic-btn w-full py-4 bg-[#F2F0E9]/5 hover:bg-[#F2F0E9]/10 border border-[#F2F0E9]/10 text-[#F2F0E9] rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
          <span className="magnetic-btn-bg"></span>
          <span className="relative z-10 flex items-center gap-2">
            <Home size={18} /> Revenir a l'accueil
          </span>
        </Link>
      </div>
    </div>
  );
}
