"use client";

import { useEffect, useCallback } from "react";

type VideoModalProps = {
  isOpen: boolean;
  videoSrc: string | null;
  onClose: () => void;
};

export function VideoModal({ isOpen, videoSrc, onClose }: VideoModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6 animate-[landing-fadeIn_0.3s_ease]"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Video modal"
    >
      <div className="relative w-full max-w-[900px] aspect-video overflow-hidden rounded-xl bg-[#111827]">
        <button
          type="button"
          className="absolute -top-12 right-0 rounded p-2 text-white transition hover:scale-110"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-8 w-8"
          >
            <line x1={18} y1={6} x2={6} y2={18} />
            <line x1={6} y1={6} x2={18} y2={18} />
          </svg>
        </button>
        <video
          src={videoSrc ?? undefined}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-contain"
        >
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
}
