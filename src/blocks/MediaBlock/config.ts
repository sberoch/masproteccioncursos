import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlock",
  labels: {
    plural: {
      en: "Media Blocks",
      es: "Multimedia",
    },
    singular: {
      en: "Media Block",
      es: "Multimedia",
    },
  },
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
      label: {
        en: "Media",
        es: "Multimedia",
      },
    },
  ],
};
