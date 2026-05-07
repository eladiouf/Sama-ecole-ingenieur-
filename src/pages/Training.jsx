import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Loader2, Zap, BookOpen, Trophy } from 'lucide-react';
import AdBanner from '../components/AdBanner';

// ───────────────────────────────────────────────
// BANQUE DE QUESTIONS PAR MATIERE (toujours disponible)
// ───────────────────────────────────────────────
const QUESTION_BANK = {
  math: [
    { q: "Suite : 1, 1, 2, 3, 5, 8, 13, ?", opts: ["18","20","21","24"], ans: 2, exp: "Suite de Fibonacci : chaque terme est la somme des deux précédents. 8+13 = 21." },
    { q: "Si f(x) = 2x² − 3x + 1, calculez f(2).", opts: ["3","4","5","6"], ans: 0, exp: "f(2) = 2(4) − 3(2) + 1 = 8 − 6 + 1 = 3." },
    { q: "Quelle est la valeur de log₁₀(1000) ?", opts: ["2","3","4","10"], ans: 1, exp: "log₁₀(1000) = log₁₀(10³) = 3." },
    { q: "L'équation 2x + 5 = 13 a pour solution :", opts: ["x = 3","x = 4","x = 5","x = 9"], ans: 1, exp: "2x = 13 − 5 = 8 → x = 4." },
    { q: "3 ouvriers construisent un mur en 6 jours. Combien de jours mettront 9 ouvriers pour le même mur ?", opts: ["1 jour","2 jours","3 jours","4 jours"], ans: 1, exp: "Travail inversement proportionnel : 3 fois plus d'ouvriers = 3 fois moins de temps. 6÷3 = 2 jours." },
    { q: "La dérivée de f(x) = x³ − 2x est :", opts: ["3x² − 2","3x + 2","x² − 2","3x²"], ans: 0, exp: "f'(x) = 3x² − 2. Règle de dérivation : d/dx(xⁿ) = n·xⁿ⁻¹." },
    { q: "Si une progression arithmétique a pour premier terme a₁ = 3 et raison d = 4, quel est son 10ème terme ?", opts: ["39","40","43","36"], ans: 2, exp: "aₙ = a₁ + (n−1)d = 3 + 9×4 = 3 + 36 = 39. Attention : a₁₀ = 3 + 9×4 = 43. Le 10ème terme : 3+(10-1)×4 = 3+36 = 39." },
    { q: "Résoudre x² − 5x + 6 = 0 :", opts: ["x=1 et x=6","x=2 et x=3","x=−2 et x=−3","x=0 et x=5"], ans: 1, exp: "Discriminant Δ = 25−24 = 1. x = (5±1)/2 → x₁ = 3, x₂ = 2." },
  ],
  physique: [
    { q: "La loi d'Ohm s'écrit :", opts: ["U = R / I","U = R × I","I = U × R","R = U × I"], ans: 1, exp: "La loi d'Ohm : U = R × I, où U est la tension (V), R la résistance (Ω), I l'intensité (A)." },
    { q: "R1 (10Ω) et R2 (10Ω) sont en parallèle. Résistance équivalente Req ?", opts: ["20 Ω","10 Ω","5 Ω","0,1 Ω"], ans: 2, exp: "En parallèle : 1/Req = 1/R1 + 1/R2 = 1/10 + 1/10 = 2/10 → Req = 5 Ω." },
    { q: "Un objet chute en chute libre depuis 5m. Quelle est sa vitesse à l'impact ? (g=10 m/s²)", opts: ["5 m/s","10 m/s","50 m/s","√100 m/s"], ans: 1, exp: "v² = 2gh = 2×10×5 = 100 → v = 10 m/s." },
    { q: "La puissance électrique P est égale à :", opts: ["P = U²×I","P = U×I","P = I/U","P = R/I"], ans: 1, exp: "P = U × I (watts). On peut aussi écrire P = R×I² ou P = U²/R." },
    { q: "L'unité de la fréquence est :", opts: ["Mètre (m)","Pascal (Pa)","Hertz (Hz)","Watt (W)"], ans: 2, exp: "La fréquence se mesure en Hertz (Hz). 1 Hz = 1 oscillation par seconde." },
    { q: "La première loi de Newton (principe d'inertie) stipule qu'un corps au repos :", opts: ["Accélère naturellement","Reste au repos si aucune force nette ne s'exerce","Tombe en chute libre","Se met en rotation"], ans: 1, exp: "Principe d'inertie : un corps reste au repos (ou en MRU) si la somme des forces qui s'exercent sur lui est nulle." },
  ],
  chimie: [
    { q: "La formule chimique de l'eau est :", opts: ["H₂O₂","H₂O","HO","H₃O"], ans: 1, exp: "L'eau est composée de 2 atomes d'hydrogène et 1 atome d'oxygène : H₂O." },
    { q: "Quel est le numéro atomique du carbone (C) ?", opts: ["4","6","8","12"], ans: 1, exp: "Le carbone a le numéro atomique 6, signifiant 6 protons dans son noyau." },
    { q: "SiO₂ est la formule de :", opts: ["Sel","Silice (Dioxyde de silicium)","Soufre","Sodium"], ans: 1, exp: "SiO₂ est le dioxyde de silicium, appelé silice. C'est le composant principal du sable et du verre." },
    { q: "En stœchiométrie, qu'indique le coefficient devant une formule chimique ?", opts: ["Le nombre de protons","Le nombre de molécules","La masse molaire","La valence"], ans: 1, exp: "Le coefficient stoichiométrique indique le nombre de molécules (ou de moles) de cette espèce chimique dans la réaction." },
    { q: "Le pH d'une solution neutre à 25°C est :", opts: ["0","7","14","1"], ans: 1, exp: "À 25°C, une solution neutre a un pH = 7. En dessous de 7 = acide, au-dessus = basique." },
    { q: "Quelle liaison chimique est la plus forte ?", opts: ["Liaison hydrogène","Liaison de Van der Waals","Liaison covalente","Liaison ionique"], ans: 2, exp: "La liaison covalente (partage d'électrons) est généralement la plus forte, devant la liaison ionique, hydrogène, et de Van der Waals." },
  ],
  logique: [
    { q: "Suite : 2, 4, 8, 16, ?", opts: ["24","30","32","36"], ans: 2, exp: "Suite géométrique de raison 2 : chaque terme est multiplié par 2. 16×2 = 32." },
    { q: "Si tous les A sont B, et certains B sont C, alors :", opts: ["Tous les A sont C","Certains A sont peut-être C","Aucun A n'est C","Tous les C sont A"], ans: 1, exp: "On peut seulement conclure que certains A sont peut-être C (syllogisme partiel). Rien ne garantit que tous les A soient C." },
    { q: "Séquence de lettres : A, C, E, G, ? ", opts: ["H","I","J","K"], ans: 1, exp: "Séquence des lettres impaires de l'alphabet (A=1, C=3, E=5, G=7, I=9). La suivante est I." },
    { q: "Un train parcourt 360 km en 3 heures. Sa vitesse moyenne est :", opts: ["100 km/h","110 km/h","120 km/h","90 km/h"], ans: 2, exp: "Vitesse = Distance / Temps = 360 / 3 = 120 km/h." },
    { q: "Suite : 100, 50, 25, 12.5, ?", opts: ["6","6.25","7.5","10"], ans: 1, exp: "Suite géométrique de raison 1/2 : chaque terme est divisé par 2. 12.5 ÷ 2 = 6.25." },
  ],
  genie: [
    { q: "Quelle matière a la plus grande résistance à la traction ?", opts: ["Bois","Béton","Acier","Pierre"], ans: 2, exp: "L'acier a une résistance à la traction très élevée (~400–500 MPa), bien supérieure au béton (~3 MPa), qui est excellent en compression." },
    { q: "Dans un pont à poutres, les poutres travaillent principalement en :", opts: ["Compression pure","Traction pure","Flexion","Torsion"], ans: 2, exp: "Les poutres soumises à une charge verticale travaillent en flexion : la partie inférieure est en traction et la partie supérieure en compression." },
    { q: "Le béton armé combine béton et acier car :", opts: ["L'acier est moins cher","Le béton résiste bien à la traction, l'acier à la compression","L'acier résiste à la traction, le béton à la compression","Ils ont la même couleur"], ans: 2, exp: "Association complémentaire : le béton excelle en compression mais est faible en traction. L'acier comble cette faiblesse en résistant à la traction." },
    { q: "L'unité de la contrainte mécanique (σ) est :", opts: ["Newton (N)","Pascal (Pa) ou N/m²","Joule (J)","Watt (W)"], ans: 1, exp: "La contrainte mécanique σ = Force/Surface. Son unité est le Pascal (Pa) = N/m². En génie civil on utilise souvent MPa (mégaPascal)." },
    { q: "Qu'est-ce que le 'facteur de sécurité' en génie civil ?", opts: ["Le coût d'assurance","Le rapport entre la charge maximale supportable et la charge appliquée","La vitesse du vent","L'angle d'inclinaison"], ans: 1, exp: "Le facteur de sécurité = Résistance / Sollicitation. Un facteur > 1 signifie que la structure peut supporter plus que ce qu'on lui demande." },
  ]
};

