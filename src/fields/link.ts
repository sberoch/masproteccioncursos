import type { CollectionSlug, Field, GroupField } from "payload";

import deepMerge from "@/utilities/deepMerge";

export type LinkAppearances = "default" | "outline";

export const appearanceOptions: Record<
  LinkAppearances,
  { label: string; value: string }
> = {
  default: {
    label: "Default",
    value: "default",
  },
  outline: {
    label: "Outline",
    value: "outline",
  },
};

export type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Partial<GroupField>;
}) => Field;

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: "link",
    label: {
      en: "Link",
      es: "Enlace",
    },
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            label: {
              en: "Type",
              es: "Tipo",
            },
            type: "radio",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            defaultValue: "reference",
            options: [
              {
                label: {
                  en: "Internal link",
                  es: "Enlace interno",
                },
                value: "reference",
              },
              {
                label: {
                  en: "Custom URL",
                  es: "URL personalizada",
                },
                value: "custom",
              },
            ],
          },
          {
            name: "newTab",
            label: {
              en: "Open in new tab",
              es: "Abrir en una nueva pestaña",
            },
            type: "checkbox",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      label: {
        en: "Document to link to",
        es: "Documento al que se enlaza",
      },
      relationTo: ["pages"] as CollectionSlug[],
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: {
        en: "Custom URL",
        es: "URL personalizada",
      },
      required: true,
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }));

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          admin: {
            width: "50%",
          },
          label: {
            en: "Label",
            es: "Etiqueta",
          },
          required: true,
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push({
      name: "appearance",
      type: "select",
      admin: {
        description: {
          en: "Choose how the link should be rendered.",
          es: "Elige cómo se debe mostrar el enlace.",
        },
      },
      defaultValue: "default",
      options: appearanceOptionsToUse,
    });
  }

  return deepMerge(linkResult, overrides);
};
