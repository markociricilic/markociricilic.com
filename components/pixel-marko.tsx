interface PixelMarkoProps {
  isDarkMode: boolean
  isWalking: boolean
  facingRight: boolean
}

export function PixelMarko({ isDarkMode, isWalking, facingRight }: PixelMarkoProps) {
  const play = isWalking ? "running" : "paused"

  return (
    <svg
      viewBox="0 0 60 108"
      width={110}
      overflow="visible"
      style={{
        overflow: "visible",
        filter: isDarkMode
          ? "drop-shadow(0 4px 16px rgba(0,0,0,0.9))"
          : "drop-shadow(0 4px 16px rgba(0,0,0,0.35))",
        imageRendering: "pixelated",
      }}
      aria-label="Pixel art of Marko"
    >
      <defs>
        <pattern id="beanie-hatch" patternUnits="userSpaceOnUse" width="5" height="5">
          <rect width="5" height="5" fill="#e8c020" />
          <line x1="0" y1="0" x2="5" y2="5" stroke="#b89010" strokeWidth="1" />
          <line x1="5" y1="0" x2="0" y2="5" stroke="#b89010" strokeWidth="1" />
        </pattern>

        <style>{`
          @keyframes marko-walk-bob {
            0%, 100% { transform: translateY(0px);  }
            50%       { transform: translateY(-5px); }
          }
          @keyframes marko-near-arm-swing {
            0%, 100% { transform: rotate(0deg);  }
            25%      { transform: rotate(32deg);  }
            75%      { transform: rotate(-28deg); }
          }
          @keyframes marko-leg-near {
            0%, 100% { transform: translateY(0px);  }
            25%      { transform: translateY(-5px); }
            75%      { transform: translateY(0px);  }
          }
          @keyframes marko-leg-far {
            0%, 100% { transform: translateY(0px);  }
            25%      { transform: translateY(0px);  }
            75%      { transform: translateY(-5px); }
          }
          .marko-body {
            animation: marko-walk-bob 0.65s ease-in-out infinite;
          }
          .marko-near-arm-l {
            animation: marko-near-arm-swing 0.65s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: right top;
          }
          .marko-near-arm-r {
            animation: marko-near-arm-swing 0.65s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: left top;
          }
          .marko-leg-near {
            animation: marko-leg-near 0.65s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center top;
          }
          .marko-leg-far {
            animation: marko-leg-far 0.65s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center top;
          }
        `}</style>
      </defs>

      <g className="marko-body" style={{ animationPlayState: play }}>

        {/* ── FRONT VIEW — shown when not walking ── */}
        <g style={{ opacity: isWalking ? 0 : 1, transition: "opacity 0.12s" }}>
          <rect x="10" y="0"  width="40" height="6"  fill="url(#beanie-hatch)" />
          <rect x="4"  y="6"  width="52" height="13" fill="url(#beanie-hatch)" />
          <rect x="4"  y="19" width="52" height="4"  fill="#c8a018" />
          <rect x="12" y="23" width="36" height="26" fill="#f5c090" />
          <rect x="13" y="25" width="12" height="2" fill="#7a4520" />
          <rect x="35" y="25" width="12" height="2" fill="#7a4520" />
          <rect x="15" y="31" width="8" height="6" fill="#7090b8" />
          <rect x="18" y="33" width="3" height="2" fill="#101828" />
          <rect x="20" y="33" width="1" height="1" fill="white" />
          <rect x="37" y="31" width="8" height="6" fill="#7090b8" />
          <rect x="40" y="33" width="3" height="2" fill="#101828" />
          <rect x="42" y="33" width="1" height="1" fill="white" />
          <rect x="12" y="28" width="14" height="2" fill="#8B5010" />
          <rect x="12" y="40" width="14" height="2" fill="#8B5010" />
          <rect x="12" y="28" width="2"  height="14" fill="#8B5010" />
          <rect x="24" y="28" width="2"  height="14" fill="#8B5010" />
          <rect x="34" y="28" width="14" height="2" fill="#8B5010" />
          <rect x="34" y="40" width="14" height="2" fill="#8B5010" />
          <rect x="34" y="28" width="2"  height="14" fill="#8B5010" />
          <rect x="46" y="28" width="2"  height="14" fill="#8B5010" />
          <rect x="26" y="33" width="8"  height="2"  fill="#8B5010" />
          <rect x="30" y="45" width="8" height="2" fill="#b05030" />
          <rect x="6"  y="49" width="48" height="8"  fill="#c01818" />
          <rect x="10" y="57" width="40" height="26" fill="#c01818" />
          <rect x="0"  y="51" width="10" height="24" fill="#c01818" />
          <rect x="0"  y="73" width="10" height="4"  fill="#f5c090" />
          <rect x="50" y="51" width="10" height="24" fill="#c01818" />
          <rect x="50" y="73" width="10" height="4"  fill="#f5c090" />
          <rect x="10" y="83" width="16" height="14" fill="#2040a8" />
          <rect x="34" y="83" width="16" height="14" fill="#2040a8" />
          <rect x="12" y="86" width="5"  height="7"  fill="#a090d0" />
          <rect x="36" y="86" width="5"  height="7"  fill="#a090d0" />
          <rect x="6"  y="97" width="20" height="6" fill="#1a1a1a" />
          <rect x="34" y="97" width="20" height="6" fill="#1a1a1a" />
          <rect x="8"  y="97" width="8"  height="2" fill="white" />
          <rect x="36" y="97" width="8"  height="2" fill="white" />
        </g>

        {/* ── SIDE PROFILE — LEFT FACING ── */}
        <g style={{ opacity: isWalking && !facingRight ? 1 : 0, transition: "opacity 0.1s" }}>
          <rect x="15" y="0"  width="28" height="6"  fill="url(#beanie-hatch)" />
          <rect x="12" y="6"  width="34" height="13" fill="url(#beanie-hatch)" />
          <rect x="12" y="19" width="34" height="4"  fill="#c8a018" />
          <rect x="22" y="23" width="18" height="26" fill="#f5c090" />
          <rect x="16" y="27" width="8"  height="16" fill="#f5c090" />
          <rect x="18" y="43" width="8"  height="6"  fill="#f5c090" />
          <rect x="13" y="37" width="5"  height="4"  fill="#c87848" />
          <rect x="20" y="31" width="4"  height="3"  fill="#101828" />
          <rect x="22" y="31" width="1"  height="1"  fill="white" />
          <rect x="16" y="29" width="2"  height="12" fill="#8B5010" />
          <rect x="16" y="29" width="8"  height="2"  fill="#8B5010" />
          <rect x="16" y="39" width="8"  height="2"  fill="#8B5010" />
          <rect x="24" y="30" width="12" height="2"  fill="#8B5010" />
          <rect x="15" y="44" width="4"  height="2"  fill="#b05030" />
          <rect x="18" y="49" width="24" height="8"  fill="#c01818" />
          <rect x="20" y="57" width="18" height="26" fill="#c01818" />
          {/* Near arm swings (char right arm) */}
          <g className="marko-near-arm-l" style={{ animationPlayState: play }}>
            <rect x="8"  y="49" width="10" height="22" fill="#c01818" />
            <rect x="8"  y="69" width="10" height="4"  fill="#f5c090" />
          </g>
          {/* Far arm stub */}
          <rect x="36" y="53" width="6" height="18" fill="#c01818" />
          {/* Near leg */}
          <g className="marko-leg-near" style={{ animationPlayState: play }}>
            <rect x="20" y="83" width="10" height="14" fill="#2040a8" />
            <rect x="22" y="86" width="5"  height="7"  fill="#a090d0" />
            <rect x="10" y="97" width="20" height="6" fill="#1a1a1a" />
            <rect x="10" y="97" width="6"  height="2" fill="white" />
          </g>
          {/* Far leg */}
          <g className="marko-leg-far" style={{ animationPlayState: play }}>
            <rect x="28" y="83" width="10" height="14" fill="#2040a8" />
            <rect x="28" y="97" width="14" height="6" fill="#1a1a1a" />
          </g>
        </g>

        {/* ── SIDE PROFILE — RIGHT FACING (mirror of left) ── */}
        <g
          style={{ opacity: isWalking && facingRight ? 1 : 0, transition: "opacity 0.1s" }}
          transform="translate(60,0) scale(-1,1)"
        >
          <rect x="15" y="0"  width="28" height="6"  fill="url(#beanie-hatch)" />
          <rect x="12" y="6"  width="34" height="13" fill="url(#beanie-hatch)" />
          <rect x="12" y="19" width="34" height="4"  fill="#c8a018" />
          <rect x="22" y="23" width="18" height="26" fill="#f5c090" />
          <rect x="16" y="27" width="8"  height="16" fill="#f5c090" />
          <rect x="18" y="43" width="8"  height="6"  fill="#f5c090" />
          <rect x="13" y="37" width="5"  height="4"  fill="#c87848" />
          <rect x="20" y="31" width="4"  height="3"  fill="#101828" />
          <rect x="22" y="31" width="1"  height="1"  fill="white" />
          <rect x="16" y="29" width="2"  height="12" fill="#8B5010" />
          <rect x="16" y="29" width="8"  height="2"  fill="#8B5010" />
          <rect x="16" y="39" width="8"  height="2"  fill="#8B5010" />
          <rect x="24" y="30" width="12" height="2"  fill="#8B5010" />
          <rect x="15" y="44" width="4"  height="2"  fill="#b05030" />
          <rect x="18" y="49" width="24" height="8"  fill="#c01818" />
          <rect x="20" y="57" width="18" height="26" fill="#c01818" />
          {/* Near arm swings */}
          <g className="marko-near-arm-r" style={{ animationPlayState: play }}>
            <rect x="8"  y="49" width="10" height="22" fill="#c01818" />
            <rect x="8"  y="69" width="10" height="4"  fill="#f5c090" />
          </g>
          {/* Far arm stub */}
          <rect x="36" y="53" width="6" height="18" fill="#c01818" />
          {/* Near leg */}
          <g className="marko-leg-near" style={{ animationPlayState: play }}>
            <rect x="20" y="83" width="10" height="14" fill="#2040a8" />
            <rect x="22" y="86" width="5"  height="7"  fill="#a090d0" />
            <rect x="10" y="97" width="20" height="6" fill="#1a1a1a" />
            <rect x="10" y="97" width="6"  height="2" fill="white" />
          </g>
          {/* Far leg */}
          <g className="marko-leg-far" style={{ animationPlayState: play }}>
            <rect x="28" y="83" width="10" height="14" fill="#2040a8" />
            <rect x="28" y="97" width="14" height="6" fill="#1a1a1a" />
          </g>
        </g>

      </g>
    </svg>
  )
}
