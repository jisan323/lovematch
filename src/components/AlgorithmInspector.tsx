import React, { useState } from 'react';
import {
  Binary,
  Compass,
  Flame,
  Music2,
  Sparkles,
  Info,
} from 'lucide-react';
import { CompatibilityResult } from '../types/compatibility';
import { romanticAudio } from '../utils/audio';

interface AlgorithmInspectorProps {
  result: CompatibilityResult;
}

export const AlgorithmInspector: React.FC<AlgorithmInspectorProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'pythagorean' | 'chaldean' | 'flames' | 'phonetic' | 'astrology'>('flames');

  const { pythagorean, chaldean, flames, phonetic, astrological } = result;

  const handleTabClick = (tab: typeof activeTab) => {
    romanticAudio.playSoftChime(523.25);
    setActiveTab(tab);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#180a1c] to-[#100513] p-6 sm:p-10 shadow-xl shadow-rose-950/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
            <Binary className="h-3.5 w-3.5" />
            <span>Algorithmic Transparency</span>
          </div>
          <h3 className="font-serif-luxury text-3xl font-semibold text-rose-100">
            Deep Mathematical & Vibrational Audit
          </h3>
          <p className="text-sm text-rose-300/70 max-w-xl mx-auto font-light mt-1">
            Explore the exact calculations, harmonic matrices, and ancient vibrational rules behind your compatibility score.
          </p>
        </div>

        {/* Tab Controls (interactive luxury segmented controls) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-[#140617]/90 border border-rose-900/50 p-1.5 mb-8 shadow-inner backdrop-blur-md">
          <button
            onClick={() => handleTabClick('flames')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all whitespace-nowrap active:scale-95 ${
              activeTab === 'flames'
                ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-950/80'
                : 'text-rose-300/75 hover:text-rose-100 hover:bg-rose-950/40'
            }`}
          >
            <Flame className={`h-4 w-4 ${activeTab === 'flames' ? 'text-amber-300' : 'text-rose-400/80'}`} />
            <span>FLAMES Matrix</span>
          </button>

          <button
            onClick={() => handleTabClick('pythagorean')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all whitespace-nowrap active:scale-95 ${
              activeTab === 'pythagorean'
                ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-950/80'
                : 'text-rose-300/75 hover:text-rose-100 hover:bg-rose-950/40'
            }`}
          >
            <Compass className={`h-4 w-4 ${activeTab === 'pythagorean' ? 'text-amber-300' : 'text-rose-400/80'}`} />
            <span>Pythagorean Resonance</span>
          </button>

          <button
            onClick={() => handleTabClick('chaldean')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all whitespace-nowrap active:scale-95 ${
              activeTab === 'chaldean'
                ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-950/80'
                : 'text-rose-300/75 hover:text-rose-100 hover:bg-rose-950/40'
            }`}
          >
            <Sparkles className={`h-4 w-4 ${activeTab === 'chaldean' ? 'text-amber-300' : 'text-rose-400/80'}`} />
            <span>Chaldean Vibrations</span>
          </button>

          <button
            onClick={() => handleTabClick('phonetic')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all whitespace-nowrap active:scale-95 ${
              activeTab === 'phonetic'
                ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-950/80'
                : 'text-rose-300/75 hover:text-rose-100 hover:bg-rose-950/40'
            }`}
          >
            <Music2 className={`h-4 w-4 ${activeTab === 'phonetic' ? 'text-amber-300' : 'text-rose-400/80'}`} />
            <span>Phonetic Acoustics</span>
          </button>

          {astrological && (
            <button
              onClick={() => handleTabClick('astrology')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all whitespace-nowrap active:scale-95 ${
                activeTab === 'astrology'
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-md shadow-rose-950/80'
                  : 'text-rose-300/75 hover:text-rose-100 hover:bg-rose-950/40'
              }`}
            >
              <Info className={`h-4 w-4 ${activeTab === 'astrology' ? 'text-amber-300' : 'text-rose-400/80'}`} />
              <span>Cosmic Astrology</span>
            </button>
          )}
        </div>

        {/* Tab 1: FLAMES Matrix */}
        {activeTab === 'flames' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-2xl border border-rose-900/30 bg-[#1e0c24]/50 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-900/30">
                <div>
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                    FLAMES Relational Outcome
                  </span>
                  <h4 className="font-serif-luxury text-2xl font-bold text-rose-100 mt-1">
                    Letter '{flames.resultLetter}' — {flames.resultTitle}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-300/70">Relational Harmony</span>
                  <div className="font-mono-numbers text-2xl font-bold text-amber-400">
                    {flames.scoreBonus}%
                  </div>
                </div>
              </div>

              <p className="text-sm text-rose-200/90 font-light leading-relaxed mb-6">
                {flames.description}
              </p>

              {/* Visual Letter Cancellation Showcase */}
              <div className="rounded-xl border border-rose-900/40 bg-[#160619] p-4 sm:p-6 mb-6">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-rose-300/80 mb-3">
                  Letter Cancellation & Elimination Trace
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Partner 1 name cancellation */}
                  <div className="rounded-lg bg-[#200d28] p-3 border border-rose-900/40">
                    <span className="text-[11px] text-rose-400/80 block mb-1">
                      {result.partner1Name}
                    </span>
                    <div className="flex flex-wrap gap-1 font-mono text-sm">
                      {result.partner1Name.toUpperCase().split('').map((char, i) => {
                        const isCommon = flames.commonLetters.includes(char);
                        return (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded ${
                              isCommon
                                ? 'bg-rose-500/20 text-rose-400 line-through opacity-60'
                                : 'bg-emerald-500/20 text-emerald-300 font-bold'
                            }`}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Partner 2 name cancellation */}
                  <div className="rounded-lg bg-[#200d28] p-3 border border-rose-900/40">
                    <span className="text-[11px] text-rose-400/80 block mb-1">
                      {result.partner2Name}
                    </span>
                    <div className="flex flex-wrap gap-1 font-mono text-sm">
                      {result.partner2Name.toUpperCase().split('').map((char, i) => {
                        const isCommon = flames.commonLetters.includes(char);
                        return (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded ${
                              isCommon
                                ? 'bg-rose-500/20 text-rose-400 line-through opacity-60'
                                : 'bg-emerald-500/20 text-emerald-300 font-bold'
                            }`}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-rose-300/80 border-t border-rose-950 pt-3">
                  <div>
                    Common Matched Letters:{' '}
                    <span className="font-mono text-rose-200 font-semibold">
                      {flames.commonLetters.length > 0 ? flames.commonLetters.join(', ') : 'None'}
                    </span>
                  </div>
                  <div>
                    Remaining Unmatched Count:{' '}
                    <span className="font-mono text-amber-400 font-semibold">
                      {flames.totalRemainingCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step by step countdown */}
              <div className="space-y-1.5 text-xs text-rose-300/70 font-mono-numbers">
                <span className="font-sans font-semibold text-rose-200 block mb-2">
                  Circular FLAMES Elimination Steps:
                </span>
                {flames.stepByStepTrace.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-rose-950/20 p-2 rounded">
                    <span className="text-rose-500">→</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pythagorean Resonance */}
        {activeTab === 'pythagorean' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-2xl border border-rose-900/30 bg-[#1e0c24]/50 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-900/30">
                <div>
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                    Pythagorean Affinity Matrix
                  </span>
                  <h4 className="font-serif-luxury text-2xl font-bold text-rose-100 mt-1">
                    {pythagorean.affinityType}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-300/70">Resonance Score</span>
                  <div className="font-mono-numbers text-2xl font-bold text-amber-400">
                    {pythagorean.harmonyScore}%
                  </div>
                </div>
              </div>

              <p className="text-sm text-rose-200/90 font-light leading-relaxed mb-6">
                {pythagorean.interpretation}
              </p>

              {/* Core Pythagorean Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Partner 1 card */}
                <div className="rounded-xl border border-rose-900/40 bg-[#17071a] p-4">
                  <h5 className="font-serif-luxury text-lg text-rose-100 font-semibold mb-3">
                    {result.partner1Name}’s Numbers
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-rose-950">
                      <span className="text-rose-300/70">Expression Number:</span>
                      <span className="font-mono text-rose-100 font-bold">{pythagorean.p1Expression}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-rose-950">
                      <span className="text-rose-300/70">Soul Urge (Vowels):</span>
                      <span className="font-mono text-rose-100 font-bold">{pythagorean.p1SoulUrge}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-rose-300/70">Personality (Consonants):</span>
                      <span className="font-mono text-rose-100 font-bold">{pythagorean.p1Personality}</span>
                    </div>
                  </div>
                </div>

                {/* Partner 2 card */}
                <div className="rounded-xl border border-rose-900/40 bg-[#17071a] p-4">
                  <h5 className="font-serif-luxury text-lg text-rose-100 font-semibold mb-3">
                    {result.partner2Name}’s Numbers
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-rose-950">
                      <span className="text-rose-300/70">Expression Number:</span>
                      <span className="font-mono text-rose-100 font-bold">{pythagorean.p2Expression}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-rose-950">
                      <span className="text-rose-300/70">Soul Urge (Vowels):</span>
                      <span className="font-mono text-rose-100 font-bold">{pythagorean.p2SoulUrge}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-rose-300/70">Personality (Consonants):</span>
                      <span className="font-mono text-rose-100 font-bold">{pythagorean.p2Personality}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanatory footer */}
              <div className="rounded-lg bg-rose-950/20 p-3 text-xs text-rose-300/70 border border-rose-900/20 leading-relaxed">
                <strong className="text-rose-200">Pythagorean Law of Triads:</strong> Numbers 1-5-7 govern visionary intellect; 2-4-8 govern material loyalty; 3-6-9 govern artistic heart resonance. Master numbers 11, 22, and 33 channel elevated spiritual devotion.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Chaldean Vibrations */}
        {activeTab === 'chaldean' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-2xl border border-rose-900/30 bg-[#1e0c24]/50 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-900/30">
                <div>
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                    Babylonian Planetary Resonance
                  </span>
                  <h4 className="font-serif-luxury text-2xl font-bold text-rose-100 mt-1">
                    Compound Vibrational Matrix
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-300/70">Vibrational Accord</span>
                  <div className="font-mono-numbers text-2xl font-bold text-amber-400">
                    {chaldean.compoundResonanceScore}%
                  </div>
                </div>
              </div>

              <p className="text-sm text-rose-200/90 font-light leading-relaxed mb-6">
                {chaldean.vibrationalInterpretation}
              </p>

              {/* Planetary Rulers Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-rose-900/40 bg-[#17071a] p-4">
                  <span className="text-xs text-rose-400 font-medium">{result.partner1Name}</span>
                  <div className="mt-2 text-sm font-semibold text-rose-100">
                    {chaldean.p1PlanetaryRuler}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-rose-300/70 pt-2 border-t border-rose-950">
                    <span>Compound Sum: <strong className="text-rose-100 font-mono">{chaldean.p1VibrationalSum}</strong></span>
                    <span>Single Digit: <strong className="text-amber-400 font-mono">{chaldean.p1SingleDigit}</strong></span>
                  </div>
                </div>

                <div className="rounded-xl border border-rose-900/40 bg-[#17071a] p-4">
                  <span className="text-xs text-rose-400 font-medium">{result.partner2Name}</span>
                  <div className="mt-2 text-sm font-semibold text-rose-100">
                    {chaldean.p2PlanetaryRuler}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-rose-300/70 pt-2 border-t border-rose-950">
                    <span>Compound Sum: <strong className="text-rose-100 font-mono">{chaldean.p2VibrationalSum}</strong></span>
                    <span>Single Digit: <strong className="text-amber-400 font-mono">{chaldean.p2SingleDigit}</strong></span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-rose-950/20 p-3 text-xs text-rose-300/70 border border-rose-900/20 leading-relaxed">
                <strong className="text-rose-200">The Chaldean System:</strong> Ancient Chaldean numerology assigns values 1 through 8 to letters based on sacred sonic frequencies, linking each number directly to planetary rulers. It emphasizes internal vibrational resonance over outer appearance.
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Phonetic Acoustics */}
        {activeTab === 'phonetic' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-2xl border border-rose-900/30 bg-[#1e0c24]/50 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-900/30">
                <div>
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                    Spoken Melody & Acoustic Flow
                  </span>
                  <h4 className="font-serif-luxury text-2xl font-bold text-rose-100 mt-1">
                    Vocal Harmonic Chemistry
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-300/70">Acoustic Score</span>
                  <div className="font-mono-numbers text-2xl font-bold text-amber-400">
                    {phonetic.overallAcousticScore}%
                  </div>
                </div>
              </div>

              <p className="text-sm text-rose-200/90 font-light leading-relaxed mb-6">
                {phonetic.analysisText}
              </p>

              {/* Acoustic Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="rounded-xl border border-rose-900/30 bg-[#17071a] p-3 text-center">
                  <span className="text-[11px] text-rose-400/80 block">Vowel Harmony</span>
                  <div className="font-mono-numbers text-xl font-bold text-rose-100 mt-1">
                    {phonetic.vowelHarmonyScore}%
                  </div>
                </div>
                <div className="rounded-xl border border-rose-900/30 bg-[#17071a] p-3 text-center">
                  <span className="text-[11px] text-rose-400/80 block">Syllable Balance</span>
                  <div className="font-mono-numbers text-xl font-bold text-rose-100 mt-1">
                    {phonetic.syllableBalanceScore}%
                  </div>
                </div>
                <div className="rounded-xl border border-rose-900/30 bg-[#17071a] p-3 text-center">
                  <span className="text-[11px] text-rose-400/80 block">Liquid Flow</span>
                  <div className="font-mono-numbers text-xl font-bold text-rose-100 mt-1">
                    {phonetic.consonantSoftnessScore}%
                  </div>
                </div>
                <div className="rounded-xl border border-rose-900/30 bg-[#17071a] p-3 text-center">
                  <span className="text-[11px] text-rose-400/80 block">Cadence Rhythm</span>
                  <div className="font-mono-numbers text-xl font-bold text-rose-100 mt-1">
                    {phonetic.rhythmScore}%
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-rose-300/80 rounded-lg bg-[#160619] p-3 border border-rose-900/40">
                <span>
                  Syllable Cadence: <strong className="text-rose-100 font-mono">{phonetic.p1Syllables}</strong> ({result.partner1Name}) vs <strong className="text-rose-100 font-mono">{phonetic.p2Syllables}</strong> ({result.partner2Name})
                </span>
                <span>
                  Shared Melodic Vowels: <strong className="text-amber-400 font-mono">{phonetic.sharedVowels.length > 0 ? phonetic.sharedVowels.join(', ') : 'Complementary contrast'}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Astrological Resonance */}
        {activeTab === 'astrology' && astrological && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-2xl border border-rose-900/30 bg-[#1e0c24]/50 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-900/30">
                <div>
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                    Astrological Alignment
                  </span>
                  <h4 className="font-serif-luxury text-2xl font-bold text-rose-100 mt-1">
                    {astrological.elementalSynergy}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-300/70">Elemental Harmony</span>
                  <div className="font-mono-numbers text-2xl font-bold text-amber-400">
                    {astrological.elementScore}%
                  </div>
                </div>
              </div>

              <p className="text-sm text-rose-200/90 font-light leading-relaxed mb-6">
                {astrological.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-rose-900/40 bg-[#17071a] p-4 text-center">
                  <span className="text-xs text-rose-400 font-medium">{result.partner1Name}</span>
                  <div className="font-serif-luxury text-xl font-bold text-rose-100 mt-1">
                    {astrological.p1Zodiac}
                  </div>
                  <span className="text-xs text-rose-300/60 block mt-1">
                    Element: {astrological.p1Element}
                  </span>
                </div>

                <div className="rounded-xl border border-rose-900/40 bg-[#17071a] p-4 text-center">
                  <span className="text-xs text-rose-400 font-medium">{result.partner2Name}</span>
                  <div className="font-serif-luxury text-xl font-bold text-rose-100 mt-1">
                    {astrological.p2Zodiac}
                  </div>
                  <span className="text-xs text-rose-300/60 block mt-1">
                    Element: {astrological.p2Element}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
