import { LoginForm } from "@/components/auth/login-form";
import { SectionHeading } from "@/components/ui/section-heading";

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 px-6 py-12">
      <SectionHeading
        eyebrow="Account"
        title="Login to ChemPort"
        description="Accounts are granted to verified labs. After authentication you'll access dashboards, batch tracking, and documentation."
      />
      <LoginForm />
    </div>
  );
}
