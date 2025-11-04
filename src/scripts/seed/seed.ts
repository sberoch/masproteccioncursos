import config from "@/payload.config";
import { getPayload, Payload } from "payload";
import { seedContactForm } from "./contact-form";
import { seedLayout } from "./layout";
import { seedMainPages } from "./main-pages";
import { seedUsers } from "./users";
import { seedSocials } from "./socials";

export const seed = async (payload: Payload) => {
  await seedUsers(payload);
  await seedLayout(payload);
  await seedMainPages(payload);
  await seedContactForm(payload);
  await seedSocials(payload);
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
