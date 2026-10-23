import { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  Building2,
  Tag,
  Trash2,
  Send,
  CheckCircle2,
  Clock,
  Eye,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';
import { CollaborationRequest, RequestStatus } from '@/types/admin';

interface RequestDetailModalProps {
  request: CollaborationRequest | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: RequestStatus) => void;
  onDelete: (id: string) => void;
}

export default function RequestDetailModal({
  request,
  onClose,
  onUpdateStatus,
  onDelete,
}: RequestDetailModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!request) return null;

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Pending':
        return {
          bg: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
          icon: Clock,
          label: 'Pending',
        };
      case 'Read':
        return {
          bg: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
          icon: Eye,
          label: 'Read',
        };
      case 'Responded':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
          icon: CheckCircle2,
          label: 'Responded',
        };
    }
  };

  const statusBadge = getStatusBadge(request.status);
  const StatusIcon = statusBadge.icon;

  const cleanPhone = request.phone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone;
  const replyMailto = `mailto:${request.email}?subject=${encodeURIComponent(
    `Re: Kolaborasi dengan CV Digital Creative Media - ${request.projectType || 'Project'}`
  )}&body=${encodeURIComponent(
    `Halo ${request.name},\n\nTerima kasih telah menghubungi CV Digital Creative Media.\n\nMenindaklanjuti pesan Anda:\n"${request.message}"\n\n`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-md animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full border border-border/80 shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-border/70 flex items-center justify-between bg-gradient-to-r from-offwhite via-white to-offwhite">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-navy/5 flex items-center justify-center text-navy font-bold">
              <Tag size={18} className="text-navy" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy tracking-tight">Request Detail</h2>
              <p className="text-xs text-navy-300">Rincian pengajuan kolaborasi klien</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-navy/5 hover:bg-navy/10 text-navy-400 hover:text-navy flex items-center justify-center transition-colors"
            title="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Sender Overview Card */}
          <div className="flex items-start justify-between gap-4 p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy text-white shadow-md">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold">
                Pengirim
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-0.5 capitalize">
                {request.name}
              </h3>
              <p className="text-xs text-navy-200 mt-1 flex items-center gap-2">
                <span>{request.date}</span>
                <span>•</span>
                <span className="text-gold-200">{request.company || 'Pribadi / Individual'}</span>
              </p>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusBadge.bg} bg-white text-navy`}
            >
              <StatusIcon size={14} className="shrink-0" />
              <span>{statusBadge.label}</span>
            </div>
          </div>

          {/* 4 Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Email */}
            <div className="p-4 rounded-2xl bg-offwhite/80 border border-border/70 hover:border-gold/30 transition-all flex items-start justify-between group">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold-700 flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy-300">
                    Email
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-navy truncate" title={request.email}>
                    {request.email || '-'}
                  </p>
                </div>
              </div>
              {request.email && (
                <button
                  onClick={() => handleCopy(request.email, 'email')}
                  className="text-navy-300 hover:text-gold transition-colors p-1"
                  title="Salin Email"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              )}
            </div>

            {/* Phone */}
            <div className="p-4 rounded-2xl bg-offwhite/80 border border-border/70 hover:border-gold/30 transition-all flex items-start justify-between group">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy-300">
                    Phone / WA
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-navy truncate">
                    {request.phone || '-'}
                  </p>
                </div>
              </div>
              {request.phone && (
                <button
                  onClick={() => handleCopy(request.phone, 'phone')}
                  className="text-navy-300 hover:text-gold transition-colors p-1"
                  title="Salin Nomor"
                >
                  {copiedPhone ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              )}
            </div>

            {/* Company */}
            <div className="p-4 rounded-2xl bg-offwhite/80 border border-border/70 hover:border-gold/30 transition-all flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Building2 size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-300">
                  Company / Organization
                </span>
                <p className="text-xs sm:text-sm font-semibold text-navy truncate">
                  {request.company || '-'}
                </p>
              </div>
            </div>

            {/* Project Type */}
            <div className="p-4 rounded-2xl bg-offwhite/80 border border-border/70 hover:border-gold/30 transition-all flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Tag size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-300">
                  Project Type
                </span>
                <p className="text-xs sm:text-sm font-semibold text-navy truncate">
                  {request.projectType || 'General Collaboration'}
                </p>
              </div>
            </div>
          </div>

          {/* Message Content Box */}
          <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-400">
                Message Content
              </span>
              <span className="text-[11px] text-navy-300">Pesan Pengirim</span>
            </div>
            <p className="text-sm text-navy-700 leading-relaxed font-medium whitespace-pre-wrap">
              {request.message || '(Tidak ada pesan tambahan)'}
            </p>
          </div>

          {/* Update Status Interactive Segmented Controls */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-400">
                Update Status
              </span>
              <span className="text-xs text-navy-300">Ubah status tindak lanjut:</span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1.5 bg-offwhite rounded-2xl border border-border">
              {(['Pending', 'Read', 'Responded'] as RequestStatus[]).map((st) => {
                const isActive = request.status === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => onUpdateStatus(request.id, st)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-navy text-white shadow-md scale-[1.02]'
                        : 'text-navy-400 hover:text-navy hover:bg-white/80'
                    }`}
                  >
                    {isActive && <Check size={13} className="text-gold" />}
                    <span>{st}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-border/70 bg-offwhite/50 flex flex-wrap items-center justify-between gap-3">
          {/* Delete Button */}
          {isDeleting ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-600 font-medium">Yakin hapus?</span>
              <button
                onClick={() => {
                  onDelete(request.id);
                  onClose();
                }}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setIsDeleting(false)}
                className="px-3 py-1.5 bg-white border border-border text-navy text-xs font-semibold rounded-lg hover:bg-offwhite transition-colors"
              >
                Batal
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsDeleting(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-all hover:scale-[1.02]"
            >
              <Trash2 size={15} />
              Delete Request
            </button>
          )}

          {/* Action Contact Buttons */}
          <div className="flex items-center gap-2">
            {request.phone && (
              <a
                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                  `Halo ${request.name}, terima kasih telah menghubungi CV Digital Creative Media mengenai "${request.projectType || 'Kolaborasi'}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold transition-all hover:shadow-md hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            )}

            <a
              href={replyMailto}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white hover:bg-navy-800 text-xs font-semibold transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <Send size={15} />
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
