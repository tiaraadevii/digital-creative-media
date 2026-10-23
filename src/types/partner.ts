export type PartnerCategory = 'sport' | 'trail' | 'music' | 'arts' | 'community' | 'business';

export interface PartnerEvent {
  id: string;
  name: string;
  officialTitle: string;
  category: PartnerCategory;
  categoryLabel: string;
  collabType: string;
  dateOrYear: string;
  location: string;
  venue: string;
  tagline: string;
  desc: string;
  highlights: string[];
  impactBadge: string;
  logoUrl?: string;
  posterUrl?: string;
  logoBg?: string;
  accentGradient?: string;
  badgeColor?: string;
  createdAt?: string;
}
