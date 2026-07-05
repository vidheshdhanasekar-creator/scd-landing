import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useNavbar } from '../controllers/useNavbar';
import { navLinks, eventData } from '../models/eventData';
import CoCModal from './CoCModal';

/* ── Coming Soon Modal ──────────────────────────────────────────────────── */
function BadgeComingSoonModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(5,0,15,0.80)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-5 text-center"
        style={{
          background: 'linear-gradient(145deg,#0e0420,#130830)',
          border: '1px solid rgba(168,85,247,0.35)',
          boxShadow: '0 0 60px rgba(139,92,246,0.25), 0 24px 60px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(168,85,247,0.2))', border: '1px solid rgba(168,85,247,0.4)' }}
        >
          <Sparkles className="w-8 h-8 text-purple-400" />
        </div>

        {/* Text */}
        <div>
          <p className="text-purple-400 text-xs tracking-[0.25em] uppercase font-semibold mb-2">
            Coming Soon
          </p>
          <h2 className="text-white font-black text-2xl mb-3">
            Badge Generator
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We're putting the finishing touches on your personalised attendee badge.
            It'll be live shortly — stay tuned! ☁️✨
          </p>
        </div>

        {/* Countdown hint */}
        <div
          className="w-full rounded-xl px-4 py-3 text-xs text-purple-300 font-medium"
          style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}
        >
          🗓 Event · 25th July 2026 · SMVEC, Puducherry
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { scrolled, mobileOpen, toggleMobile, closeMobile, activeSection } = useNavbar();
  const [cocOpen,    setCocOpen]    = useState(false);
  const [badgeOpen,  setBadgeOpen]  = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navItems = navLinks.filter(l => !l.highlight);

  return (
    <>
      <CoCModal open={cocOpen} onClose={() => setCocOpen(false)} />
      <BadgeComingSoonModal open={badgeOpen} onClose={() => setBadgeOpen(false)} />

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          paddingTop: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}
      >
        {/* Inner container stays full width and does not shrink or morph */}
        <div
          className="mx-auto w-full transition-all duration-500 relative"
          style={{
            maxWidth: '100%',
            background: scrolled ? 'rgba(8, 4, 18, 0.90)' : 'rgba(8, 4, 18, 0.65)',
            backdropFilter: 'blur(20px) saturate(160%)',
            borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
            borderRadius: '0px',
            boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          {/* Animated top line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden">
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #6d28d9 20%, #a855f7 50%, #6d28d9 80%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'navShimmer 3s linear infinite',
              }}
            />
          </div>

          <div className="px-6 h-[68px] flex items-center justify-between">
            {/* Logo with pulsating color glow */}
            <a href="#" onClick={closeMobile} className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-md transition-all duration-700 ${
                  scrolled ? 'bg-purple-600/35 scale-110 animate-pulse' : 'bg-purple-600/20 group-hover:bg-purple-600/40'
                }`} />
                <img src="/sbg.png" alt="SBG" className="relative h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={e => e.target.style.display = 'none'} />
              </div>
              <div className="hidden lg:flex flex-col leading-none">
                <span className="text-white font-black text-[13px] tracking-tight group-hover:text-purple-200 transition-colors duration-300">Student Builder Group</span>
                <span className="text-purple-400/70 text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5">SMVEC · Puducherry</span>
              </div>
            </a>

            {/* Desktop nav — pill container */}
            <div
              className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl transition-all duration-500"
              style={{
                background: scrolled ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.03)',
                border: scrolled ? '1px solid rgba(139,92,246,0.14)' : '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {navItems.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                const isHov = hoveredLink === link.label;

                const inner = (
                  <>
                    {/* Hover bg */}
                    <span
                      className="absolute inset-0 rounded-xl transition-all duration-300"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(109,40,217,0.35), rgba(139,92,246,0.20))'
                          : isHov ? 'rgba(139,92,246,0.12)' : 'transparent',
                        border: isActive ? '1px solid rgba(139,92,246,0.30)' : '1px solid transparent',
                      }}
                    />
                    <span
                      className="relative text-xs font-semibold tracking-wide transition-colors duration-300"
                      style={{ color: isActive ? '#e9d5ff' : isHov ? '#d8b4fe' : '#9ca3af' }}
                    >
                      {link.label}
                    </span>
                    {/* Active dot */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                    )}
                  </>
                );

                return link.isCoC ? (
                  <button
                    key={link.label}
                    onClick={() => setCocOpen(true)}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-3.5 py-2 rounded-xl flex items-center"
                  >
                    {inner}
                  </button>
                ) : link.isBadge ? (
                  <button
                    key={link.label}
                    onClick={() => setBadgeOpen(true)}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-3.5 py-2 rounded-xl flex items-center"
                  >
                    {inner}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-3.5 py-2 rounded-xl flex items-center"
                  >
                    {inner}
                  </a>
                );
              })}
            </div>

            {/* Right CTA */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="#register"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-black transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #5b21b6, #7c3aed, #a855f7)',
                  boxShadow: hoveredLink === 'cta' ? '0 0 0 2px rgba(168,85,247,0.5), 0 8px 30px rgba(168,85,247,0.6)' : '0 0 0 1px rgba(168,85,247,0.3), 0 4px 20px rgba(109,40,217,0.35)',
                }}
                onMouseEnter={() => setHoveredLink('cta')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.10) 50%, transparent 80%)', animation: 'shimmerBtn 1.4s ease infinite' }} />
                <svg className="relative w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span className="relative tracking-wider">Get Tickets</span>
              </a>

              {/* Hamburger */}
              <button onClick={toggleMobile} aria-label="Toggle menu"
                className="lg:hidden w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-[5px] transition-all duration-300"
                style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.18)' }}>
                <span className={`block w-4 h-[1.5px] bg-white/80 rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`block w-4 h-[1.5px] bg-white/80 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-4 h-[1.5px] bg-white/80 rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </button>
            </div>
          </div>

          <style>{`
            @keyframes navShimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            @keyframes shimmerBtn {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(250%); }
            }
          `}</style>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeMobile} />
        <div
          className={`absolute top-0 right-0 h-full w-72 flex flex-col transition-transform duration-400 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: 'linear-gradient(160deg,#0e0420,#080814)', borderLeft: '1px solid rgba(139,92,246,0.12)' }}
        >
          <div className="h-[1.5px]" style={{ background: 'linear-gradient(90deg,transparent,#a855f7,transparent)' }} />
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <img src="/sbg.png" alt="SBG" className="h-7 w-auto" onError={e => e.target.style.display = 'none'} />
              <div>
                <div className="text-white font-black text-xs">Student Builder Group</div>
                <div className="text-purple-400/70 text-[9px] tracking-widest uppercase mt-0.5">SMVEC · Puducherry</div>
              </div>
            </div>
            <button onClick={closeMobile} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>✕</button>
          </div>

          <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.12)' }}>
            <div className="text-white font-semibold text-[11px]">{eventData.venueFull}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{eventData.date} · {eventData.location}</div>
          </div>

          <div className="flex flex-col gap-1 px-3 mt-4 flex-1">
            {navLinks.map((link, i) => (
              link.isCoC ? (
                <button key={link.label} onClick={() => { closeMobile(); setCocOpen(true); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 w-full text-left transition-all duration-200"
                  style={{ color: '#9ca3af', transitionDelay: `${i * 30}ms` }}>
                  <span className="w-1 h-1 rounded-full bg-purple-500/50" />{link.label}
                </button>
              ) : link.isBadge ? (
                <button key={link.label}
                  onClick={() => { closeMobile(); setBadgeOpen(true); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left"
                  style={{ color: '#9ca3af', transitionDelay: `${i * 30}ms` }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500/50" />{link.label}
                </button>
              ) : (
                <a key={link.label} href={link.href} onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: link.highlight ? 'linear-gradient(135deg,#5b21b6,#7c3aed)' : 'transparent',
                    color: link.highlight ? '#fff' : '#9ca3af',
                    transitionDelay: `${i * 30}ms`,
                  }}
                  onMouseEnter={e => !link.highlight && (e.currentTarget.style.background = 'rgba(139,92,246,0.08)')}
                  onMouseLeave={e => !link.highlight && (e.currentTarget.style.background = 'transparent')}
                >
                  <span className={`w-1 h-1 rounded-full ${link.highlight ? 'bg-white/70 animate-pulse' : 'bg-purple-500/50'}`} />
                  {link.label}
                </a>
              )
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
