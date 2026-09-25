import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
function CarouselButton({ direction, onClick }) {
  const isPrevious = direction === "previous";
  return (
    <button
      type="button"
      onClick={onClick}
      className=" group z-20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-forest-900/70 text-slate-300 shadow-lg transition-all duration-200 hover:bg-forest-900 hover:text-white active:scale-95 xs:h-9 xs:w-9 sm:h-11 sm:w-11 "
      aria-label={isPrevious ? "Previous Option" : "Next Option"}
    >
      {" "}
      {isPrevious ? (
        <HiChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
      ) : (
        <HiChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
      )}{" "}
    </button>
  );
}
export default CarouselButton;
