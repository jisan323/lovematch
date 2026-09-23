import React, { useEffect, useRef, useState } from 'react';
import { Download, Share2, X, Check, Award } from 'lucide-react';
import { CompatibilityResult } from '../types/compatibility';
import { downloadCertificate, renderCertificateToCanvas } from '../utils/certificate';
import { romanticAudio } from '../utils/audio';

interface LoveCertificateModalProps {
  result: CompatibilityResult;
  onClose: () => void;
}

export const LoveCertificateModal: React.FC<LoveCertificateModalProps> = ({
  result,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      renderCertificateToCanvas(canvasRef.current, result).then(() => {
        setIsRendered(true);
      });
    }
  }, [result]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    romanticAudio.playSoftChime(659.25);
    const filename = `LoveMatch-Certificate-${result.partner1Name}-${result.partner2Name}.png`;
    downloadCertificate(canvasRef.current, filename);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    romanticAudio.playSoftChime(587.33);

    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `LoveMatch-Certificate.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Love Certificate: ${result.partner1Name} & ${result.partner2Name}`,
            text: `Our compatibility is ${result.overallPercentage}%! Registered with LoveMatch.`,
          });
        } else {
          handleDownload();
        }
      });
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-rose-900/50 bg-[#160618] p-5 sm:p-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-900/40">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <h3 className="font-serif-luxury text-2xl font-bold text-rose-100">
              Official Love Certificate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-rose-300/70 hover:bg-rose-950 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Certificate Canvas Preview Area */}
        <div className="my-4 flex-1 overflow-auto rounded-2xl border border-rose-900/30 bg-[#0d030e] p-2 flex items-center justify-center shadow-inner">
          <canvas
            ref={canvasRef}
            className="max-h-[58vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-rose-900/40">
          <div className="text-xs text-rose-300/60 font-light hidden sm:block">
            High-resolution 1200×800 parchment seal with custom synastry archival code.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl border border-rose-900/60 bg-rose-950/40 px-4 py-2.5 text-xs font-semibold text-rose-200 hover:border-rose-500/50 hover:bg-rose-900/40 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Image</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-950/60 hover:from-rose-500 hover:to-pink-500 active:scale-95 transition-all"
            >
              {downloadSuccess ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Download PNG'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
