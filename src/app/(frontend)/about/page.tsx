import type { About } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export default async function AboutPage() {
  const about: About = (await getCachedGlobal("about", 1)()) as About;

  return (
    <main className="px-5 lg:px-0 py-20">
      <div className="container w-full mx-auto">
        {about.content.heading && (
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            {about.content.heading}
          </h1>
        )}
        {about.content.subheading && (
          <p className="text-xl lg:text-2xl text-gray-600">
            {about.content.subheading}
          </p>
        )}
      </div>
    </main>
  );
}
