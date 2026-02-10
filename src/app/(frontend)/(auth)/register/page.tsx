import { withAuth } from "@/auth/guard";
import { RegisterForm } from "@/components/web/auth/RegisterForm";

async function RegisterPage() {
  return <RegisterForm />;
}

export default withAuth("guest")(RegisterPage);
