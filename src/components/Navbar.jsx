import { useNavbar } from '../controllers/useNavbar';
import { navLinks, eventData } from '../models/eventData';

export default function Navbar() {
  const { scrolled, mobileOpen, toggleMobile, closeMobile, activeSection } = useNavbar();

  return (
    <>
      {/* ── Single full-width navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(7,5,14,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(139,92,246,0.12)' : 'none',
        }}
      >
        {/* Top accent line — always visible */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #7c3aed 30%, #a855f7 50%, #7c3aed 70%, transparent 100%)',
            opacity: scrolled ? 1 : 0.5,
            transition: 'opacity 0.5s',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <a href="#" onClick={closeMobile} className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative flex-shrink-0">
              <img
                src="/sbg.png"
                alt="SBG"
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                onError={e => e.target.style.display = 'none'}
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white font-black text-[13px] tracking-tight">Student Builder Group</span>
              <span className="text-purple-400 text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5">SMVEC · Puducherry</span>
            </div>
          </a>

          {/* ── Desktop nav links — centered ── */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.filter(l => !l.highlight).map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-250 group"
                  style={{ color: isActive ? '#e9d5ff' : '#9ca3af' }}
                >
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'rgba(139,92,246,0.08)' }} />
                  <span className="relative group-hover:text-white transition-colors duration-200">{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-purple-500" />
                  )}
                </a>
              );
            })}
          </div>

          {/* ── Right: CTA ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#register"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-black transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #a855f7 100%)',
                boxShadow: '0 0 0 1px rgba(168,85,247,0.35), 0 4px 20px rgba(109,40,217,0.4)',
              }}
            >
              {/* Shimmer sweep on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.12) 50%, transparent 75%)',
                  animation: 'ticketShimmer 1.3s ease infinite',
                }}
              />
              {/* Ticket SVG icon */}
              <svg className="relative w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span className="relative tracking-wide">Get Tickets</span>
              <style>{`
                @keyframes ticketShimmer {
                  0%   { transform: translateX(-100%); }
                  100% { transform: translateX(250%); }
                }
              `}</style>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMobile}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-[5px]"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <span className={`block w-4 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-4 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Venue info bar (on scroll) ── */}
      <div
        className="fixed left-0 right-0 z-40 transition-all duration-500"
        style={{
          top: scrolled ? 64 : 0,
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          background: 'rgba(7,5,14,0.80)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(139,92,246,0.08)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center justify-center gap-5 flex-wrap">
          <span className="text-[10px] text-gray-400 flex items-center gap-1.5">
            <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-semibold">{eventData.date}</span>
          </span>
          <span className="w-px h-3 bg-purple-500/20 hidden sm:block" />
          <span className="text-[10px] text-gray-400 flex items-center gap-1.5">
            <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="text-white font-semibold">{eventData.venueFull}</span>
            <span className="text-gray-600">·</span>
            <span>{eventData.location}</span>
          </span>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeMobile} />

        <div
          className={`absolute top-0 right-0 h-full w-[280px] flex flex-col transition-transform duration-400 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: 'linear-gradient(160deg,#100520,#0a0a0f)' }}
        >
          <div className="h-[2px] bg-gradient-to-r from-purple-600 via-violet-400 to-purple-600" />

          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <img src="/sbg.png" alt="SBG" className="h-7 w-auto" onError={e => e.target.style.display='none'} />
              <div>
                <div className="text-white font-black text-xs">Student Builder Group</div>
                <div className="text-purple-400 text-[9px] tracking-widest uppercase mt-0.5">SMVEC · Puducherry</div>
              </div>
            </div>
            <button onClick={closeMobile} className="w-7 h-7 rounded-lg bg-white/5 text-gray-400 hover:text-white text-xs flex items-center justify-center">✕</button>
          </div>

          <div className="mx-4 mt-3 px-3 py-2.5 rounded-xl text-xs" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.12)' }}>
            <div className="text-white font-semibold text-[11px]">{eventData.venueFull}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{eventData.date} · {eventData.location}</div>
          </div>

          <div className="flex flex-col gap-1 px-3 mt-3 flex-1">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/5"
                style={{
                  background: link.highlight ? 'linear-gradient(135deg,#6d28d9,#7c3aed)' : 'transparent',
                  color: link.highlight ? '#fff' : '#d1d5db',
                  transitionDelay: `${i * 25}ms`,
                }}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${link.highlight ? 'bg-white/80 animate-pulse' : 'bg-purple-500/40'}`} />
                {link.label}
              </a>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-white/5 text-[10px] text-gray-600 text-center">
            Organized by <span className="text-purple-400">{eventData.organizer}</span>
          </div>
        </div>
      </div>
    </>
  );
}
