import { GlobalConfig } from "payload";
import { revalidateHeader } from "../hooks/revalidateHeader";
import { link } from "@/fields/link";
import { getServerSideURL } from "@/utilities/getURL";

export const Header: GlobalConfig = {
  slug: "header",
  label: {
    en: "Header",
    es: "Header",
  },
  admin: {
    group: {
      en: "Layout",
      es: "Estructura del sitio",
    },
    livePreview: {
      url: `${getServerSideURL()}`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      label: {
        en: "Logo",
        es: "Logo",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "navItems",
      label: {
        en: "Navigation Items",
        es: "Navegación",
      },
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/components/payload/header/row-label#RowLabel",
        },
      },
    },
    {
      name: "cta",
      label: {
        en: "Call to Action",
        es: "Llamada a la acción (CTA)",
      },
      type: "group",
      fields: [
        {
          name: "label",
          label: {
            en: "Label",
            es: "Etiqueta",
          },
          type: "text",
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
