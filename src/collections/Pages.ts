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
  labels: {
    singular: {
      en: "Page",
      es: "Página",
    },
    plural: {
      en: "Pages",
      es: "Páginas",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        es: "Título",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      label: {
        en: "Slug",
        es: "Slug",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "content",
          label: {
            en: "Content",
            es: "Contenido",
          },
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [HeaderBlock, ...SHARED_BLOCKS],
              label: {
                en: "Content",
                es: "Contenido",
              },
            },
          ],
        },
        {
          name: "meta",
          label: {
            en: "SEO",
            es: "SEO",
          },
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: {
                  en: "Title",
                  es: "Título",
                },
              },
            }),
            MetaImageField({
              relationTo: "media",
              overrides: {
                label: {
                  en: "Image",
                  es: "Imagen",
                },
              },
            }),
            MetaDescriptionField({
              overrides: {
                label: {
                  en: "Description",
                  es: "Descripción",
                },
              },
            }),
          ],
        },
      ],
    },
  ],
};
