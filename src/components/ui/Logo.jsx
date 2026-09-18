import { Link } from "react-router-dom";
import LogoIcon from "./LogoIcon";

function Logo() {
  return (
    <Link
      to="/"
      className="flex gap-1 items-center text-olive-200 font-primary text-xl md:text-2xl hover:text-white"
    >
      <LogoIcon variant="teal" />
      BINGO
    </Link>
  );
}

export default Logo;
