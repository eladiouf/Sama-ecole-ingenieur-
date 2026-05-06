import React, { useEffect } from 'react';

export default function AdBanner({ client = "pub-2416434857756716", slot = "4209517689", format = "auto", responsive = "true" }) {
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
      <div className="w-full max-w-4xl min-h-[100px] bg-[#18181B] rounded-2xl border border-[#7B61FF]/20 relative overflow-hidden flex items-center justify-center group">

        {/* Placeholder pour mode Dev ou si Adblock */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity z-0">
          <span className="text-xs font-data text-[#F0EFF4]/40 uppercase tracking-[0.2em]">Espace Publicitaire</span>
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
