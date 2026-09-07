import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
function BingoBatch({ classes }) {
  return (
    <Link
      to="/"
      className={`flex flex-col font-black bg-amber rounded-full md:w-16 md:h-16 w-12 h-12 items-center justify-center ${classes}`}
    >
      <HiDotsHorizontal className="text-2xl md:text-3xl text-slate" />
      <HiDotsHorizontal className="text-2xl md:text-3xl text-slate -mt-4 md:-mt-5" />
      <HiDotsHorizontal className="text-2xl md:text-3xl text-slate -mt-4 md:-mt-5" />
    </Link>
  );
}

export default BingoBatch;
