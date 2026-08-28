import PageHeader from "@/components/ui/PageHeader";
import ArticleList from "@/components/articles/ArticleList";

export default function ArticlesPage() {
  return (
    <div>
      <PageHeader title="文章" subtitle="记录代码、技术与思考" accent="文" />
      <ArticleList />
    </div>
  );
}
