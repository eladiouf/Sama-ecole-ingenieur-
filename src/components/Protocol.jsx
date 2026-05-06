import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Protocol() {
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
}
