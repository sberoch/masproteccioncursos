import type { AboutInstructorBlock } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Image from "next/image";

const DEFAULT_LABEL = "Tu Instructora";
const DEFAULT_TITLE = "Milagros Perez";
const DEFAULT_BIO = [
  "Soy Instructora Internacional de Primeros Auxilios con más de 10 años de experiencia formando a personas en técnicas que salvan vidas. Como voluntaria socorrista de Cruz Roja, he atendido emergencias reales y sé exactamente qué conocimientos necesitas para actuar con seguridad y eficacia.",
  "Mi pasión es transformar el miedo a las emergencias en confianza y preparación. En este curso, te enseñaré todo lo que necesitas saber de forma práctica y accesible.",
];

const DEFAULT_CREDENTIAL_ICON = (
  <>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </>
);

const DEFAULT_CREDENTIALS: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Instructora Internacional",
    desc: "Certificación avalada internacionalmente en primeros auxilios y RCP",
    icon: (
      <>
        <circle cx={12} cy={8} r={5} />
        <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
      </>
    ),
  },
  {
    title: "Voluntaria Cruz Roja",
    desc: "Socorrista activa con experiencia en emergencias reales",
    icon: (
      <>
        <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" />
        <rect x={8} y={8} width={8} height={8} rx={1} />
      </>
    ),
  },
  {
    title: "+500 Alumnos Formados",
    desc: "Personas preparadas para actuar en situaciones de emergencia",
    icon: DEFAULT_CREDENTIAL_ICON,
  },
];

export function AboutInstructorSection(
  props?: Partial<AboutInstructorBlock> | null
) {
  const label = props?.label ?? DEFAULT_LABEL;
  const title = props?.title ?? DEFAULT_TITLE;
  const image = props?.image;
  const imageUrl =
    typeof image === "object" && image?.url
      ? getMediaUrl(image.url)
      : "/instructor.jpg";
  const imageAlt = typeof image === "object" && image?.alt ? image.alt : title;
  const bioParagraphs = props?.bioParagraphs
    ?.map((p) => p?.paragraph)
    .filter(Boolean) as string[] | undefined;
  const bio = bioParagraphs?.length ? bioParagraphs : DEFAULT_BIO;
  const credentials = props?.credentials?.length
    ? props.credentials.map((c) => ({
        title: c.title,
        desc: c.description ?? "",
        icon: DEFAULT_CREDENTIAL_ICON,
      }))
    : DEFAULT_CREDENTIALS;

  return (
    <section
      className="relative bg-background py-20 md:py-[120px] scroll-mt-[100px] before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent"
      id="sobre-mi"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid gap-12 items-center lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[20px] shadow-xl before:absolute before:inset-0 before:z-10 before:rounded-[20px] before:border-[3px] before:border-brand before:opacity-50">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={600}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-8 -right-8 -z-10 h-[150px] w-[150px] rounded-[20px] bg-gradient-to-br from-brand to-brand-hover opacity-30"
              aria-hidden
            />
          </div>

          <div className="py-5">
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand before:h-0.5 before:w-10 before:bg-brand">
              {label}
            </span>
            <h2 className="font-display mb-6 text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-foreground">
              {title}
            </h2>

            {bio.map((paragraph, i) => (
              <p key={i} className="mb-8 text-lg text-muted-foreground">
                {paragraph}
              </p>
            ))}

            <div className="grid gap-4">
              {credentials.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl bg-muted p-4 transition hover:translate-x-2 hover:bg-brand-muted"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-card shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-6 w-6 text-brand"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
