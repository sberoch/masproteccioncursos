import { GlobalConfig } from "payload";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";
import { SHARED_BLOCKS } from "./utils";

export const ServicesPage: GlobalConfig = {
  slug: "services",
  admin: {
    group: "Main pages",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "content",
          label: "Content",
          fields: [
            {
              name: "heading",
              type: "text",
              required: true,
            },
            {
              name: "subheading",
              type: "text",
            },
            {
              name: "backgroundImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "blocks",
              type: "blocks",
              blocks: [...SHARED_BLOCKS],
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
};
