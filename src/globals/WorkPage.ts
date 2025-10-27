import { GlobalConfig } from "payload";

export const WorkPage: GlobalConfig = {
  slug: "work",
  admin: {
    group: "Main pages",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "subheading",
      type: "text",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};
