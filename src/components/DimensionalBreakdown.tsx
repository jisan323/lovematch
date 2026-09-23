import React from 'react';
import { Flame, HeartHandshake, ShieldCheck, MessagesSquare, SmilePlus } from 'lucide-react';
import { DimensionalScores } from '../types/compatibility';
import { Language, translations } from '../utils/translations';

interface DimensionalBreakdownProps {
  dimensions: DimensionalScores;
  partner1: string;
  partner2: string;
  lang?: Language;
}

export const DimensionalBreakdown: React.FC<DimensionalBreakdownProps> = ({
  dimensions,
  partner1,
  partner2,
  lang = 'en',
}) => {
  const t = translations[lang];

  const items = [
    {
      label: t.dimPassion,
      score: dimensions.passion,
      icon: Flame,
      color: 'from-amber-500 via-rose-500 to-pink-600',
      textColor: 'text-rose-400',
      description: lang === 'bn'
        ? `${partner1} ও ${partner2}-এর মধ্যে তীব্র আকর্ষণ ও রোমান্টিক বিদ্যুতের উদ্দীপনা বিদ্যমান।`
        : `${partner1} and ${partner2} ignite a fiery magnetic attraction that keeps physical romance vibrant and electric.`,
    },
    {
      label: t.dimEmotional,
      score: dimensions.emotional,
      icon: HeartHandshake,
      color: 'from-rose-500 via-pink-500 to-purple-600',
      textColor: 'text-pink-400',
      description: lang === 'bn'
        ? 'সহজাত মানসিক সান্নিধ্য, যা উভয়কে নিজেদের মনের লুকানো কথা নির্দ্বিধায় প্রকাশ করতে সাহায্য করে।'
        : 'An intuitive emotional connection that allows both partners to express their deepest vulnerabilities safely.',
    },
    {
      label: t.dimStability,
      score: dimensions.stability,
      icon: ShieldCheck,
      color: 'from-emerald-500 via-teal-500 to-cyan-600',
      textColor: 'text-emerald-400',
      description: lang === 'bn'
        ? 'পরস্পরের প্রতি গভীর বিশ্বাস, দায়িত্ববোধ ও আজীবন পাশে থাকার এক নিরেট প্রতিশ্রুতি।'
        : 'An unshakable foundation of dependability, protective loyalty, and shared long-range vision.',
    },
    {
      label: t.dimIntellect,
      score: dimensions.intellect,
      icon: MessagesSquare,
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      textColor: 'text-indigo-400',
      description: lang === 'bn'
        ? 'প্রাণবন্ত কথোপকথন, চিন্তাভাবনার চমৎকার মিল ও নতুন বিষয় নিয়ে ঘণ্টার পর ঘণ্টা কথা বলার আনন্দ।'
        : 'Effortless conversational flow, curious banter, and mutual appreciation for each other’s thoughts and opinions.',
    },
    {
      label: t.dimPlayfulness,
      score: dimensions.playfulness,
      icon: SmilePlus,
      color: 'from-pink-500 via-rose-400 to-amber-400',
      textColor: 'text-amber-400',
      description: lang === 'bn'
        ? 'যেকোনো কঠিন মুহূর্তে একে অপরকে হাসিয়ে ফেলার ক্ষমতা ও মজার খুনসুটির মেলবন্ধন।'
        : 'An infectious sense of fun, secret inside jokes, and the ability to lighten life’s stresses with warmth.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#18081c] via-[#120516] to-[#0d0312] p-6 sm:p-10 shadow-2xl shadow-rose-950/30">
        <div className="text-center mb-8">
          <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-rose-100">
            {t.dimensionsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-rose-300/70 font-light mt-1 max-w-lg mx-auto">
            {t.dimensionsSubtitle}
          </p>
        </div>

        <div className="space-y-6">
          {items.map((dim, idx) => {
            const Icon = dim.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${dim.textColor}`} />
                    <span className="font-semibold text-rose-100">{dim.label}</span>
                  </div>
                  <span className="font-mono-numbers font-bold text-rose-300">
                    {dim.score}%
                  </span>
                </div>

                <div className="h-2.5 w-full rounded-full bg-rose-950/60 border border-rose-900/40 p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-700`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>

                <p className="text-[11px] sm:text-xs text-rose-300/60 font-light">
                  {dim.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
