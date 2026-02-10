import { getPayload } from "payload";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactElement } from "react";

import type { User } from "@/payload-types";
import configPromise from "@payload-config";

export enum Role {
  Student = "student",
  Admin = "admin",
}

/** Expected auth: a role or "guest" (must not be logged in). */
export type ExpectedAuth = Role | "guest";

const REDIRECT_BY_ROLE: Record<Role, string> = {
  [Role.Student]: "/curso",
  [Role.Admin]: "/admin",
};

/** Get the current user from the request (cookies/headers). Returns null if not authenticated. */
export async function getCurrentUser(): Promise<{ user: User | null }> {
  const payload = await getPayload({ config: configPromise });
  const headersList = await headers();
  const { user } = await payload.auth({ headers: headersList });
  return { user: user ?? null };
}

/**
 * Returns a function that enforces the expected auth:
 * - For Role: redirects to /login if not authenticated, to the other area if wrong role; returns { user }.
 * - For "guest": redirects to /admin or /curso if already logged in; returns void.
 */
export function requireAuth(
  expected: ExpectedAuth,
): () => Promise<{ user: User } | void> {
  return async function runRequireAuth() {
    const { user } = await getCurrentUser();

    if (expected === "guest") {
      if (user) {
        redirect(user.role === Role.Admin ? "/admin" : "/curso");
      }
      return;
    }

    if (!user) {
      redirect("/login");
    }
    if (user.role !== expected) {
      redirect(REDIRECT_BY_ROLE[user.role as Role]);
    }
    return { user };
  };
}

/** Require a student. Redirects to /login if not authenticated, to /admin if admin. Returns { user }. */
export const requireStudent = requireAuth(Role.Student);

/** Require an admin. Redirects to /login if not authenticated, to /curso if student. Returns { user }. */
export const requireAdmin = requireAuth(Role.Admin);

/**
 * For the Payload admin route only: allow unauthenticated (so Payload can show its login page)
 * or admin. Redirect to /curso only when user is logged in and not admin.
 * Use this in the admin layout so /admin is reachable without login.
 */
export async function requireAdminOrAllowGuest(): Promise<void> {
  console.log("requireAdminOrAllowGuest");
  const { user } = await getCurrentUser();
  if (!user) return; // allow: Payload will show login
  if (user.role !== Role.Admin) redirect("/curso"); // student must not use admin
}

/** Require a guest (not logged in). Redirects to /admin or /curso if already logged in. Use on login/register pages. */
export const requireGuest = requireAuth("guest");

/** Props that a page wrapped by withAuth(Role) will receive (user is injected by the HOC). */
export type WithAuthUserProps = { user: User };

/**
 * HOC that runs the auth check for the given expected role/guest and injects `user` for role pages.
 * Use for page-level auth so the page component only receives props and doesn't call the guard.
 *
 * @example
 * // Student page (receives user)
 * const Page = async ({ params, user }: { params: Promise<...> } & WithAuthUserProps) => { ... };
 * export default withAuth(Role.Student)(Page);
 *
 * @example
 * // Guest page (no user)
 * const LoginPage = async () => { ... };
 * export default withAuth("guest")(LoginPage);
 */
export function withAuth<TProps extends WithAuthUserProps>(
  expected: Role,
): (
  Page: (props: TProps) => Promise<ReactElement> | ReactElement,
) => (props: Omit<TProps, "user">) => Promise<ReactElement>;

export function withAuth<TProps>(
  expected: "guest",
): (
  Page: (props: TProps) => Promise<ReactElement> | ReactElement,
) => (props: TProps) => Promise<ReactElement>;

export function withAuth<TProps extends WithAuthUserProps>(
  expected: ExpectedAuth,
): (
  Page: (props: TProps) => Promise<ReactElement> | ReactElement,
) => (props: Omit<TProps, "user">) => Promise<ReactElement> {
  const check = requireAuth(expected);

  return function withAuthWrapper(
    Page: (props: TProps) => Promise<ReactElement> | ReactElement,
  ) {
    return async function AuthWrappedPage(
      props: Omit<TProps, "user">,
    ): Promise<ReactElement> {
      const result = await check();
      if (expected === "guest") {
        return <Page {...(props as TProps)} />;
      }
      if (!result || !("user" in result)) {
        redirect("/login");
      }
      return <Page {...(props as TProps)} user={result.user} />;
    };
  };
}
