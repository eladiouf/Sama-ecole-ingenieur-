import React, { useEffect } from 'react';

export default function AdBanner({ client = "pub-7625604888475092", slot = "4209517689", format = "auto", responsive = "true" }) {
  useEffect(() => {
    try {
      if (window) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="w-full my-8 flex justify-center">
      {/* Hauteur stricte h-[120px] pour éviter le Layout Shift quand la pub charge */}
      <div className="w-full max-w-4xl h-[120px] bg-[#1A3326] rounded-2xl border border-[#D4AF37]/20 relative overflow-hidden flex items-center justify-center group">

        {/* Placeholder pour mode Dev ou si Adblock */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity z-0">
          <span className="text-xs font-data text-[#F2F0E9]/40 uppercase tracking-[0.2em]">Espace Publicitaire</span>
        </div>

        {/* Script AdSense Réel */}
        <div className="relative z-10 w-full overflow-hidden flex justify-center">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive}>
          </ins>
        </div>
      </div>
    </div>
  );
}
