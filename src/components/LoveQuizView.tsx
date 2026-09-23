import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface QuizScenario {
  id: number;
  scenario: string;
  options: {
    text: string;
    language: 'Words of Affirmation' | 'Quality Time' | 'Acts of Service' | 'Physical Touch' | 'Receiving Gifts';
    iconText: string;
  }[];
}

const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 1,
    scenario: 'After a long, exhausting day, what makes you immediately feel recharged by your partner?',
    options: [
      {
        text: 'A long, silent warm hug that melts away tension',
        language: 'Physical Touch',
        iconText: 'Warm Embrace',
      },
      {
        text: 'Hearing: "You handled today so gracefully, I am so proud of you"',
        language: 'Words of Affirmation',
        iconText: 'Sincere Affirmation',
      },
      {
        text: 'They made dinner, brewed tea, and took care of the house chores',
        language: 'Acts of Service',
        iconText: 'Thoughtful Support',
      },
      {
        text: 'Putting phones away to sit together and talk uninterrupted',
        language: 'Quality Time',
        iconText: 'Undivided Presence',
      },
      {
        text: 'A surprise small comfort treat or favorite dessert they picked up for me',
        language: 'Receiving Gifts',
        iconText: 'Tangible Token',
      },
    ],
  },
  {
    id: 2,
    scenario: 'When celebrating an anniversary or special milestone, what feels most unforgettable?',
    options: [
      {
        text: 'A handwritten letter detailing the small reasons they adore you',
        language: 'Words of Affirmation',
        iconText: 'Poetic Letter',
      },
      {
        text: 'A whole day unplugged exploring a peaceful new town together',
        language: 'Quality Time',
        iconText: 'Shared Odyssey',
      },
      {
        text: 'A meaningful keepsake chosen with deep attention to your personality',
        language: 'Receiving Gifts',
        iconText: 'Curated Keepsake',
      },
      {
        text: 'Them planning, reserving, and orchestrating everything seamlessly without you lifting a finger',
        language: 'Acts of Service',
        iconText: 'Flawless Care',
      },
      {
        text: 'Slow dancing, hand holding under the stars, and tender intimacy',
        language: 'Physical Touch',
        iconText: 'Sensory Closeness',
      },
    ],
  },
  {
    id: 3,
    scenario: 'During a small disagreement, what resolves the emotional distance fastest for you?',
    options: [
      {
        text: 'Reaching out gently to hold hands or a soothing touch on the shoulder',
        language: 'Physical Touch',
        iconText: 'Affectionate Anchor',
      },
      {
        text: 'Open verbal reassurance: "I love you, and we will work through this together"',
        language: 'Words of Affirmation',
        iconText: 'Verbal Security',
      },
      {
        text: 'Taking proactive steps to solve the practical issue that caused the friction',
        language: 'Acts of Service',
        iconText: 'Constructive Action',
      },
      {
        text: 'Sitting down together until both feel completely heard and reconnected',
        language: 'Quality Time',
        iconText: 'Patient Dialogue',
      },
      {
        text: 'A sweet olive-branch peace offering (favorite coffee or a handwritten sticky note)',
        language: 'Receiving Gifts',
        iconText: 'Peace Token',
      },
    ],
  },
  {
    id: 4,
    scenario: 'What makes you feel most genuinely valued in daily ordinary moments?',
    options: [
      {
        text: 'Unexpected "thinking of you" texts or sweet verbal compliments',
        language: 'Words of Affirmation',
        iconText: 'Spontaneous Praise',
      },
      {
        text: 'Having your morning coffee made or chores done before you wake up',
        language: 'Acts of Service',
        iconText: 'Quiet Devotion',
      },
      {
        text: 'Casual physical touch—arm around you on the couch, brushing hair, cheek kisses',
        language: 'Physical Touch',
        iconText: 'Subconscious Warmth',
      },
      {
        text: 'Cooking dinner together with background music and laughing over inside jokes',
        language: 'Quality Time',
        iconText: 'Domestic Magic',
      },
      {
        text: 'Surprise souvenirs or items that show: "I saw this and remembered you"',
        language: 'Receiving Gifts',
        iconText: 'Thoughtful Reminders',
      },
    ],
  },
  {
    id: 5,
    scenario: 'If your partner could give you one romantic gift for the upcoming weekend, which would you pick?',
    options: [
      {
        text: 'A quiet cabin weekend with zero notifications and hours of uninterrupted conversations',
        language: 'Quality Time',
        iconText: 'Serene Haven',
      },
      {
        text: 'A relaxing candlelit back rub followed by cuddling through a movie',
        language: 'Physical Touch',
        iconText: 'Sensory Bliss',
      },
      {
        text: 'A deeply personal engraved jewelry or art piece commemorating your bond',
        language: 'Receiving Gifts',
        iconText: 'Timeless Relic',
      },
      {
        text: 'Having all your errands, meal prep, and logistics handled so you can completely rest',
        language: 'Acts of Service',
        iconText: 'Stress-Free Freedom',
      },
      {
        text: 'A heartfelt speech over a candlelit dinner reflecting on your shared growth',
        language: 'Words of Affirmation',
        iconText: 'Emotional Tribute',
      },
    ],
  },
];

