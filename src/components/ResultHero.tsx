import React, { useEffect, useState } from 'react';
import { Award, Bookmark, BookmarkCheck, Heart, RotateCcw, Share2, Sparkles } from 'lucide-react';
import { CompatibilityResult } from '../types/compatibility';
import { romanticAudio } from '../utils/audio';

interface ResultHeroProps {
  result: CompatibilityResult;
  onOpenCertificate: () => void;
  onSave: () => void;
  isSaved: boolean;
  onReset: () => void;
}

export const ResultHero: React.FC<ResultHeroProps> = ({
  result,
  onOpenCertificate,
  onSave,
  isSaved,
  onReset,
}) => {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const end = result.overallPercentage;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setDisplayedScore(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.overallPercentage]);

  const handleShare = async () => {
    romanticAudio.playSoftChime(659.25);
    const shareText = `✨ ${result.partner1Name} & ${result.partner2Name} have a ${result.overallPercentage}% Love Compatibility (${result.tier.title}) according to LoveMatch's algorithmic synastry engine!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `LoveMatch Compatibility: ${result.partner1Name} & ${result.partner2Name}`,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {
      // ignore
    }
  };

  // SVG Circular Gauge calculation
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayedScore / 100) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#1c0a1f] via-[#140616] to-[#0f0412] p-8 sm:p-12 shadow-2xl shadow-rose-950/40 backdrop-blur-xl">
        {/* Subtle decorative glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: result.tier.colorScheme.accent }}
        />

        {/* Unboxed Metadata Header (anti-pill compliant) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-rose-300/80 mb-6">
          <span>{result.tier.tierBadge}</span>
          <span aria-hidden="true" className="text-rose-600/60">·</span>
          <span>{result.relationshipStage || 'Romantic Sync'}</span>
          <span aria-hidden="true" className="text-rose-600/60">·</span>
          <span>Calculated {result.calculatedAt}</span>
        </div>

        {/* Central Names */}
        <h2 className="text-center font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal text-rose-100 tracking-tight mb-2">
          {result.partner1Name} <span className="font-serif italic text-rose-400 font-light">&</span> {result.partner2Name}
        </h2>

        {/* Archetype Motto */}
        <p className="text-center font-serif italic text-lg sm:text-xl text-amber-200/90 mb-8 max-w-xl mx-auto">
          "{result.archetype.motto}"
        </p>

        {/* Gauge & Score Visual Display */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative flex h-60 w-60 items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 220 220">
              {/* Background track circle */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                className="stroke-rose-950/60"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Dynamic Progress circle */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                className="transition-all duration-300 ease-out"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="url(#roseGradient)"
                fill="transparent"
              />
              <defs>
                <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Heart className="h-6 w-6 text-rose-400 fill-rose-500/20 mb-1 animate-pulse" />
              <div className="font-mono-numbers text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                {displayedScore}%
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-rose-300/80 mt-1">
                Compatibility
              </span>
            </div>
          </div>

          {/* Tier title banner */}
          <div className="text-center mt-3">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-rose-100 tracking-wide">
              {result.tier.title}
            </h3>
            <p className="text-sm text-rose-300/70 font-light mt-1 max-w-lg mx-auto">
              {result.tier.summary}
            </p>
          </div>
        </div>

        {/* Archetype Essence callout */}
        <div className="rounded-2xl border border-rose-900/40 bg-[#17061a]/60 p-5 sm:p-6 mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-wider text-amber-400/90 font-medium">
            Cosmic Archetype: {result.archetype.name}
          </span>
          <p className="text-sm text-rose-200/80 font-light mt-2 leading-relaxed">
            {result.archetype.essence}
          </p>
        </div>

        {/* Primary Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              romanticAudio.playSoftChime(659.25);
              onOpenCertificate();
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-950/60 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Award className="h-4 w-4" />
            <span>Generate Love Certificate</span>
          </button>

          <button
            onClick={() => {
              romanticAudio.playSoftChime(523.25);
              onSave();
            }}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all active:scale-95 whitespace-nowrap ${
              isSaved
                ? 'border-emerald-600/50 bg-emerald-950/30 text-emerald-300'
                : 'border-rose-900/60 bg-rose-950/30 text-rose-200 hover:border-rose-500/50 hover:bg-rose-900/30'
            }`}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4 text-emerald-400" /> : <Bookmark className="h-4 w-4" />}
            <span>{isSaved ? 'Pair Saved' : 'Save Pair'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-xl border border-rose-900/60 bg-rose-950/30 px-4 py-3 text-sm font-medium text-rose-200 hover:border-rose-500/50 hover:bg-rose-900/30 active:scale-95 transition-all whitespace-nowrap"
          >
            <Share2 className="h-4 w-4" />
            <span>{copiedShare ? 'Copied Link!' : 'Share Reading'}</span>
          </button>

          <button
            onClick={() => {
              romanticAudio.playSoftChime(440);
              onReset();
            }}
            className="flex items-center gap-2 rounded-xl border border-rose-900/40 bg-transparent px-4 py-3 text-sm font-medium text-rose-300/80 hover:text-rose-100 hover:bg-rose-950/20 active:scale-95 transition-all whitespace-nowrap"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Test Another</span>
          </button>
        </div>
      </div>
    </div>
  );
};
