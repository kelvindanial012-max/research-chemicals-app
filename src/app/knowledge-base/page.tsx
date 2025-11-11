import { KnowledgeCard } from "@/components/knowledge/knowledge-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { fetchKnowledgeArticles } from "@/lib/data-service";

export default async function KnowledgeBasePage() {
  const articles = await fetchKnowledgeArticles();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <SectionHeading
        eyebrow="Knowledge Base"
        title="Operational guidance for safe research"
        description="Articles are SEO-optimized and can be managed in Supabase or your CMS of choice."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <KnowledgeCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
