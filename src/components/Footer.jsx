import { useState } from 'react';
import { eventData } from '../models/eventData';

// ── Code of Conduct Modal ─────────────────────────────────────────────────────
function CoCModal({ open, onClose }) {
  if (!open) return null;

  const sections = [
    {
      title: 'Importance',
      content: 'We firmly believe in the value and importance of an environment where all AWS community members feel welcome and safe. This Code of Conduct explains the behavior we expect from AWS community members interacting at AWS events and programs, and across AWS blogs, online forums, and social media platforms.',
    },
    {
      title: 'Behavior',
      items: [
        'You will behave in a way that facilitates a safe and supportive environment for all AWS event and program participants, and across AWS blogs, online forums, and social media platforms.',
        'You will not engage in disruptive speech or behavior or otherwise interfere with other individuals\' participation in AWS events and programs.',
        'You will not interfere with the operation of AWS events, programs, blogs, online forums, and social media platforms.',
        'You will not attempt to receive benefits that you are not entitled to at AWS events and programs.',
        'You will not engage in any form of harassing, offensive, discriminatory, or threatening speech or behavior, including but not limited to relating to race, gender, gender identity and expression, national origin, religion, disability, marital status, age, sexual orientation, military or veteran status, or other protected category.',
        'You will comply with the instructions of AWS event and program staff, and AWS blog, online forum, and social media platform moderators.',
        'You will comply with all applicable laws and, in the context of AWS events, all of our event-specific requirements (including all health and safety requirements).',
      ],
    },
    {
      title: 'Scope',
      content: 'We expect all AWS community members (including but not limited to attendees, vendors, sponsors, speakers, volunteers, moderators, and AWS employees) to uphold the principles of this Code of Conduct. In the context of AWS events, this Code of Conduct covers the main event and all related events (social or otherwise).',
    },
    {
      title: 'Consequences',
      content: 'If we believe you breached this Code of Conduct, we may prohibit you from attending future AWS events and programs and interacting across AWS blogs, online forums, and social media platforms, and we may remove any content you created in violation of this Code of Conduct. All determinations are at our sole discretion. We will involve law enforcement if we deem appropriate.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(160deg, #0f0520 0%, #0a0a0f 100%)',
          border: '1px solid rgba(139,92,246,0.25)',
          boxShadow: '0 0 80px rgba(109,40,217,0.25)',
        }}
      >
        {/* Top accent */}
        <div className="h-[2px] flex-shrink-0"
          style={{ background: 'linear-gradient(90deg, #6d28d9, #a855f7, #c084fc, #a855f7, #6d28d9)' }} />

        {/* Header */}
        <div className="flex items-start justify-between px-7 py-5 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.30)' }}>
              📋
            </div>
            <div>
              <div className="text-white font-black text-lg leading-tight">Code of Conduct</div>
              <div className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mt-0.5">
                AWS Student Builder Group · Last Updated: April 07, 2023
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-all duration-200 flex-shrink-0 ml-4"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >✕</button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          {sections.map((section, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #a855f7, #6d28d9)' }} />
                <h3 className="text-white font-black text-base">{section.title}</h3>
              </div>

              {section.content && (
                <p className="text-gray-400 text-sm leading-relaxed pl-3">{section.content}</p>
              )}

              {section.items && (
                <div className="space-y-2.5 pl-3">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
                        style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#a855f7' }}>
                        {j + 1}
                      </span>
                      <p className="text-gray-400 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Contact */}
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}>
            <div className="text-white font-black text-sm mb-2">Contact Us</div>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              If you witness or are subjected to inappropriate behavior at an AWS event or program, please promptly contact AWS at:
            </p>
            <a href="mailto:aws-events-security-concerns@amazon.com"
              className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors">
              aws-events-security-concerns@amazon.com
            </a>
            <div className="mt-1">
              <a href={`mailto:${eventData.email}`}
                className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors">
                {eventData.email}
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-white/5 flex-shrink-0 flex items-center justify-between">
          <span className="text-gray-600 text-xs">AWS Student Builder Group SMVEC</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

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
