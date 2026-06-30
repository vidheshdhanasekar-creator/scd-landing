import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../controllers/useScrollReveal';
import { teamRoles } from '../models/eventData';
import ParticleCanvas from './ParticleCanvas';

function OrbitingTeam({ roles }) {
  const containerRef = useRef(null);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [rotation, setRotation] = useState(0);
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    const animate = (time) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        setRotation((r) => (r + delta * 0.012) % 360);
      }
      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const rx = 310;
  const ry = 130;

  // Color palette per role
  const colors = [
    ['#7c3aed','#a855f7'],
    ['#6d28d9','#8b5cf6'],
    ['#5b21b6','#7c3aed'],
    ['#4c1d95','#6d28d9'],
    ['#7c3aed','#c084fc'],
    ['#6d28d9','#a855f7'],
    ['#5b21b6','#8b5cf6'],
    ['#4c1d95','#7c3aed'],
    ['#7c3aed','#e879f9'],
  ];

  // Initials from role.initials field
  const getInitials = (role) => role.initials || role.role.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto" style={{ height: 460 }}>
      {/* Orbit path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 460" preserveAspectRatio="xMidYMid meet">
        <ellipse cx="350" cy="230" rx={rx} ry={ry} fill="none"
          stroke="rgba(139,92,246,0.12)" strokeWidth="1" strokeDasharray="3 5" />
        <ellipse cx="350" cy="230" rx={rx - 8} ry={ry - 4} fill="none"
          stroke="rgba(139,92,246,0.04)" strokeWidth="10" />
      </svg>

      {/* Center button */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-4 rounded-full bg-purple-600/15 blur-xl group-hover:bg-purple-600/30 transition-all duration-500 animate-pulse-slow" />
          <div className="relative w-24 h-24 rounded-full flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform duration-300"
            style={{
              background: 'linear-gradient(135deg, #6d28d9, #a855f7)',
              boxShadow: '0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.2)',
              border: '2px solid rgba(196,132,252,0.4)',
            }}>
            <span className="text-white text-xl">👥</span>
            <span className="text-white text-[10px] font-black leading-tight text-center px-1">Explore<br/>Team</span>
          </div>
        </div>
      </div>

      {/* Orbiting cards */}
      {roles.map((role, i) => {
        const angle = ((rotation + (i / roles.length) * 360) * Math.PI) / 180;
        const x = 350 + rx * Math.cos(angle);
        const y = 230 + ry * Math.sin(angle);
        const depthScale = 0.78 + 0.22 * ((Math.sin(angle) + 1) / 2);
        const isHovered = hoveredRole === role.id;
        const [c1, c2] = colors[i % colors.length];

        return (
          <div
            key={role.id}
            className="absolute cursor-pointer"
            style={{
              left: `${(x / 700) * 100}%`,
              top: `${(y / 460) * 100}%`,
              zIndex: isHovered ? 20 : Math.round(depthScale * 10),
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.12 : depthScale})`,
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={() => setHoveredRole(role.id)}
            onMouseLeave={() => setHoveredRole(null)}
          >
            <div
              className="flex flex-col items-center gap-1.5 transition-all duration-300"
            >
              {/* Avatar circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-base flex-shrink-0 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  boxShadow: isHovered
                    ? `0 0 20px ${c1}80, 0 0 40px ${c1}30`
                    : `0 0 8px ${c1}40`,
                  border: `2px solid ${isHovered ? c2 : c1 + '60'}`,
                }}
              >
                {getInitials(role)}
              </div>

              {/* Label */}
              <div
                className="px-2.5 py-1 rounded-lg text-center transition-all duration-300"
                style={{
                  background: isHovered ? `${c1}25` : 'rgba(10,8,20,0.7)',
                  border: `1px solid ${isHovered ? c1 + '50' : 'rgba(139,92,246,0.15)'}`,
                  backdropFilter: 'blur(8px)',
                  minWidth: 72,
                }}
              >
                <div className="text-white text-[10px] font-bold leading-tight whitespace-nowrap">{role.role}</div>
              </div>

              {/* Tooltip */}
              {isHovered && (
                <div
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-36 px-3 py-2 rounded-xl text-xs text-gray-300 text-center z-30 pointer-events-none"
                  style={{
                    background: 'rgba(15,5,30,0.95)',
                    border: `1px solid ${c1}40`,
                    boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
                  }}
                >
                  {role.description}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${c1}40` }} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TeamSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="team" className="relative py-24 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Particle canvas background */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-transparent to-[#0a0a0f]/70 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-purple border border-purple-500/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">The Team</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Meet the <span className="gradient-text">Builders</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The passionate team behind AWS Community Day Pondicherry 2026 — building, organizing, and inspiring.
          </p>
        </div>

        {/* Orbiting team */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <OrbitingTeam roles={teamRoles} />
        </div>
      </div>
    </section>
  );
}
