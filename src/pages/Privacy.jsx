import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Shield } from 'lucide-react';

export default function Privacy() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-24 px-6 md:px-12 lg:px-24" ref={ref}>
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#1A3326] rounded-2xl flex items-center justify-center">
            <Shield size={20} className="text-[#D4AF37]" />
          </div>
          <span className="text-xs font-data font-semibold text-[#1A3326]/50 tracking-wider uppercase">Document Légal</span>
        </div>

        <h1 className="font-dramatic text-5xl md:text-6xl text-[#1A3326] mb-4">Politique de Confidentialité</h1>
        <p className="text-[#1A3326]/50 font-data text-sm mb-12">Dernière mise à jour : Mai 2026</p>

        <div className="prose prose-lg max-w-none space-y-10">

          {[
            {
              title: "1. Qui sommes-nous ?",
              content: `Sama Ecole d'Ingénieur est une plateforme en ligne dédiée à l'orientation et à la préparation des étudiants aux concours du Réseau des Établissements Publics de Formation d'Ingénieurs du Sénégal (REPFIS). Le site est accessible à l'adresse sama-ecole.vercel.app et géré par son administrateur.`
            },
            {
              title: "2. Données collectées",
              content: `Nous ne collectons aucune donnée personnelle identifiable (nom, prénom, email) sans votre consentement explicite. Le seul outil de collecte de données indirectes est Google AdSense qui peut utiliser des cookies à des fins publicitaires. Nous ne stockons aucune donnée de quiz ni d'interactions avec l'assistant IA sur nos serveurs.`
            },
            {
              title: "3. Cookies et publicités",
              content: `Ce site utilise Google AdSense pour afficher des publicités. Google, en tant que fournisseur tiers, utilise des cookies (notamment le cookie DoubleClick) pour diffuser des annonces pertinentes. Vous pouvez désactiver l'utilisation de ces cookies en vous rendant sur la page des paramètres de Google Ads (https://www.google.com/settings/ads). L'activation ou la désactivation des cookies n'affecte pas le fonctionnement de la plateforme.`
            },
            {
              title: "4. Intelligence Artificielle (Sama IA)",
              content: `L'assistant Sama IA est alimenté par Google Gemini. Les questions que vous posez à l'assistant sont transmises à l'API Google Gemini pour générer des réponses. Ces échanges sont soumis à la politique de confidentialité de Google. Sama Ecole d'Ingénieur ne conserve aucun historique de vos conversations.`
            },
            {
              title: "5. Hébergement",
              content: `Le site est hébergé sur Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA). Vercel peut collecter des logs de connexion (adresse IP, date/heure) à des fins de sécurité et de performance. Ces données sont régies par la politique de confidentialité de Vercel.`
            },
            {
              title: "6. Vos droits",
              content: `Conformément aux dispositions de la loi sénégalaise sur les données personnelles et au RGPD européen, vous disposez d'un droit d'accès, de rectification et de suppression de toute donnée vous concernant. Pour exercer ces droits, contactez-nous via la page Contact.`
            },
            {
              title: "7. Modifications",
              content: `Cette politique de confidentialité peut être modifiée à tout moment. La date de dernière mise à jour sera toujours indiquée en haut de ce document. Nous vous encourageons à la consulter régulièrement.`
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
