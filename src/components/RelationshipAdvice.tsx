import React from 'react';
import { CalendarHeart, CheckCircle2, Compass, HeartHandshake, Sparkles, MessageCircleHeart } from 'lucide-react';
import { CompatibilityResult } from '../types/compatibility';
import { PsychologicalFlagsCard } from './PsychologicalFlagsCard';
import { RelationshipTimeline } from './RelationshipTimeline';

interface RelationshipAdviceProps {
  result: CompatibilityResult;
  onOpenQuiz?: () => void;
}

export const RelationshipAdvice: React.FC<RelationshipAdviceProps> = ({ result, onOpenQuiz }) => {
  const { strengths, growthAdvice, dateNightIdeas, partner1Name, partner2Name, psychology } = result;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-12">
      {/* Psychological Superpowers & Growth Edges */}
      {psychology?.greenFlags && psychology?.growthEdges && (
        <PsychologicalFlagsCard
          greenFlags={psychology.greenFlags}
          growthEdges={psychology.growthEdges}
          partner1={partner1Name}
          partner2={partner2Name}
        />
      )}

      {/* Relationship Milestone Timeline */}
      {psychology?.timeline && (
        <RelationshipTimeline
          timeline={psychology.timeline}
          partner1={partner1Name}
          partner2={partner2Name}
        />
      )}

      {/* Strengths & Growth Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#190a1d] to-[#120516] p-6 sm:p-8 shadow-xl shadow-rose-950/20">
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-rose-900/30">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950/60 border border-emerald-900/40 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-2xl font-semibold text-rose-100">
                Core Relational Strengths
              </h4>
              <p className="text-xs text-rose-300/60 font-light">Natural superpowers of your union</p>
            </div>
          </div>

          <ul className="space-y-4">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-rose-200/90 font-light leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Opportunities */}
        <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#190a1d] to-[#120516] p-6 sm:p-8 shadow-xl shadow-rose-950/20">
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-rose-900/30">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-950/60 border border-rose-900/40 text-rose-400">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-2xl font-semibold text-rose-100">
                Nurturing Your Flame
              </h4>
              <p className="text-xs text-rose-300/60 font-light">Actionable wisdom for long-term bliss</p>
            </div>
          </div>

          <ul className="space-y-4">
            {growthAdvice.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-rose-200/90 font-light leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Love Languages Quiz Callout Banner */}
      {onOpenQuiz && (
        <div className="rounded-3xl border border-pink-600/40 bg-gradient-to-r from-[#210925] via-[#1a061d] to-[#140417] p-6 sm:p-8 shadow-xl shadow-rose-950/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
              <MessageCircleHeart className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-2xl font-bold text-rose-100">
                Discover Your 5 Love Languages
              </h4>
              <p className="text-xs sm:text-sm text-rose-300/75 font-light mt-0.5">
                Take the interactive psychological quiz designed for {partner1Name} and {partner2Name} to unlock deeper emotional harmony.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-rose-950/80 hover:from-rose-500 hover:to-pink-500 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Take Compatibility Quiz</span>
          </button>
        </div>
      )}

      {/* Curated Date Night Ideas */}
      <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#190a1d] to-[#120516] p-6 sm:p-10 shadow-xl shadow-rose-950/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
            <CalendarHeart className="h-3.5 w-3.5" />
            <span>Tailored Romantic Itineraries</span>
          </div>
          <h3 className="font-serif-luxury text-3xl font-semibold text-rose-100">
            Curated Date Nights for Your Archetype
          </h3>
          <p className="text-sm text-rose-300/70 max-w-lg mx-auto font-light mt-1">
            Carefully customized experiences designed to ignite your specific harmony profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dateNightIdeas.map((idea, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-rose-900/30 bg-[#1e0c24]/50 p-5 transition-all hover:border-rose-600/40 hover:bg-[#230e2b]/60"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-rose-400/80 mb-2 font-medium">
                  <span>Itinerary #{idx + 1}</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <h5 className="font-serif-luxury text-xl font-semibold text-rose-100 mb-2">
                  {idea.title}
                </h5>
                <p className="text-xs text-rose-200/80 font-light leading-relaxed mb-4">
                  {idea.description}
                </p>
              </div>

              <div className="pt-3 border-t border-rose-950/60 space-y-1">
                <div className="text-[11px] text-rose-300/70">
                  <strong className="text-rose-200 font-medium">Vibe:</strong> {idea.vibe}
                </div>
                <div className="text-[11px] text-rose-300/70">
                  <strong className="text-rose-200 font-medium">Timing:</strong> {idea.idealTiming}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
