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
    singular: {
      en: "Work Item",
      es: "Elemento de portafolio",
    },
    plural: {
      en: "Work Items",
      es: "Elementos de portafolio",
    },
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
      label: {
        en: "Image/Video",
        es: "Imagen/Video",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        es: "Título",
      },
    },
    {
      name: "description",
      type: "richText",
      editor: defaultLexical,
      label: {
        en: "Description",
        es: "Descripción",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
      label: {
        en: "Category",
        es: "Categoría",
      },
    },
    {
      name: "client",
      type: "text",
      label: {
        en: "Client Name",
        es: "Nombre del cliente",
      },
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
