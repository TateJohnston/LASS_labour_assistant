import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Colors } from "../src/assets/Colors";

const ArrowBack = ({ fontSize = "30px", onClick, height, width }) => {
  return (
    <ArrowCircleLeftIcon
      onClick={onClick}
      sx={{
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

export default ArrowBack;
