function Cell({ num, onChange, isInput }) {
  return (
    <div className="xs:w-14 xs:h-14 w-10 h-10 border border-white/9">
      {!isInput ? (
        <button className="w-full h-full text-sm xs:text-lg bg-transparent font-secondary text-white">
          {num}
        </button>
      ) : (
        <input
          value={num}
          type="text"
          maxLength={2}
          className="w-full h-full outline-0 border-0 text-center"
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Cell;
