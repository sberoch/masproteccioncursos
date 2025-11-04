import { GlobalConfig } from "payload";
import { link } from "@/fields/link";
import { revalidateFooter } from "@/hooks/revalidateFooter";

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Layout",
  },
  fields: [
    {
      name: "content",
      type: "richText",
    },
    {
      name: "navigation",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "links",
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
