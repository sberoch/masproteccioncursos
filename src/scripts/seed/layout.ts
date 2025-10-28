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
  await payload.updateGlobal({
    slug: "footer",
    data: {
      navigation: {
        title: "Navigation",
        links: [
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
          {
            link: {
              type: "custom",
              label: "Contact",
              url: "/contact",
            },
          },
        ],
      },
      socialMedia: [
        {
          title: "Facebook",
          url: "https://www.facebook.com",
          icon: "facebook" as const,
        },
        {
          title: "Instagram",
          url: "https://www.instagram.com",
          icon: "instagram" as const,
        },
        {
          title: "LinkedIn",
          url: "https://www.linkedin.com",
          icon: "linkedin" as const,
        },
      ],
    },
    context: {
      disableRevalidate: true,
    },
  });
};
