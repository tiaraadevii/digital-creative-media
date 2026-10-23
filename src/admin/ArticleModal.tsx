import { useState, useEffect, useRef } from 'react';
import { X, Image as ImageIcon, Check } from 'lucide-react';
import { ArticleItem } from '@/types/article';

interface ArticleModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  initialData?: ArticleItem | null;
  onClose: () => void;
  onSubmit: (article: Omit<ArticleItem, 'id' | 'date' | 'createdAt'>) => void;
}

export default function ArticleModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: ArticleModalProps) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('CV Digital Creative Media');
  const [publishImmediately, setPublishImmediately] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title || '');
        setExcerpt(initialData.excerpt || '');
        setContent(initialData.content || '');
        setCoverImage(initialData.coverImage || '');
        setAuthor(initialData.author || 'CV Digital Creative Media');
        setPublishImmediately(initialData.status === 'Published');
      } else {
        // Add mode
        setTitle('');
        setExcerpt('');
        setContent('');
        setCoverImage('');
        setAuthor('CV Digital Creative Media');
        setPublishImmediately(true);
      }
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Judul artikel (Title) wajib diisi.');
      return;
    }

    onSubmit({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage:
        coverImage ||
        'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
      author: author.trim() || 'CV Digital Creative Media',
      status: publishImmediately ? 'Published' : 'Draft',
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
            {mode === 'edit' ? 'Edit Article' : 'New Article'}
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
          {/* Title * (at the very top as requested) */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary that appears in the article list"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full article content. Use line breaks to separate paragraphs."
              rows={5}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all resize-none"
            />
          </div>

          {/* Two Columns: Cover Image & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cover Image */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Cover Image
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              {coverImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-border bg-offwhite h-36 group">
                  <img
                    src={coverImage}
                    alt="Article cover preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
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
                    Ganti Cover
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

            {/* Author */}
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-navy text-sm placeholder:text-navy-200 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/5 transition-all"
              />
              <p className="text-[11px] text-navy-300 mt-2">
                Nama penulis atau tim editorial yang akan ditampilkan di artikel publik.
              </p>
            </div>
          </div>

          {/* Checkbox: Publish immediately */}
          <div className="pt-2 flex items-center gap-2.5">
            <label className="relative flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={publishImmediately}
                onChange={(e) => setPublishImmediately(e.target.checked)}
                className="w-4 h-4 rounded text-gold focus:ring-gold border-border cursor-pointer accent-navy"
              />
              <span className="text-xs sm:text-sm font-semibold text-navy">
                Publish immediately
              </span>
            </label>
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
              {mode === 'edit' ? 'Update' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
