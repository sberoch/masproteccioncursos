import { withAuth } from "@/auth/guard";
import { LoginForm } from "@/components/web/auth/LoginForm";

async function LoginPage() {
  return <LoginForm />;
}

export default withAuth("guest")(LoginPage);
