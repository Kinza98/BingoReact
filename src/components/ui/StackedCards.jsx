function StackedBingoCards() {
  return (
    <svg
      className="w-full h-full block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* back card 2, most rotated, furthest back */}
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

      {/* back card 1, slightly rotated */}
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

      {/* front card outline only — no grid/numbers, since the real bingo
          component sits on top of this as its own element */}
      {/* <g>
        <rect
          x="2"
          y="4"
          width="96"
          height="92"
          rx="6"
          fill="#132530"
          fillOpacity="0.5"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
          strokeWidth="0.6"
        />
      </g> */}
    </svg>
  );
}

export default StackedBingoCards;
