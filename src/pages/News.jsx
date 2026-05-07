import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Bell, AlertCircle, ArrowRight } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const newsItems = [
  {
    id: 1,
    type: 'alert',
    date: '15 Mai 2026',
    title: 'Clôture imminente des dépôts REPFIS',
    content: 'La date limite pour le dépôt des dossiers physiques à la Direction des Examens et Concours est fixée au 20 Mai. Assurez-vous d\'avoir toutes les pièces certifiées.',
    icon: <AlertCircle className="text-red-500" size={24} />,
    color: 'border-red-500/30 bg-red-500/5'
  },
  {
    id: 2,
    type: 'info',
    date: '10 Mai 2026',
    title: 'Nouvelle filière IA à Polytech Diamniadio',
    content: 'Le Ministère de l\'Enseignement Supérieur a officialisé l\'ouverture d\'une nouvelle filière dédiée à l\'Intelligence Artificielle et au Big Data pour la prochaine rentrée.',
    icon: <Bell className="text-[#D4AF37]" size={24} />,
    color: 'border-[#D4AF37]/30 bg-[#D4AF37]/5'
  },
  {
    id: 3,
    type: 'event',
    date: '1 Juin 2026',
    title: 'Dates officielles des épreuves écrites',
    content: 'Les épreuves écrites se dérouleront sur deux jours (1er et 2 Juin). Jour 1 : Mathématiques et Physique. Jour 2 : Chimie, Logique et Français.',
    icon: <Calendar className="text-[#196F3D]" size={24} />,
    color: 'border-[#196F3D]/30 bg-[#196F3D]/5'
  },
  {
    id: 4,
    type: 'info',
    date: '28 Avril 2026',
    title: 'Guide de préparation disponible',
    content: 'Les annales des concours de 2018 à 2025 sont désormais disponibles dans la section Entraînement. Utilisez-les pour évaluer votre niveau réel.',
    icon: <Bell className="text-[#D4AF37]" size={24} />,
    color: 'border-[#D4AF37]/30 bg-[#D4AF37]/5'
  }
];

export default function News() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="text-xs font-data font-semibold text-[#1A3326] tracking-wider uppercase">Flux National</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-7xl text-[#1A3326] mb-6">
            Information Continue.
          </h1>
          <p className="text-lg text-[#1A3326]/70 max-w-2xl">
            Restez informé des dates clés, des annonces officielles du Ministère et des nouveautés du réseau REPFIS. Ne ratez aucune échéance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#1A3326]/10 ml-4 md:ml-8 space-y-12 pb-12">
          {newsItems.map((item) => (
            <div key={item.id} className="news-item relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-6 w-5 h-5 rounded-full bg-[#F2F0E9] border-4 border-[#1A3326] shadow-sm"></div>
              
              {/* Card */}
              <div className={`p-6 md:p-8 rounded-[2rem] border bg-white shadow-xl shadow-[#1A3326]/5 transition-transform hover:-translate-y-1 duration-300 ${item.color}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-black/5">
                      {item.icon}
                    </div>
                    <span className="font-data text-sm font-bold text-[#1A3326]/60 bg-[#1A3326]/5 px-3 py-1 rounded-full">
                      {item.date}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#1A3326] mb-3">{item.title}</h3>
                <p className="text-[#1A3326]/70 leading-relaxed text-lg">
                  {item.content}
                </p>
                
                <button className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-[#1A3326] transition-colors group">
                  Lire les détails <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <AdBanner />
        </div>
      </div>
    </div>
  );
}
