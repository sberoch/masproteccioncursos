import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const GalleryBlock: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlock",
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
      name: "images",
      type: "array",
      label: {
        en: "Images",
        es: "Imágenes",
      },
      labels: {
        plural: {
          en: "Images",
          es: "Imágenes",
        },
        singular: {
          en: "Image",
          es: "Imagen",
        },
      },
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: {
            en: "Image",
            es: "Imagen",
          },
        },
        {
          name: "caption",
          type: "text",
          label: {
            en: "Caption",
            es: "Descripción",
          },
          admin: {
            description: {
              en: "Optional caption to display below the image.",
              es: "Opcional. Descripción para mostrar debajo de la imagen.",
            },
          },
        },
      ],
    },
  ],
  labels: {
    plural: {
      en: "Gallery Blocks",
      es: "Galería",
    },
    singular: {
      en: "Gallery Block",
      es: "Galería",
    },
  },
};
