import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const CollectionItemListBlock: Block = {
  slug: "collectionItemList",
  interfaceName: "CollectionItemListBlock",
  labels: {
    plural: {
      en: "Collection Item Lists",
      es: "Bloques de elementos de colección",
    },
    singular: {
      en: "Collection Item List",
      es: "Bloque de elementos de colección",
    },
  },
  fields: [
    {
      name: "introContent",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: {
        en: "Intro content",
        es: "Contenido introductorio",
      },
    },
    {
      name: "populateBy",
      type: "select",
      defaultValue: "collection",
      options: [
        {
          label: {
            en: "Collection",
            es: "Colección",
          },
          value: "collection",
        },
        {
          label: {
            en: "Individual Selection",
            es: "Selección individual",
          },
          value: "selection",
        },
      ],
      label: {
        en: "Populate By",
        es: "Rellenar por",
      },
    },
    {
      name: "relationTo",
      type: "select",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      defaultValue: "work-items",
      label: {
        en: "Collection to show items from",
        es: "Colección para mostrar elementos",
      },
      options: [
        {
          label: {
            en: "Work Items",
            es: "Trabajos",
          },
          value: "work-items",
        },
        {
          label: {
            en: "Services",
            es: "Servicios",
          },
          value: "services",
        },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      hasMany: true,
      label: {
        en: "Categories to show items from",
        es: "Categorías para mostrar elementos",
      },
      relationTo: "categories",
    },
    {
      name: "limit",
      type: "number",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
        step: 1,
      },
      defaultValue: 10,
      label: {
        en: "Number of items to show",
        es: "Número de elementos a mostrar",
      },
    },
    {
      name: "selectedDocs",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "selection",
      },
      hasMany: true,
      label: {
        en: "Selection",
        es: "Selección",
      },
      relationTo: ["work-items"],
    },
  ],
};
