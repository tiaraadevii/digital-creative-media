import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  itemTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 border border-border shadow-2xl animate-slide-up text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <AlertTriangle size={24} />
        </div>

        <h3 className="text-lg font-bold text-navy tracking-tight">
          Hapus Item Portfolio?
        </h3>

        <p className="text-sm text-navy-400 mt-2 leading-relaxed">
          Are you sure you want to delete this portfolio item?
          {itemTitle && (
            <span className="block font-semibold text-navy mt-1">"{itemTitle}"</span>
          )}
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl border border-border bg-white text-navy font-semibold text-sm hover:bg-offwhite transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
