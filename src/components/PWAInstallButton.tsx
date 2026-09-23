import React, { useState } from 'react';
import { Download, Smartphone, X, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { translations, Language } from '../utils/translations';
import { romanticAudio } from '../utils/audio';

interface PWAInstallButtonProps {
  lang: Language;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ lang }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const t = translations[lang];

  // If already installed, hide
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = () => {
    romanticAudio.playSoftChime(659.25);
    install();
  };

  const handleIOSClick = () => {
    romanticAudio.playSoftChime(587.33);
    setShowIOSGuide(true);
  };

  if (isInstallable) {
    return (
      <button
        onClick={handleInstallClick}
        aria-label={t.installApp}
        className="flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-gradient-to-r from-rose-950/70 to-pink-950/60 px-3 py-1.5 text-xs font-medium text-rose-200 hover:border-rose-400 hover:bg-rose-900/50 hover:text-white transition-all cursor-pointer shadow-md shadow-black/30"
      >
        <Download className="h-3.5 w-3.5 text-rose-400 animate-bounce" />
        <span className="hidden sm:inline">{t.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={handleIOSClick}
          aria-label={t.installApp}
          className="flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-gradient-to-r from-rose-950/70 to-pink-950/60 px-3 py-1.5 text-xs font-medium text-rose-200 hover:border-rose-400 hover:bg-rose-900/50 hover:text-white transition-all cursor-pointer shadow-md shadow-black/30"
        >
          <Smartphone className="h-3.5 w-3.5 text-rose-400" />
          <span className="hidden sm:inline">{t.installApp}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-sm rounded-3xl border border-rose-900/60 bg-[#160618] p-6 shadow-2xl text-center">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-rose-400 hover:text-rose-100"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 mb-4">
                <Sparkles className="h-6 w-6 text-amber-400" />
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-rose-100">
                {t.pwaIOSGuideTitle}
              </h3>
              <p className="mt-2 text-xs text-rose-200/80 leading-relaxed font-light">
                {t.pwaIOSGuideDesc}
              </p>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-rose-900/50 border border-rose-800/60 py-2.5 text-xs font-semibold text-rose-100 hover:bg-rose-800/60 transition-colors"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
