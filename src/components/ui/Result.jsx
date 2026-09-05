function Result({ children }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center text-white">
      {children}
    </div>
  );
}

export default Result;
