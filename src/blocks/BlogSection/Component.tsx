import type { BlogBlock } from "@/payload-types";
import Link from "next/link";

const DEFAULT_CARDS = [
  {
    category: "RCP",
    date: "15 Dic 2024",
    title: "¿Cada cuánto debo renovar mi certificación en RCP?",
    excerpt:
      "Mantener tus habilidades actualizadas es crucial. Te explicamos la frecuencia recomendada para recertificarte.",
    href: "#",
  },
  {
    category: "Consejos",
    date: "10 Dic 2024",
    title:
      "5 elementos que no pueden faltar en tu botiquín de primeros auxilios",
    excerpt:
      "Un botiquín bien equipado puede marcar la diferencia. Conoce los elementos esenciales que debes tener siempre a mano.",
    href: "#",
  },
  {
    category: "DEA",
    date: "5 Dic 2024",
    title: "¿Qué es un DEA y por qué deberías saber usarlo?",
    excerpt:
      "El Desfibrilador Externo Automático puede duplicar las posibilidades de supervivencia. Aprende por qué es tan importante.",
    href: "#",
  },
];

export function BlogSection(props?: Partial<BlogBlock> | null) {
  const label = props?.label ?? "Blog";
  const title = props?.title ?? "Últimas publicaciones";
  const viewAllLabel = props?.viewAllLabel ?? "Ver todas las publicaciones";
  const viewAllHref = props?.viewAllHref ?? "#";
  const cards = props?.cards?.length
    ? props.cards.map((c) => ({
        category: c.category ?? "",
        date: c.date ?? "",
        title: c.title,
        excerpt: c.excerpt ?? "",
        href: c.href ?? "#",
      }))
    : DEFAULT_CARDS;

  return (
    <section
      className="relative bg-white py-20 md:py-[120px] scroll-mt-[100px]"
      id="blog"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[500px]">
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0f4ba3] before:h-0.5 before:w-10 before:bg-[#0f4ba3]">
              {label}
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-[#111827]">
              {title}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-[#0f4ba3] bg-white px-7 py-3.5 text-base font-semibold text-[#0f4ba3] transition hover:bg-[#0f4ba3] hover:text-white"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={i}
              className="group animate-on-scroll overflow-hidden rounded-2xl border border-[#f3f4f6] bg-[#f9fafb] transition hover:-translate-y-2 hover:border-[#66b4e4] hover:shadow-xl"
            >
              <div className="relative flex h-[200px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8f4fc] to-[#f3f4f6] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-black/5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="h-16 w-16 text-[#66b4e4] opacity-50"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-[#e8f4fc] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0f4ba3]">
                    {card.category}
                  </span>
                  <span className="text-sm text-[#4b5563]">{card.date}</span>
                </div>
                <h3 className="mb-3 font-display text-xl leading-snug text-[#111827] transition group-hover:text-[#0f4ba3]">
                  {card.title}
                </h3>
                <p className="mb-4 text-[#4b5563] text-[0.95rem] leading-relaxed">
                  {card.excerpt}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f4ba3] transition hover:gap-2.5"
                >
                  Leer más
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <line x1={5} y1={12} x2={19} y2={12} />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
