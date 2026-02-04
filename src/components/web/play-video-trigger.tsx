"use client";

import { createContext, useContext, type ReactNode } from "react";

type VideoContextValue = {
  openVideo: (src: string) => void;
};

const VideoContext = createContext<VideoContextValue | null>(null);

export function useVideoContext(): VideoContextValue | null {
  return useContext(VideoContext);
}

export function VideoContextProvider({
  value,
  children,
}: {
  value: VideoContextValue;
  children: ReactNode;
}) {
  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}

type PlayVideoTriggerProps = {
  videoSrc: string;
  className?: string;
  children: ReactNode;
};

export function PlayVideoTrigger({
  videoSrc,
  className,
  children,
}: PlayVideoTriggerProps) {
  const ctx = useVideoContext();

  const handleClick = () => {
    ctx?.openVideo(videoSrc);
  };

  return (
    <div
      className={className}
      onClick={ctx ? handleClick : undefined}
      onKeyDown={
        ctx
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      role={ctx ? "button" : undefined}
      tabIndex={ctx ? 0 : undefined}
    >
      {children}
    </div>
  );
}
