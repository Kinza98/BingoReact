function ActionButton({
  onClick,
  icon,
  title,
  description,
  className = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex h-full w-full min-w-0 flex-col items-center justify-center
        rounded-xl
        px-1 py-2
        text-center
        transition-all duration-200
        hover:-translate-y-1
        active:scale-[0.98]
        xs:max-w-none xs:rounded-2xl xs:px-1.5 xs:py-2.5
        sm:px-4 sm:py-4
        cursor-pointer
        ${className}
      `}
    >
      <div
        className={`
          mb-1 flex h-7 w-7 items-center justify-center
          rounded-lg
          transition-all duration-200
          group-hover:scale-105
          xs:mb-2 xs:h-9 xs:w-9
          sm:h-11 sm:w-11 sm:rounded-xl
          ${iconClassName}
        `}
      >
        {icon}
      </div>

      <span
        className={`
          whitespace-nowrap text-[10px] font-semibold leading-tight
          xs:text-[10px]
          sm:text-sm
          ${titleClassName}
        `}
      >
        {title}
      </span>

      <span
        className={`
          mt-0.5 hidden text-[10px]
          sm:block
          
          ${descriptionClassName}
        `}
      >
        {description}
      </span>
    </button>
  );
}

export default ActionButton;
