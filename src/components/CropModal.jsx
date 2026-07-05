/**
 * CropModal.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-screen modal that wraps react-easy-crop.
 * Shows a circular crop area the user can drag and zoom to centre their face.
 *
 * Props
 *   imageSrc  {string}   – Object URL of the uploaded image
 *   onConfirm {Function} – called with (croppedAreaPixels) when user confirms
 *   onCancel  {Function} – called when the user dismisses the modal
 */

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

export default function CropModal({ imageSrc, onConfirm, onCancel }) {
  // react-easy-crop state
  const [crop,       setCrop]       = useState({ x: 0, y: 0 });
  const [zoom,       setZoom]       = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /** Fires every time the crop / zoom changes; cache the pixel area. */
  const onCropComplete = useCallback((_croppedArea, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  /** Pass the pixel crop region up to the parent. */
  const handleConfirm = () => {
    if (croppedAreaPixels) {
      onConfirm(croppedAreaPixels);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Crop your photo"
    >
      {/* Card */}
      <div
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#13092e', border: '1px solid rgba(139,92,246,0.35)' }}
      >
        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-3 shrink-0">
          <h2 className="text-white font-bold text-lg leading-tight">
            Position your photo
          </h2>
          <p className="text-purple-400 text-sm mt-0.5">
            Drag to reposition · Pinch or scroll to zoom
          </p>
        </div>

        {/* ── Cropper area ── */}
        {/* Fixed square container; react-easy-crop uses position:relative parent */}
        <div className="relative w-full shrink-0" style={{ height: 320 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}               // square crop area
            cropShape="round"        // circular overlay
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: { background: '#000' },
            }}
          />
        </div>

        {/* ── Zoom slider ── */}
        <div className="px-5 py-3 flex items-center gap-3 shrink-0">
          {/* Minus icon */}
          <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35M8 11h6"/>
          </svg>

          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1 accent-purple-500 h-1.5"
            aria-label="Zoom"
          />

          {/* Plus icon */}
          <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-3 px-5 pb-6 shrink-0">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-purple-300 text-sm font-medium transition-colors hover:bg-purple-900/30"
            style={{ border: '1px solid rgba(139,92,246,0.35)' }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!croppedAreaPixels}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}
          >
            Use this photo
          </button>
        </div>
      </div>
    </div>
  );
}
