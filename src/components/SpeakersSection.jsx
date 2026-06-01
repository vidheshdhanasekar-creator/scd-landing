import { useScrollReveal } from '../controllers/useScrollReveal';

function SpeakerPlaceholder({ index }) {
  const delay = index * 0.08;
  return (
    <div
      className="group relative rounded-2xl overflow-hidden glass border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 p-6 flex flex-col items-center text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Avatar placeholder */}
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-900/60 to-violet-900/60 border-2 border-purple-500/20 flex items-center justify-center group-hover:border-purple-500/50 transition-all duration-300">
          <svg className="w-8 h-8 text-purple-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping opacity-30" />
      </div>

      <div className="w-24 h-3 rounded-full bg-purple-900/40 mb-2" />
      <div className="w-16 h-2 rounded-full bg-purple-900/30" />
    </div>
  );
}

export default function SpeakersSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="speakers" className="relative py-24 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">Speakers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Meet the <span className="gradient-text">Speakers</span>
          </h2>
        </div>

        {/* TBA Banner */}
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#12082a] via-[#0d0520] to-[#12082a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-violet-900/20" />

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl border border-purple-500/20" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative py-20 px-8 text-center">
            {/* Placeholder speaker cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12 opacity-30">
              {Array.from({ length: 6 }).map((_, i) => (
                <SpeakerPlaceholder key={i} index={i} />
              ))}
            </div>

            {/* TBA message */}
            <div className="relative inline-block">
              <div className="absolute -inset-4 rounded-2xl bg-purple-600/10 blur-xl" />
              <div className="relative">
                <div className="text-6xl sm:text-8xl font-black text-white/10 mb-4 select-none">
                  SPEAKERS
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/30 to-violet-600/30 border border-purple-500/40 mb-4">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">
                        To Be Announced
                      </span>
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    </div>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                      We're curating an incredible lineup of AWS heroes, cloud architects, and industry leaders.
                      Stay tuned for the big reveal!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social follow CTA */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <p className="text-gray-400 text-sm">Follow us for speaker announcements</p>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/aws_sbg_smvec/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-purple border border-purple-500/30 text-purple-300 text-xs font-medium hover:text-white hover:border-purple-400 transition-all duration-300">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/aws-cloud-club-smvec1/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-purple border border-purple-500/30 text-purple-300 text-xs font-medium hover:text-white hover:border-purple-400 transition-all duration-300">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
