import type { CollectionConfig } from "payload";

import { isAdmin } from "../access/isAdmin";
import { isAdminOrSelfUser } from "../access/isAdminOrSelfUser";

/** Allow create: logged-in users (e.g. admins), or unauthenticated only when creating a student (public registration). */
function allowCreateOrStudentRegistration({
  req,
  data,
}: {
  req: { user?: { id: number; role: string } | null };
  data?: { role?: string };
}) {
  if (req.user) return true;
  if (!req.user && data?.role === "student") return true;
  return false;
}

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: isAdmin,
    create: allowCreateOrStudentRegistration,
    delete: isAdmin,
    read: isAdminOrSelfUser,
    update: isAdminOrSelfUser,
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
    {
      name: "enrollmentStatus",
      type: "select",
      label: {
        en: "Enrollment status",
        es: "Estado de inscripcion",
      },
      admin: {
        description: {
          en: "For students: pending until payment/activation. Admins ignore.",
          es: "Para estudiantes: pendiente hasta pago/activacion. Los admins lo ignoran.",
        },
      },
      options: [
        { label: { en: "Pending", es: "Pendiente" }, value: "pending" },
        { label: { en: "Active", es: "Activo" }, value: "active" },
        { label: { en: "Cancelled", es: "Cancelado" }, value: "cancelled" },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === "create" && !req.user) {
          return {
            ...data,
            role: "student",
            enrollmentStatus: data?.enrollmentStatus ?? "pending",
          };
        }
        return data;
      },
    ],
  },
  timestamps: true,
};
