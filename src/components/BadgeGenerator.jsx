/**
 * BadgeGenerator.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Orchestrates the full badge-generation flow:
 *   1. Photo upload & validation
 *   2. CropModal (react-easy-crop) — circular crop, drag + zoom
 *   3. Name input
 *   4. Canvas generation via generateBadgeCanvas
 *   5. Live preview via BadgePreview
 *   6. PNG download
 *
 * Everything runs 100 % in the browser — no uploads, no backend.
 */

import { useState, useRef, useCallback } from 'react';
import { Upload, AlertCircle, Wand2, Download, Copy, Check } from 'lucide-react';
import CropModal               from './CropModal';
import BadgePreview            from './BadgePreview';
import { getCroppedImage }     from '../utils/getCroppedImage';
import { generateBadgeCanvas } from '../utils/generateBadgeCanvas';

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// ── Small helper: numbered step badge ─────────────────────────────────────────
function StepBadge({ number, done }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition-all duration-300"
      style={{
        background: done ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'rgba(139,92,246,0.2)',
        color:  done ? '#fff' : '#a855f7',
        border: done ? 'none' : '1px solid rgba(139,92,246,0.4)',
      }}
    >
      {done ? '✓' : number}
    </div>
  );
}

// ── Clipboard card — reused in both mobile/tablet and desktop columns ─────────
function ClipboardCard({ copied, onCopy, caption }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold">Share on LinkedIn</p>
          <p className="text-gray-500 text-xs mt-0.5">Post this with your badge</p>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 shrink-0 ml-3"
          style={{
            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(139,92,246,0.2)',
            border:     copied ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(139,92,246,0.35)',
            color:      copied ? '#86efac' : '#c4b5fd',
          }}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div
        className="rounded-xl p-3 overflow-y-auto"
        style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(139,92,246,0.12)', maxHeight: 400 }}
      >
        <p className="text-gray-300 text-xs leading-relaxed select-text"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {caption}
        </p>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function BadgeGenerator() {

  // ── state ──────────────────────────────────────────────────────────────────
  const [rawSrc,       setRawSrc]       = useState(null);
  const [showCrop,     setShowCrop]     = useState(false);
  const [croppedSrc,   setCroppedSrc]   = useState(null);
  const [name,         setName]         = useState('');
  const [badgeDataUrl, setBadgeDataUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error,        setError]        = useState('');
  const [copied,       setCopied]       = useState(false);

  const fileInputRef = useRef(null);

  // ── file selection ─────────────────────────────────────────────────────────
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a JPEG, PNG, WebP, or GIF image.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError(`File too large — max ${MAX_FILE_BYTES / 1024 / 1024} MB.`);
      return;
    }

    setError('');
    if (rawSrc) URL.revokeObjectURL(rawSrc);
    setRawSrc(URL.createObjectURL(file));
    setShowCrop(true);
  }, [rawSrc]);

  // ── drag-drop on upload zone ───────────────────────────────────────────────
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const dt = new DataTransfer();
    dt.items.add(file);
    handleFileChange({ target: { files: dt.files, value: '' } });
  }, [handleFileChange]);

  // ── crop confirmed ─────────────────────────────────────────────────────────
  const handleCropConfirm = useCallback(async (pixelCrop) => {
    setShowCrop(false);
    try {
      const cropped = await getCroppedImage(rawSrc, pixelCrop);
      setCroppedSrc(cropped);
      setBadgeDataUrl(null); // reset badge when new crop is applied
    } catch (err) {
      setError('Could not process the image. Please try again.');
      console.error(err);
    }
  }, [rawSrc]);

  // ── crop cancelled ─────────────────────────────────────────────────────────
  const handleCropCancel = useCallback(() => {
    setShowCrop(false);
    if (!croppedSrc) {
      if (rawSrc) URL.revokeObjectURL(rawSrc);
      setRawSrc(null);
    }
  }, [croppedSrc, rawSrc]);

  // ── name change — clear stale badge ───────────────────────────────────────
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
    setBadgeDataUrl(null); // stale when name changes
  }, []);

  // ── generate ───────────────────────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    if (!croppedSrc || !name.trim()) return;
    setIsGenerating(true);
    setError('');
    try {
      const canvas = await generateBadgeCanvas(croppedSrc, name.trim());
      setBadgeDataUrl(canvas.toDataURL('image/png'));
    } catch (err) {
      setError('Badge generation failed. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }, [croppedSrc, name]);

  // ── download ───────────────────────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    if (!badgeDataUrl) return;
    const a = document.createElement('a');
    a.href     = badgeDataUrl;
    a.download = 'AWS-SCD-Puducherry-2026-Badge.png';
    a.click();
  }, [badgeDataUrl]);

  // ── reset all ──────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (rawSrc) URL.revokeObjectURL(rawSrc);
    setRawSrc(null);
    setCroppedSrc(null);
    setName('');
    setBadgeDataUrl(null);
    setError('');
  }, [rawSrc]);

  // ── derived ────────────────────────────────────────────────────────────────
  const step1Done = !!croppedSrc;
  const step2Done = !!name.trim();
  const step3Done = !!badgeDataUrl;
  const canGenerate = step1Done && step2Done && !isGenerating;

  // ── copy post caption ─────────────────────────────────────────────────────
  const POST_CAPTION = `🚀 Excited to be attending AWS Student Community Day Puducherry 2026!

Looking forward to a day of insightful technical sessions, networking with the AWS community, and learning from industry experts.

If you're interested in cloud computing, AI, or building your career in tech, you should definitely join us!

🎁 Want to win exclusive AWS goodies?
Generate your personalized event badge, share it on LinkedIn with #AWSscdpdy, and the posts with the highest engagement will be recognized during the event!

📝 Register for the Event:
https://sbg-smvec.vercel.app/

🎖️ Generate Your Badge:
https://sbg-smvec.vercel.app/badge


📅 Event Date: 25 July 2026
📍 Venue: Sri Manakula Vinayagar Engineering College, Puducherry

See you there! ☁️

#AWSscdpdy #AWS #AWSStudentCommunityDay #AWSStudentBuilderGroup #CloudComputing #SMVEC #Puducherry #TechCommunity`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(POST_CAPTION).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [POST_CAPTION]);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {showCrop && rawSrc && (
        <CropModal
          imageSrc={rawSrc}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────────
          Layout:
          mobile  (<md)  : single column, stacked
          tablet  (md)   : 2-col  [preview | steps]  clipboard below
          desktop (xl)   : 3-col  [preview | steps | clipboard]
      ───────────────────────────────────────────────────────────────── */}
      <div className="px-4 pb-16 max-w-6xl mx-auto w-full">

        {/* Top row: preview + steps side by side from md up */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 xl:gap-8">

          {/* ── Col 1: badge preview ──────────────────────────────────── */}
          <div className="w-full shrink-0 flex justify-center md:block md:sticky md:top-6" style={{ minWidth: 220, maxWidth: 300 }}>
            <BadgePreview
              badgeDataUrl={badgeDataUrl}
              croppedSrc={croppedSrc}
              isGenerating={isGenerating}
            />
          </div>

          {/* ── Col 2: steps ──────────────────────────────────────────── */}
          <div className="w-full md:flex-1 xl:max-w-sm flex flex-col gap-4">

            {/* Error banner */}
            {error && (
              <div
                className="flex items-start gap-2 px-4 py-3 rounded-xl text-red-300 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
                role="alert"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {/* Step 1 */}
            <div className="rounded-2xl p-5 transition-all duration-300"
              style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)' }}>
              <div className="flex items-center gap-3 mb-4">
                <StepBadge number={1} done={step1Done} />
                <div>
                  <p className="text-white text-sm font-semibold">Upload your photo</p>
                  <p className="text-gray-500 text-xs">Face-forward · JPEG / PNG / WebP · max 10 MB</p>
                </div>
              </div>

              {step1Done ? (
                <div className="flex items-center gap-3">
                  <img src={croppedSrc} alt="Cropped"
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50" />
                  <button onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg text-xs text-purple-300 hover:bg-purple-900/30 transition-colors"
                    style={{ border: '1px solid rgba(139,92,246,0.35)' }}>
                    Change
                  </button>
                  <button onClick={handleReset}
                    className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-900/20 transition-colors"
                    style={{ border: '1px solid rgba(239,68,68,0.25)' }}>
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="w-full py-6 sm:py-8 rounded-xl flex flex-col items-center gap-2 group transition-all hover:border-purple-400"
                  style={{ border: '2px dashed rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.03)' }}
                >
                  <Upload className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
                  <span className="text-purple-400 text-sm font-medium">Click or drag &amp; drop</span>
                  <span className="text-gray-600 text-xs">Your photo never leaves your browser</span>
                </button>
              )}
              <input ref={fileInputRef} type="file" accept={ACCEPTED_TYPES.join(',')}
                className="hidden" onChange={handleFileChange} />
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl p-5 transition-all duration-300"
              style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)' }}>
              <div className="flex items-center gap-3 mb-4">
                <StepBadge number={2} done={step2Done} />
                <div>
                  <p className="text-white text-sm font-semibold">Your name</p>
                  <p className="text-gray-500 text-xs">Printed on the badge exactly as entered</p>
                </div>
              </div>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Arun Kumar"
                maxLength={50}
                className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none placeholder-gray-600 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.25)' }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(168,85,247,0.7)')}
                onBlur={(e)  => (e.target.style.borderColor = 'rgba(139,92,246,0.25)')}
              />
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl p-5 transition-all duration-300"
              style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)' }}>
              <div className="flex items-center gap-3 mb-4">
                <StepBadge number={3} done={step3Done} />
                <div>
                  <p className="text-white text-sm font-semibold">Generate badge</p>
                  <p className="text-gray-500 text-xs">Composites photo + name onto the official template</p>
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="w-full py-2.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2
                           transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Badge
                  </>
                )}
              </button>
              {!canGenerate && !isGenerating && (
                <p className="text-gray-600 text-xs text-center mt-2">
                  {!step1Done && !step2Done
                    ? 'Upload a photo and enter your name first'
                    : !step1Done ? 'Upload a photo to continue'
                    : 'Enter your name to continue'}
                </p>
              )}
            </div>

            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={!step3Done}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm tracking-wide
                         flex items-center justify-center gap-2 transition-all
                         disabled:opacity-25 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
              style={{
                background: step3Done ? 'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)' : 'rgba(139,92,246,0.3)',
                boxShadow:  step3Done ? '0 8px 30px rgba(168,85,247,0.35)' : 'none',
              }}
            >
              <Download className="w-4 h-4" />
              Download Badge (PNG)
            </button>

            {/* ── Clipboard — shows inline on mobile/tablet, hidden on xl ── */}
            <div
              className="flex flex-col rounded-2xl p-5 gap-3 xl:hidden"
              style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)' }}
            >
              <ClipboardCard copied={copied} onCopy={handleCopy} caption={POST_CAPTION} />
            </div>
          </div>

          {/* ── Col 3: clipboard — desktop only ──────────────────────── */}
          <div
            className="hidden xl:flex flex-col rounded-2xl p-5 gap-3 w-full xl:max-w-sm shrink-0"
            style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.18)' }}
          >
            <ClipboardCard copied={copied} onCopy={handleCopy} caption={POST_CAPTION} />
          </div>

        </div>
      </div>
    </>
  );
}
