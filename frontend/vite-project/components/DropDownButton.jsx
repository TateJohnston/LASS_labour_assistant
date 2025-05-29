import { ArrowDropDownCircle } from "@mui/icons-material";

const DropDownButton = ({ fontSize = "30px", onClick }) => {
  return (
    <ArrowDropDownCircle
      onClick={onClick}
      sx={{
        color: "#1CA89E",
        fontSize: { fontSize },
        "&:hover": {
          cursor: "pointer",
          transition: "transform ease 0.3s",
          transform: "scale(1.05)",
        },
      }}
    />
  );
};

export default DropDownButton;
