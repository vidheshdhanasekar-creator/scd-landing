import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../controllers/useScrollReveal';

// ── Orb burst canvas ─────────────────────────────────────────────────────────
function OrbBurstCanvas({ triggered }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!triggered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let orbs = [];
    let rings = [];
    let t = 0;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Burst orbs
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      orbs.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 5 + 2,
        alpha: 1,
        hue: 260 + Math.random() * 80,
        trail: [],
      });
    }

    // Expanding rings
    for (let i = 0; i < 3; i++) {
      rings.push({ r: 0, maxR: 120 + i * 80, alpha: 0.6, speed: 3 + i * 1.5, hue: 270 + i * 20 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      // Expanding rings
      rings.forEach((ring) => {
        if (ring.r < ring.maxR) {
          ring.r += ring.speed;
          ring.alpha = 0.6 * (1 - ring.r / ring.maxR);
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${ring.hue}, 80%, 65%, ${ring.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Center flash
      if (t < 30) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100 * (t / 30));
        glow.addColorStop(0, `rgba(167, 139, 250, ${0.8 * (1 - t / 30)})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 100 * (t / 30), 0, Math.PI * 2);
        ctx.fill();
      }

      // Orbs
      orbs = orbs.filter((o) => o.alpha > 0.02);
      orbs.forEach((o) => {
        o.trail.push({ x: o.x, y: o.y });
        if (o.trail.length > 10) o.trail.shift();
        o.x += o.vx;
        o.y += o.vy;
        o.vx *= 0.96;
        o.vy *= 0.96;
        o.alpha -= 0.01;

        o.trail.forEach((pt, i) => {
          const ta = (i / o.trail.length) * o.alpha * 0.6;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, o.r * (i / o.trail.length) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${o.hue}, 80%, 70%, ${ta})`;
          ctx.fill();
        });

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 2.5);
        grad.addColorStop(0, `hsla(${o.hue}, 90%, 85%, ${o.alpha})`);
        grad.addColorStop(1, `hsla(${o.hue}, 70%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      if (orbs.length > 0 || t < 90) {
        animId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [triggered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

// ── Sponsor card with real image ─────────────────────────────────────────────
function SponsorLogoCard({ name, abbr, logo, bgColor, size = 'md' }) {
  const [imgError, setImgError] = useState(false);
  const isAws = logo?.includes('aws.svg') || logo?.includes('aws-logo') || logo?.includes('aws-white') || logo?.includes('aws-light');

  const sizeClasses = { lg: 'w-52 h-28', md: 'w-44 h-24', sm: 'w-36 h-20' };
  const imgSizes   = { lg: 'h-14',       md: 'h-10',       sm: 'h-8' };

  return (
    <div
      className={`flex-shrink-0 ${sizeClasses[size]} rounded-2xl flex flex-col items-center justify-center gap-2 mx-3 group cursor-default transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
      style={{
        background: bgColor || 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {!imgError ? (
        <img
          src={logo}
          alt={name}
          className={`${imgSizes[size]} w-auto object-contain transition-all duration-300 group-hover:scale-105 ${isAws ? 'brightness-0 invert' : 'brightness-110'}`}
          style={{ maxWidth: '80%' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-white font-black text-lg">{abbr}</span>
      )}
      <span className="text-[10px] text-gray-400/70 font-medium text-center px-3 leading-tight">{name}</span>
    </div>
  );
}

// ── Tier card (big featured card) ────────────────────────────────────────────
function TierLogoItem({ item }) {
  const [imgErr, setImgErr] = useState(false);
  const isAws = item.logo?.includes('aws.svg') || item.logo?.includes('aws-logo') || item.logo?.includes('aws-white') || item.logo?.includes('aws-light');
  return (
    <div
      className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 py-5 px-4 transition-all duration-300 hover:scale-[1.02]"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {!imgErr ? (
        <img
          src={item.logo}
          alt={item.name}
          className={`h-12 w-auto object-contain ${isAws ? 'brightness-0 invert' : 'brightness-110'}`}
          style={{ maxWidth: '160px' }}
          onError={() => setImgErr(true)}
        />
      ) : (
        <div className="flex flex-col items-center gap-1 text-center px-2">
          <span className="text-white font-black text-lg leading-tight">{item.abbr}</span>
          <span className="text-gray-500 text-[10px] leading-tight">{item.name}</span>
        </div>
      )}
      <span className="text-gray-400 text-xs font-medium text-center">{item.name}</span>
    </div>
  );
}

function TierCard({ tier, emoji, color, items, delay, isVisible }) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: delay }}
    >
      {/* Card bg */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}12 0%, rgba(10,10,15,0.95) 100%)` }} />
      <div className="absolute inset-0 rounded-3xl" style={{ border: `1px solid ${color}25` }} />
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      {/* Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl" style={{ background: color, opacity: 0.08 }} />

      <div className="relative p-6 flex flex-col items-center text-center gap-4">
        {/* Tier label */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color }}>{tier}</span>
        </div>

        {/* Logo(s) */}
        {items.map((item) => (
          <TierLogoItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

// ── Marquee row ───────────────────────────────────────────────────────────────
const marqueeItems = [
  { name: 'Amazon Web Services', abbr: 'AWS',   logo: '/aws.svg',             bgColor: 'rgba(245,158,11,0.08)' },
  { name: 'AWS UG Puducherry',   abbr: 'AWSUG', logo: '/awsugpdywhitebg.png', bgColor: 'rgba(139,92,246,0.08)' },
  { name: 'SMVEC',               abbr: 'SMVEC', logo: '/smvec-logo.png',       bgColor: 'rgba(59,130,246,0.08)' },
  { name: 'Amazon Web Services', abbr: 'AWS',   logo: '/aws.svg',             bgColor: 'rgba(245,158,11,0.08)' },
  { name: 'AWS UG Puducherry',   abbr: 'AWSUG', logo: '/awsugpdywhitebg.png', bgColor: 'rgba(139,92,246,0.08)' },
  { name: 'SMVEC',               abbr: 'SMVEC', logo: '/smvec-logo.png',       bgColor: 'rgba(59,130,246,0.08)' },
];

// ── Main section ─────────────────────────────────────────────────────────────
export default function SponsorsSection() {
  const { ref, isVisible } = useScrollReveal();
  const [orbTriggered, setOrbTriggered] = useState(false);

  useEffect(() => {
    if (isVisible && !orbTriggered) {
      const t = setTimeout(() => setOrbTriggered(true), 300);
      return () => clearTimeout(t);
    }
  }, [isVisible, orbTriggered]);

  const tiers = [
    {
      tier: 'Cloud Partner',
      emoji: '☁️',
      color: '#f59e0b',
      items: [{ name: 'Amazon Web Services', abbr: 'AWS', logo: '/aws.svg' }],
    },
    {
      tier: 'Venue Partner',
      emoji: '🏛️',
      color: '#3b82f6',
      items: [{ name: 'Sri Manakula Vinayagar Engineering College', abbr: 'SMVEC', logo: '/smvec-logo.png' }],
    },
    {
      tier: 'Community Partner',
      emoji: '🤝',
      color: '#8b5cf6',
      items: [{ name: 'AWS UG Puducherry', abbr: 'AWSUG', logo: '/awsugpdywhitebg.png' }],
    },
  ];

  return (
    <section id="sponsors" className="relative py-28 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-900/8 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Sponsors & Partners</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
            Our <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Proudly supported by the organizations that power the cloud community.
          </p>
        </div>

        {/* ── Dual-row marquee ── */}
        <div
          className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-center text-[10px] text-gray-600 mb-5 tracking-[0.3em] uppercase font-semibold">Our Community</p>

          {/* Row 1 → left to right */}
          <div className="overflow-hidden mb-3" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex" style={{ animation: 'scrollLeft 28s linear infinite', width: 'max-content' }}>
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((s, i) => (
                <SponsorLogoCard key={i} {...s} size="md" />
              ))}
            </div>
          </div>

          {/* Row 2 ← right to left */}
          <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex" style={{ animation: 'scrollRight 28s linear infinite', width: 'max-content' }}>
              {[...marqueeItems.slice().reverse(), ...marqueeItems.slice().reverse(), ...marqueeItems.slice().reverse()].map((s, i) => (
                <SponsorLogoCard key={i} {...s} size="md" />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scrollLeft {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          @keyframes scrollRight {
            0%   { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
