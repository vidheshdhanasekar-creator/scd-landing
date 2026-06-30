import { useScrollReveal } from '../controllers/useScrollReveal';
import { eventData } from '../models/eventData';

const tiers = [
  { name: 'Title',    color: '#f59e0b', perks: ['Logo on all materials', 'Stage time', 'Booth space', 'Social shoutouts'] },
  { name: 'Gold',     color: '#a855f7', perks: ['Logo on banners', 'Social mentions', 'Booth space'] },
  { name: 'Silver',   color: '#6d28d9', perks: ['Logo on website', 'Social mentions'] },
  { name: 'Community',color: '#4f46e5', perks: ['Logo on website', 'Community recognition'] },
];

export default function SponsorshipCTA() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="sponsorship" className="relative py-24 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ border: '1px solid rgba(139,92,246,0.18)' }}
        >
          {/* ── Left: dark text panel ── */}
          <div className="relative p-10 sm:p-14 flex flex-col justify-center"
            style={{ background: 'linear-gradient(135deg, #0f0520 0%, #0a0a0f 100%)' }}>
            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(139,92,246,0.08)' }} />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start mb-6"
              style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.22)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-300 text-[10px] font-bold tracking-[0.2em] uppercase">Become a Sponsor</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Partner<br />
              <span style={{
                background: 'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>With Us</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Connect your brand with 500+ cloud builders, students, and professionals at SCD Puducherry 2026.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { v: '500+', l: 'Attendees' },
                { v: '4',    l: 'Tracks' },
                { v: '1 Day',l: 'Event' },
              ].map(s => (
                <div key={s.l} className="text-center py-3 rounded-xl"
                  style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.14)' }}>
                  <div className="text-white font-black text-lg leading-none">{s.v}</div>
                  <div className="text-gray-500 text-[10px] uppercase tracking-widest mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={eventData.sponsorshipDeckLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-white font-black text-sm self-start relative overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #6d28d9, #7c3aed)',
                boxShadow: '0 0 0 1px rgba(139,92,246,0.3), 0 8px 24px rgba(109,40,217,0.35)',
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }} />
              <svg className="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative">Download Sponsorship Deck</span>
              <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <p className="text-gray-600 text-xs mt-4">
              Contact:{' '}
              <a href={`mailto:${eventData.email}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                {eventData.email}
              </a>
            </p>
          </div>

          {/* ── Right: sponsorship tiers ── */}
          <div className="relative p-10 sm:p-14 flex flex-col justify-center gap-4"
            style={{ background: 'linear-gradient(135deg, #0d0520 0%, #0a0a0f 100%)', borderLeft: '1px solid rgba(139,92,246,0.12)' }}>
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-purple-400/60 mb-2">
              Sponsorship Tiers
            </div>

            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{
                  background: `${tier.color}08`,
                  border: `1px solid ${tier.color}20`,
                  transitionDelay: `${0.2 + i * 0.08}s`,
                }}
              >
                {/* Color dot */}
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ background: tier.color, boxShadow: `0 0 8px ${tier.color}60` }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white font-black text-sm">{tier.name} Sponsor</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${tier.color}18`, color: tier.color, border: `1px solid ${tier.color}30` }}>
                      {['Platinum', 'Gold', 'Silver', 'Bronze'][i]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tier.perks.map(p => (
                      <span key={p} className="text-[10px] text-gray-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full" style={{ background: tier.color }} />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
