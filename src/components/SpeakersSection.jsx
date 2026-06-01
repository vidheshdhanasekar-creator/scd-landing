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
                {['Twitter', 'LinkedIn', 'Instagram'].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 rounded-full glass-purple border border-purple-500/30 text-purple-300 text-xs font-medium hover:text-white hover:border-purple-400 transition-all duration-300"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
