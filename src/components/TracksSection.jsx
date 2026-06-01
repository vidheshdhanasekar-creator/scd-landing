import { useState } from 'react';
import { useScrollReveal } from '../controllers/useScrollReveal';
import { tracks, eventData } from '../models/eventData';
import MagicRingsCanvas from './MagicRingsCanvas';

// ── Right panel detail content per track ─────────────────────────────────────
const trackDetails = {
  1: {
    highlights: ['Cloud Architecture deep-dives', 'Serverless & Lambda patterns', 'AI/ML on AWS', 'DevOps best practices'],
    schedule: [
      { time: '10:30', title: 'Keynote: Cloud in 2026' },
      { time: '11:15', title: 'Serverless at Scale' },
      { time: '12:00', title: 'AI/ML with SageMaker' },
    ],
    audience: 'Developers, Architects, Students',
    level: 'Beginner → Advanced',
  },
  2: {
    highlights: ['Hands-on AWS Console labs', 'Live coding sessions', 'Build & deploy real projects', 'Take-home project kits'],
    schedule: [
      { time: '13:30', title: 'Workshop: Build a Serverless API' },
      { time: '14:30', title: 'Workshop: Deploy with CDK' },
      { time: '15:15', title: 'Workshop: ML Model on SageMaker' },
    ],
    audience: 'Students, Beginners, Builders',
    level: 'Beginner → Intermediate',
  },
  3: {
    highlights: ['Industry leaders & AWS Heroes', 'Career paths in cloud', 'Future of cloud computing', 'Live Q&A sessions'],
    schedule: [
      { time: '15:00', title: 'Panel: Cloud Careers in 2026' },
      { time: '15:45', title: 'Panel: Startups on AWS' },
    ],
    audience: 'Everyone',
    level: 'All Levels',
  },
  4: {
    highlights: ['6-hour build challenge', 'Form teams of 2–4', 'Must use at least one AWS service', 'Prizes & AWS Credits'],
    schedule: [
      { time: '09:30', title: 'Hacking Begins' },
      { time: '12:30', title: 'Lunch Break' },
      { time: '15:00', title: 'Submission Deadline' },
      { time: '15:30', title: 'Demo & Judging' },
      { time: '16:30', title: 'Winners Announced 🏆' },
    ],
    audience: 'All participants',
    level: 'All Levels',
    rules: ['Teams of 2–4 (solo allowed)', 'Use at least one AWS service', 'All code written during event', 'Live demo required'],
    judging: [
      { label: 'Innovation', pct: 30 },
      { label: 'AWS Usage', pct: 25 },
      { label: 'Impact',    pct: 25 },
      { label: 'Demo',      pct: 20 },
    ],
  },
};

