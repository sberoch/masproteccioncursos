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
      label: "Enable Intro Content",
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
      label: "Intro Content",
    },
    {
      name: "columnCount",
      type: "select",
      defaultValue: "4",
      options: [
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "5 Columns", value: "5" },
        { label: "6 Columns", value: "6" },
      ],
      admin: {
        description: "Number of columns for the logo grid",
      },
    },
    {
      name: "logos",
      type: "array",
      label: "Logos",
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
        },
        {
          name: "alt",
          type: "text",
          label: "Alt Text Override",
          admin: {
            description: "Optional. If not provided, will use the alt text from the media item.",
          },
        },
      ],
    },
  ],
  labels: {
    plural: "Client Logos Blocks",
    singular: "Client Logos Block",
  },
};
