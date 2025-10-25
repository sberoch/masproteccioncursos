import { CollectionSlug, getPayload, GlobalSlug, Payload } from "payload";
import config from "@/payload.config";

const globals: GlobalSlug[] = ["header", "footer"] as const;
const collections: CollectionSlug[] = ["users", "media", "pages"] as const;

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
