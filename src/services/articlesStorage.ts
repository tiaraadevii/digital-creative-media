import { ArticleItem } from '@/types/article';
import { supabase } from '@/lib/supabase';

const ARTICLES_STORAGE_KEY = 'dcm_articles_items';

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: '5 Tren Desain Digital yang Mendominasi Tahun 2026',
    excerpt:
      'Eksplorasi tren visual modern, minimalisme adaptif, dan tipografi berani yang membentuk arah komunikasi brand masa kini.',
    content:
      'Dunia desain grafis dan media digital terus bertransformasi seiring dengan perubahan perilaku audiens muda.\n\nDi tahun 2026, integrasi antara tipografi ekspresif dan micro-animations interaktif menjadi fondasi utama dalam meningkatkan engagement media sosial dan website komersial. Brand yang mampu menyampaikan identitas uniknya dalam 3 detik pertama akan memenangkan perhatian publik secara konsisten.',
    coverImage:
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    author: 'CV Digital Creative Media',
    status: 'Published',
    date: 'Oct 16, 2026',
    createdAt: '2026-10-16T11:00:00Z',
  },
  {
    id: 'art-2',
    title: 'Mengapa Branding Konsisten Itu Krusial untuk Bisnis Modern',
    excerpt:
      'Pentingnya menjaga keselarasan tone of voice, visual identity, dan kehadiran digital lintas platform promosi.',
    content:
      'Konsistensi identitas merek bukan sekadar perkara warna logo yang sama di semua banner. Ini tentang bagaimana audiens merasakan nilai dan kredibilitas bisnis Anda di setiap touchpoint—dari postingan Instagram, materi promosi event, hingga interaksi pelayanan pelanggan.\n\nDengan sistem desain yang terstruktur dan arahan kreatif yang jelas, CV Digital Creative Media membantu berbagai brand membangun kepercayaan yang tahan lama di benak konsumen.',
    coverImage:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    author: 'CV Digital Creative Media',
    status: 'Published',
    date: 'Oct 16, 2026',
    createdAt: '2026-10-16T14:30:00Z',
  },
];

function rowToArticle(row: any): ArticleItem {
  return {
    id: row.id,
    title: row.title || '',
    excerpt: row.excerpt || '',
    content: row.content || '',
    coverImage: row.cover_image || '',
    author: row.author || '',
    status: (row.status as 'Published' | 'Draft') || 'Published',
    date: row.date || '',
    createdAt: row.created_at,
  };
}

function articleToRow(article: ArticleItem) {
  return {
    id: article.id,
    title: article.title || '',
    excerpt: article.excerpt || '',
    content: article.content || '',
    cover_image: article.coverImage || '',
    author: article.author || '',
    status: article.status || 'Published',
    date: article.date || '',
  };
}

export function getArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (!raw) {
      return INITIAL_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ARTICLES;
  } catch {
    return INITIAL_ARTICLES;
  }
}

let isSyncingArticles = false;
export async function syncArticlesFromCloud(): Promise<ArticleItem[]> {
  if (isSyncingArticles) return getArticles();
  isSyncingArticles = true;
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch articles from Supabase:', error);
      return getArticles();
    }

    if (Array.isArray(data)) {
      const items = data.map(rowToArticle);
      const currentRaw = localStorage.getItem(ARTICLES_STORAGE_KEY);
      const newRaw = JSON.stringify(items);
      if (currentRaw !== newRaw) {
        localStorage.setItem(ARTICLES_STORAGE_KEY, newRaw);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('dcm_articles_updated'));
        }
      }
      return items;
    }
  } catch (err) {
    console.error('Error syncing articles:', err);
  } finally {
    isSyncingArticles = false;
  }
  return getArticles();
}

export function saveArticles(items: ArticleItem[]): void {
  try {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(items));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dcm_articles_updated'));
    }
  } catch (e) {
    console.error('Failed to save articles:', e);
  }
}

export function addArticle(
  article: Omit<ArticleItem, 'id' | 'date' | 'createdAt'>
): ArticleItem[] {
  const current = getArticles();
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const newArticle: ArticleItem = {
    ...article,
    id: `art-${Date.now()}`,
    date: dateFormatted,
    createdAt: now.toISOString(),
  };

  const updated = [newArticle, ...current];
  saveArticles(updated);

  // Push to Supabase cloud
  supabase
    .from('articles')
    .insert([articleToRow(newArticle)])
    .then(({ error }) => {
      if (error) {
        console.error('Supabase add article error:', error);
      }
    });

  return updated;
}

export function updateArticle(
  id: string,
  updatedData: Partial<ArticleItem>
): ArticleItem[] {
  const current = getArticles();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updatedData } : item));
  saveArticles(updated);

  // Push to Supabase cloud
  const target = updated.find((i) => i.id === id);
  if (target) {
    supabase
      .from('articles')
      .update(articleToRow(target))
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.error('Supabase update article error:', error);
      });
  }

  return updated;
}

export function deleteArticle(id: string): ArticleItem[] {
  const current = getArticles();
  const updated = current.filter((item) => item.id !== id);
  saveArticles(updated);

  // Delete from Supabase cloud
  supabase
    .from('articles')
    .delete()
    .eq('id', id)
    .then(({ error }) => {
      if (error) console.error('Supabase delete article error:', error);
    });

  return updated;
}
