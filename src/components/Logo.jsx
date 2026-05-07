import React from 'react';
import logoUrl from '../assets/logo-sama.png';

export default function Logo({ className = "h-10", withText = true }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={logoUrl} 
        alt="Sama Ecole d'Ingénieur Logo" 
        className="h-full w-auto object-contain"
      />
      {withText && (
        <span className="font-semibold text-lg tracking-tight hidden sm:block">
          Sama <span className="text-[#D4AF37]">Ecole</span>
        </span>
      )}
    </div>
  );
}
