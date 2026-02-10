import { withAuth } from "@/auth/guard";
import { LoginForm } from "@/components/web/auth/LoginForm";

async function LoginPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <LoginForm />
    </main>
  );
}

export default withAuth("guest")(LoginPage);
