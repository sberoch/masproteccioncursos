"use client";

import type { FAQBlock } from "@/payload-types";
import { useState } from "react";
import { cn } from "@/utilities";

const DEFAULT_ITEMS = [
  {
    question: "¿Necesito conocimientos previos para tomar el curso?",
    answer:
      "No, el curso está diseñado para principiantes. Comenzamos desde los conceptos básicos y avanzamos gradualmente. No necesitas ninguna experiencia previa en primeros auxilios o el área de la salud.",
  },
  {
    question: "¿Cuánto dura el curso?",
    answer:
      "El curso completo tiene una duración de 8 horas, distribuidas en sesiones teóricas y prácticas. Las fechas y horarios se coordinan según la disponibilidad del grupo.",
  },
  {
    question: "¿El certificado tiene validez oficial?",
    answer:
      "Sí, al completar el curso recibirás un certificado de formación en primeros auxilios avalado por nuestra institución. Este certificado demuestra que has completado la formación teórico-práctica requerida.",
  },
  {
    question: "¿El curso es presencial o virtual?",
    answer:
      "El curso es presencial, lo cual es fundamental para las prácticas con maniquíes y simulaciones. La práctica hands-on es esencial para desarrollar las habilidades necesarias en primeros auxilios.",
  },
  {
    question: "¿Qué incluye el precio del curso?",
    answer:
      "El precio incluye: acceso a todas las clases teóricas y prácticas, material didáctico, uso de maniquíes y equipos de práctica, certificado de participación, y soporte post-curso para resolver dudas.",
  },
  {
    question: "¿Tienen política de reembolso?",
    answer:
      "Sí, ofrecemos garantía de satisfacción. Si por algún motivo no quedas conforme con el curso después de la primera sesión, te devolvemos el 100% de tu inversión sin hacer preguntas.",
  },
];

export function FAQSection(props?: Partial<FAQBlock> | null) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const label = props?.label ?? "Preguntas Frecuentes";
  const title = props?.title ?? "Resolvemos tus dudas";
  const items = props?.items?.length
    ? props.items.map((i) => ({ question: i.question, answer: i.answer }))
    : DEFAULT_ITEMS;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="bg-[#f9fafb] py-20 md:py-[120px] scroll-mt-[100px]"
      id="faq"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto mb-16 max-w-[600px] text-center">
          <span className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0f4ba3] before:h-0.5 before:w-10 before:bg-[#0f4ba3]">
            {label}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-normal leading-tight text-[#111827]">
            {title}
          </h2>
        </div>

        <div className="mx-auto max-w-[800px]">
          {items.map((item, index) => (
            <div
              key={index}
              className="animate-on-scroll mb-4 overflow-hidden rounded-xl border border-[#f3f4f6] bg-white shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 bg-transparent px-6 py-6 text-left text-lg font-semibold text-[#1f2937] transition hover:text-[#0f4ba3]"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                {item.question}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className={cn(
                    "h-6 w-6 flex-shrink-0 text-[#0f4ba3] transition",
                    openIndex === index && "rotate-180"
                  )}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-[max-height] duration-300 ease-out",
                  openIndex === index ? "max-h-[500px]" : "max-h-0"
                )}
              >
                <div className="px-6 pb-6 pt-0 text-[#4b5563] leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
