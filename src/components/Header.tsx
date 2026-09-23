import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Compass, Bookmark, Flame } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface HeaderProps {
  activeTab: 'calculator' | 'algorithms' | 'famous' | 'history';
  setActiveTab: (tab: 'calculator' | 'algorithms' | 'famous' | 'history') => void;
  onReset: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  savedCount,
}) => {
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    romanticAudio.setMuted(next);
    if (!next) {
      romanticAudio.playSoftChime(659.25);
    }
  };

  const navItems = [
    {
      id: 'calculator' as const,
      label: 'Love Calculator',
      shortLabel: 'Calculator',
      icon: Heart,
    },
    {
      id: 'algorithms' as const,
      label: 'Algorithms',
      shortLabel: 'Algorithms',
      icon: Compass,
    },
    {
      id: 'famous' as const,
      label: 'Famous Pairs',
      shortLabel: 'Famous',
      icon: Flame,
    },
    {
      id: 'history' as const,
      label: 'Saved Pairs',
      shortLabel: 'Saved',
      icon: Bookmark,
      count: savedCount,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-900/30 bg-[#0d0510]/85 backdrop-blur-xl transition-all shadow-lg shadow-black/40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single text element Brand Title with luxury glow */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-lg p-1 transition-transform active:scale-95"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600/30 via-pink-500/20 to-amber-400/20 border border-rose-500/30 shadow-inner group-hover:border-rose-400/60 transition-all">
            <Heart className="h-4.5 w-4.5 fill-rose-500 text-rose-500 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 rounded-xl bg-rose-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-2xl font-bold tracking-wider text-rose-100 transition-colors group-hover:text-rose-300">
              LoveMatch
            </span>
          </div>
        </button>

        {/* Zone 2: Refined Luxury Segmented Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-rose-900/40 bg-[#160719]/80 p-1.5 shadow-inner backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  romanticAudio.playSoftChime(587.33);
                  setActiveTab(item.id);
                }}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600/90 via-pink-600/90 to-rose-700/90 text-white shadow-md shadow-rose-950/60'
                    : 'text-rose-300/75 hover:bg-rose-950/40 hover:text-rose-100'
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 transition-transform ${
                    isActive ? 'fill-white/20 text-white' : 'text-rose-400/80 group-hover:scale-110'
                  }`}
                />
                <span>{item.label}</span>
                {typeof item.count === 'number' && item.count > 0 && (
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-mono-numbers font-bold ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Mute + Primary CTA) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Unmute celestial chimes' : 'Mute sound effects'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-900/50 bg-[#17061a]/60 text-rose-300/80 hover:border-rose-700/60 hover:bg-rose-900/30 hover:text-rose-100 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-rose-400 active:scale-95"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            onClick={() => {
              onReset();
              setActiveTab('calculator');
              romanticAudio.playSoftChime(659.25);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-rose-950/80 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>New Reading</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation bar - Refined floating-style row */}
      <div className="flex md:hidden items-center justify-around border-t border-rose-950/50 bg-[#120415]/95 px-2 py-2 backdrop-blur-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                romanticAudio.playSoftChime(587.33);
                setActiveTab(item.id);
              }}
              className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all active:scale-90 ${
                isActive
                  ? 'bg-rose-500/15 text-rose-200 font-semibold'
                  : 'text-rose-400/60 hover:text-rose-200'
              }`}
            >
              <div className="relative">
                <Icon className={`h-4 w-4 ${isActive ? 'text-rose-400 fill-rose-500/30' : ''}`} />
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 h-3.5 w-3.5 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight">{item.shortLabel}</span>
              {isActive && (
                <div className="h-0.5 w-4 rounded-full bg-rose-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
