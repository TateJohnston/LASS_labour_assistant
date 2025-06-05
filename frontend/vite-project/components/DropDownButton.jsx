import { ArrowDropDownCircle } from "@mui/icons-material";
import { Colors } from "../src/assets/Colors";

const DropDownButton = ({
  fontSize = "30px",
  onClick,
  height,
  width,
  flex,
}) => {
  return (
    <ArrowDropDownCircle
      onClick={onClick}
      sx={{
        flex,
        height: "45px",
        width: "45px",
        color: Colors.secondary,
        fontSize: { fontSize },
        "&:hover": {
          cursor: "pointer",
          transition: "transform ease 0.3s",
          transform: "scale(1.2)",
        },
      }}
    />
  );
};

export default DropDownButton;