const SUBJECTS = [
  { id: 'math', label: 'Mathématiques', icon: '📐', color: 'from-emerald-600 to-teal-700' },
  { id: 'physique', label: 'Physique', icon: '⚡', color: 'from-blue-600 to-indigo-700' },
  { id: 'chimie', label: 'Chimie', icon: '🧪', color: 'from-purple-600 to-violet-700' },
  { id: 'logique', label: 'Logique & Raisonnement', icon: '🧩', color: 'from-amber-600 to-orange-700' },
  { id: 'genie', label: 'Génie Civil & Structures', icon: '🏗️', color: 'from-red-600 to-rose-700' },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepareQuestions(subjectId) {
  const bank = QUESTION_BANK[subjectId] || [];
  return shuffle(bank).slice(0, 5).map(item => {
    // Shuffle options keeping track of correct answer
    const opts = item.opts.map((o, i) => ({ text: o, correct: i === item.ans }));
    const shuffled = shuffle(opts);
    return {
      question: item.q,
      options: shuffled.map(o => o.text),
      correctAnswer: shuffled.findIndex(o => o.correct),
      explanation: item.exp
    };
  });
}

// ───────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ───────────────────────────────────────────────
export default function Training() {
  const [phase, setPhase] = useState('select'); // 'select' | 'quiz' | 'result'
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // {correct: bool}[]

  const cardRef = useRef(null);

  const animIn = () => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
    }
  };

  useEffect(() => { animIn(); }, [phase, current]);

  const startQuiz = (sub) => {
    const qs = prepareQuestions(sub.id);
    setSubject(sub);
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setPhase('quiz');
  };

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === questions[current].correctAnswer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { correct }]);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPhase('result');
    }
  };

  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-28 pb-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-3xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-[#D4AF37]" />
            <span className="text-xs font-data font-semibold text-[#1A3326]/50 tracking-widest uppercase">Concours REPFIS — Simulation</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-6xl text-[#1A3326] leading-tight">Entraînement<br/>Intensif.</h1>
          <p className="mt-3 text-[#1A3326]/60 text-base max-w-lg">Choisissez une matière et testez vos connaissances avec 5 questions de niveau concours. Les questions changent à chaque session.</p>
        </div>

        {/* ── SELECTION ── */}
        {phase === 'select' && (
          <div ref={cardRef} className="space-y-3">
            {SUBJECTS.map(sub => (
              <button
                key={sub.id}
                onClick={() => startQuiz(sub)}
                className="group w-full flex items-center gap-5 bg-white p-5 rounded-2xl border border-[#1A3326]/10 hover:border-[#D4AF37]/60 hover:shadow-lg transition-all duration-200 text-left"
              >
                <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-2xl shrink-0`}>
                  {sub.icon}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-[#1A3326] text-lg">{sub.label}</p>
                  <p className="text-xs font-data text-[#1A3326]/40">5 questions • {QUESTION_BANK[sub.id].length} dans la banque</p>
                </div>
                <ArrowRight size={18} className="text-[#1A3326]/30 group-hover:text-[#D4AF37] transition-colors shrink-0" />
              </button>
            ))}

            {/* Mode mixte */}
            <button
              onClick={() => startQuiz({ id: 'mixte', label: 'Mode Concours Complet', icon: '🎯' })}
              className="group w-full flex items-center gap-5 bg-[#1A3326] p-5 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-lg transition-all duration-200 text-left"
            >
              <span className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center text-2xl shrink-0">🎯</span>
              <div className="flex-1">
                <p className="font-semibold text-[#F2F0E9] text-lg">Mode Concours Complet</p>
                <p className="text-xs font-data text-[#F2F0E9]/40">5 questions mixtes toutes matières</p>
              </div>
              <ArrowRight size={18} className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors shrink-0" />
            </button>

            <div className="mt-6"><AdBanner /></div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === 'quiz' && questions.length > 0 && (
          <div ref={cardRef} className="bg-white rounded-[2.5rem] shadow-2xl border border-[#1A3326]/10 p-8 md:p-10">

            {/* Top bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">{subject?.icon}</span>
                <span className="font-data text-sm font-bold text-[#1A3326]/50">{subject?.label}</span>
              </div>
              <button onClick={() => setPhase('select')} className="text-xs text-[#1A3326]/30 hover:text-[#1A3326]/70 transition-colors">← Changer</button>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-data text-[#1A3326]/40 mb-2">
                <span>Question {current + 1} / {questions.length}</span>
                <span className="text-[#D4AF37] font-bold">{score} ✓</span>
              </div>
              <div className="h-2 bg-[#F2F0E9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1A3326] to-[#D4AF37] rounded-full transition-all duration-500"
                  style={{ width: `${(current / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-xl md:text-2xl font-semibold text-[#1A3326] leading-snug mb-7">
              {questions[current].question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {questions[current].options.map((opt, idx) => {
                const isCorrect = idx === questions[current].correctAnswer;
                const isChosen = idx === selected;
                let cls = "w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all flex justify-between items-center gap-3 text-base ";
                if (!answered) {
                  cls += "border-[#1A3326]/10 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/5 text-[#1A3326] cursor-pointer";
                } else if (isCorrect) {
                  cls += "border-green-500 bg-green-50 text-green-800";
                } else if (isChosen) {
                  cls += "border-red-400 bg-red-50 text-red-700";
                } else {
                  cls += "border-[#1A3326]/5 text-[#1A3326]/25 cursor-default";
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={answered}>
                    <span>{opt}</span>
                    {answered && isCorrect && <CheckCircle2 size={20} className="text-green-500 shrink-0" />}
                    {answered && isChosen && !isCorrect && <XCircle size={20} className="text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation + Next */}
            {answered && (
              <div className="bg-[#F2F0E9] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-data font-bold text-[#1A3326]/40 uppercase tracking-widest mb-1">Explication</p>
                  <p className="text-sm text-[#1A3326]/80 leading-relaxed">{questions[current].explanation}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="shrink-0 px-6 py-3 bg-[#1A3326] text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#D4AF37] transition-colors whitespace-nowrap"
                >
                  {current === questions.length - 1 ? 'Résultats' : 'Suivant'}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && (
          <div ref={cardRef} className="bg-white rounded-[2.5rem] shadow-2xl border border-[#1A3326]/10 p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-[1.5rem] bg-[#D4AF37]/10 flex items-center justify-center">
              <Trophy size={40} className="text-[#D4AF37]" />
            </div>
            <h2 className="font-dramatic text-4xl md:text-5xl text-[#1A3326] mb-2">Simulation<br/>terminée.</h2>

            {/* Score ring */}
            <div className="my-8 flex justify-center">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#F2F0E9" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke={pct >= 80 ? '#22c55e' : pct >= 50 ? '#D4AF37' : '#ef4444'}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#1A3326]">{score}/{questions.length}</span>
                  <span className="text-sm font-data font-bold text-[#D4AF37]">{pct}%</span>
                </div>
              </div>
            </div>

            {/* Detail */}
            <div className="flex justify-center gap-3 mb-8">
              {answers.map((a, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${a.correct ? 'bg-green-500' : 'bg-red-400'}`}>
                  {i + 1}
                </div>
              ))}
            </div>

            <p className="text-lg font-semibold mb-10 text-[#1A3326]/70">
              {pct === 100 ? '🎉 Performance parfaite ! Vous êtes prêt pour le concours.'
                : pct >= 60 ? '👍 Bon résultat ! Continuez à réviser les points faibles.'
                : '💪 Restez constant. L\'ingénieur se forge dans l\'effort quotidien.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => startQuiz(subject)} className="px-6 py-4 bg-[#1A3326] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-colors">
                <RotateCcw size={18} /> Rejouer cette matière
              </button>
              <button onClick={() => setPhase('select')} className="px-6 py-4 bg-[#F2F0E9] text-[#1A3326] rounded-2xl font-semibold border border-[#1A3326]/10 hover:border-[#1A3326]/30 transition-colors">
                Choisir une autre matière
              </button>
            </div>
            <div className="mt-10"><AdBanner /></div>
          </div>
        )}
      </div>
    </div>
  );
}
