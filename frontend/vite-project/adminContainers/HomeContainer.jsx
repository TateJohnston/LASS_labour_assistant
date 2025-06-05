import Calendar from "../components/Calendar";
import { Box } from "@mui/material";
import { Colors } from "../src/assets/Colors";

const HomeContainer = () => {
  return (
    <Box
      sx={{
        backgroundColor: Colors.content,
        height: "fit-content",
        maxHeight: "800px",
        width: "60%",
        border: `2px solid ${Colors.secondary}`,
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "50px",
        overflowY: "auto",
      }}
    >
      <Calendar height={"800px"} />
    </Box>
  );
};

export default HomeContainer;
