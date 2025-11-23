import { GlobalConfig } from "payload";
import { link } from "@/fields/link";
import { revalidateFooter } from "@/hooks/revalidateFooter";
import { getServerSideURL } from "@/utilities/getURL";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: {
    en: "Footer",
    es: "Footer",
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
  fields: [
    {
      name: "content",
      label: {
        en: "Content",
        es: "Contenido",
      },
      type: "richText",
    },
    {
      name: "navigation",
      label: {
        en: "Navigation",
        es: "Navegación",
      },
      type: "group",
      fields: [
        {
          name: "title",
          label: {
            en: "Title",
            es: "Título",
          },
          type: "text",
        },
        {
          name: "links",
          label: {
            en: "Links",
            es: "Enlaces",
          },
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel:
                "@/components/payload/footer/row-label-navigation#RowLabelNavigation",
            },
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
