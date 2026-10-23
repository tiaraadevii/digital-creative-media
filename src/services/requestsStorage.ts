import { CollaborationRequest, RequestStatus } from '@/types/admin';

const STORAGE_KEY = 'dcm_collaboration_requests';

export const INITIAL_REQUESTS: CollaborationRequest[] = [
  {
    id: 'req-001',
    name: 'eca',
    email: 'keren@GMAIL.COM',
    phone: '0917673883',
    company: 'rixhcrazy',
    projectType: 'Branding & Identity',
    message: 'KEREN KAN',
    status: 'Responded',
    date: 'Oct 16, 2026',
    createdAt: '2026-10-16T10:30:00Z',
  },
  {
    id: 'req-002',
    name: 'BEM Fakultas Ilmu Komputer',
    email: 'partnership.filkom@univ.ac.id',
    phone: '081234567890',
    company: 'Universitas Brawijaya',
    projectType: 'Media Partner Event Lari / Festival',
    message: 'Halo tim DCM, kami ingin mengajukan penawaran media partner untuk event tahunan festival IT & sport dengan estimasi 1.500 peserta.',
    status: 'Pending',
    date: 'Oct 21, 2026',
    createdAt: '2026-10-21T09:15:00Z',
  },
  {
    id: 'req-003',
    name: 'Rian Sasmita',
    email: 'rian.sasmita@brandcreative.co.id',
    phone: '085799988812',
    company: 'Brand Creative Studio',
    projectType: 'Paid Promote & Brand Activation',
    message: 'Tertarik untuk promosi produk apparel baru kami lewat jaringan IG @carikostmalang dan media platform DCM.',
    status: 'Read',
    date: 'Oct 19, 2026',
    createdAt: '2026-10-19T14:40:00Z',
  },
];

export function getRequests(): CollaborationRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_REQUESTS;
  } catch {
    return INITIAL_REQUESTS;
  }
}

export function saveRequests(requests: CollaborationRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dcm_requests_updated'));
    }
  } catch (e) {
    console.error('Failed to save requests to localStorage:', e);
  }
}

export function updateRequestStatus(id: string, newStatus: RequestStatus): CollaborationRequest[] {
  const current = getRequests();
  const updated = current.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
  saveRequests(updated);
  return updated;
}

export function deleteRequest(id: string): CollaborationRequest[] {
  const current = getRequests();
  const updated = current.filter((r) => r.id !== id);
  saveRequests(updated);
  return updated;
}

export function addRequest(request: Omit<CollaborationRequest, 'id' | 'date' | 'createdAt'>): CollaborationRequest[] {
  const current = getRequests();
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const newEntry: CollaborationRequest = {
    ...request,
    id: `req-${Date.now()}`,
    date: formattedDate,
    createdAt: now.toISOString(),
  };

  const updated = [newEntry, ...current];
  saveRequests(updated);
  return updated;
}
