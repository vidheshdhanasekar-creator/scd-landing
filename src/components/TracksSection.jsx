import { useState, useRef } from 'react';
import { useScrollReveal } from '../controllers/useScrollReveal';
import { tracks } from '../models/eventData';
import MagicRingsCanvas from './MagicRingsCanvas';

// SVG icons per track id
const HACKATHON_LINK = 'https://sbg-aws-smvec.vercel.app/';

const trackIcons = {
  1: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  2: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  3: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  4: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

function TrackCard({ track, index, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isHackathon = track.id === 4;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl overflow-hidden cursor-default flex flex-col"
      style={{
        transitionDelay: `${index * 0.12}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? hovered ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)'
          : 'translateY(48px)',
        transition: 'opacity 0.7s ease, transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        background: `linear-gradient(135deg, ${track.accent}20 0%, rgba(10,8,20,0.97) 65%)`,
        border: `1px solid ${hovered ? track.accent + '60' : track.accent + '25'}`,
        boxShadow: hovered
          ? `0 20px 60px ${track.accent}30, 0 0 0 1px ${track.accent}20`
          : `0 4px 24px ${track.accent}10`,
      }}
    >
      {/* Mouse spotlight */}
      {hovered && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 260, height: 260,
            left: mousePos.x - 130, top: mousePos.y - 130,
            background: `radial-gradient(circle, ${track.accent}18 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${track.accent}, transparent)`, opacity: hovered ? 1 : 0.3 }} />

      {/* Corner number */}
      <div className="absolute top-4 right-5 text-5xl font-black select-none transition-all duration-300"
        style={{ color: track.accent, opacity: hovered ? 0.18 : 0.08, transform: hovered ? 'scale(1.1)' : 'scale(1)' }}>
        {track.number}
      </div>

      <div className="relative flex flex-col p-6 h-full overflow-hidden justify-between">
        {/* Top content */}
        <div className="flex flex-col gap-3">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
            style={{
              background: `${track.accent}20`,
              border: `1px solid ${track.accent}40`,
              color: track.accent,
              boxShadow: hovered ? `0 0 24px ${track.accent}45` : `0 0 8px ${track.accent}15`,
              transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1) rotate(0deg)',
            }}
          >
            {trackIcons[track.id]}
          </div>

          {/* Title + stat */}
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black transition-colors duration-300"
              style={{ color: hovered ? '#fff' : '#e2e8f0' }}>
              {track.title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: `${track.accent}20`, border: `1px solid ${track.accent}40`, color: track.accent }}>
              {track.stat}
            </span>
          </div>

          {/* Description — hide for hackathon */}
          {!isHackathon && (
          <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
            {track.description}
          </p>
          )}

          {/* Hackathon inline info */}
          {isHackathon && (
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="font-black" style={{ color: track.accent }}>#include 1.0 Hackathon</span>
              {' '}— Registration opens June 1. Teams of 3–4 members. Hybrid event with an offline grand finale on July 25 at SMVEC, Pondicherry. Swags & prizes for the best builders.
            </p>
          )}
        </div>

        {/* Bottom content */}
        <div className="flex flex-col gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {track.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300"
                style={{
                  background: hovered ? `${track.accent}20` : `${track.accent}10`,
                  border: `1px solid ${hovered ? track.accent + '45' : track.accent + '20'}`,
                  color: track.accent,
                }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Join Now — hackathon only */}
          {isHackathon && (
            <a
              href={HACKATHON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-black text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${track.accent}, #a855f7)`,
                boxShadow: hovered ? `0 6px 24px ${track.accent}50` : `0 2px 12px ${track.accent}30`,
              }}
            >
              Join Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none transition-opacity duration-500"
        style={{ background: `linear-gradient(to top, ${track.accent}12, transparent)`, opacity: hovered ? 1 : 0 }} />
    </div>
  );
}

export default function TracksSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="tracks" className="relative py-28 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <MagicRingsCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-transparent to-[#0a0a0f]/95 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4" ref={ref}>
        {/* Header */}
        <div className={`mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Conference Tracks</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            What's<br /><span className="gradient-text">Happening</span>
          </h2>
        </div>

        {/* 2x2 Grid — equal height rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ gridAutoRows: '380px' }}>
          {tracks.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
