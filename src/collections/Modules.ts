import type { CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";
import { isAdmin } from "../access/isAdmin";

export const Modules: CollectionConfig = {
  slug: "modules",
  labels: {
    singular: {
      en: "Module",
      es: "Modulo",
    },
    plural: {
      en: "Modules",
      es: "Modulos",
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "course", "position"],
    group: {
      en: "Course Management",
      es: "Gestion de Cursos",
    },
  },
  access: {
    read: authenticated,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  defaultSort: "position",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        es: "Titulo",
      },
    },
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      label: {
        en: "Course",
        es: "Curso",
      },
      admin: {
        position: "sidebar",
      },
      index: true,
    },
    {
      name: "position",
      type: "number",
      required: true,
      defaultValue: 0,
      label: {
        en: "Position",
        es: "Posicion",
      },
      admin: {
        description: {
          en: "Order within the course (lower numbers appear first)",
          es: "Orden dentro del curso (numeros menores aparecen primero)",
        },
      },
      index: true,
    },
  ],
  timestamps: true,
};
