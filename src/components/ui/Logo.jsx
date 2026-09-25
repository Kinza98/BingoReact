import { Link } from "react-router-dom";
import LogoIcon from "./LogoIcon";

function Logo() {
  return (
    <Link
      to="/game"
      className="group flex items-center gap-1 font-primary text-xl text-olive-200 transition-all duration-200 hover:text-white sm:text-2xl"
    >
      <span className="transition-transform duration-200 group-hover:-rotate-6">
        <LogoIcon variant="teal" />
      </span>

      <span>BINGO</span>
    </Link>
  );
}

export default Logo;
