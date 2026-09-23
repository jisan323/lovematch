import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface CalculationAnimationProps {
  name1: string;
  name2: string;
  onComplete: () => void;
}

const PHASES = [
  { step: '01', title: 'Phonetic Cadence & Acoustic Harmony', desc: 'Analyzing vowel frequencies, liquid consonants, and syllable rhythms...' },
  { step: '02', title: 'Pythagorean Numerology Matrix', desc: 'Calculating Destiny Numbers, Soul Urge vibrations, and Expression affinities...' },
  { step: '03', title: 'Chaldean Planetary Vectors', desc: 'Harmonizing Babylonian planetary rulers (Venus, Sun, Moon & Jupiter)...' },
  { step: '04', title: 'FLAMES Strike Elimination', desc: 'Cross-cancelling shared letters to determine the relational trajectory...' },
  { step: '05', title: 'Synthesizing Composite Synastry', desc: 'Integrating multi-dimensional harmony into your love reading...' },
];

export const CalculationAnimation: React.FC<CalculationAnimationProps> = ({
  name1,
  name2,
  onComplete,
}) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(12);

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
    <div className="w-full max-w-2xl mx-auto py-12 px-4 text-center">
      <div className="relative rounded-3xl border border-rose-900/50 bg-gradient-to-b from-[#1b0a1f] to-[#120516] p-8 sm:p-12 shadow-2xl shadow-rose-950/50 backdrop-blur-xl">
        {/* Pulsing center icon */}
        <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping opacity-30" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-lg shadow-rose-600/40">
            <Heart className="h-10 w-10 fill-white text-white animate-pulse" />
          </div>
        </div>

        {/* Names Header */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-rose-100 font-semibold mb-2">
          {name1} <span className="text-rose-400 font-normal">&</span> {name2}
        </h2>
        <p className="text-xs uppercase tracking-widest text-rose-400/80 mb-8 font-mono-numbers">
          Synthesizing Celestial Resonance ({progress}%)
        </p>

        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-rose-950/60 mb-8 border border-rose-900/30">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Phase display */}
        <div className="rounded-xl border border-rose-900/40 bg-[#16061a]/70 p-4 transition-all">
          <span className="text-[11px] font-mono-numbers text-rose-400 tracking-wider">
            STEP {activePhase.step} OF 05
          </span>
          <h3 className="font-serif-luxury text-xl text-rose-100 font-medium mt-1 mb-1">
            {activePhase.title}
          </h3>
          <p className="text-xs text-rose-300/60 font-light">
            {activePhase.desc}
          </p>
        </div>
      </div>
    </div>
  );
};
