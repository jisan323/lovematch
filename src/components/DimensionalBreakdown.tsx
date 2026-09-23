import React from 'react';
import { Flame, HeartHandshake, ShieldCheck, MessagesSquare, SmilePlus } from 'lucide-react';
import { DimensionalScores } from '../types/compatibility';

interface DimensionalBreakdownProps {
  dimensions: DimensionalScores;
  partner1: string;
  partner2: string;
}

export const DimensionalBreakdown: React.FC<DimensionalBreakdownProps> = ({
  dimensions,
  partner1,
  partner2,
}) => {
  const items = [
    {
      label: 'Passion & Romantic Chemistry',
      score: dimensions.passion,
      icon: Flame,
      color: 'from-amber-500 via-rose-500 to-pink-600',
      textColor: 'text-rose-400',
      description: `${partner1} and ${partner2} ignite a fiery magnetic attraction that keeps physical romance vibrant and electric.`,
    },
    {
      label: 'Emotional Resonance & Empathy',
      score: dimensions.emotional,
      icon: HeartHandshake,
      color: 'from-rose-500 via-pink-500 to-purple-600',
      textColor: 'text-pink-400',
      description: 'An intuitive emotional connection that allows both partners to express their deepest vulnerabilities safely.',
    },
    {
      label: 'Long-Term Stability & Loyalty',
      score: dimensions.stability,
      icon: ShieldCheck,
      color: 'from-emerald-500 via-teal-500 to-cyan-600',
      textColor: 'text-emerald-400',
      description: 'An unshakable foundation of dependability, protective loyalty, and shared long-range vision.',
    },
    {
      label: 'Intellectual & Communicative Accord',
      score: dimensions.intellect,
      icon: MessagesSquare,
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      textColor: 'text-indigo-400',
      description: 'Effortless conversational flow, curious banter, and mutual appreciation for each other’s thoughts and opinions.',
    },
    {
      label: 'Playfulness & Shared Laughter',
      score: dimensions.playfulness,
      icon: SmilePlus,
      color: 'from-pink-500 via-rose-400 to-amber-400',
      textColor: 'text-amber-400',
      description: 'An infectious sense of fun, secret inside jokes, and the ability to lighten life’s stresses with warmth.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#180a1c] to-[#110514] p-6 sm:p-10 shadow-xl shadow-rose-950/30">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Multi-Dimensional Spectrum
          </span>
          <h3 className="font-serif-luxury text-3xl font-semibold text-rose-100 mt-1">
            Five Pillars of Compatibility
          </h3>
          <p className="text-sm text-rose-300/70 max-w-lg mx-auto font-light mt-1">
            Real compatibility is multi-faceted. Here is how your vibrational and phonetic harmony distributes across key areas of your relationship.
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-rose-900/30 bg-[#1e0c24]/50 p-4 sm:p-5 transition-colors hover:border-rose-700/40"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-950/60 border border-rose-900/50">
                      <Icon className={`h-4 w-4 ${item.textColor}`} />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-rose-100">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono-numbers text-lg sm:text-xl font-bold text-rose-100">
                      {item.score}%
                    </span>
                  </div>
                </div>

                {/* Progress Meter Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-rose-950/70 border border-rose-900/20 my-2">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                <p className="text-xs text-rose-300/70 font-light mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
