import type { Service } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export default async function ServicesPage() {
  const services: Service = (await getCachedGlobal("services", 1)()) as Service;

  return (
    <main className="px-5 lg:px-0 py-20">
      <div className="container w-full mx-auto">
        {services.content.heading && (
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            {services.content.heading}
          </h1>
        )}
        {services.content.subheading && (
          <p className="text-xl lg:text-2xl text-gray-600">
            {services.content.subheading}
          </p>
        )}
      </div>
    </main>
  );
}
