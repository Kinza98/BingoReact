export function FemaleRobotOptionA({ className = "w-64 h-64" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      <style>{`
        @keyframes floatAnimB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes waveArmAnimB {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(18deg); }
        }
        .animate-float-b { animation: floatAnimB 2.8s ease-in-out infinite; }
        .animate-wave-b { transform-origin: 165px 135px; animation: waveArmAnimB 1.3s ease-in-out infinite; }
      `}</style>

      {/* "Hi!" Speech Bubble */}
      <div className="absolute -top-3 right-4 z-10 bg-[#e0a94d] text-slate-950 font-extrabold text-sm px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(224,169,77,0.5)] border-2 border-white flex items-center gap-1">
        <span>Hi!</span> <span>👋</span>
      </div>

      <svg
        viewBox="0 0 240 280"
        className="w-full h-full animate-float-b drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground Glow */}
        <ellipse cx="120" cy="265" rx="48" ry="6" fill="#000" opacity="0.3" />

        {/* Cute Ear Lights */}
        <circle cx="62" cy="70" r="10" fill="#e0a94d" />
        <circle cx="178" cy="70" r="10" fill="#e0a94d" />

        {/* Chibi Round Head */}
        <circle
          cx="120"
          cy="75"
          r="50"
          fill="#26303d"
          stroke="#e0a94d"
          strokeWidth="3"
        />
        <circle cx="120" cy="75" r="44" fill="#1b2430" />

        {/* Big Cute Sparkly Eyes */}
        {/* Left Eye */}
        <circle cx="98" cy="72" r="12" fill="#e0a94d" />
        <circle cx="98" cy="72" r="9" fill="#0f172a" />
        <circle cx="102" cy="68" r="4" fill="#ffffff" />
        <circle cx="95" cy="75" r="2" fill="#ffffff" />

        {/* Right Eye */}
        <circle cx="142" cy="72" r="12" fill="#e0a94d" />
        <circle cx="142" cy="72" r="9" fill="#0f172a" />
        <circle cx="146" cy="68" r="4" fill="#ffffff" />
        <circle cx="139" cy="75" r="2" fill="#ffffff" />

        {/* Rosy Cheeks */}
        <circle cx="86" cy="82" r="5" fill="#fb7185" opacity="0.7" />
        <circle cx="154" cy="82" r="5" fill="#fb7185" opacity="0.7" />

        {/* Happy W-shaped Cute Mouth */}
        <path
          d="M112 85 Q116 92 120 87 Q124 92 128 85"
          stroke="#e0a94d"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Neck */}
        <rect x="112" y="125" width="16" height="10" rx="3" fill="#475569" />

        {/* Body Torso */}
        <path
          d="M82 135 C82 135 88 190 92 210 C94 214 146 214 148 210 C152 190 158 135 158 135 Z"
          fill="#26303d"
          stroke="#e0a94d"
          strokeWidth="2"
        />
        <circle cx="120" cy="165" r="10" fill="#e0a94d" />

        {/* Left Arm */}
        <path
          d="M80 140 L60 180"
          stroke="#26303d"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="58" cy="184" r="5" fill="#e0a94d" />

        {/* Right Arm (Waving 👋) */}
        <g className="animate-wave-b">
          <path
            d="M160 140 L188 105 L198 75"
            stroke="#26303d"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="200" cy="68" r="6" fill="#e0a94d" />
        </g>

        {/* Legs */}
        <rect x="98" y="210" width="14" height="35" rx="5" fill="#1b2430" />
        <rect x="128" y="210" width="14" height="35" rx="5" fill="#1b2430" />
        <rect x="94" y="242" width="22" height="10" rx="5" fill="#e0a94d" />
        <rect x="124" y="242" width="22" height="10" rx="5" fill="#e0a94d" />
      </svg>
    </div>
  );
}

