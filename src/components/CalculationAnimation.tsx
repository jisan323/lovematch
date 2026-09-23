import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { Language, translations } from '../utils/translations';

interface CalculationAnimationProps {
  name1: string;
  name2: string;
  onComplete: () => void;
  lang?: Language;
}

export const CalculationAnimation: React.FC<CalculationAnimationProps> = ({
  name1,
  name2,
  onComplete,
  lang = 'en',
}) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(12);
  const t = translations[lang];

  const PHASES = [
    { step: '01', title: t.animStep1, desc: lang === 'bn' ? 'স্বরবর্ণ, ব্যঞ্জনবর্ণ ও অক্ষরের ছন্দ মেলানো হচ্ছে...' : 'Analyzing vowel frequencies, liquid consonants, and syllable rhythms...' },
    { step: '02', title: t.animStep2, desc: lang === 'bn' ? 'সোল আর্ট ও ডেস্টিনি নাম্বারের কম্পন বিশ্লেষণ...' : 'Calculating Destiny Numbers, Soul Urge vibrations, and Expression affinities...' },
    { step: '03', title: t.animStep3, desc: lang === 'bn' ? 'গ্রহাধিপতি ও ক্যালডিয়ান কোডের সমন্বয় সাধন...' : 'Harmonizing Babylonian planetary rulers (Venus, Sun, Moon & Jupiter)...' },
    { step: '04', title: t.animStep4, desc: lang === 'bn' ? 'FLAMES ঐতিহ্যবাহী বন্ধন সূত্রের সমাধান...' : 'Cross-cancelling shared letters to determine the relational trajectory...' },
    { step: '05', title: t.animStep5, desc: lang === 'bn' ? 'চূড়ান্ত রেজাল্ট ও সিনাস্ট্রি চার্ট তৈরি হচ্ছে...' : 'Integrating multi-dimensional harmony into your love reading...' },
  ];

  useEffect(() => {
    // Play initial heartbeat
    romanticAudio.playHeartbeat();

    const heartbeatInterval = setInterval(() => {
      romanticAudio.playHeartbeat();
    }, 650);

    const phaseInterval = setInterval(() => {
      setCurrentPhaseIndex((prev) => {
        if (prev < PHASES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 550);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 65);

    const timer = setTimeout(() => {
      clearInterval(heartbeatInterval);
      clearInterval(phaseInterval);
      romanticAudio.playRevealArpeggio();
      onComplete();
    }, 2800);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const activePhase = PHASES[currentPhaseIndex];

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-4 text-center">
      <div className="relative mx-auto flex h-36 w-36 items-center justify-center mb-8">
        {/* Outer pulsing halo rings */}
        <div className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping opacity-30" />
        <div className="absolute -inset-4 rounded-full border border-rose-400/20 animate-pulse" />

        {/* Central glowing heart */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-0.5 shadow-2xl shadow-rose-600/50">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#120516]">
            <Heart className="h-10 w-10 text-rose-500 fill-rose-500 animate-heartbeat" />
          </div>
        </div>
      </div>

      {/* Couple Names Headline */}
      <h2 className="font-serif-luxury text-3xl sm:text-4xl text-rose-100 font-normal tracking-tight mb-2">
        {name1} <span className="italic text-rose-400">&</span> {name2}
      </h2>

      {/* Progress Counter & Active Phase */}
      <div className="space-y-4 max-w-md mx-auto">
        <div className="flex items-center justify-between text-xs font-mono text-rose-400/80 px-1">
          <span className="font-semibold tracking-wider">PHASE {activePhase.step} / 05</span>
          <span className="font-mono-numbers font-bold text-rose-200">{progress}%</span>
        </div>

        {/* Linear Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-rose-950/60 border border-rose-900/40 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-600 via-pink-500 to-amber-300 transition-all duration-150 ease-out shadow-lg shadow-rose-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="pt-2">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-rose-100 mb-1 animate-fadeIn">
            {activePhase.title}
          </h3>
          <p className="text-xs text-rose-300/70 font-light">
            {activePhase.desc}
          </p>
        </div>
      </div>
    </div>
  );
};
