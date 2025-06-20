import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import Buttons from "./Buttons";

const AllocationTeamsDisplay = ({ team_id, employees }) => {
  return (
    <>
      <Box
        key={team_id}
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: Colors.primary,
          color: Colors.secondary,
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "5px",
            alignItems: "center",
            color: Colors.content,
            marginBottom: "5px",
          }}
        >
          <Typography sx={{}} variant="h5">
            {employees[0].shift}:
          </Typography>
          <Typography sx={{}} variant="h5">
            Team {team_id}
          </Typography>
        </Box>

        {employees[0].name === null ? (
          <Typography
            sx={{
              flex: "1",
              padding: "5px",
              textAlign: "center",
              color: "darkgray",
              fontStyle: "italic",
            }}
          >
            No employees added yet...
          </Typography>
        ) : (
          employees.map((employee) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  flex: "1",
                  padding: "5px",
                  textAlign: "end",
                  fontWeight: "bold",
                  color: "lightgray",
                }}
              >
                {employee.role}:
              </Typography>
              <Typography
                sx={{
                  flex: "1",
                  padding: "5px",
                  textAlign: "start",
                  fontWeight: "bold",
                  color: Colors.secondary,
                }}
              >
                {employee.name}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default AllocationTeamsDisplay;
