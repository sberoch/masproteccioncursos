import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const FormBlock: Block = {
  slug: "formBlock",
  interfaceName: "FormBlock",
  labels: {
    plural: {
      en: "Form Blocks",
      es: "Formularios",
    },
    singular: {
      en: "Form Block",
      es: "Formulario",
    },
  },
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
      label: {
        en: "Form",
        es: "Formulario",
      },
    },
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
  ],
  graphQL: {
    singularName: "FormBlock",
  },
};
