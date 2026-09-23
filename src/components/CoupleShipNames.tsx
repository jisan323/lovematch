import React, { useState } from 'react';
import { Copy, Check, Sparkles, Heart } from 'lucide-react';
import { CoupleNickname } from '../types/compatibility';
import { romanticAudio } from '../utils/audio';
import { Language, translations } from '../utils/translations';

interface CoupleShipNamesProps {
  nicknames: CoupleNickname[];
  partner1: string;
  partner2: string;
  lang?: Language;
}

export const CoupleShipNames: React.FC<CoupleShipNamesProps> = ({
  nicknames,
  partner1,
  partner2,
  lang = 'en',
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const t = translations[lang];

  const handleCopy = (blend: string, index: number) => {
    navigator.clipboard.writeText(blend);
    setCopiedIndex(index);
    romanticAudio.playSoftChime(880);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const getLocalizedCategory = (cat: string) => {
    if (cat.includes('Classic')) return t.classicPortmanteau;
    if (cat.includes('Harmonic')) return t.harmonicBlend;
    if (cat.includes('Poetic')) return t.poeticMoniker;
    if (cat.includes('Cosmic')) return t.cosmicAlias;
    return cat;
  };

  return (
    <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#18081c] via-[#120516] to-[#0d0312] p-6 sm:p-8 shadow-xl shadow-rose-950/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-rose-900/30">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500/20 to-pink-500/10 border border-rose-500/30 text-rose-300 shadow-inner">
            <Heart className="h-5 w-5 fill-rose-500/40 text-rose-400" />
          </div>
          <div>
            <h4 className="font-serif-luxury text-2xl font-bold text-rose-100">
              {t.shipNamesTitle}
            </h4>
            <p className="text-xs text-rose-300/70 font-light">
              {lang === 'bn' ? `${partner1} ও ${partner2}-এর জন্য মিষ্টি রোমান্টিক ডাকনাম` : `Algorithmic name blendings tailored for ${partner1} & ${partner2}`}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs text-rose-400/80">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>{t.copyMoniker}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nicknames.map((item, idx) => {
          const isCopied = copiedIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => handleCopy(item.blend, idx)}
              className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 active:scale-[0.98] ${
                isCopied
                  ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-950/30'
                  : 'border-rose-900/50 bg-[#150617]/70 hover:border-rose-500/50 hover:bg-rose-950/30 hover:shadow-md'
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-400/75">
                  {getLocalizedCategory(item.category)}
                </span>
                <div className="font-serif-luxury text-2xl font-bold text-white tracking-wide mt-1 group-hover:text-rose-200 transition-colors">
                  {item.blend}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-rose-900/30 pt-3">
                <span className="text-[11px] text-rose-300/60 font-light truncate mr-2">
                  {item.tagline}
                </span>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-rose-900/40 text-rose-300 group-hover:bg-rose-800/50 group-hover:text-white'
                  }`}
                >
                  {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
