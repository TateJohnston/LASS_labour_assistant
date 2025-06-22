import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import DateRangeSelector from "../components/DateRangeSelector";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import axios from "axios";
import convertDate from "../utilities/convertDate";
import DropdownButton from "../components/DropDownButton";
import SearchBar from "../components/Searchbar";
import EmployeePaySummary from "./EmployeePaySummary";
import ArrowBack from "../components/ArrowBack";
import DateSelector from "../components/DateSelector";
import calculateDayDifference from "../utilities/calculateDayDifference";

const PayrollContainer = () => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployeeSummaryID, setSelectedEmployeeSummaryID] = useState(0);
  const [payday, setPayday] = useState(null);
  const [completedPayslips, setCompletedPayslips] = useState([]);

  const toggle = () => setOpen(!open);

  let selectedEmployeeName = employees.find(
    (employee) => employee.employee_id === selectedEmployeeSummaryID
  );

  useEffect(() => {
    axios
      .get("http://localhost:8081/lass/employees")
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
        (employee) => employee.employee_name === selectedEmployee
      );
    }
    setFilteredEmployees(filtered);
  }, [selectedEmployee, employees]);

  const openEmployeeSummary = (employeeID) => {
    setSelectedEmployeeSummaryID(employeeID);
  };

  const fetchCompletedPayslips = (start_date, end_date) => {
    setStartDate(convertDate(start_date));
    setEndDate(convertDate(end_date));
    if (!dateRange) return;
    axios
      .get(
        `http://localhost:8081/lass/payroll/completed/${convertDate(
          start_date
        )}/${convertDate(end_date)}`
      )
      .then((res) => {
        const data = res.data.data;
        const employeeIDs = data.map((payslip) => payslip.employee_id);
        setCompletedPayslips(employeeIDs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Buttons
            fontSize={Object.entries(dateRange).length > 0 && "large"}
            content={
              Object.entries(dateRange).length > 0
                ? `${startDate} - ${endDate}`
                : "Select Pay Period"
            }
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
          <DateRangeSelector
            toggle={toggle}
            open={open}
            onChange={(range) => {
              setDateRange({
                startDate: range.startDate,
                endDate: range.endDate,
              });
              setOpen(false);
              fetchCompletedPayslips(range.startDate, range.endDate);
            }}
          />
        </Box>
        <DateSelector
          label="Select Payday"
          height={"50px"}
          width="200px"
          onChange={(value) => {
            setCompletedPayslips([]);
            setPayday(convertDate(value.$d));
          }}
        />
      </Box>

      {Object.entries(dateRange).length > 0 && !selectedEmployeeSummaryID ? (
        calculateDayDifference(startDate, endDate) === 14 ? (
          <Box
            sx={{
              width: "900px",
              height: "700px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "5px",
              border: `2px solid ${Colors.secondary}`,
              boxSizing: "border-box",
              padding: "10px 0px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "10px",
              },
              gap: "10px",
              overflowX: "hidden",
            }}
          >
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SearchBar
                  width={"400px"}
                  options={employees.map((employee) => employee.employee_name)}
                  value={selectedEmployee ? selectedEmployee : "Search..."}
                  onChange={(value) => {
                    setSelectedEmployee(value);
                  }}
                />
              </Box>
              {filteredEmployees.map((employee) => (
                <Box
                  key={employee.employee_id}
                  sx={{
                    borderBottom: `2px solid ${Colors.secondary}`,
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    padding: "10px",
                    alignItems: "center",
                    backgroundColor: completedPayslips.some(
                      (id) => id === employee.employee_id
                    )
                      ? Colors.success
                      : Colors.warning,
                  }}
                >
                  <Typography
                    flex={"1"}
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                  >
                    {employee.employee_name}
                  </Typography>
                  <Typography flex={"1"} variant="h5" sx={{}}>
                    {employee.main_role}
                  </Typography>
                  <DropdownButton
                    onClick={() => openEmployeeSummary(employee.employee_id)}
                    flex={"0.5"}
                  />
                </Box>
              ))}
            </>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{ color: Colors.error, marginTop: "15px" }}
          >
            Selected Pay Period does not meet 14 day requirement
          </Typography>
        )
      ) : (
        <>
          {selectedEmployeeName && selectedEmployeeSummaryID && (
            <>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Typography variant="h4" sx={{ color: Colors.content }}>
                  {selectedEmployeeName.employee_name}
                </Typography>
                <Typography variant="h4" sx={{ color: Colors.content }}>
                  Employee ID: {selectedEmployeeSummaryID}
                </Typography>
                <ArrowBack
                  onClick={() => {
                    fetchCompletedPayslips(startDate, endDate);
                    selectedEmployeeName = "";
                    setSelectedEmployeeSummaryID(0);
                  }}
                />
              </Box>
              <EmployeePaySummary
                status={completedPayslips.some(
                  (id) => id === selectedEmployeeSummaryID
                )}
                payday={payday}
                start_date={startDate}
                end_date={endDate}
                employee_id={selectedEmployeeSummaryID}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};
export default PayrollContainer;
