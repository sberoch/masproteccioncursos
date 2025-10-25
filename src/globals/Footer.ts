import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "copyrightText",
      type: "text",
      required: true,
    },
  ],
};
