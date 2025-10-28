import { GlobalConfig } from "payload";
import { link } from "@/fields/link";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      name: "content",
      type: "richText",
    },
    {
      name: "navigation",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "links",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel:
                "@/components/footer/row-label-navigation#RowLabelNavigation",
            },
          },
        },
      ],
    },
    {
      name: "socialMedia",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "url",
          type: "text",
        },
        {
          name: "icon",
          type: "select",
          options: [
            {
              label: "Facebook",
              value: "facebook",
            },
            {
              label: "Instagram",
              value: "instagram",
            },
            {
              label: "Twitter",
              value: "twitter",
            },
            {
              label: "LinkedIn",
              value: "linkedin",
            },
            {
              label: "YouTube",
              value: "youtube",
            },
            {
              label: "TikTok",
              value: "tiktok",
            },
            {
              label: "Pinterest",
              value: "pinterest",
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/components/footer/row-label-socials#RowLabelSocials",
        },
      },
    },
  ],
};
