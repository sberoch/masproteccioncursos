import { Payload } from "payload";

export const seedLayout = async (payload: Payload) => {
  payload.logger.info(`— Seeding layout...`);
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
