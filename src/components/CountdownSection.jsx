import { useEffect, useState } from 'react';
import { useCountdown } from '../controllers/useCountdown';
import { useScrollReveal } from '../controllers/useScrollReveal';
import { eventData } from '../models/eventData';

// ── SVG Arc Ring unit ─────────────────────────────────────────────────────────
function ArcUnit({ value, label, max, color, index, isVisible }) {
  const size = 130;
  const stroke = 5;
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const progress = Math.max(0, Math.min(1, value / max));
  const dash = circ * progress;
  const gap = circ - dash;

  const [animating, setAnimating] = useState(false);
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    if (value !== prev) {
      setAnimating(true);
      const t = setTimeout(() => { setPrev(value); setAnimating(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  // Dot position along arc
  const angle = progress * 2 * Math.PI - Math.PI / 2;
  const dotX = size / 2 + r * Math.cos(angle);
  const dotY = size / 2 + r * Math.sin(angle);

  return (
    <div
      className={`flex flex-col items-center gap-3 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="relative group" style={{ width: size, height: size }}>
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-15 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: color }}
        />
        {/* SVG */}
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          {/* Track */}
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke="rgba(139,92,246,0.10)" strokeWidth={stroke} />
          {/* Progress arc */}
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${dash} ${gap}`}
            style={{
              transition: 'stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)',
              filter: `drop-shadow(0 0 5px ${color})`,
            }}
          />
          {/* Inner ring */}
          <circle cx={size/2} cy={size/2} r={r - 12} fill="none"
            stroke={color} strokeWidth={0.5} strokeOpacity={0.12} />
        </svg>

        {/* Traveling dot */}
        {progress > 0.02 && (
          <div className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 8px ${color}, 0 0 16px ${color}60`,
              top: dotY - 5,
              left: dotX - 5,
              transition: 'top 0.6s cubic-bezier(0.4,0,0.2,1), left 0.6s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        )}

        {/* Center number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-3xl sm:text-4xl font-black text-white leading-none transition-all duration-200 ${
              animating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'
            }`}
            style={{ textShadow: `0 0 20px ${color}50` }}
          >
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

// ── Separator dots ────────────────────────────────────────────────────────────
function Sep({ isVisible, delay }) {
  return (
    <div
      className={`flex flex-col gap-2 mb-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: delay }}
    >
      <div className="w-1 h-1 rounded-full bg-purple-500/50 animate-pulse" />
      <div className="w-1 h-1 rounded-full bg-purple-500/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CountdownSection() {
  const { ref, isVisible } = useScrollReveal();
  const { timeLeft, isExpired } = useCountdown(eventData.dateISO);

  const units = [
    { value: timeLeft.days,    label: 'Days',    max: 365, color: '#a855f7' },
    { value: timeLeft.hours,   label: 'Hours',   max: 24,  color: '#8b5cf6' },
    { value: timeLeft.minutes, label: 'Minutes', max: 60,  color: '#7c3aed' },
    { value: timeLeft.seconds, label: 'Seconds', max: 60,  color: '#6d28d9' },
  ];

  return (
    <section className="relative py-28 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-900/12 blur-[100px]" />
      </div>

      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Countdown</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">Event Starts In</h2>
        <p className="text-gray-500 text-sm mb-14">
          {isExpired ? '🎉 The event is live!' : `Mark your calendar — ${eventData.date}`}
        </p>

        {/* Arc rings */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3 sm:gap-6">
              <ArcUnit {...unit} index={i} isVisible={isVisible} />
              {i < units.length - 1 && (
                <Sep isVisible={isVisible} delay={`${i * 0.12 + 0.06}s`} />
              )}
            </div>
          ))}
        </div>

        {/* Animated equalizer bars */}
        <div className="mt-14 flex items-end justify-center gap-[3px]">
          {Array.from({ length: 36 }, (_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 3,
                background: `linear-gradient(180deg, #a855f7, #6d28d9)`,
                animationName: 'eqBar',
                animationDuration: `${0.8 + (i % 5) * 0.15}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDirection: 'alternate',
                animationDelay: `${i * 0.035}s`,
                opacity: 0.55,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes eqBar {
            from { height: 4px; opacity: 0.25; }
            to   { height: 38px; opacity: 0.85; }
          }
        `}</style>
      </div>
    </section>
  );
}
