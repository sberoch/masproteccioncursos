import type { Block, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "@/fields/link";

const columnFields: Field[] = [
  {
    name: "size",
    type: "select",
    label: {
      en: "Size",
      es: "Tamaño",
    },
    defaultValue: "full",
    options: [
      {
        label: {
          en: "One Third",
          es: "Un tercio",
        },
        value: "oneThird",
      },
      {
        label: {
          en: "Half",
          es: "Mitad",
        },
        value: "half",
      },
      {
        label: {
          en: "Two Thirds",
          es: "Dos tercios",
        },
        value: "twoThirds",
      },
      {
        label: {
          en: "Full",
          es: "Completo",
        },
        value: "full",
      },
    ],
  },
  {
    name: "richText",
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: false,
  },
  {
    name: "enableLink",
    type: "checkbox",
    label: {
      en: "Enable Link",
      es: "Habilitar enlace",
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink);
        },
      },
    },
  }),
];

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  labels: {
    plural: {
      en: "Content Blocks",
      es: "Contenido",
    },
    singular: {
      en: "Content Block",
      es: "Contenido",
    },
  },
  fields: [
    {
      name: "columns",
      label: {
        en: "Columns",
        es: "Columnas",
      },
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
      labels: {
        plural: {
          en: "Columns",
          es: "Columnas",
        },
        singular: {
          en: "Column",
          es: "Columna",
        },
      },
    },
  ],
};
