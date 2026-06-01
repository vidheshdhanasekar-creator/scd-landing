import { eventData } from '../models/eventData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="conduct" className="relative border-t border-purple-500/10 py-12 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center glow-purple">
                <span className="text-white font-bold text-sm">ACD</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">AWS Community Day</div>
                <div className="text-purple-400 text-xs">Pondicherry 2026</div>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              The premier AWS community event in Pondicherry, bringing together cloud builders, learners, and leaders.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: 'Get Tickets', href: '#register' },
                { label: 'Conference Tracks', href: '#tracks' },
                { label: 'Speakers', href: '#speakers' },
                { label: 'Sponsors', href: '#sponsors' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-400 text-xs hover:text-purple-300 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & CoC */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${eventData.email}`}
                className="flex items-center gap-2 text-gray-400 text-xs hover:text-purple-300 transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {eventData.email}
              </a>

              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {eventData.venueFull}, {eventData.location}
              </div>

              {/* Code of Conduct */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    document.getElementById('coc-modal')?.classList.remove('hidden');
                  }}
                  className="text-purple-400 text-xs hover:text-purple-300 transition-colors underline underline-offset-2"
                >
                  Code of Conduct
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © {year} AWS Community Day Pondicherry. Organized by{' '}
            <span className="text-purple-400">{eventData.organizer}</span>.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-xs">Made with ☁️ & ❤️ in Pondicherry</span>
          </div>
        </div>
      </div>

      {/* Code of Conduct Modal */}
      <div
        id="coc-modal"
        className="hidden fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.classList.add('hidden');
          }
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="relative max-w-lg w-full glass-purple border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          <button
            onClick={() => document.getElementById('coc-modal')?.classList.add('hidden')}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>

          <h3 className="text-xl font-bold text-white mb-2">Code of Conduct</h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 mb-4" />

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            AWS Community Day Pondicherry is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, or technology choices.
          </p>

          <div className="space-y-2">
            {[
              'Be respectful and inclusive to all attendees',
              'No harassment, discrimination, or inappropriate behavior',
              'Respect speakers, organizers, and fellow attendees',
              'Follow AWS Community guidelines and values',
              'Report any violations to the organizing team',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-purple-500/20">
            <p className="text-xs text-gray-500">
              Violations can be reported to{' '}
              <a href={`mailto:${eventData.email}`} className="text-purple-400 hover:text-purple-300">
                {eventData.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
