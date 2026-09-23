import React, { useEffect, useRef } from 'react';

interface LoveConfettiProps {
  triggerKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  type: 'heart' | 'sparkle' | 'circle';
}

export const LoveConfetti: React.FC<LoveConfettiProps> = ({ triggerKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!triggerKey || triggerKey <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ['#fb7185', '#f43f5e', '#e11d48', '#fbcfe8', '#ffd700', '#f472b6'];

    // Spawn 75 celebratory particles
    for (let i = 0; i < 75; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height * 0.35 + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'circle',
      });
    }

    let animId: number;

    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      for (let j = 0; j < 4; j++) {
        c.lineTo(Math.cos((j * Math.PI) / 2) * size, Math.sin((j * Math.PI) / 2) * size);
        c.lineTo(
          Math.cos((j * Math.PI) / 2 + Math.PI / 4) * (size * 0.3),
          Math.sin((j * Math.PI) / 2 + Math.PI / 4) * (size * 0.3)
        );
      }
      c.closePath();
      c.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = 0;
      for (const p of particles) {
        if (p.alpha <= 0) continue;
        alive++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14; // gentle gravity
        p.vx *= 0.985;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.type === 'heart') {
          drawHeart(ctx, p.size);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (alive > 0) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
};