export function FemaleRobotOptionB({ className = "w-64 h-64" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      <style>{`
        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes waveArmAnim {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        .animate-float-robot { animation: floatAnim 3s ease-in-out infinite; }
        .animate-wave-hand { transform-origin: 165px 135px; animation: waveArmAnim 1.2s ease-in-out infinite; }
      `}</style>

      {/* "Hi!" Speech Bubble */}
      <div className="absolute -top-3 right-4 z-10 bg-[#e0a94d] text-slate-950 font-extrabold text-sm px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(224,169,77,0.5)] border-2 border-white flex items-center gap-1">
        <span>Hi!</span> <span>👋</span>
      </div>

      <svg
        viewBox="0 0 240 280"
        className="w-full h-full animate-float-robot drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow Shadow */}
        <ellipse cx="120" cy="265" rx="50" ry="7" fill="#000" opacity="0.35" />

        {/* Top Antenna */}
        <rect x="117" y="16" width="6" height="20" rx="3" fill="#475569" />
        <circle cx="120" cy="14" r="8" fill="#e0a94d" />
        <circle cx="120" cy="14" r="4" fill="#fff" />

        {/* Cute Head Outline (Sleek Rounded Capsule) */}
        <ellipse
          cx="120"
          cy="72"
          rx="56"
          ry="46"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        <ellipse cx="120" cy="72" rx="54" ry="44" fill="#26303d" />

        {/* Dark Visor Glass */}
        <ellipse
          cx="120"
          cy="75"
          rx="46"
          ry="34"
          fill="#0f172a"
          stroke="#e0a94d"
          strokeWidth="2"
        />

        {/* Cute Glowing Eyes (Happy Curved Expression) */}
        <g>
          {/* Left Eye */}
          <ellipse cx="98" cy="72" rx="9" ry="12" fill="#38bdf8" />
          <ellipse cx="98" cy="72" rx="6" ry="9" fill="#e0f2fe" />
          <circle cx="101" cy="68" r="3" fill="#fff" />

          {/* Right Eye */}
          <ellipse cx="142" cy="72" rx="9" ry="12" fill="#38bdf8" />
          <ellipse cx="142" cy="72" rx="6" ry="9" fill="#e0f2fe" />
          <circle cx="145" cy="68" r="3" fill="#fff" />

          {/* Cheeks Pink Blush */}
          <ellipse cx="88" cy="84" rx="7" ry="4" fill="#fb7185" opacity="0.7" />
          <ellipse
            cx="152"
            cy="84"
            rx="7"
            ry="4"
            fill="#fb7185"
            opacity="0.7"
          />

          {/* Cute Smile */}
          <path
            d="M108 88 Q120 98 132 88"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Neck */}
        <rect x="110" y="118" width="20" height="12" rx="4" fill="#475569" />

        {/* Body Torso */}
        <path
          d="M80 130 C80 130 85 190 90 210 C92 215 148 215 150 210 C155 190 160 130 160 130 Z"
          fill="#26303d"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        {/* Power Core Emblem */}
        <circle cx="120" cy="165" r="12" fill="#e0a94d" />
        <circle cx="120" cy="165" r="7" fill="#fff" />

        {/* Left Arm */}
        <path
          d="M78 135 L58 180"
          stroke="#26303d"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle cx="56" cy="184" r="6" fill="#e0a94d" />

        {/* Right Arm (Waving 👋) */}
        <g className="animate-wave-hand">
          <path
            d="M162 135 L190 100 L200 70"
            stroke="#26303d"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="202" cy="64" r="7" fill="#e0a94d" />
        </g>

        {/* Legs */}
        <rect x="98" y="212" width="14" height="35" rx="5" fill="#1e2733" />
        <rect x="128" y="212" width="14" height="35" rx="5" fill="#1e2733" />
        <rect x="94" y="244" width="22" height="10" rx="5" fill="#e0a94d" />
        <rect x="124" y="244" width="22" height="10" rx="5" fill="#e0a94d" />
      </svg>
    </div>
  );
}


