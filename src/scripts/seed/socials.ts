import { Payload } from "payload";

export const seedSocials = async (payload: Payload) => {
  payload.logger.info(`— Seeding socials...`);
  await Promise.all([
    payload.create({
      collection: "socials",
      data: {
        url: "https://www.facebook.com",
        icon: "facebook",
      },
    }),
    payload.create({
      collection: "socials",
      data: {
        url: "https://www.instagram.com",
        icon: "instagram",
      },
    }),
    payload.create({
      collection: "socials",
      data: {
        url: "https://www.linkedin.com",
        icon: "linkedin",
      },
    }),
  ]);
};
