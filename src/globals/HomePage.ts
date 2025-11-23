import { GlobalConfig } from "payload";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";
import { SHARED_BLOCKS } from "./utils";
import { revalidateHomePage } from "@/hooks/revalidateHomePage";
import { getServerSideURL } from "@/utilities/getURL";

export const HomePage: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  admin: {
    group: {
      en: "Main pages",
      es: "Páginas principales",
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
      name: "title",
      label: {
        en: "Title",
        es: "Título",
      },
      type: "text",
      required: true,
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
              name: "blocks",
              label: {
                en: "Blocks",
                es: "Bloques",
              },
              type: "blocks",
              blocks: [...SHARED_BLOCKS],
              labels: {
                plural: {
                  en: "Blocks",
                  es: "Bloques",
                },
                singular: {
                  en: "Block",
                  es: "Bloque",
                },
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
  hooks: {
    afterChange: [revalidateHomePage],
  },
};
