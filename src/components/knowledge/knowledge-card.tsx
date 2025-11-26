import Link from "next/link";
import type { KnowledgeArticle } from "@/lib/types";
import { Card } from "@/components/ui/card";

export const KnowledgeCard = ({ article }: { article: KnowledgeArticle }) => (
  <Card className="flex flex-col gap-3 bg-white/5">
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
      {article.category}
    </p>
    <h3 className="text-xl font-semibold text-white">{article.title}</h3>
    <p className="text-sm text-white/70">{article.summary}</p>
    <p className="text-xs text-white/50">{article.readTime}</p>
    <Link
      href={`/knowledge-base/${article.slug}`}
      className="text-sm font-semibold text-sky hover:text-white"
    >
      Read article -&gt;
    </Link>
  </Card>
);
