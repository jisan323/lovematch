import React from 'react';
import { Calendar, Compass, Milestone, Sparkles, Heart } from 'lucide-react';
import { TimelineMilestone } from '../types/compatibility';

interface RelationshipTimelineProps {
  timeline: TimelineMilestone[];
  partner1: string;
  partner2: string;
}

export const RelationshipTimeline: React.FC<RelationshipTimelineProps> = ({
  timeline,
  partner1,
  partner2,
}) => {
  return (
    <div className="rounded-3xl border border-rose-900/40 bg-gradient-to-b from-[#18081c] via-[#120516] to-[#0d0312] p-6 sm:p-10 shadow-xl shadow-rose-950/20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
          <Milestone className="h-3.5 w-3.5" />
          <span>Synchronicity Roadmap</span>
        </div>
        <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-rose-100">
          Relationship Milestone Timeline
        </h3>
        <p className="text-xs sm:text-sm text-rose-300/70 font-light mt-2">
          A projected trajectory of deeper connection, emotional breakthroughs, and shared memories for {partner1} and {partner2}.
        </p>
      </div>

      <div className="relative border-l border-rose-900/50 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node Point */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-rose-500/40 bg-[#1e0722] text-rose-300 shadow-md group-hover:border-rose-400 group-hover:scale-110 transition-all">
              <Heart className="h-3.5 w-3.5 fill-rose-500/40 text-rose-400" />
            </div>

            <div className="rounded-2xl border border-rose-900/30 bg-[#1d0a23]/40 p-5 sm:p-6 transition-all hover:border-rose-600/40 hover:bg-[#240d2c]/60">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-rose-400">
                  {item.period}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300/80">
                  <Sparkles className="h-3 w-3" />
                  <span>Phase 0{idx + 1}</span>
                </div>
              </div>

              <h4 className="font-serif-luxury text-2xl font-semibold text-rose-100 mb-2">
                {item.milestoneTitle}
              </h4>

              <p className="text-xs sm:text-sm text-rose-200/80 font-light leading-relaxed mb-4">
                {item.essence}
              </p>

              <div className="flex items-start gap-2 pt-3 border-t border-rose-950/60 text-xs text-rose-300/80">
                <Compass className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-rose-200 font-medium">Recommended Anchor:</strong>{' '}
                  {item.recommendedAction}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
