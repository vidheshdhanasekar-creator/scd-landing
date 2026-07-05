/**
 * BadgePage.jsx — fully responsive: mobile / tablet / desktop
 */

import { ArrowLeft, Gift, Trophy } from 'lucide-react';
import BadgeGenerator from '../components/BadgeGenerator';

export default function BadgePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg,#0a0015 0%,#0f0025 50%,#0a0015 100%)' }}
    >
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav
        className="flex items-center justify-between px-4 sm:px-6 py-4"
        style={{ borderBottom: '1px solid rgba(139,92,246,0.12)' }}
      >
        <a
          href="/"
          className="flex items-center gap-2 text-purple-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to site</span>
        </a>

        <div className="flex items-center gap-2">
          <img src="/aws.svg" alt="AWS" className="h-4 brightness-0 invert opacity-50" />
          <span className="text-white/40 text-xs tracking-widest uppercase font-semibold hidden sm:inline">
            Badge Generator
          </span>
        </div>

        <div className="w-8 sm:w-24" />
      </nav>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="text-center pt-8 sm:pt-10 pb-6 px-4">
        <p className="text-purple-400 text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold mb-2">
          AWS Student Community Day · Puducherry 2026
        </p>
        <h1 className="text-white font-black text-2xl sm:text-3xl md:text-4xl">
          Your attendee{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg,#a855f7,#ec4899)' }}
          >
            badge
          </span>
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Upload your photo, crop to fit, and download your personalised badge
        </p>

        {/* ── Swag banner ── */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold max-w-xs sm:max-w-none mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.2))',
            border: '1px solid rgba(168,85,247,0.4)',
          }}
        >
          <Gift className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-white text-center">
            Top liked LinkedIn posts win{' '}
            <span
              className="text-transparent bg-clip-text font-black"
              style={{ backgroundImage: 'linear-gradient(90deg,#a855f7,#ec4899)' }}
            >
              official AWS swags
            </span>
            {' '}— share &amp; rack up those likes!
          </span>
          <Trophy className="w-4 h-4 text-pink-400 shrink-0" />
        </div>
      </div>

      {/* ── Generator ───────────────────────────────────────────────────── */}
      <BadgeGenerator />
    </div>
  );
}
