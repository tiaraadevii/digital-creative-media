import { useState, useMemo } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Handshake,
  Search,
  Sparkles,
  Calendar,
  MapPin,
  Activity,
  Music,
  Compass,
  Palette,
  Briefcase,
  Layers,
} from 'lucide-react';
import { PartnerEvent, PartnerCategory } from '@/types/partner';
import PartnerModal from './PartnerModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface PartnersManagementProps {
  partners: PartnerEvent[];
  onAdd: (partner: Omit<PartnerEvent, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, updated: Partial<PartnerEvent>) => void;
  onDelete: (id: string) => void;
}

export default function PartnersManagement({
  partners,
  onAdd,
  onUpdate,
  onDelete,
}: PartnersManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | PartnerCategory>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingPartner, setEditingPartner] = useState<PartnerEvent | null>(null);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<PartnerEvent | null>(null);

  // Filtered list
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchCat =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'community'
          ? p.category === 'community' || p.category === 'business'
          : p.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.officialTitle.toLowerCase().includes(q) ||
        p.collabType.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [partners, selectedCategory, searchQuery]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (partner: PartnerEvent) => {
    setModalMode('edit');
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (partner: PartnerEvent) => {
    setPartnerToDelete(partner);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (partnerToDelete) {
      onDelete(partnerToDelete.id);
      setIsDeleteOpen(false);
      setPartnerToDelete(null);
    }
  };

  const handleModalSubmit = (data: Omit<PartnerEvent, 'id' | 'createdAt'>) => {
    if (modalMode === 'add') {
      onAdd(data);
    } else if (modalMode === 'edit' && editingPartner) {
      onUpdate(editingPartner.id, data);
    }
  };

  const categoryTabs = [
    { key: 'all', label: `Semua (${partners.length})`, icon: Handshake },
    { key: 'sport', label: 'Sport & Fun Run', icon: Activity },
    { key: 'trail', label: 'Trail Run', icon: Compass },
    { key: 'music', label: 'Festival Musik', icon: Music },
    { key: 'arts', label: 'Seni & Pertunjukan', icon: Palette },
    { key: 'community', label: 'Komunitas & Bisnis', icon: Briefcase },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-700 text-xs font-semibold mb-2">
            <Sparkles size={13} />
            <span>Official Event Partnerships</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
            Partnership
          </h1>
          <p className="text-navy-300 text-sm mt-1">
            Kelola event resmi, logo partner media, dan publikasi yang tampil di halaman depan.
          </p>
        </div>

        {/* Add Partner Button */}
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-800 transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Partner</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border shadow-2xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedCategory(tab.key as any)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-offwhite text-navy-400 hover:text-navy hover:bg-navy/5'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari event, lokasi, atau jenis kerja sama..."
            className="w-full pl-9 pr-4 py-2 bg-offwhite/80 border border-border rounded-xl text-xs text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Partner Cards Grid */}
      {filteredPartners.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-offwhite text-navy-300 flex items-center justify-center mx-auto mb-3">
            <Layers size={26} />
          </div>
          <h3 className="text-base font-bold text-navy">Tidak ada event partner ditemukan</h3>
          <p className="text-xs text-navy-300 mt-1">
            {searchQuery
              ? `Tidak ada hasil pencarian untuk "${searchQuery}".`
              : 'Belum ada partner di kategori ini. Silakan klik "+ Add Partner".'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPartners.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-lg hover:border-gold/30 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Thumbnail + Category + Impact */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-offwhite border border-border p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {item.logoUrl ? (
                        <img
                          src={item.logoUrl}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : item.posterUrl ? (
                        <img
                          src={item.posterUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Handshake size={22} className="text-gold" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 bg-gold/10 px-2 py-0.5 rounded-md">
                        {item.categoryLabel || item.category}
                      </span>
                      <h3 className="text-sm font-bold text-navy tracking-tight truncate mt-1 group-hover:text-gold-700 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-navy bg-offwhite border border-border px-2.5 py-1 rounded-full shrink-0">
                    {item.impactBadge}
                  </span>
                </div>

                {/* Collab Type */}
                <p className="text-xs font-semibold text-navy-600 mb-2">
                  {item.collabType}
                </p>

                {/* Tagline / Desc */}
                <p className="text-xs text-navy-400 leading-relaxed line-clamp-2 mb-3">
                  {item.tagline || item.desc}
                </p>

                {/* Venue & Date */}
                <div className="space-y-1 text-[11px] text-navy-300 border-t border-border/50 pt-2.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin size={12} className="shrink-0 text-navy-400" />
                    <span className="truncate">{item.venue || item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="shrink-0 text-navy-400" />
                    <span>{item.dateOrYear}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div className="mt-4 pt-3 flex items-center gap-2 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-border bg-white text-navy text-xs font-semibold hover:bg-offwhite hover:border-navy/30 transition-all cursor-pointer"
                >
                  <Pencil size={13} />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenDelete(item)}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl border border-rose-200 bg-white text-rose-600 text-xs font-semibold hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <PartnerModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={editingPartner}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        itemTitle={partnerToDelete?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setPartnerToDelete(null);
        }}
      />
    </div>
  );
}
