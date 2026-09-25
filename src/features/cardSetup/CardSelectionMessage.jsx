import { HiPlay } from "react-icons/hi";

function CardSelectionMessage({ onClose }) {
  return (
    <div className="mb-5 flex w-full max-w-md items-center gap-2.5 rounded-2xl border border-amber/20 bg-danger px-3 py-3 xs:gap-3 xs:px-4">
      {" "}
      {/* Icon */}{" "}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber/10 text-amber xs:h-9 xs:w-9">
        {" "}
        <HiPlay className="h-3.5 w-3.5 xs:h-4 xs:w-4" />{" "}
      </div>{" "}
      {/* Message */}{" "}
      <div className="min-w-0 flex-1">
        {" "}
        <p className="text-xs font-semibold text-white xs:text-sm">
          {" "}
          Select a card first{" "}
        </p>{" "}
        <p className="mt-0.5 text-[10px] text-slate-400 xs:text-xs">
          {" "}
          Game cannot be started until you select a card or save your own
          pattern.{" "}
        </p>{" "}
      </div>{" "}
      {/* Close */}{" "}
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded-sm border border-red-950 px-2 py-1.5 text-[10px] font-medium text-slate-500 transition-colors hover:text-white xs:px-2 xs:py-2 xs:text-xs"
      >
        {" "}
        Got it{" "}
      </button>{" "}
    </div>
  );
}
export default CardSelectionMessage;
