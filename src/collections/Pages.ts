import type { CollectionConfig } from "payload";
import { HeaderBlock } from "../blocks/HeaderBlock";

export const Pages: CollectionConfig = {
  slug: "pages",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [HeaderBlock],
    },
  ],
};
