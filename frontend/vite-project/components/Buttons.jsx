import { Button } from "@mui/material";

const Buttons = ({
  onClick,
  variant,
  color,
  fontWeight,
  width,
  padding,
  height,
  content,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        backgroundColor: "#1CA89E",
        color: { color },
        fontWeight: { fontWeight },
        borderRadius: "5px",
        width: { width },
        height: { height },
        padding: { padding },
      }}
    >
      {content}
    </Button>
  );
};

export default Buttons;
