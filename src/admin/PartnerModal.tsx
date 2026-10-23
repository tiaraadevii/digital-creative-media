import { useState, useEffect, useRef } from 'react';
import { X, Image as ImageIcon, Upload, Sparkles } from 'lucide-react';
import { PartnerEvent, PartnerCategory } from '@/types/partner';

interface PartnerModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  initialData?: PartnerEvent | null;
  onClose: () => void;
  onSubmit: (partner: Omit<PartnerEvent, 'id' | 'createdAt'>) => void;
}

const CATEGORY_OPTIONS: { value: PartnerCategory; label: string }[] = [
  { value: 'sport', label: 'Sport & Fun Run' },
  { value: 'trail', label: 'Trail Running' },
  { value: 'music', label: 'Festival Musik & Konser' },
  { value: 'arts', label: 'Seni, Standup & Pertunjukan' },
  { value: 'community', label: 'Komunitas & Lifestyle' },
  { value: 'business', label: 'Bisnis & Conference' },
];

export default function PartnerModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: PartnerModalProps) {
  const [name, setName] = useState('');
  const [officialTitle, setOfficialTitle] = useState('');
  const [category, setCategory] = useState<PartnerCategory>('sport');
  const [collabType, setCollabType] = useState('Official Media Partner & Publikasi');
  const [dateOrYear, setDateOrYear] = useState('');
  const [location, setLocation] = useState('Kota Malang');
  const [venue, setVenue] = useState('');
  const [tagline, setTagline] = useState('');
  const [desc, setDesc] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [impactBadge, setImpactBadge] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setName(initialData.name || '');
        setOfficialTitle(initialData.officialTitle || '');
        setCategory(initialData.category || 'sport');
        setCollabType(initialData.collabType || 'Official Media Partner & Publikasi');
        setDateOrYear(initialData.dateOrYear || '');
        setLocation(initialData.location || 'Kota Malang');
        setVenue(initialData.venue || '');
        setTagline(initialData.tagline || '');
        setDesc(initialData.desc || '');
        setHighlightsInput(initialData.highlights ? initialData.highlights.join(', ') : '');
        setImpactBadge(initialData.impactBadge || '');
        setLogoUrl(initialData.logoUrl || '');
        setPosterUrl(initialData.posterUrl || '');
      } else {
        setName('');
        setOfficialTitle('');
        setCategory('sport');
        setCollabType('Official Media Partner & Publikasi');
        setDateOrYear('');
        setLocation('Kota Malang');
        setVenue('');
        setTagline('');
        setDesc('');
        setHighlightsInput('');
        setImpactBadge('');
        setLogoUrl('');
        setPosterUrl('');
      }
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nama event / partner wajib diisi.');
      return;
    }

    const selectedCategoryOption = CATEGORY_OPTIONS.find((c) => c.value === category);
    const categoryLabel = selectedCategoryOption ? selectedCategoryOption.label : 'Event Partnership';

    const highlights = highlightsInput
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    onSubmit({
      name: name.trim(),
      officialTitle: officialTitle.trim() || name.trim(),
      category,
      categoryLabel,
      collabType: collabType.trim() || 'Official Media Partner',
      dateOrYear: dateOrYear.trim() || '2026',
      location: location.trim() || 'Malang',
      venue: venue.trim() || 'Malang Event Area',
      tagline: tagline.trim() || 'Official Partnership CV Digital Creative Media',
      desc: desc.trim() || 'Kolaborasi publikasi media dan peliputan event bersama CV Digital Creative Media.',
      highlights: highlights.length > 0 ? highlights : ['Official Media Partner', 'Media Coverage', 'Malang Creative Media'],
      impactBadge: impactBadge.trim() || 'Official Partner Event',
      logoUrl: logoUrl.trim() || undefined,
      posterUrl: posterUrl.trim() || undefined,
      logoBg: 'bg-white',
      accentGradient: 'from-navy-800 to-navy-950',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full border border-border shadow-2xl overflow-hidden animate-slide-up my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-offwhite via-white to-offwhite shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold/15 text-gold-700 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy tracking-tight">
                {mode === 'edit' ? 'Edit Partnership' : 'Add New Partner Event'}
              </h2>
              <p className="text-xs text-navy-300">
                Data partner otomatis tampil di section partnership website utama
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-navy/5 hover:bg-navy/10 text-navy-400 hover:text-navy flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Row: Name & Official Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Event / Partner Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Malang Run Fest 2027"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Official Title
              </label>
              <input
                type="text"
                value={officialTitle}
                onChange={(e) => setOfficialTitle(e.target.value)}
                placeholder="Contoh: Malang Run Festival 2027"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>
          </div>

          {/* Row: Category & Collab Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PartnerCategory)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Collaboration Type *
              </label>
              <input
                type="text"
                value={collabType}
                onChange={(e) => setCollabType(e.target.value)}
                placeholder="Official Media Partner & Publikasi"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>
          </div>

          {/* Row: Date, Location, Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Date / Year
              </label>
              <input
                type="text"
                value={dateOrYear}
                onChange={(e) => setDateOrYear(e.target.value)}
                placeholder="Contoh: 7 Februari 2027"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kota Malang"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Venue
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Taman Krida Budaya"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Slogan atau tagline singkat acara..."
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ceritakan gambaran kemitraan event..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all resize-none"
            />
          </div>

          {/* Row: Impact Badge & Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Impact Badge
              </label>
              <input
                type="text"
                value={impactBadge}
                onChange={(e) => setImpactBadge(e.target.value)}
                placeholder="Contoh: 3.500+ Pelari & Pengunjung"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Highlights (Pisahkan dengan Koma)
              </label>
              <input
                type="text"
                value={highlightsInput}
                onChange={(e) => setHighlightsInput(e.target.value)}
                placeholder="Kategori 5K Fun Run, Festival Musik, Singo Edan"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
            </div>
          </div>

          {/* Row: Logo & Poster Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Logo Upload */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Official Logo
              </label>
              <input
                type="file"
                ref={logoInputRef}
                onChange={(e) => handleFileUpload(e, setLogoUrl)}
                accept="image/*"
                className="hidden"
              />

              {logoUrl ? (
                <div className="relative rounded-2xl border border-border bg-offwhite h-32 p-3 flex items-center justify-center group">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setLogoUrl('')}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-navy hover:text-rose-600 shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold cursor-pointer rounded-2xl"
                  >
                    Ganti Logo
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="h-32 rounded-2xl border-2 border-dashed border-border hover:border-gold/60 bg-offwhite/50 hover:bg-gold/5 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all"
                >
                  <ImageIcon size={22} className="text-navy-400 mb-1" />
                  <p className="text-xs font-semibold text-navy">Upload Logo Partner</p>
                  <p className="text-[10px] text-navy-300">Klik untuk upload file</p>
                </div>
              )}
            </div>

            {/* Poster Upload */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Official Poster / Visual
              </label>
              <input
                type="file"
                ref={posterInputRef}
                onChange={(e) => handleFileUpload(e, setPosterUrl)}
                accept="image/*"
                className="hidden"
              />

              {posterUrl ? (
                <div className="relative rounded-2xl border border-border bg-offwhite h-32 p-3 flex items-center justify-center group overflow-hidden">
                  <img
                    src={posterUrl}
                    alt="Poster preview"
                    className="max-h-full max-w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setPosterUrl('')}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-navy hover:text-rose-600 shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => posterInputRef.current?.click()}
                    className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold cursor-pointer rounded-2xl"
                  >
                    Ganti Poster
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => posterInputRef.current?.click()}
                  className="h-32 rounded-2xl border-2 border-dashed border-border hover:border-gold/60 bg-offwhite/50 hover:bg-gold/5 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all"
                >
                  <Upload size={22} className="text-navy-400 mb-1" />
                  <p className="text-xs font-semibold text-navy">Upload Poster / Banner</p>
                  <p className="text-[10px] text-navy-300">Klik untuk upload file</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
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
              {mode === 'edit' ? 'Update Partner' : 'Save Partner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
