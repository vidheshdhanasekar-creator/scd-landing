import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../controllers/useScrollReveal';

const contacts = [
  { name: 'Mrs. A. Ilakkia', role: 'Faculty Coordinator — AI', phone: '+91 98941 82905', tag: 'Faculty' },
  { name: 'Vishwa Pandiyan',   role: 'Student Coordinator',      phone: '+91 93841 57111', tag: 'Student' },
  { name: 'Vidhesh D',         role: 'Student Coordinator',      phone: '+91 81220 60406', tag: 'Student' },
  { name: 'Aisvamalar A',      role: 'Student Coordinator',      phone: '+91 70946 68232', tag: 'Student' },
  { name: 'Daniel Sebastin A', role: 'Student Coordinator',      phone: '+91 76397 63119', tag: 'Student' },
];

// Duplicate for seamless infinite scroll
const items = [...contacts, ...contacts];

function ContactCard({ person }) {
  const isFaculty = person.tag === 'Faculty';
  const accent = isFaculty ? '#a855f7' : '#6d28d9';

  return (
    <div
      className="flex-shrink-0 flex flex-col gap-3 px-6 py-5 rounded-2xl"
      style={{
        width: 240,
        background: `linear-gradient(135deg, ${accent}18 0%, rgba(10,8,20,0.95) 70%)`,
        border: `1px solid ${accent}35`,
        boxShadow: `0 4px 24px ${accent}12`,
      }}
    >
      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, #c084fc)` }}
        >
          {person.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <span
            className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}
          >
            {person.tag}
          </span>
        </div>
      </div>

      {/* Name & role */}
      <div>
        <div className="text-white font-black text-sm leading-tight">{person.name}</div>
        <div className="text-gray-500 text-[11px] mt-0.5">{person.role}</div>
      </div>

      {/* Phone */}
      <a
        href={`tel:${person.phone.replace(/\s/g, '')}`}
        className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
        style={{ color: accent }}
      >
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {person.phone}
      </a>
    </div>
  );
}

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 1.2; // px per frame

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        // Reset when halfway (one full set scrolled)
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section id="contact" className="relative py-24 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-transparent to-[#0a0a0f] pointer-events-none" />

      <div className="relative" ref={ref}>
        {/* Header */}
        <div className={`max-w-4xl mx-auto px-4 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Contact Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Get in <span className="gradient-text">Touch</span>
          </h2>
        </div>

        {/* Scrolling strip — full width, no overflow clip on sides */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, #0a0a0f, transparent)' }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to left, #0a0a0f, transparent)' }} />

          <div
            ref={trackRef}
            className="flex gap-4 py-2 px-4"
            style={{ width: 'max-content', willChange: 'transform' }}
          >
            {items.map((person, i) => (
              <ContactCard key={i} person={person} />
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className={`max-w-4xl mx-auto px-4 mt-12 pt-6 border-t border-purple-500/10 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Student Community Day Puducherry · Organized by{' '}
            <span className="text-purple-400">AWS Student Builder Group SMVEC</span>
          </p>
        </div>
      </div>
    </section>
  );
}
