import { CompatibilityResult } from '../types/compatibility';

export function renderCertificateToCanvas(
  canvas: HTMLCanvasElement,
  result: CompatibilityResult
): Promise<void> {
  return new Promise((resolve) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve();

    // High resolution canvas (1200 x 800)
    canvas.width = 1200;
    canvas.height = 800;

    // 1. Background gradient (rich dark velvet rose & midnight amethyst)
    const bgGrad = ctx.createRadialGradient(600, 400, 50, 600, 400, 750);
    bgGrad.addColorStop(0, '#1c0a1a');
    bgGrad.addColorStop(0.6, '#120512');
    bgGrad.addColorStop(1, '#080209');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // Subtle star dust speckles
    ctx.fillStyle = 'rgba(255, 230, 245, 0.15)';
    for (let i = 0; i < 60; i++) {
      const sx = (i * 197) % 1200;
      const sy = (i * 283) % 800;
      const sr = (i % 3) * 0.8 + 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Ornate Golden Borders
    ctx.save();
    ctx.strokeStyle = '#d4af37'; // Classic Gold
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, 1128, 728);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(46, 46, 1108, 708);
    ctx.strokeRect(52, 52, 1096, 696);

    // Decorative corner flourishes
    const drawCorner = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.8;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(35, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 35);

      ctx.moveTo(10, 10);
      ctx.arc(10, 10, 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(24, 24, 12, Math.PI, 1.5 * Math.PI, false);
      ctx.stroke();

      ctx.restore();
    };

    drawCorner(56, 56, 0);
    drawCorner(1144, 56, Math.PI / 2);
    drawCorner(1144, 744, Math.PI);
    drawCorner(56, 744, -Math.PI / 2);
    ctx.restore();

    // 3. Top Header
    ctx.save();
    ctx.fillStyle = 'rgba(244, 114, 182, 0.85)';
    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('LOVEMATCH ARCHIVES OF SYNASTRY', 600, 115);

    // Main Title
    ctx.fillStyle = '#fce7f3';
    ctx.font = '600 38px "Cormorant Garamond", serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('CERTIFICATE OF HARMONIC COMPATIBILITY', 600, 165);

    // Subtitle
    ctx.fillStyle = '#e2b36b'; // Muted Gold
    ctx.font = 'italic 16px "Cormorant Garamond", serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('By sacred decree of Pythagorean resonance, Chaldean vibrational vectors & phonetic melody', 600, 195);

    // Elegant divider line
    const divGrad = ctx.createLinearGradient(350, 0, 850, 0);
    divGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
    divGrad.addColorStop(0.5, '#d4af37');
    divGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(350, 220);
    ctx.lineTo(850, 220);
    ctx.stroke();

    // 4. Couple Names
    ctx.fillStyle = 'rgba(255, 230, 245, 0.7)';
    ctx.font = '400 14px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('THIS CERTIFIES THE ENDURING AFFINITY BETWEEN', 600, 265);

    // Primary Names Highlight
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px "Cormorant Garamond", serif';
    ctx.letterSpacing = '2px';
    const namesString = `${result.partner1Name}   &   ${result.partner2Name}`;
    ctx.fillText(namesString, 600, 325);

    // Golden Seal in the Center/Bottom
    const sealX = 600;
    const sealY = 460;
    const sealRadius = 80;

    // Glowing seal circle
    const sealGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, sealRadius);
    sealGrad.addColorStop(0, '#531938');
    sealGrad.addColorStop(0.7, '#2f0821');
    sealGrad.addColorStop(1, '#1b0314');
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Inner dashed circle
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius - 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Percentage inside seal
    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 42px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${result.overallPercentage}%`, sealX, sealY + 12);

    ctx.fillStyle = '#e2b36b';
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('SYNASTRY SCORE', sealX, sealY + 34);

    // 5. Tier & Archetype below seal
    ctx.fillStyle = '#fce7f3';
    ctx.font = '600 24px "Cormorant Garamond", serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(`${result.tier.title}  —  "${result.archetype.name}"`, 600, 580);

    ctx.fillStyle = 'rgba(244, 215, 235, 0.75)';
    ctx.font = 'italic 15px "Cormorant Garamond", serif';
    ctx.fillText(`"${result.archetype.motto}"`, 600, 608);

    // Metric dimensions ribbon
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 215, 0, 0.85)';
    const dims = `Passion: ${result.dimensions.passion}%  ·  Emotion: ${result.dimensions.emotional}%  ·  Stability: ${result.dimensions.stability}%  ·  Intellect: ${result.dimensions.intellect}%`;
    ctx.fillText(dims, 600, 642);

    // 6. Signatures and Date Bottom Bar
    ctx.font = '400 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'left';
    ctx.fillText(`ISSUED: ${result.calculatedAt.toUpperCase()}`, 110, 715);

    ctx.textAlign = 'right';
    ctx.fillText('OFFICIALLY REGISTERED · CODE: LOVEMATCH-SYNASTRY', 1090, 715);

    ctx.restore();
    resolve();
  });
}

// Download canvas as high quality PNG file
export function downloadCertificate(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
