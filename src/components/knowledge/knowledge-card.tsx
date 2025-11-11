import Link from "next/link";
import type { KnowledgeArticle } from "@/lib/types";
import { Card } from "@/components/ui/card";

export const KnowledgeCard = ({ article }: { article: KnowledgeArticle }) => (
  <Card className="flex flex-col gap-3">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
      {article.category}
    </p>
    <h3 className="text-xl font-semibold text-ocean">{article.title}</h3>
    <p className="text-sm text-slate-600">{article.summary}</p>
    <p className="text-xs text-slate-500">{article.readTime}</p>
    <Link href={`/knowledge-base/${article.slug}`} className="text-sm font-semibold text-sky hover:underline">
      Read article →
    </Link>
  </Card>
);
