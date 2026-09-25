function BingoScore({ score }) {
  return (
    <h1 className="font-primary text-white text-lg md:text-xl flex gap-4 items-center justify-center mb-3 xs:mb-5 ">
      <span
        className={`${score >= 1 ? " bg-black/50" : ""} rounded-full md:w-10 md:h-10 w-7 h-7 flex justify-center items-center`}
      >
        B
      </span>{" "}
      <span
        className={`${score >= 2 ? " bg-black/50" : ""} rounded-full  md:w-10 md:h-10 w-7 h-7 flex justify-center items-center`}
      >
        I
      </span>{" "}
      <span
        className={`${score >= 3 ? " bg-black/50" : ""} rounded-full  md:w-10 md:h-10 w-7 h-7 flex justify-center items-center`}
      >
        N
      </span>{" "}
      <span
        className={`${score >= 4 ? " bg-black/50" : ""} rounded-full  md:w-10 md:h-10 w-7 h-7 flex justify-center items-center`}
      >
        G
      </span>{" "}
      <span
        className={`${score >= 5 ? " bg-black/50" : ""} rounded-full  md:w-10 md:h-10 w-7 h-7 flex justify-center items-center`}
      >
        O
      </span>
    </h1>
  );
}

export default BingoScore;
