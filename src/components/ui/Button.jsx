import { Link } from "react-router-dom";
function Button({
  children,
  variant,
  to,
  type = "button",
  bg,
  onClick,
  style,
  classes,
  disabled,
}) {
  const colorMap = {
    lightPurple: "bg-[#967c9b]",
    pinkPurple: "bg-[#875481]",
    ocean: "bg-[#3c6172]",
    plum: "bg-[#4b255e]",
    pine: "bg-[#1f5a65]",
    wine: "bg-[#491a1a]",
    moss: "bg-[#3a3e19]",
  };
  const className =
    style === "simple"
      ? `${classes} m-2 ml-0 mx-auto items-center flex gap-3 w-fit hover:bg-transparent ${bg} rounded-sm font-secondary text-white outline-0 cursor-pointer hover:border-white border-transparent border md:min-w-48 xs:py-2 xs:px-4 p-2 xs:text-lg text-center text-sm`
      : style === "game"
        ? `text-center md:max-w-80 w-full bg-amber font-semibold md:font-bold md:min-w-48 transition-transform duration-100 hover:scale-105 md:py-4 xs:px-5 px-3 py-2.5 sm:py-3 rounded-lg font-secondary text-slate outline-0 cursor-pointer text-base xs:text-lg shadow-lg md:shadow-[3px_3px_4px_rgba(0,0,0,0.3)]`
        : `${classes}  m-2 ml-0 items-center flex gap-3 w-fit md:min-w-48 ${colorMap[variant]} transition-transform duration-100 hover:scale-105 xs:py-3 xs:px-5 p-2 rounded-sm font-secondary text-white outline-0 cursor-pointer text-sm xs:text-lg shadow-[3px_3px_4px_rgba(0,0,0,0.3)]`;
  return to ? (
    <Link to={to} onClick={onClick} className={`${className} text-center`}>
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} text-center ${disabled ? " disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100" : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
