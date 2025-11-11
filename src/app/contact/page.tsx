import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <SectionHeading
        eyebrow="Contact"
        title="Request onboarding or compliance docs"
        description="Share your lab credentials, purchasing intent, and we will respond within 24 hours."
      />
      <ContactForm />
      <div className="rounded-3xl border border-slate/60 bg-sand p-6 text-sm text-slate-700">
        <p>
          Prefer email? Reach us at {siteConfig.contact.email}. Include your
          institution, shipping address, and any specific COA/MSDS requirements.
        </p>
      </div>
    </div>
  );
}
