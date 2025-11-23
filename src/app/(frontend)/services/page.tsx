import type { Service } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { renderBlocks } from "@/blocks/render-blocks";
import { LivePreviewListener } from "../../../components/payload/live-preview";

export default async function ServicesPage() {
  const services: Service = (await getCachedGlobal("services", 1)()) as Service;

  return (
    <>
      <LivePreviewListener />
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
        {renderBlocks(services.content.blocks)}
      </main>
    </>
  );
}
