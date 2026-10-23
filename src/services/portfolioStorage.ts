import { PortfolioItem } from '@/types/portfolio';

const PORTFOLIO_STORAGE_KEY = 'dcm_portfolio_items';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'DEVIIIII KEREN BETULL',
    category: 'Branding',
    client: 'Maju Group',
    description:
      'Transformasi identitas visual menyeluruh untuk salah satu konglomerasi terkemuka di Indonesia.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://cvdigitalcreative.media/portfolio/devii-keren',
    sortOrder: 1,
  },
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
    sortOrder: 2,
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
    sortOrder: 3,
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
    sortOrder: 4,
  },
];

export function getPortfolioItems(): PortfolioItem[] {
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO));
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
  return updated;
}

export function deletePortfolioItem(id: string): PortfolioItem[] {
  const current = getPortfolioItems();
  const updated = current.filter((item) => item.id !== id);
  savePortfolioItems(updated);
  return updated;
}
