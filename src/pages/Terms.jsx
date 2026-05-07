import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileText } from 'lucide-react';

export default function Terms() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-24 px-6 md:px-12 lg:px-24" ref={ref}>
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#1A3326] rounded-2xl flex items-center justify-center">
            <FileText size={20} className="text-[#D4AF37]" />
          </div>
          <span className="text-xs font-data font-semibold text-[#1A3326]/50 tracking-wider uppercase">Document Légal</span>
        </div>

        <h1 className="font-dramatic text-5xl md:text-6xl text-[#1A3326] mb-4">Conditions d'Utilisation</h1>
        <p className="text-[#1A3326]/50 font-data text-sm mb-12">Dernière mise à jour : Mai 2026</p>

        <div className="space-y-6">
          {[
            {
              title: "1. Acceptation des conditions",
              content: `En accédant à Sama Ecole d'Ingénieur (ci-après "le Site"), vous acceptez sans réserve les présentes conditions d'utilisation. Si vous n'êtes pas d'accord avec ces conditions, veuillez ne pas utiliser ce site.`
            },
            {
              title: "2. Description du service",
              content: `Sama Ecole d'Ingénieur est une plateforme d'information et de préparation aux concours du REPFIS. Elle propose des informations sur les 8 écoles membres, un flux d'actualités, un module d'entraînement par QCM généré par intelligence artificielle, et un assistant virtuel (Sama IA). Ces services sont fournis à titre indicatif et pédagogique.`
            },
            {
              title: "3. Exactitude des informations",
              content: `Nous nous efforçons de fournir des informations exactes et à jour sur les écoles du REPFIS. Cependant, les informations concernant les filières, dates de concours, modalités d'admission et débouchés peuvent évoluer. Nous vous recommandons de toujours vérifier les informations officielles directement auprès des établissements concernés (esp.sn, ept.sn, polytech.sn, etc.) ou du Ministère de l'Enseignement Supérieur.`
            },
            {
              title: "4. Module d'entraînement et IA",
              content: `Les questions générées par le module d'entraînement sont produites par l'API Google Gemini. Bien que nous paramétrions l'IA pour fournir des questions rigoureuses, la précision scientifique de chaque question ne peut pas être garantie à 100%. Ce module est un outil de préparation complémentaire et ne remplace pas les annales officielles ni les cours.`
            },
            {
              title: "5. Propriété intellectuelle",
              content: `Le contenu original de ce site (textes de présentation, design, architecture) est la propriété de Sama Ecole d'Ingénieur. Les informations relatives aux écoles (noms, filières) sont des données publiques. Toute reproduction partielle ou totale du site à des fins commerciales sans autorisation préalable est interdite.`
            },
            {
              title: "6. Liens externes",
              content: `Ce site contient des liens vers des sites tiers (esp.sn, e-concours.ucad.sn, etc.). Sama Ecole d'Ingénieur ne peut être tenu responsable du contenu de ces sites externes et n'endosse pas leur contenu.`
            },
            {
              title: "7. Limitation de responsabilité",
              content: `Sama Ecole d'Ingénieur ne saurait être tenu responsable des décisions prises par les utilisateurs sur la base des informations disponibles sur le site. L'orientation académique reste une décision personnelle que nous vous encourageons à mûrir avec des conseillers pédagogiques.`
            },
            {
              title: "8. Droit applicable",
              content: `Les présentes conditions d'utilisation sont soumises au droit sénégalais. Tout litige relatif à l'interprétation ou à l'exécution des présentes sera soumis aux tribunaux compétents de Dakar, Sénégal.`
            }
          ].map((section) => (
            <div key={section.title} className="bg-white p-8 rounded-[2rem] border border-[#1A3326]/10">
              <h2 className="text-xl font-bold text-[#1A3326] mb-4">{section.title}</h2>
              <p className="text-[#1A3326]/70 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
