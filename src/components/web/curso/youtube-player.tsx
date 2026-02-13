"use client";

function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

type YoutubePlayerProps = {
  youtubeUrl: string | null | undefined;
};

export function YoutubePlayer({ youtubeUrl }: YoutubePlayerProps) {
  const videoId = extractYouTubeId(youtubeUrl);

  if (!videoId) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
        No hay video configurado
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card/50 shadow-md backdrop-blur supports-backdrop-filter:bg-card/30">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Video de la lección"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
