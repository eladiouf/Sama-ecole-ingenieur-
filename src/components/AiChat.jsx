import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

const SYSTEM_PROMPT = `Tu es "Sama IA", un assistant expert et bienveillant de la plateforme Sama Ecole d'Ingénieur.
Tu réponds UNIQUEMENT en français, de manière concise et précise.
Tu es spécialisé dans :
- Le Réseau des Établissements Publics de Formation d'Ingénieurs du Sénégal (REPFIS)
- Les 8 écoles membres : ESP (Dakar), EPT (Thiès), IPSL (Saint-Louis/UGB), UFR-SI (UIDT), ENSA (Thiès), ENSMG (Dakar), ISFAR (Bambey), Polytech Diamniadio (UAM)
- Les filières d'ingénieurs disponibles au Sénégal
- Les conseils de préparation au concours commun d'entrée
- Les débouchés professionnels des ingénieurs au Sénégal
- Le pétrole, les mines, l'agriculture, la tech, le civil au Sénégal
Si on te pose une question hors de ce domaine, redirige poliment l'utilisateur vers le sujet des concours d'ingénieurs.
Garde tes réponses courtes (3-5 phrases max) et utilise un ton professionnel mais encourageant.`;

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bonjour ! Je suis **Sama IA**, votre assistant pour les concours REPFIS. Posez-moi vos questions sur les écoles, les filières ou la préparation au concours !" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'VOTRE_CLE_API_ICI') {
        throw new Error('API_KEY_MISSING');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: SYSTEM_PROMPT
      });

      // Construire l'historique du chat
      const history = messages
        .filter((_, i) => i > 0) // Ignorer le message d'accueil
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (err) {
      let errorText = "Désolé, une erreur s'est produite. Vérifiez votre connexion.";
      if (err.message === 'API_KEY_MISSING') {
        errorText = "🔑 La clé API Gemini n'est pas configurée. Ajoutez votre clé dans le fichier `.env` (`VITE_GEMINI_API_KEY=...`).";
      }
      setMessages(prev => [...prev, { role: 'assistant', text: errorText }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-8 left-4 md:left-8 z-50 w-[calc(100vw-2rem)] md:w-96 bg-white rounded-[2rem] shadow-2xl border border-[#1A3326]/10 flex flex-col overflow-hidden"
             style={{ maxHeight: '70vh', minHeight: '420px' }}>
          
          {/* Header */}
          <div className="bg-[#1A3326] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <Bot size={20} className="text-[#1A3326]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sama IA</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-white/60 text-xs font-data">Alimenté par Gemini</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F2F0E9]/40">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#1A3326] text-white rounded-br-md'
                    : 'bg-white text-[#1A3326] border border-[#1A3326]/10 rounded-bl-md shadow-sm'
                }`}>
                  <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#1A3326]/10 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <Loader2 size={16} className="text-[#D4AF37] animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#1A3326]/10 flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none text-sm text-[#1A3326] bg-[#F2F0E9] rounded-xl px-4 py-3 border border-[#1A3326]/10 focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-[#1A3326]/40 disabled:opacity-50"
              style={{ maxHeight: '80px', overflowY: 'auto' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-11 h-11 bg-[#1A3326] hover:bg-[#D4AF37] text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 self-end"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="fixed bottom-8 left-4 md:left-8 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#1A3326] text-white px-5 py-3 rounded-full shadow-xl hover:bg-[#D4AF37] transition-all duration-300 hover:scale-105"
          >
            <Bot size={22} />
            <span className="text-sm font-semibold whitespace-nowrap">Sama IA</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </button>
        )}
      </div>
    </>
  );
}
