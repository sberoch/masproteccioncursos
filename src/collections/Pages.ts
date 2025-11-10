import type { CollectionConfig } from "payload";
import { HeaderBlock } from "../blocks/HeaderBlock";
import { SHARED_BLOCKS } from "../globals/utils";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";

export const Pages: CollectionConfig = {
  slug: "pages",
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
              name: "layout",
              type: "blocks",
              blocks: [HeaderBlock, ...SHARED_BLOCKS],
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
