import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      name: "copyrightText",
      type: "text",
      required: true,
    },
  ],
};