// ── Left track row ────────────────────────────────────────────────────────────
function TrackRow({ track, index, isVisible, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 0.1}s`,
        background: isActive
          ? `linear-gradient(135deg, ${track.accent}22 0%, rgba(13,11,24,0.99) 60%)`
          : 'rgba(13,11,24,0.55)',
        border: `1px solid ${isActive ? track.accent + '55' : 'rgba(139,92,246,0.10)'}`,
        boxShadow: isActive ? `0 4px 30px ${track.accent}20` : 'none',
        transform: isVisible ? (isActive ? 'translateX(4px)' : 'translateX(0)') : 'translateY(48px)',
      }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
        style={{
          background: `linear-gradient(180deg, transparent, ${track.accent}, transparent)`,
          opacity: isActive ? 1 : 0.2,
        }} />

      <div className="flex items-center gap-4 p-5 pl-6">
        {/* Number */}
        <div className="text-4xl font-black leading-none select-none flex-shrink-0 w-10 text-right"
          style={{ color: track.accent, opacity: isActive ? 0.35 : 0.10 }}>
          {track.number}
        </div>

        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300"
          style={{
            background: `${track.accent}18`,
            border: `1px solid ${track.accent}35`,
            transform: isActive ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
            boxShadow: isActive ? `0 0 16px ${track.accent}30` : 'none',
          }}>
          {track.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-black transition-colors duration-300"
              style={{ color: isActive ? '#fff' : '#e2e8f0' }}>
              {track.title}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold"
              style={{ background: `${track.accent}18`, border: `1px solid ${track.accent}30`, color: track.accent }}>
              {track.stat}
            </span>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors">
            {track.description}
          </p>
        </div>

        {/* Arrow */}
        <svg
          className="w-4 h-4 flex-shrink-0 transition-all duration-300"
          style={{
            color: track.accent,
            opacity: isActive ? 1 : 0.3,
            transform: isActive ? 'translateX(0) rotate(0deg)' : 'translateX(-4px)',
          }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// ── Right detail panel ────────────────────────────────────────────────────────
function TrackDetailPanel({ track, isVisible }) {
  const detail = trackDetails[track.id];
  const [panelVisible, setPanelVisible] = useState(false);

  // Animate in when track changes
  useState(() => {
    setPanelVisible(false);
    const t = setTimeout(() => setPanelVisible(true), 50);
    return () => clearTimeout(t);
  }, [track.id]);

  return (
    <div
      className="relative rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-500"
      style={{
        background: `linear-gradient(160deg, ${track.accent}18 0%, rgba(10,8,20,0.98) 70%)`,
        border: `1px solid ${track.accent}30`,
        boxShadow: `0 8px 40px ${track.accent}15`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.97)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${track.accent}, transparent)` }} />

      <div className="p-7 flex flex-col gap-5 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${track.accent}20`, border: `1px solid ${track.accent}40`,
              boxShadow: `0 0 20px ${track.accent}30` }}>
            {track.icon}
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: track.accent }}>
              Track {track.number}
            </div>
            <h3 className="text-2xl font-black text-white leading-tight">{track.title}</h3>
            <p className="text-gray-500 text-xs mt-1">{track.description}</p>
          </div>
        </div>

        {/* Highlights */}
        <div>
          <div className="text-[10px] font-bold tracking-widest uppercase mb-2.5" style={{ color: track.accent }}>
            Highlights
          </div>
          <div className="space-y-1.5">
            {detail.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: track.accent }} />
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <div className="text-[10px] font-bold tracking-widest uppercase mb-2.5" style={{ color: track.accent }}>
            Schedule
          </div>
          <div className="space-y-2">
            {detail.schedule.map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="font-mono text-[10px] font-bold flex-shrink-0" style={{ color: track.accent }}>{s.time}</span>
                <span className="text-gray-300 text-xs">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Judging (hackathon only) */}
        {detail.judging && (
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-2.5" style={{ color: track.accent }}>
              Judging Criteria
            </div>
            <div className="space-y-2">
              {detail.judging.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{c.label}</span>
                    <span className="font-bold" style={{ color: track.accent }}>{c.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width: `${c.pct}%`, background: `linear-gradient(90deg, ${track.accent}, #a855f7)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {[
            { label: 'Audience', value: detail.audience },
            { label: 'Level', value: detail.level },
          ].map((m, i) => (
            <div key={i} className="px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: track.accent }}>{m.label}</div>
              <div className="text-white text-xs font-semibold">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {track.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{ background: `${track.accent}15`, border: `1px solid ${track.accent}30`, color: track.accent }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a href={eventData.registerLink} target="_blank" rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 py-3 rounded-xl text-white font-black text-sm relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          style={{ background: `linear-gradient(135deg, ${track.accent}, #a855f7)`, boxShadow: `0 4px 20px ${track.accent}35` }}>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #c084fc)' }} />
          <span className="relative">Register for this Track</span>
          <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function TracksSection() {
  const { ref, isVisible } = useScrollReveal();
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [detailVisible, setDetailVisible] = useState(true);

  const handleTrackClick = (track) => {
    if (track.id === activeTrack.id) return;
    setDetailVisible(false);
    setTimeout(() => {
      setActiveTrack(track);
      setDetailVisible(true);
    }, 200);
  };

  return (
    <section id="tracks" className="relative py-28 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <MagicRingsCanvas />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/95 via-transparent to-[#0a0a0f]/95 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4" ref={ref}>
        {/* Header */}
        <div className={`mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Conference Tracks</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            What's<br /><span className="gradient-text">Happening</span>
          </h2>
          <p className="text-gray-500 text-sm mt-3">Tap any track to explore details</p>
        </div>

        {/* ── Desktop: side-by-side ── */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-5 items-start">
          <div className="lg:col-span-3 flex flex-col gap-3">
            {tracks.map((track, i) => (
              <TrackRow
                key={track.id}
                track={track}
                index={i}
                isVisible={isVisible}
                isActive={activeTrack.id === track.id}
                onClick={() => handleTrackClick(track)}
              />
            ))}
          </div>
          <div className="lg:col-span-2 lg:sticky lg:top-24" style={{ minHeight: 520 }}>
            <TrackDetailPanel track={activeTrack} isVisible={detailVisible} />
          </div>
        </div>

        {/* ── Mobile: accordion — detail expands below each row ── */}
        <div className="flex flex-col gap-3 lg:hidden">
          {tracks.map((track, i) => {
            const isActive = activeTrack.id === track.id;
            return (
              <div key={track.id}>
                <TrackRow
                  track={track}
                  index={i}
                  isVisible={isVisible}
                  isActive={isActive}
                  onClick={() => handleTrackClick(track)}
                />
                {/* Inline detail panel — slides open below */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isActive ? '900px' : '0px',
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? '8px' : '0px',
                  }}
                >
                  <TrackDetailPanel track={track} isVisible={isActive} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a href={eventData.registerLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-purple border border-purple-500/30 text-purple-300 text-sm font-semibold hover:text-white hover:border-purple-400 transition-all duration-300 hover:scale-105">
            Register to attend all tracks
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
