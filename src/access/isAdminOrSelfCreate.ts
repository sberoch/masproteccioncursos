import type { Access, AccessArgs } from "payload";

import type { User } from "@/payload-types";

type IsAdminOrSelfCreate = (args: AccessArgs<User>) => boolean;

// For create operations: users must be authenticated
// The user field is auto-set to current user in the field hook
export const isAdminOrSelfCreate: IsAdminOrSelfCreate = ({ req: { user } }) => {
  if (!user) return false;
  return true;
};
