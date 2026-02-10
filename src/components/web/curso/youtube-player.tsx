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
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-[#e5e7eb] text-[#374151]">
        No hay video configurado
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl shadow-md">
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
