import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, Heart, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { getLetterBreakdown } from '../utils/algorithms';
import { romanticAudio } from '../utils/audio';

interface LoveFormProps {
  onAnalyze: (
    name1: string,
    name2: string,
    options?: {
      relationshipStage?: string;
      partner1BirthDate?: string;
      partner2BirthDate?: string;
    }
  ) => void;
  isLoading: boolean;
}

const PRESET_COUPLES = [
  { p1: 'Romeo', p2: 'Juliet', label: 'Romeo & Juliet' },
  { p1: 'Barack', p2: 'Michelle', label: 'Barack & Michelle' },
  { p1: 'Zendaya', p2: 'Tom', label: 'Zendaya & Tom' },
  { p1: 'Jack', p2: 'Rose', label: 'Jack & Rose' },
  { p1: 'Cleopatra', p2: 'Antony', label: 'Cleopatra & Antony' },
];

export const LoveForm: React.FC<LoveFormProps> = ({ onAnalyze, isLoading }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dob1, setDob1] = useState('');
  const [dob2, setDob2] = useState('');
  const [stage, setStage] = useState('Dating & In Love');

  const p1Letters = getLetterBreakdown(name1);
  const p2Letters = getLetterBreakdown(name2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim() || isLoading) return;

    romanticAudio.playSoftChime(587.33);
    onAnalyze(name1.trim(), name2.trim(), {
      relationshipStage: stage,
      partner1BirthDate: dob1 || undefined,
      partner2BirthDate: dob2 || undefined,
    });
  };

  const handleSwap = () => {
    romanticAudio.playSoftChime(440);
    const temp = name1;
    setName1(name2);
    setName2(temp);
  };

  const handleSelectPreset = (p1: string, p2: string) => {
    romanticAudio.playSoftChime(523.25);
    setName1(p1);
    setName2(p2);
  };

  const isValid = name1.trim().length >= 2 && name2.trim().length >= 2;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Decorative intro banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 mb-3">
          <Sparkles className="h-3 w-3 text-rose-400" />
          <span>Multi-Algorithmic Synastry Engine</span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal text-rose-100 tracking-tight text-balance mb-4">
          Discover Your Sacred Name Compatibility
        </h1>
        <p className="text-rose-200/70 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Decoding the vibrational frequencies of your names through ancient Pythagorean numerology, Chaldean planetary vectors, phonetic cadence, and the legendary FLAMES matrix.
        </p>
      </div>

      {/* Main calculation card */}
      <div className="relative rounded-2xl border border-rose-900/40 bg-gradient-to-b from-[#180a1c] to-[#120615] p-6 sm:p-10 shadow-2xl shadow-rose-950/40 backdrop-blur-xl">
        {/* Glow backdrop accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-rose-600/15 blur-3xl" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          {/* Couple Input Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            {/* Partner 1 Input */}
            <div className="lg:col-span-5 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300/80">
                Partner One (First or Full Name)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="e.g. Juliet"
                  maxLength={32}
                  className="w-full rounded-xl border border-rose-900/50 bg-[#1e0d23]/80 px-4 py-3.5 text-base sm:text-lg font-medium text-rose-50 placeholder-rose-400/30 focus:border-rose-400 focus:bg-[#25102c] focus:outline-none focus:ring-1 focus:ring-rose-400/50 transition-all"
                />
              </div>

              {/* Real-time letter vibrational breakdown */}
              {p1Letters.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {p1Letters.map((item, idx) => (
                    <div
                      key={idx}
                      title={`Pythagorean: ${item.pyth}, Chaldean: ${item.chald}`}
                      className={`flex flex-col items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-mono-numbers border ${
                        item.isVowel
                          ? 'border-rose-500/40 bg-rose-500/15 text-rose-300 font-semibold'
                          : 'border-rose-950/80 bg-rose-950/30 text-rose-200/60'
                      }`}
                    >
                      <span className="font-sans font-bold">{item.letter}</span>
                      <span className="text-[9px] text-amber-400/80">{item.chald}</span>
                    </div>
                  ))}
                  <span className="text-[10px] text-rose-400/50 self-center ml-1">
                    Chaldean codes
                  </span>
                </div>
              )}
            </div>

            {/* Middle heart / swap action */}
            <div className="lg:col-span-1 flex justify-center py-2 lg:py-0">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap names"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-rose-800/60 bg-gradient-to-br from-rose-950/80 to-purple-950/80 text-rose-400 hover:border-rose-500 hover:text-rose-200 hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                <ArrowLeftRight className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
            </div>

            {/* Partner 2 Input */}
            <div className="lg:col-span-5 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300/80">
                Partner Two (First or Full Name)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="e.g. Romeo"
                  maxLength={32}
                  className="w-full rounded-xl border border-rose-900/50 bg-[#1e0d23]/80 px-4 py-3.5 text-base sm:text-lg font-medium text-rose-50 placeholder-rose-400/30 focus:border-rose-400 focus:bg-[#25102c] focus:outline-none focus:ring-1 focus:ring-rose-400/50 transition-all"
                />
              </div>

              {/* Real-time letter vibrational breakdown */}
              {p2Letters.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {p2Letters.map((item, idx) => (
                    <div
                      key={idx}
                      title={`Pythagorean: ${item.pyth}, Chaldean: ${item.chald}`}
                      className={`flex flex-col items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-mono-numbers border ${
                        item.isVowel
                          ? 'border-rose-500/40 bg-rose-500/15 text-rose-300 font-semibold'
                          : 'border-rose-950/80 bg-rose-950/30 text-rose-200/60'
                      }`}
                    >
                      <span className="font-sans font-bold">{item.letter}</span>
                      <span className="text-[9px] text-amber-400/80">{item.chald}</span>
                    </div>
                  ))}
                  <span className="text-[10px] text-rose-400/50 self-center ml-1">
                    Chaldean codes
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Preset quick test buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-rose-950/40">
            <span className="text-xs text-rose-400/60 mr-1">Famous Pairs:</span>
            {PRESET_COUPLES.map((pair) => (
              <button
                key={pair.label}
                type="button"
                onClick={() => handleSelectPreset(pair.p1, pair.p2)}
                className="rounded-lg border border-rose-900/40 bg-rose-950/20 px-2.5 py-1 text-xs text-rose-200/70 hover:border-rose-600/50 hover:bg-rose-900/30 hover:text-rose-100 transition-colors"
              >
                {pair.label}
              </button>
            ))}
          </div>

          {/* Advanced toggle for dates and relationship stage */}
          <div className="border-t border-rose-950/40 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs font-semibold text-rose-300 hover:text-rose-100 transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 text-rose-400" />
              <span>
                {showAdvanced ? 'Hide Astrological & Stage Details' : 'Add Birth Dates & Relationship Stage (Optional Cosmic Alignment)'}
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-rose-900/30 bg-[#160719]/60 p-4">
                <div>
                  <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                    Partner 1 Birth Date
                  </label>
                  <input
                    type="date"
                    value={dob1}
                    onChange={(e) => setDob1(e.target.value)}
                    className="w-full rounded-lg border border-rose-900/40 bg-[#1f0b24] px-3 py-2 text-xs text-rose-100 focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                    Partner 2 Birth Date
                  </label>
                  <input
                    type="date"
                    value={dob2}
                    onChange={(e) => setDob2(e.target.value)}
                    className="w-full rounded-lg border border-rose-900/40 bg-[#1f0b24] px-3 py-2 text-xs text-rose-100 focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                    Relationship Stage
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full rounded-lg border border-rose-900/40 bg-[#1f0b24] px-3 py-2 text-xs text-rose-100 focus:border-rose-400 focus:outline-none"
                  >
                    <option value="Secret Crush">Secret Crush / Curious Spark</option>
                    <option value="Dating & In Love">Dating & In Love</option>
                    <option value="Long-term Partners">Long-term Partners</option>
                    <option value="Engaged & Preparing">Engaged & Preparing</option>
                    <option value="Married & Soulmates">Married & Soulmates</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full group relative overflow-hidden rounded-xl py-4 px-6 text-center font-medium text-white transition-all shadow-xl ${
                isValid && !isLoading
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 shadow-rose-950/60 active:scale-[0.99] cursor-pointer'
                  : 'bg-rose-950/40 text-rose-400/40 border border-rose-950 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 fill-current text-white/90 group-hover:scale-125 transition-transform" />
                <span className="font-serif-luxury text-xl tracking-wide font-bold">
                  {isLoading ? 'Synthesizing Compatibility...' : 'Calculate Love Compatibility'}
                </span>
                <Sparkles className="h-4 w-4 text-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
            {!isValid && (
              <p className="text-center text-xs text-rose-400/50 mt-2">
                Enter both names (minimum 2 letters each) to unlock your algorithmic reading
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
