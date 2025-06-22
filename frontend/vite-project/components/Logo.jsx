const Logo = ({ width = "100%", maxwidth = "960px", display }) => {
  return (
    <img
      style={{ width, maxwidth, display }}
      src="../src/assets/LassLogo.png"
    ></img>
  );
};

export default Logo;
