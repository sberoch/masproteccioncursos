// storage-adapter-import-placeholder
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Users } from "@/collections/Users";
import { AboutPage } from "@/globals/AboutPage";
import { ContactPage } from "@/globals/ContactPage";
import { Footer } from "@/globals/Footer";
import { Header } from "@/globals/Header";
import { ServicesPage } from "@/globals/ServicesPage";
import { WorkPage } from "@/globals/WorkPage";
import { getServerSideURL } from "@/utilities/getURL";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Categories } from "./collections/Categories";
import { WorkItems } from "./collections/WorkItems";
import { HomePage } from "./globals/HomePage";
import { MainPage } from "./globals/interfaces";
import { Page } from "./payload-types";
import { Socials } from "./collections/Socials";

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
  admin: {
    user: Users.slug,
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
  globals: [
    HomePage,
    AboutPage,
    ContactPage,
    WorkPage,
    ServicesPage,
    Header,
    Footer,
  ],
  collections: [WorkItems, Categories, Pages, Media, Users, Socials],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  cors: "*",
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({}),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
});
