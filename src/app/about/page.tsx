import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <SectionHeading
        eyebrow="About ChemPort"
        title="Built for responsible research"
        description="ChemPort bridges professionalism and compliance in a space that lacks credibility. The platform anchors on verified suppliers, documentation transparency, and education."
      />
      <div className="space-y-6 rounded-3xl border border-slate/60 bg-white p-8 text-slate-700">
        <p>
          We partner with GMP-aligned manufacturers and boutique labs to ensure
          every shipment is backed by authentic COA/MSDS packets. ChemPort
          closes the trust gap by pairing commerce with traceability tooling.
        </p>
        <p>
          From procurement approvals to batch logging, we designed ChemPort with
          lab managers and compliance teams in mind. Our roadmap targets
          document automation, verified supplier workflow, and B2B pricing
          features.
        </p>
        <p className="text-sm text-slate-600">
          HQ: {siteConfig.contact.address} · Contact: {siteConfig.contact.email}
        </p>
      </div>
    </div>
  );
}
