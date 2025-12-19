import type { CollectionConfig } from "payload";

import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { isAdminOrSelfCreate } from "../access/isAdminOrSelfCreate";

export const LessonProgress: CollectionConfig = {
  slug: "lesson-progress",
  labels: {
    singular: {
      en: "Lesson Progress",
      es: "Progreso de leccion",
    },
    plural: {
      en: "Lesson Progress",
      es: "Progreso de lecciones",
    },
  },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["user", "lesson", "completed", "completedAt"],
    group: {
      en: "Users & Progress",
      es: "Usuarios y Progreso",
    },
  },
  access: {
    read: isAdminOrSelf,
    create: isAdminOrSelfCreate,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: {
        en: "User",
        es: "Usuario",
      },
      index: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req, operation, value }) => {
            if (operation === "create" && !value && req.user) {
              return req.user.id;
            }
            return value;
          },
        ],
      },
    },
    {
      name: "lesson",
      type: "relationship",
      relationTo: "lessons",
      required: true,
      label: {
        en: "Lesson",
        es: "Leccion",
      },
      index: true,
    },
    {
      name: "completed",
      type: "checkbox",
      defaultValue: false,
      label: {
        en: "Completed",
        es: "Completado",
      },
    },
    {
      name: "completedAt",
      type: "date",
      label: {
        en: "Completed At",
        es: "Completado el",
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        // Unique constraint simulation: check if user+lesson combo exists
        if (operation === "create" && data?.user && data?.lesson) {
          const existing = await req.payload.find({
            collection: "lesson-progress",
            where: {
              and: [{ user: { equals: data.user } }, { lesson: { equals: data.lesson } }],
            },
            limit: 1,
          });
          if (existing.docs.length > 0) {
            throw new Error("Progress record already exists for this user and lesson");
          }
        }
        return data;
      },
    ],
  },
  timestamps: true,
};
