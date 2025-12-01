import { Payload } from "payload";

export const seedMainPages = async (payload: Payload) => {
  payload.logger.info(`— Seeding main pages...`);
  await payload.updateGlobal({
    slug: "home",
    data: {
      title: "Home",
    },
    context: {
      disableRevalidate: true,
    },
  });
  await payload.updateGlobal({
    slug: "about",
    data: {
      title: "About us",
      slug: "about",
      content: {
        heading: "About us",
        subheading: "Get to know us",
      },
      meta: {
        title: "About us",
        description: "Get to know us",
      },
    },
    context: {
      disableRevalidate: true,
    },
  });
  await payload.updateGlobal({
    slug: "contact",
    data: {
      title: "Contact us",
      slug: "contact",
      content: {
        heading: "Contact us",
        subheading: "Get in touch",
      },
      meta: {
        title: "Contact us",
        description: "Get in touch",
      },
    },
    context: {
      disableRevalidate: true,
    },
  });
};
