/**
 * BadgePreview.jsx
 * Always visible — shows badge-template.png as background.
 * Overlays user photo in the circle once uploaded.
 * Swaps to the final generated PNG after "Generate Badge".
 */

export default function BadgePreview({ badgeDataUrl, croppedSrc, isGenerating }) {

  // circle coords relative to badge-template.png (1080 × 1350)
  const LEFT_PCT = 22.41;
  const TOP_PCT  = 31.26;
  const W_PCT    = 51.85;

  const src = badgeDataUrl || '/badge-template.png';

  return (
    <div className="w-full">
      {/* Outer wrapper constrains width — responsive via parent */}
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: '1080 / 1350', background: '#0a0015' }}
      >
        {/* ── Always-visible template (or final generated badge) ── */}
        <img
          src={src}
          alt="Badge preview"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* ── User photo overlay — only when no final badge yet ── */}
        {!badgeDataUrl && croppedSrc && (
          <div
            style={{
              position:      'absolute',
              left:          `${LEFT_PCT}%`,
              top:           `${TOP_PCT}%`,
              width:         `${W_PCT}%`,
              paddingBottom: `${W_PCT}%`,
              borderRadius:  '50%',
              overflow:      'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0 }}>
              <img
                src={croppedSrc}
                alt="Your photo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                draggable={false}
              />
            </div>
          </div>
        )}

        {/* ── Generating spinner ── */}
        {isGenerating && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: 'rgba(10,0,21,0.80)' }}
          >
            <div className="w-10 h-10 rounded-full border-4 border-purple-500/30 border-t-purple-400 animate-spin" />
            <p className="text-purple-300 text-sm font-medium">Generating…</p>
          </div>
        )}
      </div>
    </div>
  );
}
