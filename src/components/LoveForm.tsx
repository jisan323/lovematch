import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, Heart, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { getLetterBreakdown } from '../utils/algorithms';
import { romanticAudio } from '../utils/audio';
import { Language, translations } from '../utils/translations';

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
  lang?: Language;
}

const PRESET_COUPLES = [
  { p1: 'Romeo', p2: 'Juliet', label: 'Romeo & Juliet' },
  { p1: 'Barack', p2: 'Michelle', label: 'Barack & Michelle' },
  { p1: 'Zendaya', p2: 'Tom', label: 'Zendaya & Tom' },
  { p1: 'Jack', p2: 'Rose', label: 'Jack & Rose' },
  { p1: 'Cleopatra', p2: 'Antony', label: 'Cleopatra & Antony' },
];

export const LoveForm: React.FC<LoveFormProps> = ({ onAnalyze, isLoading, lang = 'en' }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dob1, setDob1] = useState('');
  const [dob2, setDob2] = useState('');
  const [stage, setStage] = useState('Dating & In Love');

  const t = translations[lang];

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
          <span>{lang === 'bn' ? 'মাল্টি-অ্যালগরিদমিক সিনাস্ট্রি ইঞ্জিন' : 'Multi-Algorithmic Synastry Engine'}</span>
        </div>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal text-rose-100 tracking-tight text-balance mb-4">
          {t.formTitle}
        </h1>
        <p className="text-rose-200/70 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {t.formSubtitle}
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
                {t.partner1Label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder={t.partner1Placeholder}
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
                    {lang === 'bn' ? 'ক্যালডিয়ান কোড' : 'Chaldean codes'}
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
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-rose-800/60 bg-gradient-to-br from-rose-950/80 to-purple-950/80 text-rose-400 hover:border-rose-500 hover:text-rose-200 hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
              >
                <ArrowLeftRight className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
            </div>

            {/* Partner 2 Input */}
            <div className="lg:col-span-5 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300/80">
                {t.partner2Label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder={t.partner2Placeholder}
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
                    {lang === 'bn' ? 'ক্যালডিয়ান কোড' : 'Chaldean codes'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Preset quick test buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-rose-950/40">
            <span className="text-xs text-rose-400/60 mr-1">
              {lang === 'bn' ? 'জনপ্রিয় জুটি:' : 'Famous Pairs:'}
            </span>
            {PRESET_COUPLES.map((pair) => (
              <button
                key={pair.label}
                type="button"
                onClick={() => handleSelectPreset(pair.p1, pair.p2)}
                className="rounded-lg border border-rose-900/40 bg-rose-950/20 px-2.5 py-1 text-xs text-rose-200/70 hover:border-rose-600/50 hover:bg-rose-900/30 hover:text-rose-100 transition-colors cursor-pointer"
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
              className="flex items-center gap-2 text-xs font-semibold text-rose-300 hover:text-rose-100 transition-colors cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 text-rose-400" />
              <span>
                {showAdvanced
                  ? (lang === 'bn' ? 'জ্যোতিষ ও স্টেজ সংক্রান্ত অপশন লুকান' : 'Hide Astrological & Stage Details')
                  : t.optionalAstrology}
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-rose-900/30 bg-[#160719]/60 p-4">
                <div>
                  <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                    {t.partner1Dob}
                  </label>
                  <input
                    type="date"
                    value={dob1}
                    onChange={(e) => setDob1(e.target.value)}
                    className="w-full rounded-lg border border-rose-900/50 bg-[#1c0c20] px-3 py-2 text-xs text-rose-100 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                    {t.partner2Dob}
                  </label>
                  <input
                    type="date"
                    value={dob2}
                    onChange={(e) => setDob2(e.target.value)}
                    className="w-full rounded-lg border border-rose-900/50 bg-[#1c0c20] px-3 py-2 text-xs text-rose-100 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-rose-300/70 mb-1">
                    {t.stageLabel}
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full rounded-lg border border-rose-900/50 bg-[#1c0c20] px-3 py-2 text-xs text-rose-100 focus:border-rose-400 focus:outline-none"
                  >
                    <option value="Secret Crush">{t.stages.crush}</option>
                    <option value="Dating & Exploring">{t.stages.dating}</option>
                    <option value="Engaged & Committed">{t.stages.engaged}</option>
                    <option value="Married Bliss">{t.stages.married}</option>
                    <option value="Twin Flame & Soulmates">{t.stages.soulmates}</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Submission Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full group relative flex items-center justify-center gap-3 rounded-2xl py-4 px-8 text-base sm:text-lg font-semibold tracking-wide transition-all shadow-xl active:scale-[0.99] cursor-pointer ${
                isValid && !isLoading
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-rose-950/80 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 hover:shadow-rose-900/60'
                  : 'bg-rose-950/30 text-rose-400/40 border border-rose-900/40 cursor-not-allowed'
              }`}
            >
              <Heart
                className={`h-5 w-5 ${
                  isValid && !isLoading
                    ? 'fill-white text-white group-hover:scale-125 transition-transform animate-pulse'
                    : 'text-rose-400/40'
                }`}
              />
              <span>
                {isLoading ? t.calculatingButton : t.calculateButton}
              </span>
              <Sparkles
                className={`h-4 w-4 ${
                  isValid && !isLoading ? 'text-amber-300' : 'text-rose-400/30'
                }`}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
