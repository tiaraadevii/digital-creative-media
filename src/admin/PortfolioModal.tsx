import { useState, useEffect, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Link as LinkIcon, Trash2 } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';

interface PortfolioModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  initialData?: PortfolioItem | null;
  nextSortOrder?: number;
  onClose: () => void;
  onSubmit: (item: Omit<PortfolioItem, 'id'>) => void;
}

const CATEGORIES = [
  'Branding',
  'Web Development',
  'Digital Marketing',
  'Videography',
  'Event & Media Partnership',
  'Creative Production',
  'Kost & Property',
];

export default function PortfolioModal({
  isOpen,
  mode,
  initialData,
  nextSortOrder = 1,
  onClose,
  onSubmit,
}: PortfolioModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Branding');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [image, setImage] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title || '');
        setCategory(initialData.category || 'Branding');
        setDescription(initialData.description || '');
        setClient(initialData.client || '');
        setImage(initialData.image || '');
        setProjectUrl(initialData.projectUrl || '');
        setSortOrder(initialData.sortOrder || 1);
      } else {
        // Add mode
        setTitle('');
        setCategory('Branding');
        setDescription('');
        setClient('');
        setImage('');
        setProjectUrl('');
        setSortOrder(nextSortOrder);
      }
    }
  }, [isOpen, mode, initialData, nextSortOrder]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Judul proyek (Title) wajib diisi.');
      return;
    }

    onSubmit({
      title: title.trim(),
      category,
      description: description.trim(),
      client: client.trim(),
      image:
        image ||
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      projectUrl: projectUrl.trim(),
      sortOrder: Number(sortOrder) || 1,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-xl w-full border border-border shadow-2xl overflow-hidden animate-slide-up my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-offwhite via-white to-offwhite shrink-0">
          <h2 className="text-xl font-bold text-navy tracking-tight">
            {mode === 'edit' ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-navy/5 hover:bg-navy/10 text-navy-400 hover:text-navy flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Title & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project title"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief project description"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all resize-none"
            />
          </div>

          {/* Two Columns: Project Image & Client Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Project Image */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Project Image
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              {image ? (
                <div className="relative rounded-2xl overflow-hidden border border-border bg-offwhite h-36 group">
                  <img
                    src={image}
                    alt="Project preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="w-7 h-7 rounded-full bg-white/90 text-navy-700 hover:text-red-600 shadow-md flex items-center justify-center transition-colors cursor-pointer"
                      title="Hapus gambar"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold cursor-pointer"
                  >
                    Ganti Gambar
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-36 rounded-2xl border-2 border-dashed border-border hover:border-gold/60 bg-offwhite/50 hover:bg-gold/5 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-navy/5 group-hover:bg-gold/15 text-navy-400 group-hover:text-gold-700 flex items-center justify-center mb-2 transition-colors">
                    <ImageIcon size={20} />
                  </div>
                  <p className="text-xs font-semibold text-navy">
                    Click or drag image here to upload
                  </p>
                  <p className="text-[10px] text-navy-300 mt-0.5">JPG, PNG, WebP</p>
                </div>
              )}
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Client name"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>
          </div>

          {/* Two Columns: Project URL & Sort Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Project URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                min={1}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-border bg-white text-navy text-xs font-semibold hover:bg-offwhite transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-800 transition-all shadow-sm cursor-pointer"
            >
              {mode === 'edit' ? 'Update' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