export function FriendlyRobot({ className = "w-64 h-64" }) {

  return (

    <div className={`relative flex items-center justify-center ${className}`}>

      {/* CSS Animations */}

      <style>{`

        @keyframes robotFloat {

          0%, 100% { transform: translateY(0px); }

          50% { transform: translateY(-10px); }

        }

        @keyframes armWave {

          0%, 100% { transform: rotate(0deg); }

          25% { transform: rotate(24deg); }

          75% { transform: rotate(-10deg); }

        }

        @keyframes blinkEyes {

          0%, 94%, 98%, 100% { transform: scaleY(1); }

          96% { transform: scaleY(0.1); }

        }

        @keyframes bulbPulse {

          0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 4px #ff6f6f); }

          50% { opacity: 1; filter: drop-shadow(0 0 14px #ff6f6f); }

        }

        .robot-float-upgrade { animation: robotFloat 3.2s ease-in-out infinite; }

        .robot-wave-upgrade { transform-origin: 450px 380px; animation: armWave 1.3s ease-in-out infinite; }

        .robot-blink-upgrade { transform-origin: center; animation: blinkEyes 4s ease-in-out infinite; }

        .robot-pulse-upgrade { animation: bulbPulse 2s ease-in-out infinite; }

      `}</style>



      <svg

        viewBox="0 0 680 560"

        className="w-full h-full robot-float-upgrade drop-shadow-2xl"

        fill="none"

        xmlns="http://www.w3.org/2000/svg"

      >

        {/* Gradients */}

        <defs>

          <linearGradient id="headOrangeGrad" x1="220" y1="190" x2="440" y2="340" gradientUnits="userSpaceOnUse">

            <stop offset="0%" stopColor="#ffb74d" />

            <stop offset="60%" stopColor="#f4a340" />

            <stop offset="100%" stopColor="#d97f1e" />

          </linearGradient>

          <linearGradient id="torsoOrangeGrad" x1="270" y1="335" x2="410" y2="485" gradientUnits="userSpaceOnUse">

            <stop offset="0%" stopColor="#ffb74d" />

            <stop offset="100%" stopColor="#c76f16" />

          </linearGradient>

          <radialGradient id="eyeCyanGlow" cx="50%" cy="50%" r="50%">

            <stop offset="0%" stopColor="#a5f3fc" />

            <stop offset="40%" stopColor="#38bdf8" />

            <stop offset="100%" stopColor="#0284c7" />

          </radialGradient>

        </defs>



        {/* Ground shadow */}

        <ellipse cx="340" cy="515" rx="150" ry="16" fill="#000000" opacity="0.3" />



        {/* Antenna */}

        <rect x="322" y="145" width="8" height="48" rx="4" fill="#64748b" />

        <circle cx="326" cy="138" r="15" fill="#ff4d4d" className="robot-pulse-upgrade" />

        <circle cx="326" cy="138" r="7" fill="#ffffff" opacity="0.9" />



        {/* Metallic Ear Knobs */}

        <rect x="202" y="240" width="18" height="50" rx="8" fill="#64748b" />

        <rect x="460" y="240" width="18" height="50" rx="8" fill="#64748b" />



        {/* Main Head (Orange 3D Gloss) */}

        <rect

          x="220" y="190" width="240" height="155" rx="55"

          fill="url(#headOrangeGrad)" stroke="#b45309" strokeWidth="3.5"

        />



        {/* Inner White Face Plate */}

        <rect x="240" y="205" width="200" height="115" rx="42" fill="#fffdfa" stroke="#fef3c7" strokeWidth="2" />



        {/* Visor Gloss Reflection */}

        <path d="M260 215 C300 210 380 210 420 215 C380 212 300 212 260 215 Z" fill="#ffffff" opacity="0.6" />



        {/* Eyes & Blinking Group */}

        <g className="robot-blink-upgrade">

          {/* Left Eye Socket */}

          <ellipse cx="290" cy="255" rx="26" ry="30" fill="#1e293b" />

          {/* Left Eye Pupil Glow */}

          <ellipse cx="290" cy="255" rx="18" ry="21" fill="url(#eyeCyanGlow)" />

          <circle cx="296" cy="248" r="6" fill="#ffffff" />

          <circle cx="286" cy="260" r="3" fill="#ffffff" />



          {/* Right Eye Socket */}

          <ellipse cx="390" cy="255" rx="26" ry="30" fill="#1e293b" />

          {/* Right Eye Pupil Glow */}

          <ellipse cx="390" cy="255" rx="18" ry="21" fill="url(#eyeCyanGlow)" />

          <circle cx="396" cy="248" r="6" fill="#ffffff" />

          <circle cx="386" cy="260" r="3" fill="#ffffff" />



          {/* Pink Cheeks Blush */}

          <ellipse cx="270" cy="285" rx="12" ry="7" fill="#fb7185" opacity="0.65" />

          <ellipse cx="410" cy="285" rx="12" ry="7" fill="#fb7185" opacity="0.65" />



          {/* Cheerful Smile */}

          <path

            d="M305 292 Q340 315 375 292"

            stroke="#d97f1e" strokeWidth="4.5" strokeLinecap="round" fill="none"

          />

        </g>



        {/* Neck Joint */}

        <rect x="310" y="338" width="60" height="16" rx="6" fill="#475569" />



        {/* Torso Body */}

        <rect

          x="270" y="350" width="140" height="135" rx="38"

          fill="url(#torsoOrangeGrad)" stroke="#b45309" strokeWidth="3"

        />



        {/* Chest Core Power Gauge */}

        <circle cx="340" cy="410" r="26" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />

        <circle cx="340" cy="410" r="17" fill="#ff4d4d" className="robot-pulse-upgrade" />

        <circle cx="340" cy="410" r="7" fill="#ffffff" opacity="0.85" />



        {/* Left Arm (Static) */}

        <path d="M270 370 L225 425" stroke="#d97f1e" strokeWidth="18" strokeLinecap="round" />

        <circle cx="218" cy="432" r="16" fill="#64748b" />

        <circle cx="218" cy="432" r="9" fill="#ffb74d" />



        {/* Right Arm (Waving 👋) */}

        <g className="robot-wave-upgrade">

          <path d="M410 370 L465 330 L485 285" stroke="#d97f1e" strokeWidth="16" strokeLinecap="round" />

          <path d="M465 330 L485 285" stroke="#ffb74d" strokeWidth="6" stroke-linecap="round" />

          {/* Hand Claws / Fingers */}

          <circle cx="488" cy="278" r="15" fill="#64748b" />

          <circle cx="488" cy="278" r="8" fill="#ffb74d" />

        </g>



        {/* Feet */}

        <rect x="290" y="475" width="32" height="35" rx="8" fill="#64748b" />

        <rect x="358" y="475" width="32" height="35" rx="8" fill="#64748b" />

        <ellipse cx="306" cy="510" rx="26" ry="12" fill="#d97f1e" stroke="#b45309" strokeWidth="2" />

        <ellipse cx="374" cy="510" rx="26" ry="12" fill="#d97f1e" stroke="#b45309" strokeWidth="2" />

      </svg>

    </div>

  );

}

