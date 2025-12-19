import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { isAdmin } from "../access/isAdmin";
import { isAdminOrPublished } from "../access/isAdminOrPublished";
import { slugField } from "../fields/slug";

export const Courses: CollectionConfig = {
  slug: "courses",
  labels: {
    singular: {
      en: "Course",
      es: "Curso",
    },
    plural: {
      en: "Courses",
      es: "Cursos",
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "isPublished", "passingScore", "createdBy"],
    group: {
      en: "Course Management",
      es: "Gestion de Cursos",
    },
  },
  access: {
    read: isAdminOrPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        es: "Titulo",
      },
    },
    slugField("title"),
    {
      name: "description",
      type: "richText",
      label: {
        en: "Description",
        es: "Descripcion",
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      label: {
        en: "Thumbnail",
        es: "Imagen de portada",
      },
      admin: {
        description: {
          en: "Course thumbnail image",
          es: "Imagen de portada del curso",
        },
      },
    },
    {
      name: "passingScore",
      type: "number",
      required: true,
      defaultValue: 70,
      min: 0,
      max: 100,
      label: {
        en: "Passing Score (%)",
        es: "Puntaje de aprobacion (%)",
      },
      admin: {
        description: {
          en: "Minimum percentage required to pass the final quiz",
          es: "Porcentaje minimo requerido para aprobar el examen final",
        },
      },
    },
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
      label: {
        en: "Published",
        es: "Publicado",
      },
      admin: {
        description: {
          en: "Only published courses are visible to students",
          es: "Solo los cursos publicados son visibles para los estudiantes",
        },
      },
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      label: {
        en: "Created By",
        es: "Creado por",
      },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ req, operation }) => {
            if (operation === "create" && req.user) {
              return req.user.id;
            }
          },
        ],
      },
    },
  ],
  timestamps: true,
};
