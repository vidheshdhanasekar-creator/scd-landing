import { useState } from 'react';
import { eventData } from '../models/eventData';
import CoCModal from './CoCModal';

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();
  const [cocOpen, setCocOpen] = useState(false);

  return (
    <>
      <CoCModal open={cocOpen} onClose={() => setCocOpen(false)} />

      <footer id="conduct" className="relative border-t border-purple-500/10 py-10 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Top row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="/sbg.png" alt="SBG" className="h-8 w-auto object-contain" onError={e => e.target.style.display='none'} />
                <div>
                  <div className="text-white font-bold text-sm">Student Community Day</div>
                  <div className="text-purple-400 text-xs">Puducherry 2026</div>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                The premier student cloud community event in Pondicherry, bringing together builders, learners, and leaders.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: 'Get Tickets', href: '#register' },
                  { label: 'Conference Tracks', href: '#tracks' },
                  { label: 'Speakers', href: '#speakers' },
                  { label: 'Sponsors', href: '#sponsors' },
                  { label: 'Call for Speakers', href: '#call-for-speakers' },
                ].map(link => (
                  <a key={link.label} href={link.href}
                    className="block text-gray-400 text-xs hover:text-purple-300 transition-colors duration-200">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Contact</h4>
              <div className="space-y-2.5">
                <a href={`mailto:${eventData.email}`}
                  className="flex items-center gap-2 text-gray-400 text-xs hover:text-purple-300 transition-colors">
                  <svg className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {eventData.email}
                </a>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <svg className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {eventData.venueFull}, {eventData.location}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-purple-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs text-center sm:text-left">
              © {year} Student Community Day Puducherry. Organized by{' '}
              <span className="text-purple-400">{eventData.organizer}</span>.
            </p>

            <div className="flex items-center gap-3">

              {/* ── Code of Conduct Button ── */}
              <button
                onClick={() => setCocOpen(true)}
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
                  boxShadow: '0 0 0 1px rgba(139,92,246,0.3), 0 4px 16px rgba(109,40,217,0.3)',
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #6d28d9, #a855f7)' }} />
                <svg className="relative w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="relative">Code of Conduct</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
