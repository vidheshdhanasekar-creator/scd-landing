import { useScrollReveal } from '../controllers/useScrollReveal';

const speakers = [
  {
    name: 'Mr. Midhun NS',
    role: 'Lead Cloud Security @ HID Global',
    tags: ['AWS Community Builder', 'Tech Speaker'],
    talk: 'The Rise of DevOps Agents: Automating Cloud Operations on AWS',
    image: '/Midhun.PNG',
  },
  {
    name: 'Mr. Saravanan Gnanaguru',
    role: 'Founder @ CloudEngine Labs',
    tags: ['AWS Community Builder'],
    talk: 'How to Build Trustworthy Software: Cloud Security and Compliance on AWS',
    image: '/Saravanan_gnanaguru.png',
  },
  {
    name: 'Mr. Ganesh Kumar',
    role: 'Solutions Architect @ zeb',
    tags: ['AWS Data & GenAI Architect', 'AWS Community Builder', 'Tech Speaker'],
    talk: 'Building Modern Data Platforms on AWS: From Data Lakes to AI-Ready Analytics',
    image: '/Ganesh_kumar.png',
  },
  {
    name: 'Mr. Keeran M',
    role: 'Senior Technical Account Manager @ Amazon Web Services',
    tags: ['Cloud Operations Architect', 'AWS Healthcare & Life Sciences Solutions'],
    talk: 'Beyond the Prompt: Build the Next Era of Agentic AI with AWS',
    image: '/Keeran.png',
  },
];

function SpeakerCard({ speaker, index }) {
  const delay = index * 0.15;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden glass border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 flex flex-col"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Poster image — square crop, fills fully, no black gaps */}
      <div className="w-full aspect-square overflow-hidden">
        {speaker.image ? (
          <img
            src={speaker.image}
            alt={`${speaker.name} – Speaker Onboard`}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-950 to-violet-950">
            <svg className="w-20 h-20 text-purple-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Divider accent */}
      <div className="h-0.5 bg-gradient-to-r from-purple-600 via-violet-400 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content below image */}
      <div className="relative p-5 flex flex-col flex-1 bg-gradient-to-b from-[#0d0520] to-[#12082a]">

        {/* Name & role — min-height so all cards align */}
        <div className="min-h-[52px]">
          <h3 className="text-lg font-bold text-white leading-tight">{speaker.name}</h3>
          <p className="text-amber-400 text-sm mt-0.5 font-medium">{speaker.role}</p>
        </div>

        {/* Tags — 2 per row, fixed height so TALK always aligns */}
        <div className="grid grid-cols-2 gap-2 mt-3 h-20 content-start">
          {speaker.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/15 border border-purple-500/25 text-purple-300 text-center leading-tight"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Talk — pinned to bottom */}
        <div className="pt-3 mt-auto border-t border-purple-500/15">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest font-semibold">Talk</p>
          <p className="text-sm text-gray-200 leading-snug italic">"{speaker.talk}"</p>
        </div>
      </div>
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
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Learn from AWS experts, cloud architects, and industry leaders at AWS Student Community Day Puducherry 2026.
          </p>
        </div>

        {/* Speaker cards — 4 columns on large, 2 on medium, 1 on mobile */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i} />
          ))}
        </div>

        {/* Social follow CTA */}
        <div
          className={`mt-14 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-400 text-sm">Follow us for more speaker announcements</p>
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
    </section>
  );
}
