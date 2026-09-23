import React, { useState } from 'react';
import { Copy, Check, Sparkles, Heart } from 'lucide-react';
import { CoupleNickname } from '../types/compatibility';
import { romanticAudio } from '../utils/audio';

interface CoupleShipNamesProps {
  nicknames: CoupleNickname[];
  partner1: string;
  partner2: string;
}

export const CoupleShipNames: React.FC<CoupleShipNamesProps> = ({
  nicknames,
  partner1,
  partner2,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (blend: string, index: number) => {
    navigator.clipboard.writeText(blend);
    setCopiedIndex(index);
    romanticAudio.playSoftChime(880);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
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
              Couple Ship Names
            </h4>
            <p className="text-xs text-rose-300/70 font-light">
              Algorithmic name blendings tailored for {partner1} & {partner2}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs text-rose-400/80">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Tap to copy moniker</span>
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
                  : 'border-rose-900/40 bg-[#1e0a24]/50 hover:border-rose-500/50 hover:bg-[#250d2d]/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] text-rose-400/80 mb-2 font-medium">
                  <span className="truncate">{item.category}</span>
                  <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-rose-950/40 group-hover:bg-rose-900/40 transition-colors">
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-rose-300/70 group-hover:text-rose-100" />
                    )}
                  </div>
                </div>

                <div className="font-serif-luxury text-2xl font-bold text-rose-100 tracking-wide group-hover:text-rose-200 transition-colors">
                  {item.blend}
                </div>
              </div>

              <p className="mt-3 text-[11px] text-rose-300/60 font-light leading-snug">
                {item.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
