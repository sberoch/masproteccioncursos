// storage-adapter-import-placeholder
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Users } from "@/collections/Users";
import { AboutPage } from "@/globals/AboutPage";
import { ContactPage } from "@/globals/ContactPage";
import { Footer } from "@/globals/Footer";
import { Header } from "@/globals/Header";
import { getServerSideURL } from "@/utilities/getURL";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { buildConfig, PayloadRequest } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Socials } from "./collections/Socials";
import { HomePage } from "./globals/HomePage";
import { MainPage } from "./globals/interfaces";
import { Page } from "./payload-types";

const generateTitle: GenerateTitle<MainPage | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Payload Website Template`
    : "Payload Website Template";
};

const generateURL: GenerateURL<MainPage | Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, es },
  },
  admin: {
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: ["@/components/payload/before-login"],
      graphics: {
        Logo: "/components/payload/graphics/logo",
        Icon: "/components/payload/graphics/icon",
      },
    },
    avatar: "gravatar",
  },
  globals: [HomePage, AboutPage, ContactPage, Header, Footer],
  collections: [Pages, Media, Users, Socials],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    push: false,
    client: {
      url: process.env.DATABASE_URI || "",
    },
  }),
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
  sharp,
  cors: "*",
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({
      formOverrides: {
        labels: {
          plural: {
            en: "Forms",
            es: "Formularios",
          },
          singular: {
            en: "Form",
            es: "Formulario",
          },
        },
      },
      formSubmissionOverrides: {
        labels: {
          plural: {
            en: "Form Submissions",
            es: "Envíos de formularios",
          },
          singular: {
            en: "Form Submission",
            es: "Envío de formulario",
          },
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
});
