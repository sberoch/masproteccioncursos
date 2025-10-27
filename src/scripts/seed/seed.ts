import config from "@/payload.config";
import { CollectionSlug, getPayload, Payload } from "payload";
import { seedContactForm } from "./contact-form";
import { seedLayout } from "./layout";
import { seedMainPages } from "./main-pages";
import { seedUsers } from "./users";

const collections: CollectionSlug[] = [
  "users",
  "media",
  "pages",
  "forms",
  "form-submissions",
] as const;

const clear = async (payload: Payload) => {
  payload.logger.info(`— Clearing collections...`);
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
};

export const seed = async (payload: Payload) => {
  await clear(payload);
  await seedUsers(payload);
  await seedLayout(payload);
  await seedMainPages(payload);
  await seedContactForm(payload);
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
