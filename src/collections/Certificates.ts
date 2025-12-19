import type { CollectionConfig } from "payload";

import { isAdminOrSelf } from "../access/isAdminOrSelf";

export const Certificates: CollectionConfig = {
  slug: "certificates",
  labels: {
    singular: {
      en: "Certificate",
      es: "Certificado",
    },
    plural: {
      en: "Certificates",
      es: "Certificados",
    },
  },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["user", "course", "issuedAt"],
    group: {
      en: "Users & Progress",
      es: "Usuarios y Progreso",
    },
  },
  access: {
    read: isAdminOrSelf,
    create: () => false, // System-only creation via hooks
    update: () => false,
    delete: () => false,
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
    },
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      label: {
        en: "Course",
        es: "Curso",
      },
      index: true,
    },
    {
      name: "quizAttempt",
      type: "relationship",
      relationTo: "quiz-attempts",
      required: true,
      label: {
        en: "Quiz Attempt",
        es: "Intento de cuestionario",
      },
    },
    {
      name: "externalCertificateId",
      type: "text",
      label: {
        en: "External Certificate ID",
        es: "ID de certificado externo",
      },
      admin: {
        description: {
          en: "ID from external certificate service (for future integration)",
          es: "ID del servicio de certificados externo (para integracion futura)",
        },
      },
    },
    {
      name: "externalCertificateUrl",
      type: "text",
      label: {
        en: "External Certificate URL",
        es: "URL de certificado externo",
      },
      admin: {
        description: {
          en: "URL to view/download certificate (for future integration)",
          es: "URL para ver/descargar certificado (para integracion futura)",
        },
      },
    },
    {
      name: "issuedAt",
      type: "date",
      required: true,
      label: {
        en: "Issued At",
        es: "Emitido el",
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
        // Unique constraint simulation: one certificate per user+course
        if (operation === "create" && data?.user && data?.course) {
          const existing = await req.payload.find({
            collection: "certificates",
            where: {
              and: [{ user: { equals: data.user } }, { course: { equals: data.course } }],
            },
            limit: 1,
          });
          if (existing.docs.length > 0) {
            throw new Error("Certificate already exists for this user and course");
          }
        }
        return data;
      },
    ],
  },
  timestamps: true,
};
