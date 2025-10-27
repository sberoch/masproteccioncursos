import { CollectionSlug, getPayload, GlobalSlug, Payload } from "payload";
import config from "@/payload.config";
import { contactForm as contactFormData } from "./contact-form";

const globals: GlobalSlug[] = ["header", "footer"] as const;
const collections: CollectionSlug[] = [
  "users",
  "media",
  "pages",
  "forms",
  "form-submissions",
] as const;

export const seed = async (payload: Payload) => {
  payload.logger.info("Seeding database...");
  payload.logger.info(`— Clearing collections and globals...`);

  await Promise.all(
    collections.map((collection) =>
      payload.db.deleteMany({ collection, where: {} })
    )
  );

  await Promise.all(
    collections
      .filter((collection) =>
        Boolean(payload.collections[collection].config.versions)
      )
      .map((collection) => payload.db.deleteVersions({ collection, where: {} }))
  );

  payload.logger.info(`— Seeding admin user...`);
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in environment variables"
    );
  }

  await payload.create({
    collection: "users",
    data: {
      email: adminEmail,
      password: adminPassword,
    },
  });

  payload.logger.info(`— Seeding header...`);
  await payload.updateGlobal({
    slug: "header",
    data: {
      navItems: [
        {
          link: {
            type: "custom",
            label: "Work",
            url: "/work",
          },
        },
        {
          link: {
            type: "custom",
            label: "Services",
            url: "/services",
          },
        },
        {
          link: {
            type: "custom",
            label: "About",
            url: "/about",
          },
        },
      ],
      cta: {
        label: "Get in touch",
        link: {
          type: "custom",
          label: "Get in touch",
          url: "/contact",
        },
      },
    },
    context: {
      disableRevalidate: true,
    },
  });

  payload.logger.info(`— Seeding main pages...`);
  await payload.updateGlobal({
    slug: "about",
    data: {
      heading: "About us",
      subheading: "Get to know us",
    },
  });
  await payload.updateGlobal({
    slug: "contact",
    data: {
      heading: "Contact us",
      subheading: "Get in touch",
    },
  });
  await payload.updateGlobal({
    slug: "work",
    data: {
      heading: "Our work",
      subheading: "See our projects",
    },
  });

  payload.logger.info(`— Seeding contact form...`);

  const contactForm = await payload.create({
    collection: "forms",
    depth: 0,
    data: contactFormData,
  });
};

async function runSeed() {
  try {
    const payload = await getPayload({ config });
    await seed(payload);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
}

await runSeed();
