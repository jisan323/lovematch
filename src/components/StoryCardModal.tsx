import React, { useRef, useState } from 'react';
import { X, Download, Share2, Sparkles, Heart, Check, Palette } from 'lucide-react';
import { CompatibilityResult } from '../types/compatibility';
import { Language, translations } from '../utils/translations';
import { romanticAudio } from '../utils/audio';

interface StoryCardModalProps {
  result: CompatibilityResult;
  lang: Language;
  onClose: () => void;
}

type StoryTheme = 'midnight' | 'rosegold' | 'lavender';

export const StoryCardModal: React.FC<StoryCardModalProps> = ({
  result,
  lang,
  onClose,
}) => {
  const t = translations[lang];
  const [selectedTheme, setSelectedTheme] = useState<StoryTheme>('midnight');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const themePalettes = {
    midnight: {
      name: 'Midnight Velvet',
      bgTop: '#2b0924',
      bgMid: '#160419',
      bgBottom: '#0a020d',
      accent: '#f43f5e',
      accentGlow: 'rgba(244, 63, 94, 0.5)',
      cardBg: 'rgba(32, 10, 38, 0.7)',
      textPrimary: '#ffffff',
      textSecondary: '#fda4af',
    },
    rosegold: {
      name: 'Rose Gold & Champagne',
      bgTop: '#3b1828',
      bgMid: '#240d1a',
      bgBottom: '#14050e',
      accent: '#fb7185',
      accentGlow: 'rgba(251, 113, 133, 0.5)',
      cardBg: 'rgba(48, 18, 35, 0.7)',
      textPrimary: '#ffffff',
      textSecondary: '#fed7aa',
    },
    lavender: {
      name: 'Lavender Dream',
      bgTop: '#281347',
      bgMid: '#170a2c',
      bgBottom: '#0c051a',
      accent: '#c084fc',
      accentGlow: 'rgba(192, 132, 252, 0.5)',
      cardBg: 'rgba(35, 16, 62, 0.7)',
      textPrimary: '#ffffff',
      textSecondary: '#e9d5ff',
    },
  };

  const currentPalette = themePalettes[selectedTheme];

  // Primary Ship Name
  const topShipName = result.psychology?.coupleNicknames?.[0]?.blend || `${result.partner1Name.slice(0, 3)}${result.partner2Name.slice(-3)}`;

  // Generate 1080x1920 high resolution canvas and download
  const handleDownloadImage = async () => {
    setIsGenerating(true);
    romanticAudio.playSoftChime(783.99);

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    const pal = currentPalette;

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
    bgGrad.addColorStop(0, pal.bgTop);
    bgGrad.addColorStop(0.5, pal.bgMid);
    bgGrad.addColorStop(1, pal.bgBottom);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Celestial Dust & Glow Circles
    ctx.save();
    const radialGlow = ctx.createRadialGradient(540, 700, 100, 540, 700, 500);
    radialGlow.addColorStop(0, pal.accentGlow);
    radialGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 200, 1080, 1000);
    ctx.restore();

    // Decorative Stars
    ctx.fillStyle = '#fde047';
    const stars = [
      { x: 180, y: 220, r: 3, a: 0.8 },
      { x: 900, y: 260, r: 2.5, a: 0.7 },
      { x: 120, y: 800, r: 2, a: 0.6 },
      { x: 960, y: 950, r: 3.5, a: 0.8 },
      { x: 200, y: 1500, r: 2.5, a: 0.7 },
      { x: 880, y: 1650, r: 3, a: 0.8 },
    ];
    stars.forEach((s) => {
      ctx.globalAlpha = s.a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // 3. Top Branding Header
    ctx.textAlign = 'center';
    ctx.font = '600 24px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = pal.accent;
    ctx.letterSpacing = '6px';
    ctx.fillText('LOVE MATCH • SYNASTRY REPORT', 540, 180);

    // Decorative thin line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(340, 210);
    ctx.lineTo(740, 210);
    ctx.stroke();

    // 4. Couple Names
    ctx.font = 'italic 700 78px Georgia, serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = pal.accentGlow;
    ctx.shadowBlur = 25;
    const coupleText = `${result.partner1Name} & ${result.partner2Name}`;
    ctx.fillText(coupleText, 540, 330);
    ctx.shadowBlur = 0;

    // Ship Name Tagline
    ctx.font = '500 28px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = pal.textSecondary;
    ctx.fillText(`“${topShipName}”`, 540, 390);

    // 5. Huge Glowing Circular Score Gauge (Center)
    const centerX = 540;
    const centerY = 660;
    const radius = 170;

    // Background track
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 14;
    ctx.stroke();

    // Progress arc
    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * result.overallPercentage) / 100;
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = pal.accent;
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.shadowColor = pal.accentGlow;
    ctx.shadowBlur = 30;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Score Number inside circle
    ctx.font = 'bold 120px Georgia, serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${result.overallPercentage}%`, 540, 680);

    ctx.font = '600 24px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = pal.textSecondary;
    ctx.letterSpacing = '3px';
    ctx.fillText(result.tier.title.toUpperCase(), 540, 740);

    // 6. Archetype Card Box
    ctx.fillStyle = pal.cardBg;
    ctx.roundRect(140, 890, 800, 160, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = '600 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = pal.accent;
    ctx.fillText('RELATIONAL ARCHETYPE', 540, 940);

    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(result.archetype.name, 540, 990);

    ctx.font = 'italic 400 22px Georgia, serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(`"${result.archetype.motto}"`, 540, 1030);

    // 7. Green Flags Superpowers Box
    ctx.fillStyle = pal.cardBg;
    ctx.roundRect(140, 1090, 800, 320, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = '600 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('★ CORE RELATIONAL SUPERPOWERS ★', 540, 1145);

    const flags = result.psychology?.greenFlags || result.strengths || [];
    const flag1 = flags[0] || 'Unconscious Decompression & Mutual Safe Harbor';
    const flag2 = flags[1] || 'Complementary Pacing & Telepathic Banter';

    ctx.textAlign = 'left';
    ctx.font = '400 24px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';

    // Word wrap helper
    const drawWrapped = (text: string, x: number, y: number, maxWidth: number) => {
      const words = text.split(' ');
      let line = '';
      let curY = y;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, curY);
          line = words[n] + ' ';
          curY += 34;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, curY);
      return curY;
    };

    ctx.fillText('✔', 180, 1205);
    drawWrapped(flag1, 220, 1205, 680);

    ctx.fillText('✔', 180, 1300);
    drawWrapped(flag2, 220, 1300, 680);

    // 8. Dimensional Mini Spectrum Bars
    ctx.textAlign = 'center';
    const dimY = 1460;
    const dims = [
      { label: 'Passion', val: result.dimensions.passion },
      { label: 'Emotional', val: result.dimensions.emotional },
      { label: 'Stability', val: result.dimensions.stability },
    ];

    dims.forEach((d, idx) => {
      const barX = 200 + idx * 240;
      ctx.font = '500 20px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = pal.textSecondary;
      ctx.fillText(d.label, barX + 60, dimY);

      // Track
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.roundRect(barX, dimY + 12, 120, 8, 4);
      ctx.fill();

      // Progress
      ctx.fillStyle = pal.accent;
      ctx.roundRect(barX, dimY + 12, (120 * d.val) / 100, 8, 4);
      ctx.fill();

      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${d.val}%`, barX + 60, dimY + 45);
    });

    // 9. Bottom Footer & Official Watermark
    ctx.textAlign = 'center';
    ctx.font = '500 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(`Calculated on ${result.calculatedAt}`, 540, 1720);

    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('lovematchs.vercel.app', 540, 1770);

    // Convert to Blob & download
    canvas.toBlob((blob) => {
      if (!blob) {
        setIsGenerating(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lovematch-story-${result.partner1Name.toLowerCase()}-${result.partner2Name.toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setIsGenerating(false);
    }, 'image/png');
  };

  // Web Share API to directly share image to Instagram Stories / WhatsApp
  const handleShareStory = async () => {
    romanticAudio.playSoftChime(659.25);
    const shareUrl = `${window.location.origin}${window.location.pathname}?p1=${encodeURIComponent(result.partner1Name)}&p2=${encodeURIComponent(result.partner2Name)}`;
    const shareTitle = `${result.partner1Name} & ${result.partner2Name} Love Compatibility (${result.overallPercentage}%)`;
    const shareText = `Check out our 9:16 compatibility report on LoveMatch! ${result.partner1Name} & ${result.partner2Name} scored ${result.overallPercentage}% (${result.archetype.name}).`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border border-rose-900/50 bg-[#120516] p-5 sm:p-7 shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{t.storyModalTitle}</span>
          </div>
          <p className="text-xs text-rose-300/70 font-light">
            {t.storyModalSub}
          </p>
        </div>

        {/* Theme Palette Chooser */}
        <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-rose-900/30">
          <Palette className="h-3.5 w-3.5 text-rose-400/80 mr-1" />
          <span className="text-[11px] text-rose-300/70 mr-2">{t.storyTheme}:</span>
          {(['midnight', 'rosegold', 'lavender'] as StoryTheme[]).map((theme) => {
            const isSelected = selectedTheme === theme;
            return (
              <button
                key={theme}
                onClick={() => {
                  setSelectedTheme(theme);
                  romanticAudio.playSoftChime(523.25);
                }}
                className={`rounded-xl px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/40'
                }`}
              >
                {theme === 'midnight' ? 'Midnight' : theme === 'rosegold' ? 'Rose Gold' : 'Lavender'}
              </button>
            );
          })}
        </div>

        {/* 9:16 Visual Card Preview Container */}
        <div className="mx-auto w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] rounded-3xl overflow-hidden border border-rose-500/40 p-5 flex flex-col justify-between text-center relative shadow-2xl transition-all duration-300"
          style={{
            background: `radial-gradient(circle at 50% 10%, ${currentPalette.bgTop} 0%, ${currentPalette.bgMid} 60%, ${currentPalette.bgBottom} 100%)`,
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-36 w-36 rounded-full blur-2xl opacity-40"
            style={{ backgroundColor: currentPalette.accent }}
          />

          {/* Card Top */}
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-rose-300/80 mb-2">
              LOVE MATCH • SYNASTRY REPORT
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white tracking-wide leading-tight">
              {result.partner1Name} & {result.partner2Name}
            </h3>
            <div className="text-[11px] text-amber-300 font-medium mt-0.5">
              “{topShipName}”
            </div>
          </div>

          {/* Card Center: Circular Score Gauge */}
          <div className="my-auto py-2">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-rose-500/30 bg-rose-950/40 shadow-inner">
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-rose-400 border-r-rose-400"
                style={{ filter: `drop-shadow(0 0 10px ${currentPalette.accent})` }}
              />
              <div className="text-center">
                <span className="font-serif-luxury text-3xl font-extrabold text-white">
                  {result.overallPercentage}%
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-wider text-rose-300/90">
                  {result.tier.title}
                </span>
              </div>
            </div>

            {/* Archetype Badge */}
            <div className="mt-3 rounded-xl bg-black/40 border border-white/10 py-1.5 px-2">
              <span className="text-[9px] uppercase tracking-wider text-rose-400 block font-semibold">
                {result.archetype.name}
              </span>
              <span className="text-[10px] text-rose-100/90 italic font-serif-luxury">
                &ldquo;{result.archetype.motto}&rdquo;
              </span>
            </div>
          </div>

          {/* Card Bottom: Green Flags & Watermark */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="text-left text-[10px] text-emerald-200/90 space-y-1">
              <div className="flex items-center gap-1 truncate">
                <span className="text-emerald-400">✔</span>
                <span className="truncate">{result.psychology?.greenFlags?.[0] || result.strengths[0]}</span>
              </div>
              <div className="flex items-center gap-1 truncate">
                <span className="text-emerald-400">✔</span>
                <span className="truncate">{result.psychology?.greenFlags?.[1] || result.strengths[1]}</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-rose-300/70 tracking-wider">
              lovematchs.vercel.app
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-rose-950/80 hover:from-rose-500 hover:to-pink-500 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{isGenerating ? t.generatingImage : t.downloadStoryBtn}</span>
          </button>

          <button
            onClick={handleShareStory}
            className="flex items-center justify-center gap-2 rounded-xl border border-rose-800/60 bg-rose-950/40 px-4 py-3 text-xs font-semibold text-rose-200 hover:bg-rose-900/40 transition-all cursor-pointer active:scale-95"
          >
            {hasCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
            <span>{hasCopied ? t.shareLinkCopied : t.shareStoryBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
