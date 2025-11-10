import type { Work } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export default async function WorkPage() {
  const work: Work = (await getCachedGlobal("work", 1)()) as Work;

  return (
    <main className="px-5 lg:px-0 py-20">
      <div className="container w-full mx-auto">
        {work.content.heading && (
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            {work.content.heading}
          </h1>
        )}
        {work.content.subheading && (
          <p className="text-xl lg:text-2xl text-gray-600">
            {work.content.subheading}
          </p>
        )}
      </div>
    </main>
  );
}
