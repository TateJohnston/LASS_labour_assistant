import { Box, Typography } from "@mui/material";
import SearchBar from "./Searchbar";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { Colors } from "../src/assets/Colors";

const EmployeeShiftAllocation = ({
  employee,
  allocated,
  teamSelect,
  roleSelect,
  setRoleSelect,
  setTeamSelect,
  teams,
  date,
  fetchTeams,
}) => {
  const rolesMap = {
    Foreman: 1,
    Crane: 2,
    Clerk: 3,
    Truck: 4,
    Fork: 5,
  };

  const addEmployeeToTeam = (employee_id, team, role, date) => {
    return axios.put(
      `http://localhost:8081/lass/teams/addteam/${date}/${employee_id}/${team}/${rolesMap[role]}`
    );
  };

  const selectedTeams = (employee_id, value) => {
    setTeamSelect((prev) => ({ ...prev, [employee_id]: value }));
  };

  const selectedRoles = (employee_id, role) => {
    setRoleSelect((prev) => ({ ...prev, [employee_id]: role }));
  };

  const checkIfEmployeeAllocated = (employee_id) => {
    for (let team of Object.values(teams)) {
      for (let member of team) {
        if (member.employee_id === employee_id) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <SearchBar
          options={[
            employee.foreman && "Foreman",
            employee.crane && "Crane",
            employee.clerk && "Clerk",
            employee.fork && "Fork",
            employee.truck && "Truck",
          ].filter(Boolean)}
          width={"50%"}
          value={roleSelect[employee.employee_id] || "Role"}
          onChange={(value) => {
            selectedRoles(employee.employee_id, value);
          }}
        />
        <SearchBar
          options={Object.keys(teams)}
          width={"50%"}
          value={teamSelect[employee.employee_id] || "Team"}
          onChange={(value) => {
            selectedTeams(employee.employee_id, value);
          }}
        />
        <DoneIcon
          sx={{
            backgroundColor:
              checkIfEmployeeAllocated(employee.employee_id) && Colors.success,
            height: "30px",
            width: "30px",
            borderRadius: "10px",
            "&:hover": {
              cursor: "pointer",
              color: "#41BC53",
            },
          }}
          onClick={async () => {
            await addEmployeeToTeam(
              employee.employee_id,
              teamSelect[employee.employee_id],
              roleSelect[employee.employee_id],
              date
            );
            fetchTeams(date);
          }}
        />
      </Box>
    </>
  );
};

export default EmployeeShiftAllocation;
