import { useState, useMemo } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  FileEdit,
  Search,
  Sparkles,
  Calendar,
  User,
  Inbox,
} from 'lucide-react';
import { ArticleItem } from '@/types/article';
import ArticleModal from './ArticleModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface ArticlesManagementProps {
  articles: ArticleItem[];
  onAdd: (article: Omit<ArticleItem, 'id' | 'date' | 'createdAt'>) => void;
  onUpdate: (id: string, updated: Partial<ArticleItem>) => void;
  onDelete: (id: string) => void;
}

export default function ArticlesManagement({
  articles,
  onAdd,
  onUpdate,
  onDelete,
}: ArticlesManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<ArticleItem | null>(null);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    const list = Array.isArray(articles) ? articles : [];
    return list.filter((art) => {
      if (!art) return false;
      const matchStatus = statusFilter === 'All' || art.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (art.title || '').toLowerCase().includes(q) ||
        (art.author || '').toLowerCase().includes(q) ||
        (art.excerpt || '').toLowerCase().includes(q) ||
        (art.content || '').toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [articles, statusFilter, searchQuery]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: ArticleItem) => {
    setModalMode('edit');
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (article: ArticleItem) => {
    setArticleToDelete(article);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (articleToDelete) {
      onDelete(articleToDelete.id);
      setIsDeleteOpen(false);
      setArticleToDelete(null);
    }
  };

  const handleModalSubmit = (data: Omit<ArticleItem, 'id' | 'date' | 'createdAt'>) => {
    if (modalMode === 'add') {
      onAdd(data);
    } else if (modalMode === 'edit' && editingArticle) {
      onUpdate(editingArticle.id, data);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-700 text-xs font-semibold mb-2">
            <Sparkles size={13} />
            <span>Content & Editorial</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
            Articles
          </h1>
          <p className="text-navy-300 text-sm mt-1">
            Manage news and blog articles.
          </p>
        </div>

        {/* New Article Button */}
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-800 transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>New Article</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border shadow-2xs">
        {/* Status Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['All', 'Published', 'Draft'] as Array<'All' | 'Published' | 'Draft'>).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-offwhite text-navy-400 hover:text-navy hover:bg-navy/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul atau penulis..."
            className="w-full pl-9 pr-4 py-2 bg-offwhite/80 border border-border rounded-xl text-xs text-navy placeholder:text-navy-200 focus:outline-none focus:border-navy focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Articles Table Card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-offwhite text-navy-300 flex items-center justify-center mx-auto mb-3">
              <Inbox size={26} />
            </div>
            <h3 className="text-base font-bold text-navy">Tidak ada artikel ditemukan</h3>
            <p className="text-xs text-navy-300 mt-1">
              {searchQuery
                ? `Tidak ada artikel yang cocok dengan "${searchQuery}".`
                : 'Belum ada artikel yang ditambahkan. Silakan klik "+ New Article".'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-offwhite/60 text-[11px] font-bold uppercase tracking-wider text-navy-400">
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Author</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {filteredArticles.map((article) => {
                  const isPublished = article.status === 'Published';
                  return (
                    <tr
                      key={article.id}
                      className="hover:bg-offwhite/50 transition-colors group"
                    >
                      {/* Title with Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5 min-w-[260px] max-w-md">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border shadow-2xs group-hover:scale-105 transition-transform"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-navy tracking-tight truncate group-hover:text-gold-700 transition-colors">
                              {article.title}
                            </h4>
                            {article.excerpt && (
                              <p className="text-xs text-navy-300 truncate mt-0.5 max-w-sm">
                                {article.excerpt}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-4 px-6 text-xs text-navy-600 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <User size={13} className="text-navy-300" />
                          <span>{article.author}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs text-navy-400 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-navy-300" />
                          <span>{article.date}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {isPublished ? <Eye size={13} /> : <FileEdit size={13} />}
                          <span>{article.status}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(article)}
                            className="w-8 h-8 rounded-lg hover:bg-navy/5 text-navy-400 hover:text-navy flex items-center justify-center transition-colors cursor-pointer"
                            title="Edit Artikel"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenDelete(article)}
                            className="w-8 h-8 rounded-lg hover:bg-rose-50 text-navy-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                            title="Hapus Artikel"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Article Modal */}
      <ArticleModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={editingArticle}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        itemTitle={articleToDelete?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setArticleToDelete(null);
        }}
      />
    </div>
  );
}
