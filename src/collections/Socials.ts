import type { CollectionConfig } from "payload";

export const Socials: CollectionConfig = {
  slug: "socials",
  admin: {
    useAsTitle: "icon",
  },
  labels: {
    singular: {
      en: "Social",
      es: "Red social",
    },
    plural: {
      en: "Socials",
      es: "Redes sociales",
    },
  },
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
      label: {
        en: "URL",
        es: "URL",
      },
    },
    {
      name: "icon",
      label: {
        en: "Icon",
        es: "Icono",
      },
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
