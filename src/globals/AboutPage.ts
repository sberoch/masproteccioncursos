import { GlobalConfig } from "payload";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";
import { CallToAction } from "../blocks/CallToAction/config";
import { MediaBlock } from "../blocks/MediaBlock/config";
import { Banner } from "../blocks/Banner/config";
import { Content } from "../blocks/Content/config";

export const AboutPage: GlobalConfig = {
  slug: "about",
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
              blocks: [Content, CallToAction, MediaBlock, Banner],
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
