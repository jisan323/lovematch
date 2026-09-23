import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { LoveForm } from './components/LoveForm';
import { CalculationAnimation } from './components/CalculationAnimation';
import { ResultHero } from './components/ResultHero';
import { DimensionalBreakdown } from './components/DimensionalBreakdown';
import { AlgorithmInspector } from './components/AlgorithmInspector';
import { RelationshipAdvice } from './components/RelationshipAdvice';
import { LoveCertificateModal } from './components/LoveCertificateModal';
import { FamousCouplesView } from './components/FamousCouplesView';
import { AlgorithmsGuideView } from './components/AlgorithmsGuideView';
import { SavedPairsView } from './components/SavedPairsView';
import { LoveConfetti } from './components/LoveConfetti';
import { CompatibilityResult, SavedCouple } from './types/compatibility';
import { calculateCompatibility } from './utils/algorithms';
import { romanticAudio } from './utils/audio';

const STORAGE_KEY = 'lovematch_saved_couples_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'algorithms' | 'famous' | 'history'>('calculator');
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentResult, setCurrentResult] = useState<CompatibilityResult | null>(null);
  const [pendingCalculation, setPendingCalculation] = useState<{
    name1: string;
    name2: string;
    options?: {
      relationshipStage?: string;
      partner1BirthDate?: string;
      partner2BirthDate?: string;
    };
  } | null>(null);

  const [confettiKey, setConfettiKey] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [savedPairs, setSavedPairs] = useState<SavedCouple[]>([]);

  // Load saved pairs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('amora_saved_couples_v1');
      if (stored) {
        setSavedPairs(JSON.parse(stored));
      }
    } catch {
      // localStorage may be disabled or empty
    }
  }, []);

  const savePairsToStorage = (updated: SavedCouple[]) => {
    setSavedPairs(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleStartAnalysis = (
    name1: string,
    name2: string,
    options?: {
      relationshipStage?: string;
      partner1BirthDate?: string;
      partner2BirthDate?: string;
    }
  ) => {
    setPendingCalculation({ name1, name2, options });
    setIsCalculating(true);
    setCurrentResult(null);
  };

  const handleAnimationComplete = () => {
    if (!pendingCalculation) return;

    const result = calculateCompatibility(
      pendingCalculation.name1,
      pendingCalculation.name2,
      pendingCalculation.options
    );

    setCurrentResult(result);
    setIsCalculating(false);
    setConfettiKey((prev) => prev + 1);
  };

  const handleSaveCurrent = () => {
    if (!currentResult) return;

    const exists = savedPairs.some(
      (p) =>
        (p.partner1Name.toLowerCase() === currentResult.partner1Name.toLowerCase() &&
          p.partner2Name.toLowerCase() === currentResult.partner2Name.toLowerCase()) ||
        (p.partner1Name.toLowerCase() === currentResult.partner2Name.toLowerCase() &&
          p.partner2Name.toLowerCase() === currentResult.partner1Name.toLowerCase())
    );

    if (exists) return;

    const newCouple: SavedCouple = {
      id: currentResult.id,
      partner1Name: currentResult.partner1Name,
      partner2Name: currentResult.partner2Name,
      overallPercentage: currentResult.overallPercentage,
      tierTitle: currentResult.tier.title,
      archetypeName: currentResult.archetype.name,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    };

    savePairsToStorage([newCouple, ...savedPairs]);
  };

  const handleDeleteSaved = (id: string) => {
    romanticAudio.playSoftChime(440);
    const filtered = savedPairs.filter((p) => p.id !== id);
    savePairsToStorage(filtered);
  };

  const handleClearAllSaved = () => {
    savePairsToStorage([]);
  };

  const handleSelectFamousCouple = (result: CompatibilityResult) => {
    setCurrentResult(result);
    setActiveTab('calculator');
    setConfettiKey((prev) => prev + 1);
  };

  const handleSelectSavedPair = (p1: string, p2: string) => {
    const comp = calculateCompatibility(p1, p2);
    setCurrentResult(comp);
    setActiveTab('calculator');
    setConfettiKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentResult(null);
    setIsCalculating(false);
    setPendingCalculation(null);
  };

  const isCurrentSaved = Boolean(
    currentResult &&
      savedPairs.some(
        (p) =>
          (p.partner1Name.toLowerCase() === currentResult.partner1Name.toLowerCase() &&
            p.partner2Name.toLowerCase() === currentResult.partner2Name.toLowerCase()) ||
          (p.partner1Name.toLowerCase() === currentResult.partner2Name.toLowerCase() &&
            p.partner2Name.toLowerCase() === currentResult.partner1Name.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-[#0d0510] text-[#fceef6] flex flex-col selection:bg-rose-500/30 selection:text-rose-200">
      {/* Particle celebration confetti */}
      <LoveConfetti triggerKey={confettiKey} />

      {/* Header complying with Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
        savedCount={savedPairs.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 py-8 md:py-12">
        {activeTab === 'calculator' && (
          <>
            {isCalculating && pendingCalculation ? (
              <CalculationAnimation
                name1={pendingCalculation.name1}
                name2={pendingCalculation.name2}
                onComplete={handleAnimationComplete}
              />
            ) : currentResult ? (
              <div className="space-y-10 animate-fadeIn">
                <ResultHero
                  result={currentResult}
                  onOpenCertificate={() => setShowCertificate(true)}
                  onSave={handleSaveCurrent}
                  isSaved={isCurrentSaved}
                  onReset={handleReset}
                />

                <DimensionalBreakdown
                  dimensions={currentResult.dimensions}
                  partner1={currentResult.partner1Name}
                  partner2={currentResult.partner2Name}
                />

                <AlgorithmInspector result={currentResult} />

                <RelationshipAdvice result={currentResult} />
              </div>
            ) : (
              <LoveForm onAnalyze={handleStartAnalysis} isLoading={isCalculating} />
            )}
          </>
        )}

        {activeTab === 'algorithms' && <AlgorithmsGuideView />}

        {activeTab === 'famous' && (
          <FamousCouplesView onSelectCouple={handleSelectFamousCouple} />
        )}

        {activeTab === 'history' && (
          <SavedPairsView
            savedPairs={savedPairs}
            onSelectPair={handleSelectSavedPair}
            onDeletePair={handleDeleteSaved}
            onClearAll={handleClearAllSaved}
            onNavigateToCalculator={() => {
              setActiveTab('calculator');
              handleReset();
            }}
          />
        )}
      </main>

      {/* Love Certificate Modal */}
      {showCertificate && currentResult && (
        <LoveCertificateModal
          result={currentResult}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Editorial Footer */}
      <footer className="mt-auto border-t border-rose-950/60 bg-gradient-to-b from-[#0d0510] via-[#09030b] to-[#060208] py-10 px-4 text-center">
        <div className="mx-auto max-w-4xl space-y-5">
          {/* Creator Signature with Live Heartbeat Animation */}
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-900/40 bg-[#160619]/70 px-5 py-2 shadow-lg shadow-black/50 backdrop-blur-md transition-all hover:border-rose-600/50 group">
            <span className="text-xs sm:text-sm font-medium text-rose-200/85">
              Crafted with
            </span>
            <span className="relative flex items-center justify-center mx-0.5">
              <Heart className="h-4.5 w-4.5 fill-rose-500 text-rose-500 animate-heartbeat drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-rose-200/85">
              by
            </span>
            <button
              onClick={() => romanticAudio.playSoftChime(659.25)}
              className="font-serif-luxury font-bold text-base sm:text-lg tracking-wide bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer focus:outline-none"
              title="Built with love by Jisan"
            >
              Jisan
            </button>
            <Sparkles className="h-3.5 w-3.5 text-amber-400 opacity-80 group-hover:rotate-12 transition-transform" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-rose-300/60">
            <span>Pythagorean Numerology</span>
            <span aria-hidden="true">·</span>
            <span>Chaldean Vibrational Vectors</span>
            <span aria-hidden="true">·</span>
            <span>FLAMES Matrix</span>
            <span aria-hidden="true">·</span>
            <span>Acoustic Phonetics</span>
          </div>

          <p className="text-[11px] text-rose-400/40 font-light">
            LoveMatch Algorithmic Compatibility System. For romantic inspiration, entertainment, and celebrating timeless connections.
          </p>
        </div>
      </footer>
    </div>
  );
}
