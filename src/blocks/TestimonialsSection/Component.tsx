import type { TestimonialsBlock } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Image from "next/image";
import { PlayVideoTrigger } from "@/components/web/play-video-trigger";

const DEFAULT_TESTIMONIALS = [
  {
    videoSrc: "/test1.mp4",
    imageSrc: "/test1.png",
    imageAlt: "Testimonio de alumno",
    quote:
      '"El curso superó todas mis expectativas. Milagros explica todo de forma clara y práctica. Ahora me siento preparado para actuar si alguien necesita ayuda."',
    name: "Estudiante del curso",
    role: "Alumno certificado",
  },
  {
    videoSrc: "/test2.mp4",
    imageSrc: "/test2.png",
    imageAlt: "Testimonio de alumna",
    quote:
      '"Como madre, siempre tuve miedo de no saber qué hacer en una emergencia. Este curso me dio la confianza y las herramientas que necesitaba. ¡Totalmente recomendado!"',
    name: "Estudiante del curso",
    role: "Alumna certificada",
  },
];

function getTestimonialMedia(
  t: NonNullable<TestimonialsBlock["testimonials"]>[number]
) {
  const video = t.video;
  const thumbnail = t.thumbnail;
  const videoSrc =
    typeof video === "object" && video?.url
      ? getMediaUrl(video.url)
      : "/test1.mp4";
  const imageSrc =
    typeof thumbnail === "object" && thumbnail?.url
      ? getMediaUrl(thumbnail.url)
      : "/test1.png";
  const imageAlt =
    typeof thumbnail === "object" && thumbnail?.alt
      ? thumbnail.alt
      : "Testimonio";
  return { videoSrc, imageSrc, imageAlt };
}

export function TestimonialsSection(props?: Partial<TestimonialsBlock> | null) {
  const label = props?.label ?? "Testimonios";
  const title = props?.title ?? "Lo que dicen nuestros alumnos";
  const testimonials = props?.testimonials?.length ? props.testimonials : null;

  const items = testimonials
    ? testimonials.map((t) => ({
        ...getTestimonialMedia(t),
        quote: t.quote ?? "",
        name: t.authorName ?? "",
        role: t.authorRole ?? "",
      }))
    : DEFAULT_TESTIMONIALS;

  return (
    <section
      className="relative overflow-hidden bg-brand py-20 md:py-[120px] scroll-mt-[100px] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_10%_20%,color-mix(in_oklch,var(--brand-foreground)_20%,transparent)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,color-mix(in_oklch,var(--brand-foreground)_10%,transparent)_0%,transparent_40%)]"
      id="testimonios"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="relative z-10 mb-16 text-center">
          <span className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-foreground/90 before:h-0.5 before:w-10 before:bg-brand-foreground/90">
            {label}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-brand-foreground">
            {title}
          </h2>
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-2">
          {items.map((t, i) => (
            <div
              key={i}
              className="animate-on-scroll rounded-[20px] border border-brand-foreground/20 bg-brand-foreground/10 p-8 backdrop-blur transition hover:-translate-y-1 hover:bg-brand-foreground/15"
            >
              <PlayVideoTrigger
                videoSrc={t.videoSrc}
                className="relative mb-6 aspect-video cursor-pointer overflow-hidden rounded-xl before:absolute before:inset-0 before:z-10 before:bg-black/30 before:transition hover:before:bg-black/20"
              >
                <Image
                  src={t.imageSrc}
                  alt={t.imageAlt}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition hover:scale-105"
                />
                <div className="absolute left-1/2 top-1/2 z-20 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-destructive shadow-lg transition hover:scale-110 hover:animate-pulse">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-7 w-7 text-destructive-foreground"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </PlayVideoTrigger>
              <p className="mb-5 text-[1.05rem] italic leading-relaxed text-brand-foreground/90">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.imageSrc}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-brand-foreground/80 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-brand-foreground">{t.name}</h4>
                  <span className="text-sm text-brand-foreground/80">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
