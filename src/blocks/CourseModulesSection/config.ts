import type { Block } from "payload";

export const CourseModulesBlock: Block = {
  slug: "courseModules",
  labels: {
    singular: { en: "Course Modules Section", es: "Sección Módulos del Curso" },
    plural: { en: "Course Modules Sections", es: "Secciones Módulos" },
  },
  interfaceName: "CourseModulesBlock",
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
      name: "subtitle",
      type: "textarea",
      label: { en: "Subtitle", es: "Subtítulo" },
    },
    {
      name: "modules",
      type: "array",
      label: { en: "Modules", es: "Módulos" },
      fields: [
        {
          name: "number",
          type: "number",
          label: { en: "Number", es: "Número" },
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: { en: "Title", es: "Título" },
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: { en: "Description", es: "Descripción" },
        },
      ],
      labels: {
        singular: { en: "Module", es: "Módulo" },
        plural: { en: "Modules", es: "Módulos" },
      },
    },
  ],
};
