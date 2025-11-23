import type { GlobalAfterChangeHook } from "payload";

import { revalidateTag } from "next/cache";

export const revalidateAboutPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating about page`);

    revalidateTag("global_about");
  }

  return doc;
};
