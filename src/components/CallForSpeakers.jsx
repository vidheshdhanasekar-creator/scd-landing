import { useScrollReveal } from '../controllers/useScrollReveal';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeQnEUclL0txE7lsB8pupnog0HVcGj5vMNExvwgdYjdP9DrHQ/viewform?usp=publish-editor';

export default function CallForSpeakers() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="call-for-speakers" className="relative py-20 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="max-w-3xl mx-auto px-4 text-center" ref={ref}>
        <div
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.22)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-purple-300 text-[10px] font-bold tracking-[0.2em] uppercase">Applications Open</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Call for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Speakers
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Got an AWS story to share? We're looking for speakers for <span className="text-white font-semibold">SCD Puducherry 2026</span>.
            Lightning talks, deep dives, workshops — all levels welcome.
          </p>

          {/* Quick tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['Cloud', 'AI/ML', 'Serverless', 'DevOps', 'Security', 'Student Projects'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.20)', color: '#c4b5fd' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-black text-sm relative overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #6d28d9, #7c3aed)',
              boxShadow: '0 0 0 1px rgba(139,92,246,0.3), 0 8px 24px rgba(109,40,217,0.35)',
            }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }} />
            <svg className="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="relative">Apply to Speak</span>
            <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          <p className="text-gray-600 text-xs mt-3">Open until slots are filled · All experience levels welcome</p>
        </div>
      </div>
    </section>
  );
}
