import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  labels: {
    singular: {
      en: "Category",
      es: "Categoría",
    },
    plural: {
      en: "Categories",
      es: "Categorías",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Title",
        es: "Título",
      },
      type: "text",
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
};
