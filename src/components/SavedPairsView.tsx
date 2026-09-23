import React from 'react';
import { Bookmark, Heart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { SavedCouple } from '../types/compatibility';
import { romanticAudio } from '../utils/audio';

interface SavedPairsViewProps {
  savedPairs: SavedCouple[];
  onSelectPair: (p1: string, p2: string) => void;
  onDeletePair: (id: string) => void;
  onClearAll: () => void;
  onNavigateToCalculator: () => void;
}

export const SavedPairsView: React.FC<SavedPairsViewProps> = ({
  savedPairs,
  onSelectPair,
  onDeletePair,
  onClearAll,
  onNavigateToCalculator,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-rose-900/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 mb-2">
            <Bookmark className="h-3 w-3 text-rose-400" />
            <span>Personal Synastry Vault</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-rose-100">
            Saved Couple Readings
          </h2>
        </div>

        {savedPairs.length > 0 && (
          <button
            onClick={() => {
              romanticAudio.playSoftChime(440);
              onClearAll();
            }}
            className="flex items-center gap-1.5 text-xs text-rose-400/80 hover:text-rose-200 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {savedPairs.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl border border-rose-900/30 bg-[#160618]/50">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-950/60 border border-rose-900/50 text-rose-400">
            <Heart className="h-6 w-6 text-rose-500" />
          </div>
          <h3 className="font-serif-luxury text-2xl text-rose-100 font-semibold mb-2">
            No Saved Couples Yet
          </h3>
          <p className="text-xs text-rose-300/70 max-w-sm mx-auto font-light mb-6">
            Calculate compatibility for your favorite pairings and click "Save Pair" to build your private relationship synastry archive.
          </p>
          <button
            onClick={() => {
              romanticAudio.playSoftChime(587.33);
              onNavigateToCalculator();
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-rose-950 hover:from-rose-500 hover:to-pink-500 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Calculate a Couple Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedPairs.map((pair) => (
            <div
              key={pair.id}
              className="flex flex-col justify-between rounded-2xl border border-rose-900/40 bg-gradient-to-b from-[#1a0a1e] to-[#120516] p-5 shadow-lg shadow-rose-950/20 hover:border-rose-600/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-rose-400/80 mb-2">
                  <span className="font-mono-numbers">{pair.timestamp}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePair(pair.id);
                    }}
                    title="Remove from saved"
                    className="text-rose-400/50 hover:text-rose-300 transition-colors p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-rose-100 group-hover:text-rose-300 transition-colors">
                  {pair.partner1Name} & {pair.partner2Name}
                </h3>
                <span className="text-xs text-amber-400 font-medium block mt-1">
                  {pair.tierTitle} · {pair.archetypeName}
                </span>
              </div>

              <div className="mt-5 pt-3 border-t border-rose-950 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono-numbers text-xl font-bold text-rose-300">
                  <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  <span>{pair.overallPercentage}%</span>
                </div>

                <button
                  onClick={() => {
                    romanticAudio.playSoftChime(659.25);
                    onSelectPair(pair.partner1Name, pair.partner2Name);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-white transition-colors"
                >
                  <span>Re-open</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
