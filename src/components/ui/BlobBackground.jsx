function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes drift1 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, 20px) scale(1.08); }
            100% { transform: translate(0, 0) scale(1); }
          }

          @keyframes drift2 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-35px, -25px) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
          }

          @keyframes drift3 {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-15px, 20px) scale(0.9); }
            100% { transform: translate(0, 0) scale(1); }
          }

          .b1 { animation: drift1 35s ease-in-out infinite; }
          .b2 { animation: drift2 40s ease-in-out infinite; }
        //   .b3 { animation: drift3 26s ease-in-out infinite; }
        `}
      </style>

      <svg
        className="w-full h-full block"
        viewBox="0 0 1280 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* teal blob, top-left */}
        <circle
          className="b1"
          cx="80"
          cy="60"
          r="260"
          fill="#3A6E63"
          opacity="0.35"
        />

        {/* amber blob, bottom-right */}
        <circle
          className="b2"
          cx="1220"
          cy="700"
          r="250"
          fill="#D4913C"
          opacity="0.25"
        />

        {/* purple blob, right-middle */}
        <circle
          className="b3"
          cx="1400"
          cy="500"
          r="190"
          fill="#7F77DD"
          opacity="0.18"
        />
      </svg>
    </div>
  );
}

export default BlobBackground;
