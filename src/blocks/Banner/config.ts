import type { Block } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Banner: Block = {
  slug: "banner",
  fields: [
    {
      name: "style",
      label: {
        en: "Style",
        es: "Estilo",
      },
      type: "select",
      defaultValue: "info",
      options: [
        { label: { en: "Info", es: "Info" }, value: "info" },
        { label: { en: "Warning", es: "Advertencia" }, value: "warning" },
        { label: { en: "Error", es: "Error" }, value: "error" },
        { label: { en: "Success", es: "Éxito" }, value: "success" },
      ],
      required: true,
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: "BannerBlock",
};
