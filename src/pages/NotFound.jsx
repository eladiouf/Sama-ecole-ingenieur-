import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A14] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#18181B] p-8 rounded-3xl border border-[#7B61FF]/20 shadow-2xl relative overflow-hidden">
        
        {/* Ligne lumineuse en haut */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#7B61FF] animate-pulse"></div>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#F0EFF4]/5 rounded-2xl flex items-center justify-center border border-[#F0EFF4]/10">
            <Terminal size={32} className="text-[#7B61FF]" />
          </div>
        </div>

        <h1 className="font-dramatic text-6xl text-[#F0EFF4] mb-2">404</h1>
        <h2 className="font-data tracking-widest text-[#7B61FF] text-xs uppercase mb-6">Systeme non trouve</h2>
        
        <p className="text-[#F0EFF4]/60 mb-8 leading-relaxed">
          Le répertoire que vous essayez d'atteindre n'existe pas dans la base de données du REPFIS. La simulation a été interrompue.
        </p>

        <Link to="/" className="magnetic-btn w-full py-4 bg-[#F0EFF4]/5 hover:bg-[#F0EFF4]/10 border border-[#F0EFF4]/10 text-[#F0EFF4] rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
          <span className="magnetic-btn-bg"></span>
          <span className="relative z-10 flex items-center gap-2">
            <Home size={18} /> Revenir a l'accueil
          </span>
        </Link>
      </div>
    </div>
  );
}
