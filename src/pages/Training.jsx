import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal, CheckCircle2, XCircle, ArrowRight, RotateCcw, Loader2 } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function Training() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const contentRef = useRef(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(false);
    try {
      // Importation d'une API de quiz publique (Questions scientifiques/mathématiques)
      const res = await fetch('https://the-trivia-api.com/v2/questions?categories=science,mathematics&limit=5');
      if (!res.ok) throw new Error('Erreur API');
      const data = await res.json();
      
      const formattedQuestions = data.map(item => {
        const allOptions = [...item.incorrectAnswers, item.correctAnswer];
        // Mélange aléatoire des options
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        const correctIndex = shuffledOptions.indexOf(item.correctAnswer);
        
        return {
          id: item.id,
          question: item.question.text,
          options: shuffledOptions,
          correctAnswer: correctIndex,
          explanation: `La réponse exacte est : ${item.correctAnswer}.`
        };
      });
      
      setQuestions(formattedQuestions);
      setCurrentQuestion(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setIsFinished(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const animateIn = () => {
    if (contentRef.current && !loading && !error) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, x: 20 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  };

  useEffect(() => {
    animateIn();
  }, [currentQuestion, isFinished, loading]);

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setSelectedOption(null);
      setIsAnswered(false);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C0392B] animate-pulse"></div>
            <span className="text-xs font-data font-semibold text-[#1A3326] tracking-wider uppercase">Module Connecté via API</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-6xl text-[#1A3326] mb-4">
            Entrainement Intensif.
          </h1>
          <p className="text-lg text-[#1A3326]/70">
            Testez vos capacités analytiques avec ces questions générées dynamiquement.
          </p>
        </div>

        {/* Quiz Area */}
        <div className="flex-1 bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-[#1A3326]/10 relative overflow-hidden flex flex-col min-h-[400px]">
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#1A3326]/50">
              <Loader2 size={48} className="animate-spin mb-4 text-[#D4AF37]" />
              <p className="font-semibold">Connexion à la base de données distante...</p>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <XCircle size={48} className="text-red-500 mb-4" />
              <p className="text-lg text-[#1A3326] font-semibold mb-6">Échec de la récupération des données.</p>
              <button onClick={fetchQuestions} className="px-6 py-3 bg-[#1A3326] text-white rounded-xl font-semibold flex items-center gap-2">
                <RotateCcw size={18} /> Réessayer
              </button>
            </div>
          ) : !isFinished && questions.length > 0 ? (
            <div ref={contentRef} className="flex-1 flex flex-col">
              {/* Progress */}
              <div className="flex justify-between items-center mb-8">
                <span className="font-data text-sm font-bold text-[#D4AF37]">
                  Question {currentQuestion + 1} / {questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_, idx) => (
                    <div key={idx} className={`h-2 w-8 rounded-full transition-colors ${idx <= currentQuestion ? 'bg-[#D4AF37]' : 'bg-[#1A3326]/10'}`}></div>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1A3326] leading-tight">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8 flex-1">
                {questions[currentQuestion].options.map((option, idx) => {
                  let buttonClass = "w-full text-left p-6 rounded-2xl border-2 transition-all font-medium text-lg flex justify-between items-center ";
                  
                  if (!isAnswered) {
                    buttonClass += "border-[#1A3326]/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#1A3326]";
                  } else {
                    if (idx === questions[currentQuestion].correctAnswer) {
                      buttonClass += "border-green-500 bg-green-50 text-green-700";
                    } else if (idx === selectedOption) {
                      buttonClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                      buttonClass += "border-[#1A3326]/5 text-[#1A3326]/40 opacity-50";
                    }
                  }

                  return (
                    <button 
                      key={idx} 
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      <span dangerouslySetInnerHTML={{ __html: option }}></span>
                      {isAnswered && idx === questions[currentQuestion].correctAnswer && <CheckCircle2 size={24} className="text-green-500" />}
                      {isAnswered && idx === selectedOption && idx !== questions[currentQuestion].correctAnswer && <XCircle size={24} className="text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="mt-auto bg-[#1A3326]/5 p-6 rounded-2xl border border-[#1A3326]/10 flex flex-col md:flex-row gap-6 items-center justify-between animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1A3326] mb-1">Analyse :</p>
                    <p className="text-sm text-[#1A3326]/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: questions[currentQuestion].explanation }}></p>
                  </div>
                  <button onClick={handleNext} className="w-full md:w-auto px-8 py-4 bg-[#1A3326] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#1A3326]/90 transition-colors whitespace-nowrap">
                    {currentQuestion === questions.length - 1 ? "Voir les résultats" : "Question Suivante"} <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12" ref={contentRef}>
              <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-[2rem] flex items-center justify-center mb-8 rotate-12">
                <Terminal size={48} className="text-[#D4AF37] -rotate-12" />
              </div>
              <h2 className="font-dramatic text-5xl text-[#1A3326] mb-4">Simulation Terminée</h2>
              
              <div className="bg-[#F2F0E9] px-8 py-6 rounded-2xl border border-[#1A3326]/10 mb-8">
                <p className="text-[#1A3326]/60 text-sm font-data uppercase tracking-wider mb-2">Score Final</p>
                <div className="text-6xl font-bold text-[#1A3326]">
                  {score} <span className="text-3xl text-[#1A3326]/40">/ {questions.length}</span>
                </div>
              </div>

              <p className="text-lg text-[#1A3326]/70 max-w-md mb-10">
                {score === questions.length 
                  ? "Performance exceptionnelle. Vous avez le niveau d'un ingénieur confirmé." 
                  : "Continuez à vous entraîner. L'excellence exige de la pratique."}
              </p>

              <button onClick={fetchQuestions} className="magnetic-btn px-8 py-4 bg-[#1A3326] text-white rounded-xl font-semibold flex items-center gap-2">
                <span className="magnetic-btn-bg"></span>
                <span className="relative z-10 flex items-center gap-2"><RotateCcw size={18} /> Nouvelle simulation (API)</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-12">
          <AdBanner />
        </div>
      </div>
    </div>
  );
}
