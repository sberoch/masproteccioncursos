import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { authenticated } from "../access/authenticated";
import { authenticatedOrPublished } from "../access/authenticatedOrPublished";
import { defaultLexical } from "../fields/defaultLexical";

export const WorkItems: CollectionConfig = {
  slug: "work-items",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "category", "client", "_status", "updatedAt"],
    useAsTitle: "title",
  },
  labels: {
    singular: "Work Item",
    plural: "Work Items",
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image/Video",
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      editor: defaultLexical,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "client",
      type: "text",
      label: "Client Name",
      admin: {
        position: "sidebar",
      },
    },
    slugField({
      position: undefined,
    }),
  ],
  timestamps: true,
};
