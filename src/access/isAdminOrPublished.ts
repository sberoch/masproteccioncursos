import type { Access, AccessArgs, Where } from "payload";

import type { User } from "@/payload-types";

type IsAdminOrPublished = (args: AccessArgs<User>) => boolean | Where;

export const isAdminOrPublished: IsAdminOrPublished = ({ req: { user } }) => {
  // Admins can see all courses
  if (user?.role === "admin") {
    return true;
  }

  // Non-admins (and unauthenticated) can only see published courses
  return {
    isPublished: { equals: true },
  };
};
