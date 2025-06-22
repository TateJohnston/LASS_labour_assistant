import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";

const AvailableEmployee = ({ employee }) => {
  const shiftColors = {
    D: Colors.warning,
    E: Colors.secondary,
    N: Colors.error,
  };

  return (
    <Box
      key={employee.employee_id}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 0px",
      }}
    >
      <Box
        sx={{
          flex: "0.2",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{ color: shiftColors[employee.shift[0]], fontWeight: "bold" }}
          variant="h5"
        >
          {employee.shift[0]}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
        }}
      >
        <Typography variant="h6">{employee.employee_name}</Typography>
      </Box>
      <Box
        sx={{
          flex: "1.2",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {[
          employee.foreman && "Foreman",
          employee.crane && "Crane",
          employee.clerk && "Clerk",
          employee.fork && "Fork",
          employee.truck && "Truck",
        ]
          .filter(Boolean)
          .map((skill, index) => (
            <Typography key={index}>{skill}</Typography>
          ))}
      </Box>
    </Box>
  );
};
export default AvailableEmployee;