export function FemaleRobotMascot({
  className = "w-64 h-64",
  showSpeech = true,
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      {/* Self-contained CSS Animations */}
      <style>{`
        @keyframes floatRobot {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes waveArm {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(22deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes eyeBlink {
          0%, 94%, 98%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
        @keyframes corePulse {
          0%, 100% { opacity: 0.7; filter: drop-shadow(0 0 4px #e0a94d); }
          50% { opacity: 1; filter: drop-shadow(0 0 12px #e0a94d); }
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.05); }
        }
        .anim-float { animation: floatRobot 3.2s ease-in-out infinite; }
        .anim-wave { transform-origin: 175px 145px; animation: waveArm 1.3s ease-in-out infinite; }
        .anim-blink { transform-origin: center; animation: eyeBlink 4s ease-in-out infinite; }
        .anim-pulse { animation: corePulse 2s ease-in-out infinite; }
        .anim-bubble { animation: bubbleFloat 2.5s ease-in-out infinite; }
      `}</style>

      {/* Glowing "Hi!" Speech Bubble */}
      {showSpeech && (
        <div className="absolute -top-3 right-2 z-20 anim-bubble bg-gradient-to-r from-amber-500 to-[#e0a94d] text-slate-950 font-black text-sm px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(224,169,77,0.6)] border-2 border-white flex items-center gap-1 select-none">
          <span>Hi!</span> <span className="text-base">👋</span>
        </div>
      )}

      {/* Enhanced SVG Mascot */}
      <svg
        viewBox="0 0 250 290"
        className="w-full h-full anim-float drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow Drop Shadow */}
        <ellipse
          cx="125"
          cy="275"
          rx="55"
          ry="8"
          fill="#000000"
          opacity="0.4"
        />

        {/* Gradients */}
        <defs>
          <linearGradient
            id="headGrad"
            x1="60"
            y1="30"
            x2="190"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient
            id="bodyGrad"
            x1="75"
            y1="130"
            x2="175"
            y2="220"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient
            id="visorGrad"
            x1="75"
            y1="45"
            x2="175"
            y2="105"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
        </defs>

        {/* Antenna */}
        <rect x="122" y="14" width="6" height="22" rx="3" fill="#475569" />
        <circle cx="125" cy="12" r="9" fill="#e0a94d" className="anim-pulse" />
        <circle cx="125" cy="12" r="4" fill="#ffffff" />

        {/* Cute Golden Headphone Accents */}
        <circle cx="64" cy="72" r="12" fill="#e0a94d" />
        <circle cx="64" cy="72" r="7" fill="#1e293b" />
        <circle cx="186" cy="72" r="12" fill="#e0a94d" />
        <circle cx="186" cy="72" r="7" fill="#1e293b" />

        {/* Main Head Helmet Outer Shell */}
        <ellipse
          cx="125"
          cy="72"
          rx="58"
          ry="48"
          fill="url(#headGrad)"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Dark Glass Visor Screen */}
        <ellipse
          cx="125"
          cy="75"
          rx="47"
          ry="35"
          fill="url(#visorGrad)"
          stroke="#e0a94d"
          strokeWidth="2.5"
        />

        {/* Visor Light Reflection */}
        <path
          d="M90 52 C110 46 145 46 160 52 C145 50 110 50 90 52 Z"
          fill="#ffffff"
          opacity="0.35"
        />

        {/* Glowing Cute Eyes & Smile (With Blinking) */}
        <g className="anim-blink">
          {/* Left Eye */}
          <ellipse cx="102" cy="72" rx="10" ry="14" fill="url(#eyeGlow)" />
          <ellipse cx="102" cy="72" rx="6" ry="9" fill="#e0f2fe" />
          <circle cx="105" cy="67" r="3.5" fill="#ffffff" />
          <circle cx="100" cy="76" r="1.5" fill="#ffffff" />

          {/* Right Eye */}
          <ellipse cx="148" cy="72" rx="10" ry="14" fill="url(#eyeGlow)" />
          <ellipse cx="148" cy="72" rx="6" ry="9" fill="#e0f2fe" />
          <circle cx="151" cy="67" r="3.5" fill="#ffffff" />
          <circle cx="146" cy="76" r="1.5" fill="#ffffff" />

          {/* Cheeks Pink Blush */}
          <ellipse
            cx="90"
            cy="85"
            rx="7"
            ry="4"
            fill="#fb7185"
            opacity="0.85"
          />
          <ellipse
            cx="160"
            cy="85"
            rx="7"
            ry="4"
            fill="#fb7185"
            opacity="0.85"
          />

          {/* Cheerful Smile */}
          <path
            d="M112 88 Q125 99 138 88"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Neck Joint */}
        <rect x="114" y="118" width="22" height="12" rx="4" fill="#475569" />
        <line
          x1="117"
          y1="124"
          x2="133"
          y2="124"
          stroke="#e0a94d"
          strokeWidth="2"
        />

        {/* Main Body Chassis */}
        <path
          d="M82 130 C82 130 87 195 92 215 C94 220 156 220 158 215 C163 195 168 130 168 130 Z"
          fill="url(#bodyGrad)"
          stroke="#38bdf8"
          strokeWidth="2"
        />

        {/* Chest Power Core (Glowing Heart) */}
        <circle
          cx="125"
          cy="165"
          r="14"
          fill="#e0a94d"
          className="anim-pulse"
        />
        <path
          d="M125 158 C122 154 116 156 116 160 C116 165 125 171 125 171 C125 171 134 165 134 160 C134 156 128 154 125 158 Z"
          fill="#0f172a"
        />

        {/* Waist Belt Accent */}
        <rect x="92" y="210" width="66" height="8" rx="4" fill="#e0a94d" />

        {/* Left Arm (Resting) */}
        <g>
          <circle cx="74" cy="142" r="8" fill="#475569" />
          <path
            d="M74 142 L56 185"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle cx="54" cy="189" r="6" fill="#e0a94d" />
        </g>

        {/* Right Arm (Waving Hello! 👋) */}
        <g className="anim-wave">
          <circle cx="176" cy="142" r="8" fill="#475569" />
          <path
            d="M176 142 L202 108 L212 72"
            stroke="#334155"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M202 108 L212 72"
            stroke="#e0a94d"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Hand & Waving Fingers */}
          <g transform="translate(214, 65)">
            <circle cx="0" cy="0" r="7" fill="#e0a94d" />
            <rect
              x="-7"
              y="-12"
              width="3.5"
              height="9"
              rx="1.5"
              fill="#ffffff"
              transform="rotate(-20)"
            />
            <rect
              x="-1"
              y="-14"
              width="3.5"
              height="10"
              rx="1.5"
              fill="#ffffff"
            />
            <rect
              x="5"
              y="-12"
              width="3.5"
              height="9"
              rx="1.5"
              fill="#ffffff"
              transform="rotate(20)"
            />
          </g>
        </g>

        {/* Legs & Boots */}
        <rect x="102" y="218" width="15" height="36" rx="5" fill="#1e293b" />
        <rect x="133" y="218" width="15" height="36" rx="5" fill="#1e293b" />
        <rect x="98" y="250" width="23" height="12" rx="6" fill="#e0a94d" />
        <rect x="129" y="250" width="23" height="12" rx="6" fill="#e0a94d" />
      </svg>
    </div>
  );
}

