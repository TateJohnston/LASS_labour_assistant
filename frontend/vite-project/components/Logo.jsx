const Logo = ({ width = "100%", maxwidth = "960px" }) => {
  return (
    <div
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
      }}
    >
      <svg
        width={width}
        maxwidth={maxwidth}
        height="100%"
        viewBox="100 40 400 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
        }}
      >
        <g transform="translate(120, 0)">
          <circle cx="80" cy="100" r="40" fill="#1B1F3B" />
          <path
            d="M60 100 L70 120 L100 75"
            stroke="#1CA89E"
            strokeWidth="8"
            fill="none"
          />
        </g>

        <g textAnchor="middle">
          <text
            x="350"
            y="105"
            fontFamily="Montserrat, sans-serif"
            fontSize="54"
            fill="#1B1F3B"
            letterSpacing="8"
          >
            LASS
          </text>
          <text
            x="350"
            y="140"
            fontFamily="Montserrat, sans-serif"
            fontSize="24"
            fill="#1CA89E"
            letterSpacing="1"
          >
            Labour Assistant
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
