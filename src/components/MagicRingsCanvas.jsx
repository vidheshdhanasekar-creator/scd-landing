import { useEffect, useRef } from 'react';

export default function MagicRingsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let rings = [];
    let particles = [];
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initRings = () => {
      rings = [];
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < 6; i++) {
        rings.push({
          cx,
          cy,
          r: 60 + i * 55,
          speed: (i % 2 === 0 ? 1 : -1) * (0.003 + i * 0.001),
          angle: Math.random() * Math.PI * 2,
          dotCount: 8 + i * 4,
          hue: 260 + i * 15,
          alpha: 0.15 - i * 0.015,
          dotSize: 2 - i * 0.15,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      rings.forEach((ring) => {
        ring.angle += ring.speed;

        // Ring circle
        ctx.beginPath();
        ctx.arc(ring.cx, ring.cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${ring.hue}, 70%, 60%, ${ring.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Dots on ring
        for (let d = 0; d < ring.dotCount; d++) {
          const a = ring.angle + (d / ring.dotCount) * Math.PI * 2;
          const x = ring.cx + Math.cos(a) * ring.r;
          const y = ring.cy + Math.sin(a) * ring.r;
          const pulse = 0.5 + 0.5 * Math.sin(t * 3 + d);

          ctx.beginPath();
          ctx.arc(x, y, ring.dotSize * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${ring.hue + d * 5}, 80%, 70%, ${0.6 * pulse})`;
          ctx.fill();
        }
      });

      // Floating particles
      if (Math.random() < 0.1) {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 300 + 50;
        particles.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
          decay: Math.random() * 0.01 + 0.005,
          r: Math.random() * 2 + 0.5,
          hue: 260 + Math.random() * 60,
        });
      }

      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.life})`;
        ctx.fill();
      });

      // Center glow
      const glow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 80
      );
      glow.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    resize();
    initRings();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      initRings();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}
