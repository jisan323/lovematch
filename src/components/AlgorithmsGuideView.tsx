import React, { useState } from 'react';
import { Binary, Compass, Flame, Music2, Sparkles } from 'lucide-react';
import { CHALDEAN_MAP, getLetterBreakdown } from '../utils/algorithms';
import { romanticAudio } from '../utils/audio';

export const AlgorithmsGuideView: React.FC = () => {
  const [testName, setTestName] = useState('Juliet');
  const letters = getLetterBreakdown(testName);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 space-y-12">
      {/* Intro */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 mb-3">
          <Binary className="h-3 w-3 text-rose-400" />
          <span>Synastry Science & Numerological Roots</span>
        </div>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-rose-100 mb-3">
          The Science of Name Harmonics
        </h2>
        <p className="text-rose-200/70 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
          Throughout millennia, ancient civilizations recognized that names are sound waves carrying distinctive mathematical frequencies. LoveMatch blends four independent analytical frameworks.
        </p>
      </div>

      {/* Interactive Letter Value Sandbox */}
      <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#190a1d] to-[#120516] p-6 sm:p-8 shadow-xl shadow-rose-950/20">
        <h3 className="font-serif-luxury text-2xl font-semibold text-rose-100 mb-2">
          Live Interactive Letter Vibrational Sandbox
        </h3>
        <p className="text-xs text-rose-300/70 font-light mb-6">
          Type any name below to watch the letter vibrations, vocal acoustics, and Chaldean frequencies decode in real time.
        </p>

        <div className="max-w-md mb-6">
          <input
            type="text"
            value={testName}
            onChange={(e) => {
              romanticAudio.playSoftChime(523.25);
              setTestName(e.target.value);
            }}
            placeholder="Type a name..."
            className="w-full rounded-xl border border-rose-900/50 bg-[#1e0d23] px-4 py-3 text-base font-medium text-rose-50 focus:border-rose-400 focus:outline-none"
          />
        </div>

        {letters.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {letters.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center rounded-xl border px-3 py-2 ${
                    item.isVowel
                      ? 'border-rose-500/50 bg-rose-500/15 text-rose-200'
                      : 'border-rose-900/40 bg-rose-950/30 text-rose-300/80'
                  }`}
                >
                  <span className="font-serif-luxury text-xl font-bold">{item.letter}</span>
                  <span className="text-[10px] text-rose-400/80 mt-1">Pyth: {item.pyth}</span>
                  <span className="text-[10px] text-amber-400 font-semibold">Chald: {item.chald}</span>
                  <span className="text-[9px] uppercase tracking-wider text-rose-400/60 mt-0.5">
                    {item.isVowel ? 'Vowel' : 'Consonant'}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-xs text-rose-300/70 border-t border-rose-950 pt-3">
              Total letters: <strong className="text-rose-100">{letters.length}</strong> · 
              Vowels: <strong className="text-rose-100">{letters.filter(l => l.isVowel).length}</strong> · 
              Consonants: <strong className="text-rose-100">{letters.filter(l => !l.isVowel).length}</strong> · 
              Chaldean Total Sum: <strong className="text-amber-400 font-mono">{letters.reduce((s, l) => s + l.chald, 0)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Deep Dives into 4 Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chaldean */}
        <div className="rounded-3xl border border-rose-900/40 bg-[#160618] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-2xl font-bold text-rose-100">
                Chaldean Babylonian Matrix
              </h4>
              <span className="text-xs text-amber-400/80 font-medium">Vibrational Frequencies 1 to 8</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/80 font-light leading-relaxed">
            Originating in ancient Mesopotamia, the Chaldean system is widely considered the most intuitive numerological tradition. It only utilizes numbers 1 to 8, omitting 9 because it was deemed sacred. Each number resonates with a specific planetary ruler: 6 with Venus (love), 2 with the Moon (empathy), and 1 with the Sun (vitality).
          </p>
        </div>

        {/* Pythagorean */}
        <div className="rounded-3xl border border-rose-900/40 bg-[#160618] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-2xl font-bold text-rose-100">
                Pythagorean Numerology
              </h4>
              <span className="text-xs text-rose-400/80 font-medium">Triads & Master Numbers 11, 22, 33</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/80 font-light leading-relaxed">
            Formulated by Pythagoras in ancient Greece, this system maps letters 1 to 9 sequentially. It isolates the Soul Urge Number (sum of vowels, depicting the heart's hidden desires) from the Personality Number (consonants) and Expression Number. Relationships within the same harmonic triad produce effortless intuitive flow.
          </p>
        </div>

        {/* FLAMES */}
        <div className="rounded-3xl border border-rose-900/40 bg-[#160618] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-2xl font-bold text-rose-100">
                The FLAMES Algorithm
              </h4>
              <span className="text-xs text-pink-400/80 font-medium">Friendship, Love, Affection, Marriage, Spark, Soulmates</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/80 font-light leading-relaxed">
            The celebrated relationship destiny algorithm that cross-cancels matching characters between both names, calculating the remaining character count through a circular modulo elimination ring. It indicates the primary experiential tone of the couple's bond.
          </p>
        </div>

        {/* Phonetic Acoustics */}
        <div className="rounded-3xl border border-rose-900/40 bg-[#160618] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Music2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-2xl font-bold text-rose-100">
                Phonetic & Acoustic Cadence
              </h4>
              <span className="text-xs text-purple-400/80 font-medium">Syllable Rhythms & Liquid Consonants</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-rose-200/80 font-light leading-relaxed">
            Names are spoken love words. Acoustic cadence evaluates vowel openness, syllable symmetry, liquid consonant flow (L, M, N, R), and vocal rhythm when two names are voiced in tandem. Names with harmonious cadences register as naturally affectionate to the human ear.
          </p>
        </div>
      </div>
    </div>
  );
};
