import type { PricingBlock } from "@/payload-types";
import Link from "next/link";

const DEFAULT_INCLUDES = [
  "6 módulos teórico-prácticos",
  "8 horas de formación presencial",
  "Práctica con maniquíes y DEA",
  "Material didáctico incluido",
  "Certificado de formación",
  "Soporte post-curso",
];

export function PricingSection(props?: Partial<PricingBlock> | null) {
  const label = props?.label ?? "Inversión";
  const title = props?.title ?? "Todo lo que incluye el curso";
  const description =
    props?.description ??
    "Una formación completa y práctica que te preparará para actuar con confianza en situaciones de emergencia.";
  const includes = props?.includes?.length
    ? props.includes.map((i) => i.text)
    : DEFAULT_INCLUDES;
  const priceLabel = props?.priceLabel ?? "Curso Completo";
  const priceCurrency = props?.priceCurrency ?? "$";
  const priceValue = props?.priceValue ?? "79.999";
  const pricePeriod = props?.pricePeriod ?? "Pago único · Acceso completo";
  const ctaLabel = props?.ctaLabel ?? "Inscribirme Ahora";
  const ctaHref = props?.ctaHref ?? "#contacto";
  const guaranteeText =
    props?.guaranteeText ??
    "Garantía de satisfacción: si no quedas conforme, te devolvemos tu dinero";

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-muted to-background py-20 md:py-[120px] scroll-mt-[100px] before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent"
      id="inscripcion"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand before:h-0.5 before:w-10 before:bg-brand">
              {label}
            </span>
            <h2 className="font-display mb-5 text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-foreground">
              {title}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="grid gap-4">
              {includes.map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition hover:translate-x-2 hover:border-brand hover:shadow-md"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] bg-brand-muted [&>svg]:h-[22px] [&>svg]:w-[22px] [&>svg]:text-brand">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl border border-border bg-card p-10 text-center shadow-xl before:absolute before:left-1/2 before:top-0 before:h-1 before:w-[100px] before:-translate-x-1/2 before:rounded before:bg-gradient-to-r before:from-brand before:to-brand-hover">
              <span className="mb-6 inline-block rounded-full bg-brand-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                {priceLabel}
              </span>
              <div className="mb-2">
                <span className="align-top text-3xl font-semibold text-muted-foreground">
                  {priceCurrency}
                </span>
                <span className="font-semibold tracking-tight text-foreground text-5xl leading-none">
                  {priceValue}
                </span>
              </div>
              <p className="mb-8 text-muted-foreground">{pricePeriod}</p>

              <div className="mb-6">
                <Link
                  href={ctaHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-8 py-[18px] text-lg font-semibold text-brand-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-xl"
                >
                  {ctaLabel}
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
              </div>

              <div className="flex items-center justify-center gap-2.5 rounded-xl bg-muted p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-6 w-6 flex-shrink-0 text-brand"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-left text-sm text-muted-foreground">
                  {guaranteeText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
