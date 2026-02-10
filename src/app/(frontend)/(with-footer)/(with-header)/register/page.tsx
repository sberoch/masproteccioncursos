import { withAuth } from "@/auth/guard";
import { RegisterForm } from "@/components/web/auth/RegisterForm";

async function RegisterPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <RegisterForm />
    </main>
  );
}

export default withAuth("guest")(RegisterPage);
