function CardSetupHeader({ isWriteMode, selectedPattern }) {
  return (
    <div className="mb-6 w-full text-center xs:mb-7 sm:mb-9">
      {" "}
      <div className="mb-2.5 flex items-center justify-center gap-1.5 xs:gap-2 sm:mb-3">
        {" "}
        <span className="h-px w-5 bg-teal-400/40 xs:w-7 sm:w-12" />{" "}
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-teal-400 xs:text-[10px] sm:text-xs">
          {" "}
          Card Setup{" "}
        </span>{" "}
        <span className="h-px w-5 bg-teal-400/40 xs:w-7 sm:w-12" />{" "}
      </div>{" "}
      <h1 className="font-primary text-2xl tracking-wider text-white xs:text-3xl sm:text-4xl md:text-5xl">
        {" "}
        {isWriteMode ? "Make It Yours" : "Choose a Card!"}{" "}
      </h1>{" "}
      <p className="mx-auto mt-2 max-w-[20rem] text-[11px] leading-relaxed text-slate-400 xs:max-w-sm xs:text-xs sm:max-w-md sm:text-sm md:text-base">
        {" "}
        {isWriteMode
          ? "Fill in your custom numbers and create your perfect card."
          : selectedPattern === null
            ? "Browse the options and click a card to select it."
            : "Your card is selected. Ready when you are!"}{" "}
      </p>{" "}
    </div>
  );
}
export default CardSetupHeader;
