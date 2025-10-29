import { GlobalConfig } from "payload";
import { revalidateHeader } from "../hooks/revalidateHeader";
import { link } from "@/fields/link";

export const Header: GlobalConfig = {
  slug: "header",
  admin: {
    group: "Layout",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "navItems",
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
      label: "Call to Action",
      type: "group",
      fields: [
        {
          name: "label",
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
