/**
 * BadgePreview.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shows /public/preview_badge.png as the static background.
 * Overlays the cropped user photo inside the circular placeholder.
 * Once the full badge is generated, swaps to the final data URL instead.
 *
 * Props
 *   badgeDataUrl {string|null} – finalised PNG from generateBadgeCanvas
 *   croppedSrc   {string|null} – cropped photo data URL (live preview overlay)
 *   isGenerating {boolean}     – true while canvas is being built
 *
 * Circle position derived from Figma canvas (6750 × 8438):
 *   cx=3262  → 48.33% from left  (% of width)
 *   cy=4390  → 52.03% from top   (% of height)
 *   r=1724   → diameter = 3448px = 51.08% of canvas width
 */

export default function BadgePreview({ badgeDataUrl, croppedSrc, isGenerating }) {
  // Once generated, show the final flat image — no overlay needed
  if (badgeDataUrl) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl w-full"
          style={{ aspectRatio: '1080 / 1350', background: '#0a0015' }}
        >
          <img
            src={badgeDataUrl}
            alt="Your badge"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    );
  }

  // ── circle overlay — exact coords from badge-template.png (1080 × 1350 px) ─
  // r=280 (slightly larger than the black area r≈276) to fully cover black ring.
  //   left  = (522-280)/1080 = 22.41%
  //   top   = (702-280)/1350 = 31.26%
  //   width = 560/1080       = 51.85%
  const LEFT_PCT = 22.41;
  const TOP_PCT  = 31.26;
  const W_PCT    = 51.85;

  return (
    <div className="flex flex-col items-center gap-3">

      {/* Badge frame */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl w-full"
        style={{ maxWidth: 320, aspectRatio: '1080 / 1350', background: '#0a0015' }}
      >
        {/* ── Static badge template ── */}
        <img
          src="/badge-template.png"
          alt="Badge template"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* ── Circle overlay using % width + padding-bottom for square shape ── */}
        {(() => {
          const style = {
            position:      'absolute',
            left:          `${LEFT_PCT}%`,
            top:           `${TOP_PCT}%`,
            width:         `${W_PCT}%`,
            paddingBottom: `${W_PCT}%`,
            borderRadius:  '50%',
            overflow:      'hidden',
          };
          const innerStyle = {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          };
          return (
            <div style={style}>
              <div style={innerStyle}>
                {croppedSrc && (
                  <img
                    src={croppedSrc}
                    alt="Your photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    draggable={false}
                  />
                )}
              </div>
            </div>
          );
        })()}

        {/* ── Spinner overlay while generating ── */}
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
