import React from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { calculateCompatibility } from '../utils/algorithms';
import { CompatibilityResult } from '../types/compatibility';
import { romanticAudio } from '../utils/audio';

interface FamousCouplesViewProps {
  onSelectCouple: (result: CompatibilityResult) => void;
}

const FAMOUS_LIST = [
  {
    name1: 'Romeo',
    name2: 'Juliet',
    era: 'Shakespearean Verona',
    tagline: 'Timeless passion and eternal literary devotion',
    iconicQuote: '“My bounty is as boundless as the sea, my love as deep; the more I give to thee, the more I have.”',
  },
  {
    name1: 'Marie',
    name2: 'Pierre',
    era: 'Paris, 1895',
    tagline: 'Nobel-laureate intellectual synergy & devotion',
    iconicQuote: '“It would be a fine thing to pass our lives near to each other, hypnotized by our dreams.”',
  },
  {
    name1: 'Elizabeth',
    name2: 'Darcy',
    era: 'Regency England',
    tagline: 'From pride and prejudice to transcendent soulmates',
    iconicQuote: '“You have bewitched me body and soul, and I love, I love, I love you.”',
  },
  {
    name1: 'Barack',
    name2: 'Michelle',
    era: 'Modern Partnership',
    tagline: 'Grace, unwavering loyalty, and shared leadership',
    iconicQuote: '“For the past 28 years, you have been not just my wife and the mother of my children, but my best friend.”',
  },
  {
    name1: 'Cleopatra',
    name2: 'Antony',
    era: 'Ancient Alexandria',
    tagline: 'Imperial grandeur, magnetic charm, and empire-defining devotion',
    iconicQuote: '“Age cannot wither her, nor custom stale her infinite variety.”',
  },
  {
    name1: 'Zendaya',
    name2: 'Tom',
    era: 'Contemporary Icon',
    tagline: 'Playful wit, grounding loyalty, and radiant chemistry',
    iconicQuote: '“Finding someone who supports you endlessly through every chapter is life’s greatest anchor.”',
  },
];

export const FamousCouplesView: React.FC<FamousCouplesViewProps> = ({ onSelectCouple }) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 mb-3">
          <Sparkles className="h-3 w-3 text-rose-400" />
          <span>Legends of the Heart</span>
        </div>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-rose-100 mb-3">
          Iconic Couples Decoded
        </h2>
        <p className="text-rose-200/70 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          See how historical, literary, and cultural lovers score under our multi-dimensional vibrational matrix. Click any pair to run their full analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FAMOUS_LIST.map((couple) => {
          const comp = calculateCompatibility(couple.name1, couple.name2);
          return (
            <div
              key={`${couple.name1}-${couple.name2}`}
              className="flex flex-col justify-between rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#190a1d] to-[#120516] p-6 shadow-xl shadow-rose-950/20 transition-all hover:border-rose-600/50 hover:bg-[#200d26]/70 group"
            >
              <div>
                {/* Era & Score header */}
                <div className="flex items-center justify-between text-xs text-rose-400/80 mb-3">
                  <span>{couple.era}</span>
                  <div className="flex items-center gap-1 font-mono-numbers font-bold text-rose-300">
                    <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                    <span>{comp.overallPercentage}%</span>
                  </div>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-rose-100 mb-1 group-hover:text-rose-300 transition-colors">
                  {couple.name1} & {couple.name2}
                </h3>
                <span className="text-xs uppercase tracking-wider text-amber-400/90 font-medium block mb-3">
                  {comp.archetype.name}
                </span>

                <p className="text-xs text-rose-200/70 font-light leading-relaxed mb-4">
                  {couple.tagline}
                </p>

                <div className="rounded-xl border border-rose-900/30 bg-[#140517] p-3 text-xs italic text-rose-300/80 mb-4 font-serif">
                  {couple.iconicQuote}
                </div>
              </div>

              <button
                onClick={() => {
                  romanticAudio.playSoftChime(659.25);
                  onSelectCouple(comp);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-rose-900/50 bg-rose-950/40 py-2.5 px-4 text-xs font-semibold text-rose-200 hover:border-rose-500 hover:bg-rose-900/40 hover:text-white transition-all active:scale-[0.98]"
              >
                <span>Inspect Compatibility Reading</span>
                <ArrowRight className="h-3.5 w-3.5 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
