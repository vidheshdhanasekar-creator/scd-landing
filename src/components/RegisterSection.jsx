import { useMemo, useState } from 'react';
import { useScrollReveal } from '../controllers/useScrollReveal';
import { eventData, agenda } from '../models/eventData';

// ── Stable barcode ────────────────────────────────────────────────────────────
function Barcode() {
  const bars = useMemo(() =>
    Array.from({ length: 36 }, () => ({
      w: Math.random() > 0.4 ? 3 : 2,
      h: Math.floor(20 + Math.random() * 24),
    })), []);
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 44 }}>
      {bars.map((b, i) => (
        <div key={i} className="bg-white/70 rounded-[1px]" style={{ width: b.w, height: b.h }} />
      ))}
    </div>
  );
}

// ── Holographic ticket ────────────────────────────────────────────────────────
function HoloTicket({ flipped, onFlip }) {
  return (
    <div
      className="relative cursor-pointer select-none w-[340px] h-[500px] lg:w-[680px] lg:h-[320px] transition-all duration-500"
      style={{ perspective: 1200 }}
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Holographic shimmer bg */}
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #1a0533 0%, #0f0320 40%, #1a0533 100%)',
            }}
          />
          {/* Holo rainbow sheen */}
          <div className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(135deg, #ff006620, #8b5cf640, #06b6d420, #a855f740, #ff006620)',
              backgroundSize: '400% 400%',
              animation: 'holoSheen 6s ease infinite',
            }}
          />
          {/* Top strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7, #c084fc, #a855f7, #7c3aed)' }}
          />
          {/* Diagonal light beam */}
          <div className="absolute -top-20 -left-20 w-40 h-[600px] opacity-[0.06]"
            style={{
              background: 'linear-gradient(90deg, transparent, white, transparent)',
              transform: 'rotate(25deg)',
              animation: 'beamSlide 4s ease-in-out infinite',
            }}
          />

          {/* Perforation Line (Vertical on Desktop, Horizontal on Mobile) */}
          <div className="absolute border-dashed border-purple-400/20 w-0 h-full border-l left-[440px] hidden lg:block" />
          <div className="absolute border-dashed border-purple-400/20 h-0 w-full border-t top-[320px] lg:hidden" />
          
          {/* Perforation Notches */}
          <div className="absolute w-7 h-7 rounded-full bg-[#0a0a0f] top-[306px] -left-[14px] lg:top-[-14px] lg:left-[426px]" />
          <div className="absolute w-7 h-7 rounded-full bg-[#0a0a0f] top-[306px] -right-[14px] lg:bottom-[-14px] lg:left-[426px]" />

          <div className="relative p-6 lg:p-7 h-full flex flex-col lg:flex-row justify-between">
            
            {/* Front Left / Main Ticket (Header & Details) */}
            <div className="flex flex-col lg:w-[400px] lg:h-full justify-between">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[9px] font-black tracking-[0.3em] text-purple-400/70 uppercase mb-2">
                    ✦ ADMIT ONE ✦
                  </div>
                  <div className="text-2xl lg:text-3xl font-black text-white leading-tight">Student</div>
                  <div className="text-2xl lg:text-3xl font-black leading-tight"
                    style={{ background: 'linear-gradient(135deg,#c084fc,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Community Day
                  </div>
                  <div className="text-xl font-black text-white/80 mt-0.5">2026</div>
                </div>
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-black/40 border border-purple-500/30 flex items-center justify-center p-2.5">
                    <img src="/aws.svg" alt="AWS" className="w-full h-full object-contain brightness-0 invert"
                      onError={e => { e.target.style.display='none'; }} />
                  </div>
                  <span className="text-[8px] text-purple-400/50 font-medium">Powered by</span>
                </div>
              </div>

              {/* Details (Date & Venue) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 mt-4 lg:mt-0">
                {[
                  { icon: '📅', label: 'Date', value: eventData.date, sub: '8:00 AM – 4:30 PM' },
                  { icon: '🏛️', label: 'Venue', value: eventData.venueFull, sub: eventData.location },
                ].map(item => (
                  <div key={item.label}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[9px] text-purple-400/60 font-bold uppercase tracking-widest">{item.label}</div>
                      <div className="text-white text-xs font-bold leading-tight truncate">{item.value}</div>
                      {item.sub && <div className="text-gray-500 text-[10px] truncate">{item.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Front Right / Stub (Ticket Details & Barcode) */}
            <div className="lg:w-[200px] lg:h-full flex flex-col justify-between pt-6 lg:pt-0">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center lg:items-start justify-between lg:flex-col gap-2">
                  <div>
                    <div className="text-[9px] text-purple-400 font-black tracking-widest">TICKET #SCD2026</div>
                    <div className="text-[9px] text-gray-600">meetup.com</div>
                  </div>
                  <div className="text-right lg:text-left">
                    <div className="text-[9px] text-gray-500">Organizer</div>
                    <div className="text-[9px] text-purple-300 font-bold">AWS SBG SMVEC</div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 flex justify-center lg:justify-start">
                  <Barcode />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0f0320 0%, #1a0533 100%)' }} />
          <div className="absolute top-0 left-0 right-0 h-1.5"
            style={{ background: 'linear-gradient(90deg, #6d28d9, #a855f7, #7c3aed)' }} />

          <div className="relative p-6 h-full flex flex-col lg:flex-row justify-between">
            
            {/* Back Left / Agenda Section */}
            <div className="flex flex-col lg:w-[400px] justify-between h-full">
              <div className="text-center lg:text-left mb-4 lg:mb-2">
                <div className="text-[9px] text-purple-400 font-black tracking-[0.3em] uppercase mb-1">Day Schedule</div>
                <div className="text-lg font-black text-white">Event Agenda</div>
                <div className="w-10 h-0.5 mx-auto lg:mx-0 mt-1.5"
                  style={{ background: 'linear-gradient(90deg,#7c3aed,#a855f7)' }} />
              </div>

              {/* Faded agenda + Mobile TBA overlay */}
              <div className="relative flex-1 overflow-hidden flex items-center">
                
                {/* Grid layout for agenda list */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 opacity-20 blur-[1px] select-none pointer-events-none w-full">
                  {agenda.map((item, i) => (
                    <div key={i}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-sm flex-shrink-0">{item.icon}</span>
                      <span className="text-purple-400 font-mono text-[9px] font-bold w-10 flex-shrink-0">{item.time}</span>
                      <span className="text-gray-300 text-[10px] leading-tight truncate">{item.title}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile TBA overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:hidden">
                  <div
                    className="text-white font-black tracking-[0.35em] uppercase select-none"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      fontSize: '1.1rem',
                      letterSpacing: '0.35em',
                      background: 'linear-gradient(180deg, #c084fc, #7c3aed, #c084fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      opacity: 0.9,
                    }}
                  >
                    To Be Announced
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center lg:text-left">
                <div className="text-[9px] text-gray-600">Click to flip back</div>
              </div>
            </div>

            {/* Back Right / Desktop TBA Panel */}
            <div className="hidden lg:flex w-[200px] h-full flex-col items-center justify-center text-center pl-4 border-l border-dashed border-purple-400/20">
              <div className="text-[10px] text-purple-400/50 font-bold uppercase tracking-widest mb-2">Agenda Status</div>
              <div
                className="text-white font-black tracking-[0.2em] uppercase select-none text-sm"
                style={{
                  background: 'linear-gradient(135deg, #c084fc, #7c3aed, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: 0.9,
                }}
              >
                To Be Announced
              </div>
              <div className="text-[9px] text-gray-500 mt-2 max-w-[150px] leading-normal">
                Full session speaker lineup & schedule coming soon!
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes holoSheen {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes beamSlide {
          0%,100% { transform: rotate(25deg) translateX(-80px); }
          50% { transform: rotate(25deg) translateX(650px); }
        }
      `}</style>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function RegisterSection() {
  const { ref, isVisible } = useScrollReveal();
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="register" className="relative py-28 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-purple-900/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4">

        {/* ── Header ── */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Registration Open</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
            Grab Your <span className="gradient-text">Ticket</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Secure your spot at the biggest student cloud community event in Pondicherry. Limited seats — register free today.
          </p>
        </div>

        {/* ── Main layout ── */}
        <div
          className={`flex flex-col items-center gap-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Ticket */}
          <div className="flex flex-col items-center gap-4">
            <HoloTicket flipped={flipped} onFlip={() => setFlipped(f => !f)} />
            <p className="text-xs text-gray-600 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-purple-500/40 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-purple-500" />
              </span>
              Click ticket to flip · see full agenda on back
            </p>
          </div>

          {/* ── Creative Register Button ── */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={eventData.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                boxShadow: '0 0 0 1px rgba(168,85,247,0.4), 0 8px 32px rgba(124,58,237,0.45)',
              }}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.10) 50%, transparent 80%)', animation: 'shimmerSweep 1.4s ease infinite' }} />
              {/* Glow */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: 'inset 0 0 20px rgba(192,132,252,0.2)' }} />

              <span className="relative text-xl">🎟️</span>
              <span className="relative text-base font-black tracking-wide">Register Now — It's Free</span>
              <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>


          </div>

          <style>{`
            @keyframes shimmerSweep {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
