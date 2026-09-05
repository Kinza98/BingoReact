function LinkTag({ children, type, onClick }) {
  const className =
    "underline text-sm xs:text-base font-secondary text-[#967c9b]";
  if (type)
    return (
      <button type="button" onClick={onClick} className={`${className} `}>
        {children}
      </button>
    );
  return <div className={`${className} `}>{children}</div>;
}

export default LinkTag;
