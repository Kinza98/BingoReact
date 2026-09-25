function StackedBingoCards() {
  return (
    <div className="w-full overflow-hidden">
      <svg
        className="block h-auto w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g transform="rotate(9 50 50)">
          <rect
            x="8"
            y="10"
            width="84"
            height="80"
            rx="6"
            fill="#3AA6A0"
            fillOpacity="0.10"
            stroke="#3AA6A0"
            strokeOpacity="0.30"
            strokeWidth="0.6"
          />
        </g>

        <g transform="rotate(-6 50 50)">
          <rect
            x="5"
            y="7"
            width="90"
            height="86"
            rx="6"
            fill="#3AA6A0"
            fillOpacity="0.14"
            stroke="#3AA6A0"
            strokeOpacity="0.35"
            strokeWidth="0.6"
          />
        </g>
      </svg>
    </div>
  );
}

export default StackedBingoCards;
