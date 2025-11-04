import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getSocials = async () => {
  const payload = await getPayload({ config: configPromise });
  return await payload.find({
    collection: "socials",
    depth: 1,
  });
};
