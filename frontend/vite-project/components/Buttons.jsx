import { Button } from "@mui/material";
import { Colors } from "../src/assets/Colors";

const Buttons = ({
  onClick,
  variant,
  width = "250px",
  padding,
  content,
  height = "50px",
  backgroundColor = Colors.secondary,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        backgroundColor: { backgroundColor },
        color: Colors.content,
        fontWeight: "bold",
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
