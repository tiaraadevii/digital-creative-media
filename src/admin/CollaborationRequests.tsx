import { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Eye,
  Building2,
  Briefcase,
  ArrowRight,
  Filter,
  Sparkles,
  Inbox,
  Calendar,
} from 'lucide-react';
import { CollaborationRequest, RequestStatus } from '@/types/admin';

interface CollaborationRequestsProps {
  requests: CollaborationRequest[];
  onSelectRequest: (request: CollaborationRequest) => void;
  onUpdateStatus: (id: string, status: RequestStatus) => void;
}

export default function CollaborationRequests({
  requests,
  onSelectRequest,
}: CollaborationRequestsProps) {
  const [filter, setFilter] = useState<'All' | RequestStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      All: requests.length,
      Pending: requests.filter((r) => r.status === 'Pending').length,
      Read: requests.filter((r) => r.status === 'Read').length,
      Responded: requests.filter((r) => r.status === 'Responded').length,
    };
  }, [requests]);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchFilter = filter === 'All' ? true : req.status === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        req.name.toLowerCase().includes(q) ||
        req.email.toLowerCase().includes(q) ||
        req.company.toLowerCase().includes(q) ||
        req.projectType.toLowerCase().includes(q) ||
        req.message.toLowerCase().includes(q);

      return matchFilter && matchSearch;
    });
  }, [requests, filter, searchQuery]);

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
          label: 'Pending',
        };
      case 'Read':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Eye,
          label: 'Read',
        };
      case 'Responded':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          label: 'Responded',
        };
    }
  };

  const tabs: Array<'All' | RequestStatus> = ['All', 'Pending', 'Read', 'Responded'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-700 text-xs font-semibold mb-2">
            <Sparkles size={13} />
            <span>Collaboration Center</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
            Collaboration Requests
          </h1>
          <p className="text-navy-300 text-sm mt-1">
            Pesan dan pengajuan kerja sama dari calon partner yang tertarik dengan CV Digital Creative Media.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
          <input
            type="text"
            placeholder="Cari nama, email, perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Filter Tabs Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = filter === tab;
          const count = counts[tab];
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white border border-border text-navy-400 hover:text-navy hover:bg-offwhite/80'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-offwhite text-navy-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Requests Grid / Cards */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-offwhite flex items-center justify-center mx-auto mb-3 text-navy-300">
            <Inbox size={26} />
          </div>
          <h3 className="text-base font-bold text-navy">Tidak ada pengajuan ditemukan</h3>
          <p className="text-xs text-navy-300 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `Tidak ada hasil untuk pencarian "${searchQuery}". Coba kata kunci lain.`
              : `Belum ada pesan dengan status "${filter}".`}
          </p>
          {(searchQuery || filter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilter('All');
              }}
              className="mt-4 px-4 py-2 bg-navy text-white text-xs font-semibold rounded-xl hover:bg-navy-800 transition-all"
            >
              Reset Filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRequests.map((req) => {
            const badge = getStatusBadge(req.status);
            const BadgeIcon = badge.icon;
            const initials = req.name
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <div
                key={req.id}
                onClick={() => onSelectRequest(req)}
                className="bg-white rounded-2xl border border-border p-5 md:p-6 shadow-sm hover:shadow-lg hover:border-gold/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Avatar, Name, Email, Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-navy-800 to-navy text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs border border-white/10 group-hover:scale-105 transition-transform">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-navy tracking-tight truncate group-hover:text-gold-700 transition-colors">
                          {req.name}
                        </h3>
                        <p className="text-xs text-navy-300 truncate">{req.email}</p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} shrink-0`}
                    >
                      <BadgeIcon size={12} />
                      {badge.label}
                    </span>
                  </div>

                  {/* Project Tag */}
                  <div className="mb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy/5 text-navy text-xs font-medium border border-border">
                      <Briefcase size={12} className="text-gold" />
                      <span className="text-[11px] text-navy-300 font-normal">Project:</span>
                      <span className="font-semibold">{req.projectType || 'General Collaboration'}</span>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="p-3.5 rounded-xl bg-offwhite/80 border border-border/70 text-navy-700 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {req.message}
                  </div>
                </div>

                {/* Footer: Date, Company, Action Link */}
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-navy-300">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {req.date}
                    </span>
                    {req.company && (
                      <span className="flex items-center gap-1 text-navy-400 font-medium">
                        <Building2 size={13} />
                        {req.company}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-gold font-semibold group-hover:translate-x-0.5 transition-transform">
                    Detail
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
