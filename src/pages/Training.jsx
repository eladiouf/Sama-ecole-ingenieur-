import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const quizQuestions = [
  {
    id: 1,
    question: "Suite logique : 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "48"],
    correctAnswer: 1, // index 1 = "42" (n^2 + n)
    explanation: "La suite suit la logique n² + n. Pour n=6, 6² + 6 = 42."
  },
  {
    id: 2,
    question: "Si 3 ouvriers construisent un mur en 4 jours, combien de jours mettront 6 ouvriers pour construire le même mur ?",
    options: ["2 jours", "3 jours", "4 jours", "8 jours"],
    correctAnswer: 0,
    explanation: "Le temps est inversement proportionnel au nombre d'ouvriers. 2 fois plus d'ouvriers = 2 fois moins de temps."
  },
  {
    id: 3,
    question: "Dans un circuit électrique, la résistance R1 (10Ω) et R2 (10Ω) sont en parallèle. Quelle est la résistance équivalente Req ?",
    options: ["20 Ω", "10 Ω", "5 Ω", "0.5 Ω"],
    correctAnswer: 2,
    explanation: "En parallèle, 1/Req = 1/R1 + 1/R2. 1/Req = 1/10 + 1/10 = 2/10. Req = 10/2 = 5 Ω."
  }
];

export default function Training() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const contentRef = useRef(null);

  const animateIn = () => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, x: 20 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  };

  useEffect(() => {
    animateIn();
  }, [currentQuestion, isFinished]);

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setSelectedOption(null);
      setIsAnswered(false);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#C0392B] animate-pulse"></div>
            <span className="text-xs font-data font-semibold text-[#1A3326] tracking-wider uppercase">Module de Simulation</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-6xl text-[#1A3326] mb-4">
            Entrainement Intensif.
          </h1>
          <p className="text-lg text-[#1A3326]/70">
            Testez vos capacités analytiques avec ces questions extraites des annales du REPFIS.
          </p>
        </div>

        {/* Quiz Area */}
        <div className="flex-1 bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-[#1A3326]/10 relative overflow-hidden flex flex-col" ref={contentRef}>
          
          {!isFinished ? (
            <>
              {/* Progress */}
              <div className="flex justify-between items-center mb-8">
                <span className="font-data text-sm font-bold text-[#D4AF37]">
                  Question {currentQuestion + 1} / {quizQuestions.length}
                </span>
                <div className="flex gap-1">
                  {quizQuestions.map((_, idx) => (
                    <div key={idx} className={`h-2 w-8 rounded-full transition-colors ${idx <= currentQuestion ? 'bg-[#D4AF37]' : 'bg-[#1A3326]/10'}`}></div>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1A3326] leading-tight">
                  {quizQuestions[currentQuestion].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8 flex-1">
                {quizQuestions[currentQuestion].options.map((option, idx) => {
                  let buttonClass = "w-full text-left p-6 rounded-2xl border-2 transition-all font-medium text-lg flex justify-between items-center ";
                  
                  if (!isAnswered) {
                    buttonClass += "border-[#1A3326]/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#1A3326]";
                  } else {
                    if (idx === quizQuestions[currentQuestion].correctAnswer) {
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
                      <span>{option}</span>
                      {isAnswered && idx === quizQuestions[currentQuestion].correctAnswer && <CheckCircle2 size={24} className="text-green-500" />}
                      {isAnswered && idx === selectedOption && idx !== quizQuestions[currentQuestion].correctAnswer && <XCircle size={24} className="text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="mt-auto bg-[#1A3326]/5 p-6 rounded-2xl border border-[#1A3326]/10 flex flex-col md:flex-row gap-6 items-center justify-between animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1A3326] mb-1">Explication :</p>
                    <p className="text-sm text-[#1A3326]/70 leading-relaxed">{quizQuestions[currentQuestion].explanation}</p>
                  </div>
                  <button onClick={handleNext} className="w-full md:w-auto px-8 py-4 bg-[#1A3326] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#1A3326]/90 transition-colors whitespace-nowrap">
                    {currentQuestion === quizQuestions.length - 1 ? "Voir les résultats" : "Question Suivante"} <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-[2rem] flex items-center justify-center mb-8 rotate-12">
                <Terminal size={48} className="text-[#D4AF37] -rotate-12" />
              </div>
              <h2 className="font-dramatic text-5xl text-[#1A3326] mb-4">Simulation Terminée</h2>
              
              <div className="bg-[#F2F0E9] px-8 py-6 rounded-2xl border border-[#1A3326]/10 mb-8">
                <p className="text-[#1A3326]/60 text-sm font-data uppercase tracking-wider mb-2">Score Final</p>
                <div className="text-6xl font-bold text-[#1A3326]">
                  {score} <span className="text-3xl text-[#1A3326]/40">/ {quizQuestions.length}</span>
                </div>
              </div>

              <p className="text-lg text-[#1A3326]/70 max-w-md mb-10">
                {score === quizQuestions.length 
                  ? "Performance exceptionnelle. Vous avez le niveau d'un ingénieur confirmé." 
                  : "Continuez à vous entraîner. L'excellence exige de la pratique."}
              </p>

              <button onClick={handleRestart} className="magnetic-btn px-8 py-4 bg-[#1A3326] text-white rounded-xl font-semibold flex items-center gap-2">
                <span className="magnetic-btn-bg"></span>
                <span className="relative z-10 flex items-center gap-2"><RotateCcw size={18} /> Relancer la simulation</span>
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
