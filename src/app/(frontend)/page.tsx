import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import { fileURLToPath } from "url";

import config from "@/payload.config";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  const {
    docs: [page],
  } = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "about",
      },
    },
  });

  return (
    <div>
      <h1>{page.title}</h1>
    </div>
  );
}
