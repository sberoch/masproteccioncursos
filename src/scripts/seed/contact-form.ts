import { Payload, RequiredDataFromCollectionSlug } from "payload";

export const contactForm: RequiredDataFromCollectionSlug<"forms"> = {
  confirmationMessage: {
    root: {
      type: "root",
      children: [
        {
          type: "heading",
          children: [
            {
              type: "text",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "The contact form has been submitted successfully.",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          tag: "h2",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  confirmationType: "message",
  createdAt: new Date().toISOString(),
  emails: [
    {
      emailFrom: '"Mas Proteccion" \u003Cinfo@eriosoftware.com\u003E',
      emailTo: "{{email}}",
      message: {
        root: {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Your contact form submission was successfully received.",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      },
      subject: "You've received a new message.",
    },
  ],
  fields: [
    {
      name: "full-name",
      blockName: "full-name",
      blockType: "text",
      label: "Full Name",
      required: true,
      width: 100,
    },
    {
      name: "email",
      blockName: "email",
      blockType: "email",
      label: "Email",
      required: true,
      width: 100,
    },
    {
      name: "message",
      blockName: "message",
      blockType: "textarea",
      label: "Message",
      required: true,
      width: 100,
    },
  ],
  redirect: undefined,
  submitButtonLabel: "Submit",
  title: "Contact Form",
  updatedAt: new Date().toISOString(),
};

export const seedContactForm = async (payload: Payload) => {
  payload.logger.info(`— Seeding contact form...`);
  await payload.create({
    collection: "forms",
    depth: 0,
    data: contactForm,
  });
};
