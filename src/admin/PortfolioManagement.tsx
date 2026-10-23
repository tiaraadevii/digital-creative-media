import { useState, useMemo } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  Building,
} from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';
import PortfolioModal from './PortfolioModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface PortfolioManagementProps {
  items: PortfolioItem[];
  onAdd: (item: Omit<PortfolioItem, 'id'>) => void;
  onUpdate: (id: string, updated: Partial<PortfolioItem>) => void;
  onDelete: (id: string) => void;
}

export default function PortfolioManagement({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: PortfolioManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return list.filter((item) => {
      if (!item) return false;
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.title || '').toLowerCase().includes(q) ||
        (item.client || '').toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setModalMode('edit');
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item: PortfolioItem) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete.id);
      setIsDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  const handleModalSubmit = (data: Omit<PortfolioItem, 'id'>) => {
    if (modalMode === 'add') {
      onAdd(data);
    } else if (modalMode === 'edit' && editingItem) {
      onUpdate(editingItem.id, data);
    }
  };

  const nextSortOrder = items.length > 0 ? Math.max(...items.map((i) => i.sortOrder || 1)) + 1 : 1;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-700 text-xs font-semibold mb-2">
            <Sparkles size={13} />
            <span>Showcase & Work Gallery</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
            Portfolio
          </h1>
          <p className="text-navy-300 text-sm mt-1">
            Manage your portfolio projects.
          </p>
        </div>

        {/* Add Project Button */}
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-800 transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border shadow-2xs">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-offwhite text-navy-400 hover:text-navy hover:bg-navy/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, klien, atau kategori..."
            className="w-full pl-9 pr-4 py-2 bg-offwhite/80 border border-border rounded-xl text-xs text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Portfolio Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-offwhite text-navy-300 flex items-center justify-center mx-auto mb-3">
            <Layers size={26} />
          </div>
          <h3 className="text-base font-bold text-navy">Tidak ada proyek portfolio ditemukan</h3>
          <p className="text-xs text-navy-300 mt-1">
            {searchQuery
              ? `Tidak ada hasil pencarian untuk "${searchQuery}".`
              : 'Belum ada proyek dalam kategori ini. Silakan klik "+ Add Project".'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Category Badge */}
                <div className="aspect-[16/10] bg-offwhite relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-navy text-xs font-bold shadow-xs border border-white/40">
                      {item.category}
                    </span>
                  </div>

                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-navy/80 hover:bg-navy text-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
                      title="Kunjungi URL Proyek"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-navy tracking-tight line-clamp-1 group-hover:text-gold-700 transition-colors">
                    {item.title}
                  </h3>

                  {item.client && (
                    <div className="flex items-center gap-1.5 text-xs text-navy-300 mt-1 mb-2.5">
                      <Building size={13} className="text-gold" />
                      <span className="font-medium text-navy-400">{item.client}</span>
                    </div>
                  )}

                  <p className="text-xs text-navy-400 leading-relaxed line-clamp-2">
                    {item.description || 'Tidak ada deskripsi proyek.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-border/50">
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
      <PortfolioModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={editingItem}
        nextSortOrder={nextSortOrder}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        itemTitle={itemToDelete?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setItemToDelete(null);
        }}
      />
    </div>
  );
}
