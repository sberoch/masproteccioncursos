import type { Access, AccessArgs, Where } from "payload";

import type { User } from "@/payload-types";

type IsAdminOrSelf = (args: AccessArgs<User>) => boolean | Where;

export const isAdminOrSelf: IsAdminOrSelf = ({ req: { user } }) => {
  if (!user) return false;

  // Admins can access all records
  if (user.role === "admin") {
    return true;
  }

  // Users can only access their own records
  return {
    user: { equals: user.id },
  };
};
