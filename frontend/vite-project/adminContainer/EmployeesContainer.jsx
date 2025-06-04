import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployeesContainer = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/lass/employees/")
      .then((res) => {
        let data = res.data.data;
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        width: "50%",
        height: "80%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
      }}
    >
      <Box sx={{ overflowY: "auto", flex: 1, paddingRight: "10px" }}>
        {employees.map((employee) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography variant="h5" sx={{ flex: "1" }}>
              {employee.employee_id}
            </Typography>
            <Typography variant="h5" sx={{ flex: "1" }}>
              {employee.name}
            </Typography>
            <Typography variant="h5" sx={{ flex: "1" }}>
              {employee.role_id}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EmployeesContainer;
