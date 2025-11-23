import { GlobalConfig } from "payload";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from "@payloadcms/plugin-seo/fields";
import { SHARED_BLOCKS } from "./utils";
import { revalidateServicesPage } from "@/hooks/revalidateServicesPage";
import { getServerSideURL } from "@/utilities/getURL";

export const ServicesPage: GlobalConfig = {
  slug: "services",
  label: {
    en: "Services",
    es: "Servicios",
  },
  admin: {
    group: {
      en: "Main pages",
      es: "Páginas principales",
    },
    livePreview: {
      url: `${getServerSideURL()}/services`,
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
      name: "slug",
      label: {
        en: "Slug",
        es: "Slug",
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
              name: "heading",
              label: {
                en: "Heading",
                es: "Encabezado",
              },
              type: "text",
              required: true,
            },
            {
              name: "subheading",
              label: {
                en: "Subheading",
                es: "Subencabezado",
              },
              type: "text",
            },
            {
              name: "backgroundImage",
              label: {
                en: "Background Image",
                es: "Imagen de fondo",
              },
              type: "upload",
              relationTo: "media",
            },
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
    afterChange: [revalidateServicesPage],
  },
};
