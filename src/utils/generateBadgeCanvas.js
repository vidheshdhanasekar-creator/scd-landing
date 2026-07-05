/**
 * generateBadgeCanvas.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Composites the user photo + name onto badge-template.png.
 *
 * Layer order:
 *   1. badge-template.png  (1080 × 1350 px)
 *   2. User photo clipped to the circular placeholder
 *   3. Attendee name text below the circle
 *
 * Coordinates derived from badge-template.png (1080×1350) by scaling
 * Figma 2× values (6750×8438) by factor 1080/6750 = 0.16:
 *
 *   cx  = 522   cy  = 702   r = 276   (diameter = 552)
 *   name x = 540 (centre), y = 1018 (cy + r + 40px gap)
 */

const TEMPLATE_SRC = '/badge-template.png';

export const PHOTO_CIRCLE = { cx: 522, cy: 702, radius: 280 };

const W = 1080;
const H = 1350;

const NAME = {
  x:    W / 2,  // horizontally centred
  y:    1050,   // cy(702) + r(276) + ~72px gap
  font: 'bold 45px "Arial Black", Arial, sans-serif',
  fill: '#ffffff',
};

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error(`Cannot load: ${src}`));
    img.src = src;
  });
}

export async function generateBadgeCanvas(croppedPhotoSrc, name = '') {
  const [template, photo] = await Promise.all([
    loadImg(TEMPLATE_SRC),
    croppedPhotoSrc ? loadImg(croppedPhotoSrc) : Promise.resolve(null),
  ]);

  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── 1. Badge template ─────────────────────────────────────────────────────
  ctx.drawImage(template, 0, 0, W, H);

  // ── 2. User photo clipped to circle ───────────────────────────────────────
  if (photo) {
    const { cx, cy, radius } = PHOTO_CIRCLE;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.clip();

    // Cover-fit: fill the circle, preserve aspect ratio
    const d  = radius * 2;
    const ar = photo.width / photo.height;
    const dw = ar >= 1 ? d * ar : d;
    const dh = ar >= 1 ? d      : d / ar;
    ctx.drawImage(photo, cx - dw / 2, cy - dh / 2, dw, dh);
    ctx.restore();
  }

  // ── 3. Attendee name ──────────────────────────────────────────────────────
  if (name && name.trim()) {
    ctx.save();
    ctx.font         = NAME.font;
    ctx.fillStyle    = NAME.fill;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor   = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur    = 8;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText(name.trim(), NAME.x, NAME.y);
    ctx.restore();
  }

  return canvas;
}
