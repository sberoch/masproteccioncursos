"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { VideoContextProvider } from "./play-video-trigger";
import { VideoModal } from "./video-modal";

type LandingShellProps = {
  children: ReactNode;
};

export function LandingShell({ children }: LandingShellProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const openVideo = useCallback((src: string) => {
    setVideoSrc(src);
  }, []);

  const closeVideo = useCallback(() => {
    setVideoSrc(null);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(
      ".landing-page .animate-on-scroll"
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!target || !(target instanceof HTMLAnchorElement)) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const targetEl = document.querySelector(href);
      if (!targetEl) return;
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };

    const container = document.querySelector(".landing-page");
    if (!container) return;
    container.addEventListener("click", handleClick as EventListener, true);
    return () =>
      container.removeEventListener(
        "click",
        handleClick as EventListener,
        true
      );
  }, []);

  return (
    <VideoContextProvider value={{ openVideo }}>
      {children}
      <VideoModal
        isOpen={!!videoSrc}
        videoSrc={videoSrc}
        onClose={closeVideo}
      />
    </VideoContextProvider>
  );
}
