import type { CourseIntroBlock } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Image from "next/image";
import { PlayVideoTrigger } from "@/components/web/play-video-trigger";
import RichText from "@/components/web/rich-text";

const DEFAULT_LABEL = "Por qué este curso";
const DEFAULT_TITLE = "Una historia que cambió todo";
const DEFAULT_STORY = [
  "Hace años, presencié una emergencia donde nadie sabía qué hacer. En ese momento entendí que el conocimiento en primeros auxilios no es un lujo, es una responsabilidad que todos deberíamos asumir.",
  "Desde entonces, me dediqué a formar personas comunes en técnicas que pueden marcar la diferencia entre la vida y la muerte. No necesitas ser médico ni enfermero para salvar una vida, solo necesitas estar preparado.",
];
const DEFAULT_DESCRIPTION =
  "Más Protección es un programa de formación integral en primeros auxilios diseñado para personas sin experiencia previa. Al finalizar, tendrás las herramientas necesarias para actuar cuando más importa.";

function getVideoSrc(
  block: Partial<CourseIntroBlock> | null | undefined
): string {
  if (!block) return "/test1.mp4";
  const video = block.video;
  const videoUrl = block.videoUrl;
  if (typeof video === "object" && video?.url) return getMediaUrl(video.url);
  if (videoUrl) return videoUrl;
  return "/test1.mp4";
}

function getThumbnailSrc(
  block: Partial<CourseIntroBlock> | null | undefined
): string {
  if (!block?.videoThumbnail) return "/test1.png";
  const thumb = block.videoThumbnail;
  if (typeof thumb === "object" && thumb?.url) return getMediaUrl(thumb.url);
  return "/test1.png";
}

export function CourseIntroSection(props?: Partial<CourseIntroBlock> | null) {
  const label = props?.label ?? DEFAULT_LABEL;
  const title = props?.title ?? DEFAULT_TITLE;
  const storyParagraphs = props?.storyParagraphs;
  const hasStoryContent =
    storyParagraphs?.length &&
    storyParagraphs.some((p) => p?.paragraph?.root?.children?.length);
  const description = props?.description;
  const videoSrc = getVideoSrc(props);
  const thumbnailSrc = getThumbnailSrc(props);
  const thumbnailAlt =
    typeof props?.videoThumbnail === "object" && props.videoThumbnail?.alt
      ? props.videoThumbnail.alt
      : "Introducción al curso de Primeros Auxilios";

  return (
    <section
      className="relative overflow-hidden bg-white py-20 md:py-[120px] scroll-mt-[100px] before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#e5e7eb] before:to-transparent"
      id="introduccion"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0f4ba3] before:h-0.5 before:w-10 before:bg-[#0f4ba3]">
              {label}
            </span>
            <h2 className="font-display mb-6 text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-[#111827]">
              {title}
            </h2>
            {hasStoryContent ? (
              <div className="space-y-5 text-lg leading-relaxed text-[#4b5563] [&_.payload-richtext]:!mb-0 [&_.payload-richtext]:!mt-0">
                {storyParagraphs!.map((p, i) =>
                  p?.paragraph?.root ? (
                    <RichText
                      key={i}
                      data={p.paragraph}
                      enableGutter={false}
                      enableProse={false}
                    />
                  ) : null
                )}
              </div>
            ) : (
              <>
                <p className="mb-5 text-lg leading-relaxed text-[#4b5563]">
                  {DEFAULT_STORY[0]}
                </p>
                <p className="text-lg leading-relaxed text-[#4b5563]">
                  {DEFAULT_STORY[1]}
                </p>
              </>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <PlayVideoTrigger
              videoSrc={videoSrc}
              className="relative aspect-video cursor-pointer overflow-hidden rounded-[20px] bg-[#f3f4f6] shadow-xl before:absolute before:inset-0 before:z-10 before:bg-gradient-to-br before:from-[#0f4ba3]/20 before:to-black/30 before:transition before:hover:from-[#0f4ba3]/10 before:hover:to-black/20"
            >
              <Image
                src={thumbnailSrc}
                alt={thumbnailAlt}
                width={640}
                height={360}
                className="h-full w-full object-cover transition duration-400 hover:scale-[1.03]"
              />
              <div className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 hover:shadow-xl">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-8 w-8 text-[#ec1313]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </PlayVideoTrigger>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-3xl rounded-3xl border border-[#f3f4f6] bg-gradient-to-br from-[#e8f4fc] to-[#f9fafb] px-14 py-12 text-center before:absolute before:left-1/2 before:top-0 before:h-1 before:w-20 before:-translate-x-1/2 before:rounded before:bg-gradient-to-r before:from-[#0f4ba3] before:to-[#66b4e4]">
          {description?.root?.children?.length ? (
            <div className="text-xl leading-relaxed text-[#374151] [&_.payload-richtext]:!max-w-none">
              <RichText
                data={description}
                enableGutter={false}
                enableProse={false}
              />
            </div>
          ) : (
            <p className="text-xl leading-relaxed text-[#374151]">
              <strong className="font-semibold text-[#0f4ba3]">
                Más Protección
              </strong>{" "}
              {DEFAULT_DESCRIPTION}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
