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
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState({});
  const [showEmployeeDetails, setShowEmployeeDetails] = useState("");
  const [revokedSkill, setRevokedSkill] = useState("");
  const [reinstatedSkill, setReinstatedSkill] = useState("");

  useEffect(() => {
    console.log(showEmployeeDetails);
  }, [showEmployeeDetails]);

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

  const roleDictionary = {
    Foreman: 1,
    "Crane Driver": 2,
    Clerk: 3,
    "Forklift Operator": 5,
    "Truck Driver": 4,
  };

  const getSelectedEmployeesDetails = (employee) => {
    const found = employees.find((e) => e.employee_name === employee);
    if (found) setSelectedEmployeeDetails(found);
  };

  const handleDetails = (key, value) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <Typography variant="h6" sx={{ color: "gray", fontWeight: "bold" }}>
          {key}:{" "}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    );
  };

  const editSkills = (employeeDetails) => {};

  const handleSkills = (role, hasSkill, ticketExpiry, lastVOC) => {
    if (!lastVOC) return;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          justifyContent: "space-around",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: Colors.secondary, fontWeight: "bold" }}
        >
          {role}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <Typography variant="h6" sx={{ color: "gray", fontWeight: "bold" }}>
            Has Skill:{" "}
          </Typography>
          <Typography variant="h6">{hasSkill ? "True" : "False"}</Typography>
        </Box>
        {role !== "Clerk" && (
          <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
            <Typography variant="h6" sx={{ color: "gray", fontWeight: "bold" }}>
              Ticket Expiry:{" "}
            </Typography>
            <Typography variant="h6">
              {new Date(ticketExpiry).toISOString().split("T")[0]}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <Typography variant="h6" sx={{ color: "gray", fontWeight: "bold" }}>
            Last VOC:{" "}
          </Typography>
          <Typography variant="h6">
            {new Date(lastVOC).toISOString().split("T")[0]}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Buttons
            content={hasSkill ? "Revoke" : "Reinstate"}
            width="100px"
            height="20px"
            backgroundColor={hasSkill ? "#F44C49" : Colors.secondary}
            onClick={() => {
              hasSkill
                ? revokeSkill(
                    showEmployeeDetails.employee_id,
                    roleDictionary[role]
                  )
                : reinstateSkill(
                    showEmployeeDetails.employee_id,
                    roleDictionary[role]
                  );
            }}
          />
          <Typography sx={{ color: Colors.error }}>
            {revokedSkill === roleDictionary[role] && "Skill Revoked"}
          </Typography>
          <Typography sx={{ color: Colors.success }}>
            {reinstatedSkill === roleDictionary[role] && "Skill Reinstated"}
          </Typography>
        </Box>
      </Box>
    );
  };

  const revokeSkill = async (employeeID, roleID) => {
    window.alert("Are you sure you want to revoke this skill?");
    setRevokedSkill(roleID);
    axios
      .put(`http://localhost:8081/lass/skills/revoke/${employeeID}/${roleID}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const reinstateSkill = (employeeID, roleID) => {
    window.alert("Are you sure you want to reinstate this skill?");
    setReinstatedSkill(roleID);
    axios
      .put(
        `http://localhost:8081/lass/skills/reinstate/${employeeID}/${roleID}`
      )
      .then((res) => {
        console.log(res);
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
        padding: "20px",
        gap: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <SearchBar
          options={employees.map((employee) => employee.employee_name)}
          width={"400px"}
          value={selectedEmployee ? selectedEmployee : "Search..."}
          onChange={(value) => {
            setSelectedEmployee(value);
            getSelectedEmployeesDetails(value);
          }}
        />
        {showEmployeeDetails && (
          <ArrowBack onClick={() => setShowEmployeeDetails("")} />
        )}
      </Box>
      {!showEmployeeDetails ? (
        <Box
          sx={{
            borderTop: `1px solid ${Colors.secondary}`,
            flex: "1",
            overflowY: "auto",
            paddingRight: "10px",
            width: "100%",
          }}
        >
          {selectedEmployee ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px",
                margin: "10px",
                borderBottom: `1px solid ${Colors.secondary}`,
              }}
            >
              <Typography variant="h5" sx={{ flex: "1" }}>
                Employee ID: {selectedEmployeeDetails.employee_id}
              </Typography>
              <Typography variant="h5" sx={{ flex: "1" }}>
                {selectedEmployeeDetails.employee_name}
              </Typography>
              <Typography variant="h5" sx={{ flex: "1" }}>
                {selectedEmployeeDetails.main_role}
              </Typography>
              <DropDownButton
                onClick={() => {
                  setShowEmployeeDetails(selectedEmployeeDetails);
                }}
              />
            </Box>
          ) : (
            employees.map((employee) => (
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
            ))
          )}
        </Box>
      ) : (
        <ShowEmployeeDetailsContainer
          detailsContent={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                gap: "10px",
                marginLeft: "30px",
                marginTop: "15px",
              }}
            >
              {handleDetails("Employee ID", showEmployeeDetails.employee_id)}
              {handleDetails("Name", showEmployeeDetails.employee_name)}
              {handleDetails("Main Role", showEmployeeDetails.main_role)}
              {handleDetails("Email", showEmployeeDetails.email)}
              {handleDetails("Number", showEmployeeDetails.phone_number)}
              {handleDetails("Address", showEmployeeDetails.address)}
              {handleDetails(
                "Emergency Name",
                showEmployeeDetails.emergency_name
              )}
              {handleDetails(
                "Emergency Number",
                showEmployeeDetails.emergency_number
              )}
              {handleDetails("Work Email", showEmployeeDetails.work_email)}
            </Box>
          }
          skillsContent={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                gap: "15px",
                marginLeft: "30px",
              }}
            >
              {handleSkills(
                "Foreman",
                showEmployeeDetails.has_foreman_skill,
                showEmployeeDetails.foreman_ticket_expiry,
                showEmployeeDetails.last_foreman_voc
              )}
              {handleSkills(
                "Crane Driver",
                showEmployeeDetails.has_crane_skill,
                showEmployeeDetails.crane_ticket_expiry,
                showEmployeeDetails.last_crane_voc
              )}

              {handleSkills(
                "Clerk",
                showEmployeeDetails.has_clerk_skill,
                null,
                showEmployeeDetails.last_clerk_voc
              )}
              {handleSkills(
                "Forklift Operator",
                showEmployeeDetails.has_fork_skill,
                showEmployeeDetails.fork_ticket_expiry,
                showEmployeeDetails.last_fork_voc
              )}
              {handleSkills(
                "Truck Driver",
                showEmployeeDetails.has_truck_skill,
                showEmployeeDetails.truck_ticket_expiry,
                showEmployeeDetails.last_truck_voc
              )}
            </Box>
          }
        />
      )}
    </Box>
  );
};

export default EmployeesContainer;