// export default FemaleRobotOptionB;
// export default FemaleRobotOptionB;

function FemaleBingoBot({
  message = null,
  mode = "full",
  className = "",
}) {
  const isProfile = mode === "profile";

  return (
    <div
      className={`relative ${
        isProfile ? "w-12 h-12" : "w-44 h-52"
      } ${className}`}
      aria-label="Bingo bot"
    >
      {/* Message */}
      {message && (
        <div
          className={`
            absolute z-50
            ${isProfile ? "-top-14 left-8" : "-top-14 left-20"}
            w-max max-w-[220px]
            animate-pop-in
          `}
        >
          <div className="relative bg-white text-[#18282d] px-4 py-2.5 rounded-2xl rounded-bl-md shadow-lg">
            <p className="text-sm font-medium leading-snug">
              {message}
            </p>

            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white rotate-45" />
          </div>
        </div>
      )}

      {/* Antenna */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-1.5 h-5 bg-[#3a6e63] rounded-full" />
        <div className="w-3 h-3 rounded-full bg-[#f2b544] shadow-[0_0_12px_rgba(242,181,68,0.6)]" />
      </div>

      {/* Head */}
      <div
        className={`
          absolute
          top-5 left-1/2 -translate-x-1/2
          ${isProfile ? "w-12 h-11" : "w-32 h-24"}
          rounded-[38%]
          bg-[#194e58]
          border-4 border-[#3a6e63]
          shadow-xl
        `}
      >
        {/* Ears */}
        <div
          className={`absolute ${
            isProfile ? "top-3 -left-2 w-2 h-5" : "top-8 -left-4 w-5 h-10"
          } rounded-full bg-[#3a6e63]`}
        />

        <div
          className={`absolute ${
            isProfile ? "top-3 -right-2 w-2 h-5" : "top-8 -right-4 w-5 h-10"
          } rounded-full bg-[#3a6e63]`}
        />

        {/* Face */}
        <div
          className={`
            absolute inset-1.5
            rounded-[30%]
            bg-[#18282d]
            flex items-center justify-center
            ${isProfile ? "gap-1.5" : "gap-5"}
          `}
        >
          {/* Left eye */}
          <div
            className={`
              relative rounded-full bg-[#59d99a]
              shadow-[0_0_12px_rgba(89,217,154,0.6)]
              ${isProfile ? "w-2.5 h-2.5" : "w-7 h-7"}
            `}
          >
            {!isProfile && (
              <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white" />
            )}
          </div>

          {/* Right eye */}
          <div
            className={`
              relative rounded-full bg-[#59d99a]
              shadow-[0_0_12px_rgba(89,217,154,0.6)]
              ${isProfile ? "w-2.5 h-2.5" : "w-7 h-7"}
            `}
          >
            {!isProfile && (
              <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </div>

        {/* Smile */}
        {!isProfile && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-9 h-3 border-b-2 border-[#f2b544] rounded-full" />
        )}
      </div>

      {/* Full robot body */}
      {!isProfile && (
        <>
          {/* Neck */}
          <div className="absolute top-[116px] left-1/2 -translate-x-1/2 w-8 h-5 bg-[#3a6e63] rounded-b-lg" />

          {/* Body */}
          <div className="absolute top-[125px] left-1/2 -translate-x-1/2 w-32 h-24 rounded-[35%] bg-[#194e58] border-4 border-[#3a6e63] shadow-xl">
            {/* Chest */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-12 rounded-2xl bg-[#18282d] border border-white/10 flex items-center justify-center">
              <div className="text-[#f2b544] text-lg font-bold tracking-widest">
                B
              </div>
            </div>

            {/* Arms */}
            <div className="absolute top-5 -left-9 w-7 h-16 rounded-full bg-[#194e58] border-4 border-[#3a6e63] rotate-[12deg]" />

            <div className="absolute top-5 -right-9 w-7 h-16 rounded-full bg-[#194e58] border-4 border-[#3a6e63] -rotate-[12deg]" />
          </div>

          {/* Lower body */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-7 rounded-b-[40%] rounded-t-lg bg-[#491a1a] border-x-4 border-b-4 border-[#3a6e63]" />

          {/* Feet */}
          <div className="absolute bottom-0 left-10 w-8 h-5 rounded-full bg-[#18282d]" />
          <div className="absolute bottom-0 right-10 w-8 h-5 rounded-full bg-[#18282d]" />
        </>
      )}
    </div>
  );
}

export default FemaleBingoBot;