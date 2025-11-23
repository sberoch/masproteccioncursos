import type { About } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { renderBlocks } from "../../../blocks/render-blocks";
import { LivePreviewListener } from "../../../components/payload/live-preview";

export default async function AboutPage() {
  const about: About = (await getCachedGlobal("about", 1)()) as About;

  return (
    <>
      <LivePreviewListener />
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
        {renderBlocks(about.content.blocks)}
      </main>
    </>
  );
}
