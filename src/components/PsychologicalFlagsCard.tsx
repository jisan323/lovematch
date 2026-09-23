import React from 'react';
import { CheckCircle2, AlertCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import { GrowthEdgeItem } from '../types/compatibility';

interface PsychologicalFlagsCardProps {
  greenFlags: string[];
  growthEdges: GrowthEdgeItem[];
  partner1: string;
  partner2: string;
}

export const PsychologicalFlagsCard: React.FC<PsychologicalFlagsCardProps> = ({
  greenFlags,
  growthEdges,
  partner1,
  partner2,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Green Flags Card */}
      <div className="rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-[#091a13] via-[#081510] to-[#050e0a] p-6 sm:p-8 shadow-xl shadow-black/40">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-900/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-serif-luxury text-2xl font-bold text-emerald-100">
              Green Flags & Chemistry Boosters
            </h4>
            <p className="text-xs text-emerald-300/70 font-light">
              Intuitive superpowers that make this union feel like home
            </p>
          </div>
        </div>

        <ul className="space-y-4">
          {greenFlags.map((flag, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3.5 rounded-2xl border border-emerald-900/20 bg-emerald-950/20 p-4 transition-all hover:bg-emerald-950/30"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-emerald-100/90 font-light leading-relaxed">
                {flag}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Growth Edges Card */}
      <div className="rounded-3xl border border-amber-900/40 bg-gradient-to-b from-[#1c1208] via-[#160d05] to-[#0f0803] p-6 sm:p-8 shadow-xl shadow-black/40">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-900/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-serif-luxury text-2xl font-bold text-amber-100">
              Growth Edges & Playful Quirks
            </h4>
            <p className="text-xs text-amber-300/70 font-light">
              Lovable friction points and how to turn them into closer intimacy
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {growthEdges.map((edge, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-amber-900/20 bg-amber-950/20 p-4 space-y-2 transition-all hover:bg-amber-950/30"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                <span>{edge.quirk}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/85 font-light leading-relaxed pl-5 border-l border-amber-500/30">
                <strong className="font-medium text-amber-200">The Fix:</strong> {edge.remedy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