type LoveLanguage =
  | 'Words of Affirmation'
  | 'Quality Time'
  | 'Acts of Service'
  | 'Physical Touch'
  | 'Receiving Gifts';

interface LoveQuizViewProps {
  initialPartner1?: string;
  initialPartner2?: string;
  onNavigateToCalculator?: () => void;
}

export const LoveQuizView: React.FC<LoveQuizViewProps> = ({
  initialPartner1 = '',
  initialPartner2 = '',
  onNavigateToCalculator,
}) => {
  const [partner1, setPartner1] = useState(initialPartner1 || 'Partner 1');
  const [partner2, setPartner2] = useState(initialPartner2 || 'Partner 2');

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeAnsweringPartner, setActiveAnsweringPartner] = useState<1 | 2>(1);

  const [partner1Answers, setPartner1Answers] = useState<LoveLanguage[]>([]);
  const [partner2Answers, setPartner2Answers] = useState<LoveLanguage[]>([]);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (language: LoveLanguage) => {
    romanticAudio.playSoftChime(activeAnsweringPartner === 1 ? 523.25 : 659.25);

    if (activeAnsweringPartner === 1) {
      const updated = [...partner1Answers, language];
      setPartner1Answers(updated);
      setActiveAnsweringPartner(2);
    } else {
      const updated = [...partner2Answers, language];
      setPartner2Answers(updated);

      if (currentStep < QUIZ_SCENARIOS.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setActiveAnsweringPartner(1);
      } else {
        setIsCompleted(true);
        romanticAudio.playRevealArpeggio();
      }
    }
  };

  const calculateBreakdown = () => {
    const counts1: Record<LoveLanguage, number> = {
      'Words of Affirmation': 0,
      'Quality Time': 0,
      'Acts of Service': 0,
      'Physical Touch': 0,
      'Receiving Gifts': 0,
    };
    const counts2: Record<LoveLanguage, number> = {
      'Words of Affirmation': 0,
      'Quality Time': 0,
      'Acts of Service': 0,
      'Physical Touch': 0,
      'Receiving Gifts': 0,
    };

    partner1Answers.forEach((ans) => {
      counts1[ans] = (counts1[ans] || 0) + 1;
    });
    partner2Answers.forEach((ans) => {
      counts2[ans] = (counts2[ans] || 0) + 1;
    });

    const total = QUIZ_SCENARIOS.length;
    const languages: LoveLanguage[] = [
      'Words of Affirmation',
      'Quality Time',
      'Physical Touch',
      'Acts of Service',
      'Receiving Gifts',
    ];

    // Compute overlap resonance
    let matchingPoints = 0;
    for (let i = 0; i < total; i++) {
      if (partner1Answers[i] === partner2Answers[i]) {
        matchingPoints += 1;
      }
    }

    // Base synergy is between 75% and 98%
    const resonancePercentage = Math.round(75 + (matchingPoints / total) * 23);

    const sorted1 = [...languages].sort((a, b) => counts1[b] - counts1[a]);
    const sorted2 = [...languages].sort((a, b) => counts2[b] - counts2[a]);

    return {
      counts1,
      counts2,
      languages,
      primary1: sorted1[0],
      primary2: sorted2[0],
      resonancePercentage,
    };
  };

  const handleReset = () => {
    setCurrentStep(0);
    setActiveAnsweringPartner(1);
    setPartner1Answers([]);
    setPartner2Answers([]);
    setIsCompleted(false);
  };

  const results = isCompleted ? calculateBreakdown() : null;

  const currentScenario = QUIZ_SCENARIOS[currentStep];

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400">
          <Heart className="h-3.5 w-3.5 fill-rose-500/40 text-rose-400" />
          <span>The 5 Love Languages Synastry</span>
        </div>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-rose-100">
          Psychological Compatibility Quiz
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/70 font-light leading-relaxed">
          Uncover how you and your partner give and receive love. 5 deep, relatable questions comparing Words of Affirmation, Quality Time, Acts of Service, Physical Touch, and Gifts.
        </p>
      </div>

      {!isCompleted ? (
        <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#18081c] via-[#120516] to-[#0c0310] p-6 sm:p-10 shadow-2xl shadow-rose-950/30">
          {/* Couple Name Customizers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-rose-900/30">
            <div>
              <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                Partner 1 Name
              </label>
              <input
                type="text"
                value={partner1}
                onChange={(e) => setPartner1(e.target.value || 'Partner 1')}
                className="w-full rounded-xl border border-rose-900/40 bg-[#210927]/60 px-3.5 py-2 text-xs font-medium text-rose-100 placeholder-rose-400/40 focus:border-rose-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                Partner 2 Name
              </label>
              <input
                type="text"
                value={partner2}
                onChange={(e) => setPartner2(e.target.value || 'Partner 2')}
                className="w-full rounded-xl border border-rose-900/40 bg-[#210927]/60 px-3.5 py-2 text-xs font-medium text-rose-100 placeholder-rose-400/40 focus:border-rose-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between mt-6 mb-8 text-xs text-rose-300/70">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-rose-200">
                Question {currentStep + 1} of {QUIZ_SCENARIOS.length}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-rose-400">
                Answering for:{' '}
                <strong className="text-amber-300 font-bold">
                  {activeAnsweringPartner === 1 ? partner1 : partner2}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {QUIZ_SCENARIOS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentStep
                      ? 'w-7 bg-gradient-to-r from-rose-500 to-pink-500'
                      : idx < currentStep
                      ? 'w-3 bg-rose-700'
                      : 'w-3 bg-rose-950/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="mb-8">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-rose-100 leading-snug">
              {currentScenario.scenario}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3.5">
            {currentScenario.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.language)}
                className="group relative flex w-full items-center justify-between rounded-2xl border border-rose-900/40 bg-[#1e0a24]/50 p-4 sm:p-5 text-left transition-all hover:border-rose-500/60 hover:bg-[#280c2f]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-950/60 border border-rose-800/40 text-rose-300 font-serif-luxury font-bold text-sm group-hover:border-rose-400 group-hover:text-rose-100 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-light text-rose-100 group-hover:text-white leading-relaxed block">
                      {opt.text}
                    </span>
                    <span className="mt-1 text-[11px] text-rose-400/80 font-medium flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber-400/80" />
                      {opt.iconText}
                    </span>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-rose-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results View */
        results && (
          <div className="space-y-8 animate-fadeIn">
            <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#19091d] via-[#130517] to-[#0c0310] p-6 sm:p-10 shadow-2xl shadow-rose-950/30 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-2">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Emotional Synastry Verified</span>
              </div>

              <h3 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-rose-100 mb-3">
                {results.resonancePercentage}% Emotional Harmony
              </h3>

              <p className="text-xs sm:text-sm text-rose-200/80 max-w-lg mx-auto font-light leading-relaxed mb-8">
                {partner1} and {partner2} demonstrate a profound intuitive bridge. While you express tenderness uniquely, your emotional wavelengths complement each other seamlessly.
              </p>

              {/* Primary Love Languages Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
                <div className="rounded-2xl border border-rose-900/40 bg-[#1e0a25]/60 p-5">
                  <span className="text-[11px] uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                    {partner1}&apos;s Primary Language
                  </span>
                  <div className="font-serif-luxury text-2xl font-bold text-rose-100">
                    {results.primary1}
                  </div>
                  <p className="text-xs text-rose-300/70 font-light mt-1">
                    Feels most cherished when spoken to with warmth, genuine presence, and consistent attentiveness.
                  </p>
                </div>

                <div className="rounded-2xl border border-rose-900/40 bg-[#1e0a25]/60 p-5">
                  <span className="text-[11px] uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                    {partner2}&apos;s Primary Language
                  </span>
                  <div className="font-serif-luxury text-2xl font-bold text-rose-100">
                    {results.primary2}
                  </div>
                  <p className="text-xs text-rose-300/70 font-light mt-1">
                    Lights up when receiving intentional gestures, shared sanctuary, and unhurried quality time.
                  </p>
                </div>
              </div>

              {/* 5 Languages Comparative Breakdown */}
              <div className="rounded-2xl border border-rose-900/30 bg-[#150618]/50 p-6 max-w-2xl mx-auto space-y-4 text-left">
                <h4 className="font-serif-luxury text-xl font-semibold text-rose-200 border-b border-rose-900/30 pb-3 flex items-center justify-between">
                  <span>Comparative Resonance Breakdown</span>
                  <span className="text-xs text-rose-400 font-sans font-light">
                    {partner1} vs {partner2}
                  </span>
                </h4>

                {results.languages.map((lang, idx) => {
                  const p1Score = (results.counts1[lang] / QUIZ_SCENARIOS.length) * 100;
                  const p2Score = (results.counts2[lang] / QUIZ_SCENARIOS.length) * 100;
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-rose-200">
                        <span className="font-medium">{lang}</span>
                        <span className="text-rose-400 text-[11px]">
                          {p1Score}% / {p2Score}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 h-2 rounded-full bg-rose-950/40 p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-700"
                          style={{ width: `${Math.max(10, p1Score)}%` }}
                        />
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-700"
                          style={{ width: `${Math.max(10, p2Score)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-xl border border-rose-800/60 bg-[#1d0a23] px-5 py-2.5 text-xs font-semibold text-rose-200 hover:bg-rose-900/40 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake Quiz</span>
                </button>

                {onNavigateToCalculator && (
                  <button
                    onClick={onNavigateToCalculator}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-950/80 hover:from-rose-500 hover:to-pink-500 transition-all cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>View Name & Numerology Synastry</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
