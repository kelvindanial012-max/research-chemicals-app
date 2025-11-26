import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { SectionHeading } from "@/components/ui/section-heading";
import { fetchArticleBySlug } from "@/lib/data-service";
import { formatDate } from "@/lib/utils";

interface ArticlePageProps {
  params: { slug: string };
}

export default async function KnowledgeArticlePage({
  params,
}: ArticlePageProps) {
  const article = await fetchArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
      <SectionHeading
        eyebrow={article.category}
        title={article.title}
        description={`Updated ${formatDate(article.updatedAt)} · ${article.readTime}`}
      />
      <div className="prose max-w-none prose-headings:text-ocean prose-p:text-slate-700">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}
