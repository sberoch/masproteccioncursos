import type { CollectionConfig } from "payload";

export const Socials: CollectionConfig = {
  slug: "socials",
  admin: {
    useAsTitle: "icon",
  },
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
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
      required: true,
    },
  ],
};
