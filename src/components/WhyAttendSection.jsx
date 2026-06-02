import { useScrollReveal } from '../controllers/useScrollReveal';
import { whyAttendItems } from '../models/eventData';

export default function WhyAttendSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="why-attend" className="relative py-28 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Bg Spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-purple-950/10 blur-[135px]" />
      </div>

      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column — Text & Title */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-purple border border-purple-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Perks</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Why <br />
              <span className="gradient-text">Attend?</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Student Community Day Puducherry 2026 is designed to launch your cloud journey. 
              Join us for a day of immersive learning, practical builders' experience, and valuable professional connections that will elevate your tech profile.
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>

          {/* Right Column — Elegant Points List */}
          <div className="lg:col-span-7 space-y-3">
            {whyAttendItems.map((item, index) => {
              const isHighlighted = item.highlight;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-300 ${
                    isHighlighted 
                      ? 'border border-purple-500/20 bg-purple-950/10 shadow-[0_4px_24px_rgba(139,92,246,0.06)]' 
                      : 'border border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Styled Icon Wrapper */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg flex-shrink-0 border ${
                    isHighlighted 
                      ? 'bg-purple-900/30 border-purple-500/40 text-white' 
                      : 'bg-white/5 border-white/5 text-purple-400'
                  }`}>
                    {item.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 pt-0.5">
                    <p className={`text-sm leading-relaxed ${
                      isHighlighted 
                        ? 'text-white font-bold' 
                        : 'text-gray-300'
                    }`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
