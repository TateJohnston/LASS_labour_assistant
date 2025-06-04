import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";

const ShowEmployeeDetailsContainer = ({ detailsContent, skillsContent }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          flex: "1.5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: `1px solid ${Colors.secondary}`,
        }}
      >
        {detailsContent}
      </Box>
      <Box sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
        {skillsContent}
      </Box>
    </Box>
  );
};

export default ShowEmployeeDetailsContainer;
