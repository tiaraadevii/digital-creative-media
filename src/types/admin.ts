export type RequestStatus = 'Pending' | 'Read' | 'Responded';

export interface CollaborationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
  status: RequestStatus;
  date: string; // e.g. "Oct 16, 2026"
  createdAt?: string;
}
