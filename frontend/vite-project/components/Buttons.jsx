import { Button } from "@mui/material";
import { Colors } from "../src/assets/Colors";

const Buttons = ({
  onClick,
  variant,
  width = "250px",
  padding,
  content,
  color,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        backgroundColor: Colors.secondary,
        color: { color },
        fontWeight: "bold",
        borderRadius: "5px",
        width: { width },
        height: "50px",
        padding: { padding },
      }}
    >
      {content}
    </Button>
  );
};

export default Buttons;
