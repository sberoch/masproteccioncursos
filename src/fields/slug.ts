import type { Field } from "payload";

import { formatSlug } from "@/utilities/formatSlug";

export const slugField = (sourceField: string = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  label: {
    en: "Slug",
    es: "Slug",
  },
  admin: {
    position: "sidebar",
    readOnly: true,
    description: {
      en: "Auto-generated URL-friendly identifier",
      es: "Identificador amigable para URL generado automaticamente",
    },
  },
  hooks: {
    beforeValidate: [
      ({ data, value, originalDoc }) => {
        // If slug is provided, use it; otherwise generate from source field
        if (typeof value === "string" && value.length > 0) {
          return formatSlug(value);
        }

        const sourceValue = data?.[sourceField];
        if (typeof sourceValue === "string" && sourceValue.length > 0) {
          return formatSlug(sourceValue);
        }

        // Keep existing slug if editing
        return originalDoc?.slug || value;
      },
    ],
  },
});
