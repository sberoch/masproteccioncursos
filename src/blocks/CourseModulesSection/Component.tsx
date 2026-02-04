import type { CourseModulesBlock } from "@/payload-types";

const DEFAULT_MODULES = [
  {
    number: 1,
    title: "Fundamentos de Primeros Auxilios",
    description:
      "Aprende los principios básicos: evaluación de la escena, llamada a emergencias, y cómo mantener la calma para actuar eficazmente.",
  },
  {
    number: 2,
    title: "RCP - Reanimación Cardiopulmonar",
    description:
      "Domina las técnicas de RCP para adultos, niños y bebés. Practica las compresiones y ventilaciones que pueden salvar una vida.",
  },
  {
    number: 3,
    title: "Uso del DEA (Desfibrilador)",
    description:
      "Aprende a utilizar un Desfibrilador Externo Automático, un dispositivo que puede duplicar las posibilidades de supervivencia.",
  },
  {
    number: 4,
    title: "Atención de Heridas y Hemorragias",
    description:
      "Técnicas para controlar sangrados, limpiar y vendar heridas, y reconocer cuándo una lesión requiere atención médica urgente.",
  },
  {
    number: 5,
    title: "Emergencias Respiratorias",
    description:
      "Manejo de atragantamientos (maniobra de Heimlich), crisis asmáticas, y otras situaciones que comprometen la respiración.",
  },
  {
    number: 6,
    title: "Práctica y Certificación",
    description:
      "Sesiones prácticas con maniquíes y simulaciones reales. Al finalizar, recibirás tu certificado de formación en primeros auxilios.",
  },
];

export function CourseModulesSection(
  props?: Partial<CourseModulesBlock> | null
) {
  const label = props?.label ?? "Contenido del Curso";
  const title = props?.title ?? "Todo lo que aprenderás";
  const subtitle =
    props?.subtitle ??
    "Un programa completo y práctico diseñado para que puedas actuar con confianza en cualquier emergencia.";
  const modules = props?.modules?.length ? props.modules : DEFAULT_MODULES;

  return (
    <section
      className="relative bg-linear-to-b from-[#f9fafb] to-white py-20 md:py-[120px] scroll-mt-[100px]"
      id="curso"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto mb-16 max-w-[700px] text-center">
          <span className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0f4ba3] before:h-0.5 before:w-10 before:bg-[#0f4ba3]">
            {label}
          </span>
          <h2 className="font-display mb-4 text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-[#111827]">
            {title}
          </h2>
          <p className="mt-4 text-lg text-[#4b5563]">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, i) => (
            <div
              key={i}
              className="group animate-on-scroll relative overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl before:absolute before:left-0 before:right-0 before:top-0 before:h-1 before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-[#0f4ba3] before:to-[#66b4e4] before:transition group-hover:before:scale-x-100"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#66b4e4] bg-gradient-to-br from-[#e8f4fc] to-white font-display text-xl text-[#0f4ba3]">
                {mod.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#1f2937]">
                {mod.title}
              </h3>
              <p className="text-[#4b5563] text-[0.95rem] leading-relaxed">
                {mod.description ?? ""}
              </p>
              <svg
                className="absolute bottom-5 right-5 h-10 w-10 text-[#0f4ba3] opacity-10"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
