import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import gsap from 'gsap';
import { Terminal, CheckCircle2, XCircle, ArrowRight, RotateCcw, Loader2, Cpu } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const SUBJECTS = [
  { id: 'math', label: 'Mathématiques', emoji: '📐' },
  { id: 'physique', label: 'Physique', emoji: '⚡' },
  { id: 'chimie', label: 'Chimie', emoji: '🧪' },
  { id: 'logique', label: 'Logique', emoji: '🧩' },
  { id: 'genie_civil', label: 'Génie Civil', emoji: '🏗️' },
];

const buildPrompt = (subject) => `Tu es un professeur expert préparant les étudiants au concours commun d'ingénieur REPFIS du Sénégal.

Génère EXACTEMENT 5 questions de QCM en français sur le thème : "${subject}".

Les questions doivent être de niveau concours d'ingénieur (Terminale/Bac+1), rigoureuses et précises.

Réponds UNIQUEMENT avec un tableau JSON valide, sans aucun texte avant ou après, sans markdown, sans backticks.

Format exact :
[{"question":"...","options":["A","B","C","D"],"correctAnswer":0,"explanation":"..."},...]

- correctAnswer = index (0 à 3) de la bonne réponse
- explanation = courte justification scientifique de la réponse`;

export default function Training() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const contentRef = useRef(null);

  const animateIn = () => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
  };

  useEffect(() => { animateIn(); }, [currentQuestion, isFinished, loading, selectedSubject]);

  const fetchQuestions = async (subject) => {
    setLoading(true);
    setError('');
    setSelectedSubject(subject);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'VOTRE_CLE_API_ICI') throw new Error('NO_KEY');

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(buildPrompt(subject.label));
      const text = result.response.text().trim();

      // Extraction JSON robuste
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('FORMAT_ERROR');

      const parsed = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('FORMAT_ERROR');

      setQuestions(parsed);
    } catch (err) {
      if (err.message === 'NO_KEY') {
        setError('🔑 Clé API Gemini non configurée. Ajoutez VITE_GEMINI_API_KEY dans votre fichier .env');
      } else {
        setError('Erreur lors de la génération des questions. Vérifiez votre connexion et réessayez.');
      }
      setSelectedSubject(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setSelectedOption(null);
      setIsAnswered(false);
      setCurrentQuestion(q => q + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setQuestions([]);
    setSelectedSubject(null);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setError('');
  };

  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const getScoreMessage = () => {
    if (scorePercent === 100) return { msg: "Score parfait ! Vous maîtrisez ce domaine.", color: "text-green-600" };
    if (scorePercent >= 60) return { msg: "Bon résultat ! Continuez à pratiquer.", color: "text-[#D4AF37]" };
    return { msg: "Persévérez. L'ingénieur se forge dans l'effort.", color: "text-[#C0392B]" };
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-28 pb-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#C0392B] animate-pulse"></div>
            <span className="text-xs font-data font-semibold text-[#1A3326] tracking-wider uppercase">Simulation Concours REPFIS — Généré par IA</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-6xl text-[#1A3326] mb-3">Entraînement Intensif.</h1>
          <p className="text-base text-[#1A3326]/70">Choisissez une matière. L'IA génère 5 questions inédites sur mesure pour vous préparer au concours.</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div ref={contentRef} className="bg-white rounded-[3rem] p-12 shadow-2xl border border-[#1A3326]/10 flex flex-col items-center justify-center gap-6 min-h-[320px]">
            <Loader2 size={48} className="animate-spin text-[#D4AF37]" />
            <div className="text-center">
              <p className="font-semibold text-[#1A3326] text-lg">Génération en cours...</p>
              <p className="text-sm text-[#1A3326]/60 mt-1">Gemini prépare vos questions de <strong>{selectedSubject?.label}</strong></p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-red-200 flex flex-col items-center gap-4 text-center">
            <XCircle size={40} className="text-red-500" />
            <p className="text-[#1A3326] font-semibold">{error}</p>
            <button onClick={handleReset} className="px-6 py-3 bg-[#1A3326] text-white rounded-xl font-semibold flex items-center gap-2 mt-2">
              <RotateCcw size={16} /> Réessayer
            </button>
          </div>
        )}

        {/* Subject Selection */}
        {!loading && !error && !selectedSubject && (
          <div ref={contentRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {SUBJECTS.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => fetchQuestions(subject)}
                  className="group bg-white p-6 rounded-[2rem] border-2 border-[#1A3326]/10 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 text-left flex items-center gap-4"
                >
                  <span className="text-4xl">{subject.emoji}</span>
                  <div>
                    <p className="font-semibold text-[#1A3326] text-lg">{subject.label}</p>
                    <p className="text-sm text-[#1A3326]/50 font-data">5 questions • IA</p>
                  </div>
                  <ArrowRight size={20} className="ml-auto text-[#1A3326]/30 group-hover:text-[#D4AF37] transition-colors" />
                </button>
              ))}

              {/* All subjects card */}
              <button
                onClick={() => fetchQuestions({ id: 'all', label: 'Mathématiques, Physique, Chimie, Logique et Génie Civil (mélange)' })}
                className="group bg-[#1A3326] p-6 rounded-[2rem] border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 text-left flex items-center gap-4 sm:col-span-2"
              >
                <span className="text-4xl"><Cpu size={36} className="text-[#D4AF37]" /></span>
                <div>
                  <p className="font-semibold text-[#F2F0E9] text-lg">Mode Concours Complet</p>
                  <p className="text-sm text-[#F2F0E9]/50 font-data">5 questions mixtes toutes matières • IA</p>
                </div>
                <ArrowRight size={20} className="ml-auto text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
              </button>
            </div>
            <AdBanner />
          </div>
        )}

        {/* Quiz */}
        {!loading && !error && selectedSubject && !isFinished && questions.length > 0 && (
          <div ref={contentRef} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-[#1A3326]/10">

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-data text-sm font-bold text-[#D4AF37]">
                  {selectedSubject.emoji} {selectedSubject.label} — Question {currentQuestion + 1}/{questions.length}
                </span>
                <button onClick={handleReset} className="text-xs text-[#1A3326]/40 hover:text-[#1A3326] transition-colors">Changer</button>
              </div>
              <div className="h-2 bg-[#1A3326]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-xl md:text-2xl font-semibold text-[#1A3326] leading-snug mb-8">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, idx) => {
                const isCorrect = idx === questions[currentQuestion].correctAnswer;
                const isSelected = idx === selectedOption;
                let cls = "w-full text-left px-5 py-4 rounded-2xl border-2 transition-all font-medium text-base flex justify-between items-center gap-4 ";
                if (!isAnswered) {
                  cls += "border-[#1A3326]/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#1A3326]";
                } else {
                  if (isCorrect) cls += "border-green-500 bg-green-50 text-green-800";
                  else if (isSelected) cls += "border-red-400 bg-red-50 text-red-700";
                  else cls += "border-[#1A3326]/5 text-[#1A3326]/30";
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={isAnswered}>
                    <span>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={22} className="text-green-500 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={22} className="text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <div className="bg-[#1A3326]/5 p-5 rounded-2xl border border-[#1A3326]/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-data font-bold text-[#1A3326]/50 uppercase tracking-wider mb-1">Explication</p>
                  <p className="text-sm text-[#1A3326]/80 leading-relaxed">{questions[currentQuestion].explanation}</p>
                </div>
                <button onClick={handleNext} className="shrink-0 px-7 py-3 bg-[#1A3326] text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-[#D4AF37] transition-colors text-sm whitespace-nowrap">
                  {currentQuestion === questions.length - 1 ? "Résultats" : "Suivant"} <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {!loading && !error && isFinished && (
          <div ref={contentRef} className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-[#1A3326]/10 text-center">
            <div className="w-20 h-20 bg-[#D4AF37]/15 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
              <Terminal size={40} className="text-[#D4AF37]" />
            </div>
            <h2 className="font-dramatic text-4xl md:text-5xl text-[#1A3326] mb-2">Simulation Terminée</h2>
            <p className="text-[#1A3326]/50 font-data text-sm mb-8">{selectedSubject?.label}</p>

            <div className="bg-[#F2F0E9] rounded-2xl p-6 mb-6 inline-block min-w-[180px]">
              <p className="text-[#1A3326]/50 text-xs font-data uppercase tracking-widest mb-1">Score</p>
              <p className="text-5xl font-bold text-[#1A3326]">{score}<span className="text-2xl text-[#1A3326]/40">/{questions.length}</span></p>
              <p className="text-3xl font-bold text-[#D4AF37] mt-1">{scorePercent}%</p>
            </div>

            <p className={`text-lg font-semibold mb-10 ${getScoreMessage().color}`}>{getScoreMessage().msg}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => fetchQuestions(selectedSubject)} className="px-7 py-4 bg-[#1A3326] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-colors">
                <RotateCcw size={18} /> Rejouer cette matière
              </button>
              <button onClick={handleReset} className="px-7 py-4 bg-[#F2F0E9] text-[#1A3326] rounded-2xl font-semibold border border-[#1A3326]/10 hover:border-[#1A3326]/30 transition-colors">
                Choisir une autre matière
              </button>
            </div>

            <div className="mt-10">
              <AdBanner />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
