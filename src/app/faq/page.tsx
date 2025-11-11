import { fetchFaqs } from "@/lib/data-service";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

export default async function FaqPage() {
  const faqs = await fetchFaqs();
  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    acc[faq.category] = acc[faq.category] ? [...acc[faq.category], faq] : [faq];
    return acc;
  }, {});

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <SectionHeading
        eyebrow="Compliance & Shipping"
        title="Frequently asked questions"
        description="Dynamic FAQ data can live in Supabase so compliance teams can update language without developer support."
      />
      <div className="space-y-8">
        {Object.entries(grouped).map(([category, entries]) => (
          <section key={category} className="space-y-4 rounded-3xl border border-slate/60 bg-white p-6">
            <h2 className="text-xl font-semibold text-ocean">{category}</h2>
            <div className="space-y-4">
              {entries.map((faq) => (
                <details key={faq.id} className="rounded-2xl border border-slate/40 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-ocean marker:text-sky">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="rounded-3xl border border-slate/60 bg-sand p-6 text-sm text-slate-700">
        Still have a compliance question? Email {siteConfig.contact.email} with
        your institution letterhead and we&apos;ll share our documentation pack.
      </div>
    </div>
  );
}
