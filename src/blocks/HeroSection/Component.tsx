import type { HeroBlock } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Image from "next/image";
import Link from "next/link";

const HERO_DEFAULTS = {
  badge: "Certificación Internacional",
  headline: "Aprende a",
  headlineHighlight: "salvar vidas",
  subtitle:
    "Curso completo de Primeros Auxilios dictado por una Instructora Internacional y voluntaria de Cruz Roja. Prepárate para actuar en emergencias.",
  primaryCtaLabel: "Inscribirse",
  primaryCtaHref: "#inscripcion",
  secondaryCtaLabel: "Ver Contenido",
  secondaryCtaHref: "#curso",
  imageBadgeTitle: "Cruz Roja",
  imageBadgeSubtitle: "Voluntaria Socorrista",
  defaultImageUrl: "/instructor.jpg",
  defaultImageAlt: "Milagros Perez - Instructora de Primeros Auxilios",
  stats: [
    { number: "500+", label: "Alumnos formados" },
    { number: "10+", label: "Años de experiencia" },
    { number: "100%", label: "Práctico" },
  ],
} as const;

function resolveHeroProps(props?: Partial<HeroBlock> | null) {
  const d = HERO_DEFAULTS;
  const image = props?.image;
  const imageUrl =
    typeof image === "object" && image?.url
      ? getMediaUrl(image.url)
      : d.defaultImageUrl;
  const imageAlt =
    typeof image === "object" && image?.alt ? image.alt : d.defaultImageAlt;
  return {
    badge: props?.badge ?? d.badge,
    headline: props?.headline ?? d.headline,
    headlineHighlight: props?.headlineHighlight ?? d.headlineHighlight,
    subtitle: props?.subtitle ?? d.subtitle,
    primaryCtaLabel: props?.primaryCtaLabel ?? d.primaryCtaLabel,
    primaryCtaHref: props?.primaryCtaHref ?? d.primaryCtaHref,
    secondaryCtaLabel: props?.secondaryCtaLabel ?? d.secondaryCtaLabel,
    secondaryCtaHref: props?.secondaryCtaHref ?? d.secondaryCtaHref,
    imageBadgeTitle: props?.imageBadgeTitle ?? d.imageBadgeTitle,
    imageBadgeSubtitle: props?.imageBadgeSubtitle ?? d.imageBadgeSubtitle,
    stats: props?.stats?.length ? props.stats : d.stats,
    imageUrl,
    imageAlt,
  };
}

export function HeroSection(props?: Partial<HeroBlock> | null) {
  const {
    badge,
    headline,
    headlineHighlight,
    subtitle,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    imageBadgeTitle,
    imageBadgeSubtitle,
    stats,
    imageUrl,
    imageAlt,
  } = resolveHeroProps(props);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-brand-muted via-background to-muted pt-[100px] py-20 md:py-[120px] scroll-mt-[100px]"
      id="inicio"
    >
      <div
        className="absolute -top-1/2 -right-1/5 z-0 h-[150%] w-[80%] -skew-x-15 bg-linear-to-br from-brand to-brand-hover opacity-10"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_80%,color-mix(in_oklch,var(--brand)_10%,transparent)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,color-mix(in_oklch,var(--brand)_8%,transparent)_0%,transparent_50%)]"
        aria-hidden
      />
      <div className="landing-hero-cross" aria-hidden />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6">
        <div className="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
          <div className="animate-[landing-slideInLeft_0.8s_ease_forwards]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="text-brand"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {badge}
            </div>

            <h1 className="font-display mb-6 text-foreground text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] font-bold">
              {headline}{" "}
              <span className="relative text-brand after:absolute after:bottom-1 after:left-0 after:right-0 after:h-2 after:rounded after:bg-brand/20 after:-z-10">
                {headlineHighlight}
              </span>{" "}
              con confianza
            </h1>

            <p className="mb-8 max-w-[500px] text-xl text-muted-foreground">
              {subtitle}
            </p>

            <div className="mb-12 flex flex-wrap gap-4">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-9 py-[18px] text-lg font-semibold text-brand-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-xl"
              >
                {primaryCtaLabel}
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <line x1={5} y1={12} x2={19} y2={12} />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand bg-card px-7 py-3.5 text-base font-semibold text-brand transition hover:bg-brand hover:text-brand-foreground"
              >
                {secondaryCtaLabel}
              </Link>
            </div>

            <div className="flex gap-10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-semibold leading-none text-brand">
                    {stat.number}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-[landing-slideInRight_0.8s_ease_forwards] opacity-0 [animation-delay:200ms] fill-mode-[forwards]">
            <div className="relative max-h-[600px] overflow-hidden rounded-3xl shadow-xl">
              <div className="absolute inset-0 z-10 bg-linear-to-br from-transparent from-60% to-brand/30" />
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={600}
                height={600}
                className="w-full h-auto object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 z-20 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-10 w-10 text-brand"
              >
                <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" />
                <rect x={8} y={8} width={8} height={8} rx={1} />
              </svg>
              <div className="text-sm font-semibold text-foreground">
                {imageBadgeTitle}
                <span className="block font-normal text-muted-foreground">
                  {imageBadgeSubtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
