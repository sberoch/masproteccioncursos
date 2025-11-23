import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const ClientLogosBlock: Block = {
  slug: "clientLogos",
  interfaceName: "ClientLogosBlock",
  fields: [
    {
      name: "enableIntro",
      type: "checkbox",
      label: {
        en: "Enable Intro Content",
        es: "Habilitar contenido introductorio",
      },
    },
    {
      name: "introContent",
      type: "richText",
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: {
        en: "Intro Content",
        es: "Contenido introductorio",
      },
    },
    {
      name: "columnCount",
      type: "select",
      label: {
        en: "Column Count",
        es: "Número de columnas",
      },
      defaultValue: "4",
      options: [
        { label: { en: "3 Columns", es: "3 Columnas" }, value: "3" },
        { label: { en: "4 Columns", es: "4 Columnas" }, value: "4" },
        { label: { en: "5 Columns", es: "5 Columnas" }, value: "5" },
        { label: { en: "6 Columns", es: "6 Columnas" }, value: "6" },
      ],
      admin: {
        description: {
          en: "Number of columns for the logo grid",
          es: "Número de columnas para la cuadrícula de logos",
        },
      },
    },
    {
      name: "logos",
      type: "array",
      label: {
        en: "Logos",
        es: "Logos",
      },
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
          label: {
            en: "Logo",
            es: "Logo",
          },
        },
        {
          name: "alt",
          type: "text",
          label: {
            en: "Alt Text Override",
            es: "Texto alternativo (override)",
          },
          admin: {
            description: {
              en: "Optional. If not provided, will use the alt text from the media item.",
              es: "Opcional. Si no se proporciona, se usará el texto alternativo del elemento multimedia.",
            },
          },
        },
      ],
    },
  ],
  labels: {
    plural: {
      en: "Client Logos Blocks",
      es: "Bloques de logos de clientes",
    },
    singular: {
      en: "Client Logos Block",
      es: "Bloque de logos de clientes",
    },
  },
};
