import { Payload } from "payload";

export const seedUsers = async (payload: Payload) => {
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
      role: "admin",
    },
  });
};
