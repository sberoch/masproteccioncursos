import type { AccessArgs, Where } from "payload";

import type { User } from "@/payload-types";

/** For the Users collection: admins see all; non-admins can only access their own user document (by id). */
type IsAdminOrSelfUser = (args: AccessArgs<User>) => boolean | Where;

export const isAdminOrSelfUser: IsAdminOrSelfUser = ({ req: { user } }) => {
  if (!user) return false;

  if (user.role === "admin") {
    return true;
  }

  return {
    id: { equals: user.id },
  };
};
