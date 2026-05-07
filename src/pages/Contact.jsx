import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation d'envoi (en prod, branchez Formspree, EmailJS ou une API backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const subjects = [
    "Question sur une école",
    "Erreur d'information",
    "Suggestion d'amélioration",
    "Partenariat",
    "Autre"
  ];

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-24 px-6 md:px-12 lg:px-24" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="text-xs font-data font-semibold text-[#1A3326]/50 tracking-wider uppercase">Nous écrire</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-7xl text-[#1A3326] mb-4">Contact.</h1>
          <p className="text-lg text-[#1A3326]/70 max-w-xl">
            Une question sur une école, une erreur à signaler, ou une suggestion ? Nous lisons tous les messages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Info Cards */}
          <div className="space-y-4">
            <div className="bg-[#1A3326] text-[#F2F0E9] p-6 rounded-[2rem]">
              <MessageSquare size={24} className="text-[#D4AF37] mb-4" />
              <h3 className="font-semibold text-lg mb-2">Sama IA disponible 24h/7j</h3>
              <p className="text-[#F2F0E9]/60 text-sm leading-relaxed">
                Pour les questions sur les écoles, utilisez d'abord notre assistant IA — il répond instantanément.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-[#1A3326]/10">
              <Mail size={24} className="text-[#D4AF37] mb-4" />
              <h3 className="font-semibold text-lg text-[#1A3326] mb-2">Email direct</h3>
              <a 
                href="mailto:contact@sama-ecole.sn" 
                className="text-sm text-[#D4AF37] font-data font-semibold hover:underline"
              >
                contact@sama-ecole.sn
              </a>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-[#1A3326]/10">
              <MapPin size={24} className="text-[#D4AF37] mb-4" />
              <h3 className="font-semibold text-lg text-[#1A3326] mb-2">Ressources officielles</h3>
              <div className="space-y-2">
                {[
                  { label: 'Concours REPFIS (e-concours)', url: 'https://e-concours.ucad.sn' },
                  { label: 'ESP — esp.sn', url: 'https://www.esp.sn' },
                  { label: 'EPT — ept.sn', url: 'https://www.ept.sn' },
                  { label: 'Polytech Diamniadio', url: 'https://www.polytech.sn' },
                ].map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1A3326]/70 hover:text-[#D4AF37] transition-colors group"
                  >
                    <ExternalLink size={12} className="group-hover:text-[#D4AF37]" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-[3rem] p-12 border border-[#1A3326]/10 shadow-xl flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h2 className="font-dramatic text-3xl text-[#1A3326] mb-3">Message envoyé !</h2>
                <p className="text-[#1A3326]/60 max-w-sm leading-relaxed">
                  Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais, généralement sous 48h.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-8 px-6 py-3 border border-[#1A3326]/20 text-[#1A3326] rounded-xl font-semibold hover:bg-[#1A3326] hover:text-white transition-colors text-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-8 md:p-12 border border-[#1A3326]/10 shadow-xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A3326] mb-2">Votre nom *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Moussa Diallo"
                      className="w-full px-5 py-3.5 bg-[#F2F0E9] border border-[#1A3326]/10 rounded-2xl text-[#1A3326] placeholder-[#1A3326]/30 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A3326] mb-2">Votre email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="moussa@example.com"
                      className="w-full px-5 py-3.5 bg-[#F2F0E9] border border-[#1A3326]/10 rounded-2xl text-[#1A3326] placeholder-[#1A3326]/30 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A3326] mb-2">Sujet *</label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-[#F2F0E9] border border-[#1A3326]/10 rounded-2xl text-[#1A3326] focus:outline-none focus:border-[#D4AF37] transition-colors text-sm appearance-none"
                  >
                    <option value="">Choisir un sujet...</option>
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A3326] mb-2">Votre message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full px-5 py-4 bg-[#F2F0E9] border border-[#1A3326]/10 rounded-2xl text-[#1A3326] placeholder-[#1A3326]/30 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#1A3326] text-white rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-[#D4AF37] transition-colors disabled:opacity-50 text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </button>

                <p className="text-xs text-[#1A3326]/40 text-center">
                  En envoyant ce formulaire, vous acceptez nos{' '}
                  <a href="/conditions" className="underline hover:text-[#D4AF37]">conditions d'utilisation</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
