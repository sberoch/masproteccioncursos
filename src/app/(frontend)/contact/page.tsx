import type { Contact } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export default async function ContactPage() {
  const contact: Contact = (await getCachedGlobal("contact", 1)()) as Contact;

  return (
    <main className="px-5 lg:px-0 py-20">
      <div className="container w-full mx-auto">
        {contact.content.heading && (
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            {contact.content.heading}
          </h1>
        )}
        {contact.content.subheading && (
          <p className="text-xl lg:text-2xl text-gray-600">
            {contact.content.subheading}
          </p>
        )}
      </div>
    </main>
  );
}
