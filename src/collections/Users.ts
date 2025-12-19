import type { CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";
import { isAdmin } from "../access/isAdmin";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: isAdmin,
    create: authenticated,
    delete: isAdmin,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email", "role"],
    useAsTitle: "name",
    group: {
      en: "Users & Progress",
      es: "Usuarios y Progreso",
    },
  },
  auth: true,
  labels: {
    singular: {
      en: "User",
      es: "Usuario",
    },
    plural: {
      en: "Users",
      es: "Usuarios",
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        en: "Name",
        es: "Nombre",
      },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "admin",
      label: {
        en: "Role",
        es: "Rol",
      },
      options: [
        {
          label: {
            en: "Student",
            es: "Estudiante",
          },
          value: "student",
        },
        {
          label: {
            en: "Admin",
            es: "Administrador",
          },
          value: "admin",
        },
      ],
      admin: {
        description: {
          en: "Students can only access the frontend. Admins can access the admin panel.",
          es: "Los estudiantes solo pueden acceder al frontend. Los administradores pueden acceder al panel de administracion.",
        },
      },
    },
  ],
  timestamps: true,
};
