import { Block } from "payload";

export const HeaderBlock: Block = {
  slug: "header",
  fields: [
    {
      name: "heading",
      type: "text",
      label: {
        en: "Heading",
        es: "Encabezado",
      },
      required: true,
    },
    {
      name: "subheading",
      type: "richText",
      label: {
        en: "Subheading",
        es: "Subencabezado",
      },
      required: true,
    },
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
  ],
  labels: {
    plural: {
      en: "Header Blocks",
      es: "Encabezado",
    },
    singular: {
      en: "Header Block",
      es: "Encabezado",
    },
  },
};
