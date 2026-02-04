import type { Block } from "payload";

export const PricingBlock: Block = {
  slug: "pricing",
  labels: {
    singular: { en: "Pricing Section", es: "Sección Precios" },
    plural: { en: "Pricing Sections", es: "Secciones Precios" },
  },
  interfaceName: "PricingBlock",
  fields: [
    {
      name: "label",
      type: "text",
      label: { en: "Label", es: "Etiqueta" },
    },
    {
      name: "title",
      type: "text",
      label: { en: "Title", es: "Título" },
    },
    {
      name: "description",
      type: "textarea",
      label: { en: "Description", es: "Descripción" },
    },
    {
      name: "includes",
      type: "array",
      label: { en: "What's included", es: "Qué incluye" },
      fields: [
        {
          name: "text",
          type: "text",
          label: { en: "Item", es: "Elemento" },
          required: true,
        },
      ],
      labels: {
        singular: { en: "Include item", es: "Elemento" },
        plural: { en: "Include items", es: "Elementos" },
      },
    },
    {
      name: "priceLabel",
      type: "text",
      label: { en: "Price label", es: "Etiqueta del precio" },
      admin: {
        description: { en: "e.g. Curso Completo", es: "ej. Curso Completo" },
      },
    },
    {
      name: "priceCurrency",
      type: "text",
      label: { en: "Currency symbol", es: "Símbolo de moneda" },
      admin: { description: { en: "e.g. $", es: "ej. $" } },
    },
    {
      name: "priceValue",
      type: "text",
      label: { en: "Price value", es: "Valor del precio" },
    },
    {
      name: "pricePeriod",
      type: "text",
      label: { en: "Price period", es: "Período" },
      admin: {
        description: {
          en: "e.g. Pago único · Acceso completo",
          es: "ej. Pago único · Acceso completo",
        },
      },
    },
    {
      name: "ctaLabel",
      type: "text",
      label: { en: "CTA button label", es: "Texto del botón" },
    },
    {
      name: "ctaHref",
      type: "text",
      label: { en: "CTA button link", es: "Enlace del botón" },
    },
    {
      name: "guaranteeText",
      type: "textarea",
      label: { en: "Guarantee text", es: "Texto de garantía" },
    },
  ],
};
