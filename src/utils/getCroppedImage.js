/**
 * getCroppedImage.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Takes the original image src and the pixel-crop area returned by
 * react-easy-crop and returns a square, circular-clipped JPEG data URL
 * at the requested output diameter.
 *
 * All processing is done entirely in the browser – no uploads, no backend.
 */

/**
 * Load an image URL into an HTMLImageElement.
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
function createImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Needed when the object-URL comes from a different origin (rare, but safe)
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error(`Failed to load image: ${err}`));
    img.src = src;
  });
}

/**
 * Extract the cropped region from the source image, scale it to
 * `outputDiameter × outputDiameter`, and clip it to a circle.
 *
 * @param {string} imageSrc       – Object URL of the user-uploaded file.
 * @param {Object} pixelCrop      – { x, y, width, height } from react-easy-crop.
 * @param {number} [outputDiameter=570] – Pixel diameter of the output image.
 * @returns {Promise<string>}     – data URL (image/jpeg, quality 0.95).
 */
export async function getCroppedImage(imageSrc, pixelCrop, outputDiameter = 570) {
  const image = await createImage(imageSrc);

  // ── Step 1: extract the exact crop region at native resolution ──────────
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width  = pixelCrop.width;
  cropCanvas.height = pixelCrop.height;
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // ── Step 2: scale to target diameter and apply circular clip ────────────
  const out = document.createElement('canvas');
  out.width  = outputDiameter;
  out.height = outputDiameter;
  const outCtx = out.getContext('2d');

  // Circular clipping mask
  outCtx.beginPath();
  outCtx.arc(outputDiameter / 2, outputDiameter / 2, outputDiameter / 2, 0, 2 * Math.PI);
  outCtx.clip();

  // Fill the entire circle with the crop (cover behaviour)
  outCtx.drawImage(cropCanvas, 0, 0, outputDiameter, outputDiameter);

  return out.toDataURL('image/jpeg', 0.95);
}
