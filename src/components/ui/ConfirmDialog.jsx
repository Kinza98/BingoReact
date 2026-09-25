import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function ConfirmDialog({
  show,
  title = "Are you sure?",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm rounded-2xl bg-[#18282d] border border-[#6a838f]/30 shadow-2xl p-6">
        {/* Icon */}
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#491a1a]/60 border border-[#a35b78]/30 mb-4">
          <HiOutlineExclamationTriangle className="w-5 h-5 text-[#d5a9ba]" />
        </div>

        {/* Content */}
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-400">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-[#f0dce3] bg-[#491a1a] border border-[#a35b78]/40 hover:bg-[#5b2020] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
