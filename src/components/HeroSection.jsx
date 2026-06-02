import { useEffect, useRef, useState } from 'react';
import { useHeroFade } from '../controllers/useParallax';
import { eventData } from '../models/eventData';

// ── Aurora Canvas ─────────────────────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // Stars — spread full height
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.006,
    }));

    // Aurora waves — spread across full height
    const auroraWaves = [
      { hue: 270, amp: 0.08, freq: 0.7, phase: 0.0,  speed: 0.013, y: 0.18, alpha: 0.42 },
      { hue: 290, amp: 0.10, freq: 1.0, phase: 1.2,  speed: 0.017, y: 0.32, alpha: 0.35 },
      { hue: 260, amp: 0.09, freq: 0.6, phase: 2.4,  speed: 0.010, y: 0.48, alpha: 0.30 },
      { hue: 310, amp: 0.07, freq: 1.3, phase: 0.8,  speed: 0.019, y: 0.62, alpha: 0.28 },
      { hue: 280, amp: 0.11, freq: 0.9, phase: 3.1,  speed: 0.014, y: 0.75, alpha: 0.25 },
    ];

    // Floating orbs — more, spread full height
    const orbs = Array.from({ length: 10 }, () => ({
      x: 0.05 + Math.random() * 0.9,
      y: 0.05 + Math.random() * 0.9,
      r: 80 + Math.random() * 160,
      hue: 255 + Math.random() * 70,
      alpha: 0.14 + Math.random() * 0.16,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0003,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      t += 0.007;
      ctx.clearRect(0, 0, W, H);

      // ── Stars ──
      stars.forEach(s => {
        s.twinkle += s.speed;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,210,255,${a})`;
        ctx.fill();
      });

      // ── Aurora waves ──
      auroraWaves.forEach(wave => {
        wave.phase += wave.speed;
        const bandH = H * 0.18;
        const grad = ctx.createLinearGradient(0, wave.y * H - bandH, 0, wave.y * H + bandH);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `hsla(${wave.hue},85%,62%,${wave.alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, wave.y * H);
        for (let x = 0; x <= W; x += 4) {
          const y = wave.y * H + Math.sin(x / W * Math.PI * 2 * wave.freq + wave.phase) * wave.amp * H;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, wave.y * H + bandH);
        ctx.lineTo(0, wave.y * H + bandH);
        ctx.closePath();
        ctx.fill();
      });

      // ── Floating orbs ──
      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < 0 || orb.x > 1) orb.vx *= -1;
        if (orb.y < 0 || orb.y > 1) orb.vy *= -1;
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.8 + orb.phase);
        const g = ctx.createRadialGradient(orb.x * W, orb.y * H, 0, orb.x * W, orb.y * H, orb.r * pulse);
        g.addColorStop(0, `hsla(${orb.hue},70%,55%,${orb.alpha})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x * W, orb.y * H, orb.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Bottom fade ──
      const btmFade = ctx.createLinearGradient(0, H * 0.85, 0, H);
      btmFade.addColorStop(0, 'rgba(7,5,14,0)');
      btmFade.addColorStop(1, 'rgba(10,10,15,1)');
      ctx.fillStyle = btmFade;
      ctx.fillRect(0, H * 0.85, W, H * 0.15);

      animId = requestAnimationFrame(draw);
    };

    draw();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// ── Animated counter ──────────────────────────────────────────────────────────
function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center px-5 py-2.5 rounded-2xl bg-white/[0.04] border border-purple-500/15 backdrop-blur-sm">
      <span className="text-xl font-black gradient-text leading-none">{value}</span>
      <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mt-0.5">{label}</span>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const heroOpacity = useHeroFade();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden" style={{ zIndex: 1 }}>

      {/* Base */}
      <div className="absolute inset-0 bg-[#07050e]" />

      {/* Canvas */}
      <HeroCanvas />

      {/* ── Content ── */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20"
        style={{ zIndex: 2, opacity: heroOpacity }}
      >

        {/* ── AWS Logo ── */}
        <div
          className={`mb-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.15s' }}
        >
          <img
            src="/aws.svg"
            alt="AWS"
            className="h-24 w-auto object-contain brightness-0 invert mx-auto"
            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.4))' }}
            onError={e => e.target.style.display = 'none'}
          />
        </div>

        {/* ── Main title ── */}
        <div
          className={`mb-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <h1
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 6.5vw, 5.5rem)' }}
          >
            <span className="text-white">Student Community Day</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #e879f9 0%, #a855f7 50%, #6d28d9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Puducherry
            </span>
          </h1>
        </div>

        {/* ── Hashtag ── */}
        <div
          className={`mb-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <span className="text-purple-400 font-bold tracking-[0.3em] text-sm sm:text-base">
            {eventData.hashtag}
          </span>
        </div>

        {/* ── Date Wording ── */}
        <div
          className={`mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.35s' }}
        >
          <span 
            className="text-xs sm:text-sm font-black tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-fuchsia-400 drop-shadow-[0_2px_12px_rgba(168,85,247,0.45)] uppercase select-none"
          >
            25.july.2026
          </span>
        </div>

        {/* ── Stats row ── */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.45s' }}
        >
          <StatPill value="500+" label="Attendees" />
          <StatPill value="4" label="Tracks" />
          <StatPill value="1 Day" label="Event" />
          <StatPill value="Free" label="Entry" />
        </div>

        {/* ── CTA buttons ── */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.55s' }}
        >
          <a
            href={eventData.registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-7 py-3.5 rounded-full text-white font-bold text-sm overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
          >
            {/* Animated shine */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}
            />
            {/* Glow */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 30px rgba(139,92,246,0.6)' }} />
            <span className="relative flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
              Register Now — Free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          <a
            href="#tracks"
            className="group px-7 py-3.5 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-sm text-white/80 font-semibold text-sm hover:bg-white/[0.08] hover:text-white hover:border-purple-400/30 transition-all duration-300 hover:scale-105"
          >
            Explore Tracks
            <span className="ml-1.5 group-hover:translate-y-0.5 inline-block transition-transform">↓</span>
          </a>
        </div>

      </div>



    </section>
  );
}
