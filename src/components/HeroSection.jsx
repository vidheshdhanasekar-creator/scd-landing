import { useEffect, useRef, useState } from 'react';
import { useHeroFade } from '../controllers/useParallax';
import { eventData } from '../models/eventData';

// ── Aurora + Skyline Canvas ───────────────────────────────────────────────────
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

    const loadImg = (src) => new Promise(res => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = src;
    });

    // Stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random() * 0.75,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.7 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Aurora waves
    const auroraWaves = [
      { hue: 270, amp: 0.06, freq: 0.8, phase: 0,    speed: 0.004, y: 0.25, alpha: 0.12 },
      { hue: 290, amp: 0.05, freq: 1.1, phase: 1.2,  speed: 0.006, y: 0.32, alpha: 0.09 },
      { hue: 250, amp: 0.07, freq: 0.6, phase: 2.4,  speed: 0.003, y: 0.20, alpha: 0.08 },
      { hue: 310, amp: 0.04, freq: 1.4, phase: 0.8,  speed: 0.007, y: 0.38, alpha: 0.07 },
    ];

    // Floating orbs
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: 0.1 + Math.random() * 0.8,
      y: 0.1 + Math.random() * 0.6,
      r: 60 + Math.random() * 120,
      hue: 255 + Math.random() * 70,
      alpha: 0.04 + Math.random() * 0.06,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0002,
      phase: Math.random() * Math.PI * 2,
    }));

    // AWS tags — edges only
    const tags = [
      { label: 'EC2',        side: 'left',  yFrac: 0.28, phase: 0.0 },
      { label: 'S3',         side: 'left',  yFrac: 0.46, phase: 1.4 },
      { label: 'DynamoDB',   side: 'left',  yFrac: 0.62, phase: 2.1 },
      { label: 'Lambda',     side: 'right', yFrac: 0.28, phase: 0.6 },
      { label: 'CloudFront', side: 'right', yFrac: 0.46, phase: 1.9 },
      { label: 'SageMaker',  side: 'right', yFrac: 0.62, phase: 0.3 },
    ].map(tag => ({ ...tag, alpha: 0, floatAmp: 6 + Math.random() * 5 }));

    const drawTag = (ctx, label, px, py, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `600 10px "Inter", sans-serif`;
      const tw = ctx.measureText(label).width + 18;
      const th = 22;
      ctx.fillStyle = 'rgba(88,28,200,0.22)';
      ctx.strokeStyle = 'rgba(139,92,246,0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(px - tw / 2, py - th / 2, tw, th, 11);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'rgba(216,180,254,0.92)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, px, py);
      // pulse dot
      ctx.beginPath();
      ctx.arc(px - tw / 2 + 7, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,${0.6 + 0.4 * Math.sin(t * 3 + py)})`;
      ctx.fill();
      ctx.restore();
    };

    Promise.all([
      loadImg('/sketch-7.jpg'),
      loadImg('/sketch-8.jpg'),
      loadImg('/sketch-9.jpg'),
    ]).then(imgs => {
      const wideImgs = imgs.filter(Boolean);

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
          const grad = ctx.createLinearGradient(0, wave.y * H - 60, 0, wave.y * H + 60);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(0.5, `hsla(${wave.hue},80%,60%,${wave.alpha})`);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(0, wave.y * H);
          for (let x = 0; x <= W; x += 4) {
            const y = wave.y * H + Math.sin(x / W * Math.PI * 2 * wave.freq + wave.phase) * wave.amp * H;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(W, wave.y * H + 80);
          ctx.lineTo(0, wave.y * H + 80);
          ctx.closePath();
          ctx.fill();
        });

        // ── Floating orbs ──
        orbs.forEach(orb => {
          orb.x += orb.vx;
          orb.y += orb.vy;
          if (orb.x < 0 || orb.x > 1) orb.vx *= -1;
          if (orb.y < 0 || orb.y > 0.8) orb.vy *= -1;
          const pulse = 0.7 + 0.3 * Math.sin(t * 0.8 + orb.phase);
          const g = ctx.createRadialGradient(orb.x * W, orb.y * H, 0, orb.x * W, orb.y * H, orb.r * pulse);
          g.addColorStop(0, `hsla(${orb.hue},70%,55%,${orb.alpha})`);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(orb.x * W, orb.y * H, orb.r * pulse, 0, Math.PI * 2);
          ctx.fill();
        });

        // ── Skyline strip (bottom 28%) ──
        if (wideImgs.length > 0) {
          const stripH = H * 0.28;
          const stripY = H - stripH;
          const drift = (t * 5) % W;

          ctx.save();
          ctx.beginPath();
          ctx.rect(0, stripY, W, stripH);
          ctx.clip();

          wideImgs.forEach((img, i) => {
            if (!img) return;
            const segW = W / wideImgs.length;
            const bx = i * segW - drift;
            ctx.globalAlpha = 0.20;
            ctx.drawImage(img, bx, stripY, segW + 1, stripH);
            ctx.drawImage(img, bx + W, stripY, segW + 1, stripH);
          });

          // Purple tint
          ctx.globalAlpha = 0.40;
          ctx.fillStyle = 'rgba(50,5,140,1)';
          ctx.fillRect(0, stripY, W, stripH);
          ctx.restore();

          // Fade top of strip
          const fadeGrad = ctx.createLinearGradient(0, stripY, 0, stripY + stripH * 0.6);
          fadeGrad.addColorStop(0, 'rgba(7,5,14,1)');
          fadeGrad.addColorStop(1, 'rgba(7,5,14,0)');
          ctx.fillStyle = fadeGrad;
          ctx.fillRect(0, stripY, W, stripH * 0.6);

          // Glowing horizon line
          const hGrad = ctx.createLinearGradient(0, 0, W, 0);
          hGrad.addColorStop(0, 'transparent');
          hGrad.addColorStop(0.1, 'rgba(139,92,246,0.6)');
          hGrad.addColorStop(0.5, 'rgba(192,132,252,0.9)');
          hGrad.addColorStop(0.9, 'rgba(139,92,246,0.6)');
          hGrad.addColorStop(1, 'transparent');
          ctx.strokeStyle = hGrad;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = 'rgba(139,92,246,0.8)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(0, stripY);
          ctx.lineTo(W, stripY);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // ── AWS tags ──
        const edgePad = 50;
        tags.forEach(tag => {
          tag.alpha += (0.22 - tag.alpha) * 0.007;
          const floatY = Math.sin(t * 0.85 + tag.phase) * tag.floatAmp;
          const px = tag.side === 'left' ? edgePad : W - edgePad;
          const py = tag.yFrac * H + floatY;
          if (tag.yFrac < 0.72) drawTag(ctx, tag.label, px, py, tag.alpha);
        });

        // ── Bottom hard fade ──
        const btmFade = ctx.createLinearGradient(0, H * 0.82, 0, H);
        btmFade.addColorStop(0, 'rgba(7,5,14,0)');
        btmFade.addColorStop(1, 'rgba(10,10,15,1)');
        ctx.fillStyle = btmFade;
        ctx.fillRect(0, H * 0.82, W, H * 0.18);

        animId = requestAnimationFrame(draw);
      };
      draw();
    });

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
        className="relative flex-1 flex flex-col items-center justify-start text-center px-6 pt-16 pb-4"
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
          className={`mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <span className="text-purple-400 font-bold tracking-[0.3em] text-sm sm:text-base">
            {eventData.hashtag}
          </span>
        </div>

        {/* ── Stats row ── */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <StatPill value="500+" label="Attendees" />
          <StatPill value="4" label="Tracks" />
          <StatPill value="1 Day" label="Event" />
          <StatPill value="Free" label="Entry" />
        </div>

        {/* ── CTA buttons ── */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.5s' }}
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

      {/* ── Venue bar ── */}
      <div className="relative w-full" style={{ zIndex: 2 }}>
        <div className="border-t border-purple-500/10" style={{ background: 'rgba(7,5,14,0.75)', backdropFilter: 'blur(20px)' }}>
          <div className="w-full px-4 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8">

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-purple-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] text-purple-400/50 font-bold uppercase tracking-widest">Date</div>
                <div className="text-white text-xs font-bold">{eventData.date}</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/8" />

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-purple-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] text-purple-400/50 font-bold uppercase tracking-widest">Venue</div>
                <div className="text-white text-xs font-bold">{eventData.venueFull}</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/8" />

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-purple-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] text-purple-400/50 font-bold uppercase tracking-widest">Location</div>
                <div className="text-white text-xs font-bold">{eventData.location}</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/8" />

            <div className="flex items-center gap-2.5">
              <img src="/aws.svg" alt="AWS" className="h-4 w-auto brightness-0 invert opacity-40" onError={e => e.target.style.display='none'} />
              <div className="w-px h-3.5 bg-white/10" />
              <img src="/awsugpdywhitebg.png" alt="AWS UG Puducherry" className="h-5 w-auto object-contain opacity-55" onError={e => e.target.style.display='none'} />
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
