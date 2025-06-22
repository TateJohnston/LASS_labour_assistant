import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/Searchbar";
import { Colors } from "../src/assets/Colors";
import DropDownButton from "../components/DropDownButton";
import ShowEmployeeDetailsContainer from "./ShowEmployeeDetailsContainer";
import ArrowBack from "../components/ArrowBack";
import Buttons from "../components/Buttons";

const EmployeesContainer = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showEmployeeDetails, setShowEmployeeDetails] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees;
    if (selectedEmployee) {
      filtered = filtered.filter(
        (employee) => employee.employee_name === selectedEmployee
      );
    }
    setFilteredEmployees(filtered);
  }, [selectedEmployee, employees]);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8081/lass/employees/")
      .then((res) => {
        let data = res.data.data;
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        width: "900px",
        height: "fit-content",
        maxHeight: "800px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "20px",
        border: `2px solid ${Colors.secondary}`,
        boxSizing: "border-box",
        padding: "20px 0px",
        gap: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <SearchBar
          options={filteredEmployees.map((employee) => employee.employee_name)}
          width={"400px"}
          value={selectedEmployee ? selectedEmployee : "Search..."}
          onChange={(value) => {
            setSelectedEmployee(value);
          }}
        />
        {showEmployeeDetails && (
          <ArrowBack
            onClick={() => {
              setShowEmployeeDetails("");
              setSelectedEmployee("");
              fetchEmployees();
            }}
          />
        )}
      </Box>
      {!showEmployeeDetails ? (
        <Box
          sx={{
            borderTop: `1px solid ${Colors.secondary}`,
            flex: "1",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "10px",
            },
            width: "100%",
          }}
        >
          {filteredEmployees.map((employee) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px",
                margin: "10px",
                borderBottom: `1px solid ${Colors.secondary}`,
              }}
              key={employee.employee_id}
            >
              <Typography variant="h5" sx={{ flex: "1" }}>
                Employee ID: {employee.employee_id}
              </Typography>
              <Typography variant="h5" sx={{ flex: "1" }}>
                {employee.employee_name}
              </Typography>
              <Typography variant="h5" sx={{ flex: "1" }}>
                {employee.main_role}
              </Typography>
              <DropDownButton
                onClick={() => {
                  setShowEmployeeDetails(employee);
                }}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <ShowEmployeeDetailsContainer
          showEmployeeDetails={showEmployeeDetails}
          setShowEmployeeDetails={setShowEmployeeDetails}
        />
      )}
    </Box>
  );
};

export default EmployeesContainer;
