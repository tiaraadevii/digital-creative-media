import { CollaborationRequest, RequestStatus } from '@/types/admin';
import { supabase } from '@/lib/supabase';

const STORAGE_KEY = 'dcm_collaboration_requests';

export const INITIAL_REQUESTS: CollaborationRequest[] = [
  {
    id: 'req-001',
    name: 'Aditya Pratama',
    email: 'aditya@startupdigital.id',
    phone: '081234567890',
    company: 'Nusantara Tech',
    projectType: 'Full Branding & Website',
    message: 'Halo tim DCM, kami sedang mencari partner kreatif untuk rebranding dan pembuatan website company profile modern.',
    status: 'Pending',
    date: 'Oct 20, 2026',
    createdAt: '2026-10-20T08:30:00Z',
  },
  {
    id: 'req-002',
    name: 'Sarah Wijaya',
    email: 'sarah.w@festivalkreatif.com',
    phone: '081987654321',
    company: 'Festival Musik Jatim',
    projectType: 'Official Event Media Partner',
    message: 'Ingin mengajukan proposal kerja sama media partner publikasi dan coverage visual konser di Malang.',
    status: 'Replied',
    date: 'Oct 20, 2026',
    createdAt: '2026-10-20T10:15:00Z',
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

function rowToRequest(row: any): CollaborationRequest {
  return {
    id: row.id,
    name: row.name || '',
    email: row.email || '',
    phone: row.phone || '',
    company: row.company || '',
    projectType: row.project_type || 'General',
    message: row.message || '',
    status: (row.status as RequestStatus) || 'Pending',
    date: row.date || '',
    createdAt: row.created_at,
  };
}

function requestToRow(req: CollaborationRequest) {
  return {
    id: req.id,
    name: req.name || '',
    email: req.email || '',
    phone: req.phone || '',
    company: req.company || '',
    project_type: req.projectType || 'General',
    message: req.message || '',
    status: req.status || 'Pending',
    date: req.date || '',
  };
}

export function getRequests(): CollaborationRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REQUESTS;
  } catch {
    return INITIAL_REQUESTS;
  }
}

let isSyncingRequests = false;
export async function syncRequestsFromCloud(): Promise<CollaborationRequest[]> {
  if (isSyncingRequests) return getRequests();
  isSyncingRequests = true;
  try {
    const { data, error } = await supabase
      .from('collaboration_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch requests from Supabase:', error);
      return getRequests();
    }

    if (Array.isArray(data)) {
      const items = data.map(rowToRequest);
      const currentRaw = localStorage.getItem(STORAGE_KEY);
      const newRaw = JSON.stringify(items);
      if (currentRaw !== newRaw) {
        localStorage.setItem(STORAGE_KEY, newRaw);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('dcm_requests_updated'));
        }
      }
      return items;
    }
  } catch (err) {
    console.error('Error syncing requests:', err);
  } finally {
    isSyncingRequests = false;
  }
  return getRequests();
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

  // Push to Supabase cloud
  supabase
    .from('collaboration_requests')
    .update({ status: newStatus })
    .eq('id', id)
    .then(({ error }) => {
      if (error) console.error('Supabase update request error:', error);
    });

  return updated;
}

export function deleteRequest(id: string): CollaborationRequest[] {
  const current = getRequests();
  const updated = current.filter((r) => r.id !== id);
  saveRequests(updated);

  // Delete from Supabase cloud
  supabase
    .from('collaboration_requests')
    .delete()
    .eq('id', id)
    .then(({ error }) => {
      if (error) console.error('Supabase delete request error:', error);
    });

  return updated;
}

export function addRequest(
  request: Omit<CollaborationRequest, 'id' | 'date' | 'createdAt'>
): CollaborationRequest[] {
  const current = getRequests();
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const newRequest: CollaborationRequest = {
    ...request,
    id: `req-${Date.now()}`,
    date: dateFormatted,
    createdAt: now.toISOString(),
  };

  const updated = [newRequest, ...current];
  saveRequests(updated);

  // Push to Supabase cloud
  supabase
    .from('collaboration_requests')
    .insert([requestToRow(newRequest)])
    .then(({ error }) => {
      if (error) console.error('Supabase add request error:', error);
    });

  return updated;
}
