import { PortfolioItem } from '@/types/portfolio';
import { supabase } from '@/lib/supabase';

const PORTFOLIO_STORAGE_KEY = 'dcm_portfolio_items';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-2',
    title: 'E-Commerce Platform Nusantara',
    category: 'Web Development',
    client: 'Toko Nusantara',
    description:
      'Platform e-commerce modern dengan UX yang intuitif dan sistem pembayaran terintegrasi.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://tokonusantara.com',
    sortOrder: 1,
  },
  {
    id: 'port-3',
    title: 'Kampanye Digital Sehat Bersama',
    category: 'Digital Marketing',
    client: 'Kemenkes RI',
    description:
      'Strategi konten dan iklan digital untuk kampanye kesehatan masyarakat secara terarah.',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://sehatbersama.id',
    sortOrder: 2,
  },
  {
    id: 'port-4',
    title: 'Cinematic Event & Brand Video',
    category: 'Videography',
    client: 'Malang Creative Hub',
    description:
      'Produksi aftermovie video dan cinematic short-form content untuk aktivasi brand.',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://youtube.com',
    sortOrder: 3,
  },
];

function rowToItem(row: any): PortfolioItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    client: row.client,
    description: row.description,
    image: row.image,
    projectUrl: row.project_url || '',
    sortOrder: row.sort_order || 0,
  };
}

function itemToRow(item: PortfolioItem) {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    client: item.client,
    description: item.description,
    image: item.image,
    project_url: item.projectUrl || '',
    sort_order: item.sortOrder || 0,
  };
}

let isSyncing = false;
export async function syncPortfolioFromCloud(): Promise<PortfolioItem[]> {
  if (isSyncing) return getPortfolioItems();
  isSyncing = true;
  try {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Failed to fetch portfolio from Supabase:', error);
      return getPortfolioItems();
    }

    if (Array.isArray(data)) {
      const items = data.map(rowToItem);
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('dcm_portfolio_updated'));
      }
      return items;
    }
  } catch (err) {
    console.error('Error syncing portfolio:', err);
  } finally {
    isSyncing = false;
  }
  return getPortfolioItems();
}

export function getPortfolioItems(): PortfolioItem[] {
  // Trigger background cloud sync on client
  if (typeof window !== 'undefined') {
    syncPortfolioFromCloud();
  }

  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) {
      return INITIAL_PORTFOLIO;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PORTFOLIO;
  } catch {
    return INITIAL_PORTFOLIO;
  }
}

export function savePortfolioItems(items: PortfolioItem[]): void {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dcm_portfolio_updated'));
    }
  } catch (e) {
    console.error('Failed to save portfolio items:', e);
  }
}

export function addPortfolioItem(
  item: Omit<PortfolioItem, 'id'>
): PortfolioItem[] {
  const current = getPortfolioItems();
  const newItem: PortfolioItem = {
    ...item,
    id: `port-${Date.now()}`,
  };
  const updated = [...current, newItem].sort((a, b) => a.sortOrder - b.sortOrder);
  savePortfolioItems(updated);

  // Push to Supabase cloud
  supabase
    .from('portfolio_items')
    .insert([itemToRow(newItem)])
    .then(({ error }) => {
      if (error) console.error('Supabase add portfolio error:', error);
    });

  return updated;
}

export function updatePortfolioItem(
  id: string,
  updatedData: Partial<PortfolioItem>
): PortfolioItem[] {
  const current = getPortfolioItems();
  const updated = current
    .map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  savePortfolioItems(updated);

  // Push to Supabase cloud
  const target = updated.find((i) => i.id === id);
  if (target) {
    supabase
      .from('portfolio_items')
      .update(itemToRow(target))
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.error('Supabase update portfolio error:', error);
      });
  }

  return updated;
}

export function deletePortfolioItem(id: string): PortfolioItem[] {
  const current = getPortfolioItems();
  const updated = current.filter((item) => item.id !== id);
  savePortfolioItems(updated);

  // Delete from Supabase cloud
  supabase
    .from('portfolio_items')
    .delete()
    .eq('id', id)
    .then(({ error }) => {
      if (error) console.error('Supabase delete portfolio error:', error);
    });

  return updated;
}
