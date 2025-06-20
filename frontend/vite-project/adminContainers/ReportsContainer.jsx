import { Box, Paper, Typography } from "@mui/material";
import SearchBar from "../components/Searchbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Colors } from "../src/assets/Colors";
import {
  LeaveReportChart,
  EmployeeLeaveReportChart,
} from "../reports/LeaveReports";
import {
  EmployeeWagesReportChart,
  WagesReportChart,
} from "../reports/WagesReports";
import { SkillsReport } from "../reports/SkillsReports";
import { TeamsReport } from "../reports/ProductivityReport";

const ReportsContainer = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployeeData, setFilteredEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedReport, setSelectedReport] = useState("");

  const reports = [
    "Leave Balances Report",
    "Wages Report",
    "Skills Report",
    "Productivity Report",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8081/lass/employees/")
      .then((res) => {
        const data = res.data.data;
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let filtered = employees;
    if (selectedEmployee) {
      filtered = filtered.filter(
        (employees) => employees.employee_name === selectedEmployee
      );
    }
    setFilteredEmployeeData(filtered);
  }, [selectedEmployee]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "800px",
          justifyContent: "space-around",
        }}
      >
        <SearchBar
          onChange={(value) => {
            if (value === "Skills Report" || value === "Productivity Report") {
              setSelectedEmployee("");
            }
            setSelectedReport(value);
          }}
          options={reports}
          value={selectedReport || "Select Report..."}
          width={"300px"}
        />
        <SearchBar
          options={employees.map((employee) => employee.employee_name)}
          onChange={(value) => {
            setSelectedEmployee(value);
          }}
          disabled={
            selectedReport === "Skills Report" ||
            selectedReport === "Productivity Report"
              ? true
              : false
          }
          value={selectedEmployee || "Select Employee..."}
          width={"300px"}
        />
      </Box>
      <Paper
        sx={{
          backgroundColor: "white",
          height: "800px",
          width: "85vw",
          borderRadius: "5px",
          border: `2px solid ${Colors.secondary}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "15px",
        }}
      >
        {!selectedReport && (
          <Typography
            sx={{
              color: "gray",
            }}
            variant="h4"
          >
            Select a Report...
          </Typography>
        )}
        {selectedReport === "Leave Balances Report" && !selectedEmployee && (
          <LeaveReportChart />
        )}
        {selectedReport === "Leave Balances Report" &&
          selectedEmployee &&
          filteredEmployeeData.length > 0 && (
            <EmployeeLeaveReportChart employee={filteredEmployeeData[0]} />
          )}
        {selectedReport === "Wages Report" && !selectedEmployee && (
          <WagesReportChart />
        )}
        {selectedReport === "Wages Report" &&
          selectedEmployee &&
          filteredEmployeeData.length > 0 && (
            <EmployeeWagesReportChart employee={filteredEmployeeData[0]} />
          )}
        {selectedReport === "Skills Report" && !selectedEmployee && (
          <SkillsReport />
        )}
        {selectedReport === "Productivity Report" && !selectedEmployee && (
          <TeamsReport />
        )}
      </Paper>
    </Box>
  );
};

export default ReportsContainer;
