export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  client: string;
  projectUrl?: string;
  sortOrder: number;
}
