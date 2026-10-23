export type ArticleStatus = 'Published' | 'Draft';

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  status: ArticleStatus;
  date: string; // e.g. "Oct 16, 2026"
  createdAt?: string;
}
