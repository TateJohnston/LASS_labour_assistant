import { Typography, Box } from "@mui/material";
import DateSelector from "../components/DateSelector";
import SearchBar from "../components/Searchbar";
import { useState } from "react";
import { Colors } from "../src/assets/Colors";
import axios from "axios";
import Buttons from "../components/Buttons";
import AvailableEmployee from "../components/AvailableEmployees";
import EmployeeShiftAllocation from "../components/EmployeeShiftAllocation";
import AllocationTeamDisplay from "../components/AllocationTeamDisplay";
import dateToDMY from "../utilities/dateToDMY";
import DialogueBox from "../components/DialogueBox";

const AllocationsContainer = () => {
  const [date, setDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [allocated, setAllocated] = useState([]);
  const [teamSelect, setTeamSelect] = useState({});
  const [roleSelect, setRoleSelect] = useState({});
  const [selectedShift, setSelectedShift] = useState("");
  const [allocationConfirmBox, setAllocationConfirmBox] = useState(false);
  const [allocationsSent, setAllocationsSent] = useState(false);

  const shiftsMap = { "Night Shift": 1, "Day Shift": 2, "Evening Shift": 3 };

  const resetStates = (fullDate) => {
    setTeams([]);
    setEmployees([]);
    setAllocated([]);
    setRoleSelect({});
    setTeamSelect({});
    setDate(fullDate);
    fetchEmployees(fullDate);
    fetchTeams(fullDate);
  };

  const fetchEmployees = (fullDate) => {
    axios
      .get(`http://localhost:8081/lass/allocations/?date=${fullDate}`)
      .then((res) => {
        setEmployees([]);
        const data = res.data.data;
        const sorted = data.sort((a, b) => a.shift.localeCompare(b.shift));

        setEmployees(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTeams = (fullDate) => {
    axios
      .get(`http://localhost:8081/lass/teams/${fullDate}`)
      .then((res) => {
        const data = res.data.data;

        const teamIDs = [];
        data.forEach((entry) => {
          teamIDs.push(entry.team_id);
        });
        const uniqueTeamIDs = new Set(teamIDs);

        const teamsObject = {};
        for (let teamIDS of uniqueTeamIDs) {
          teamsObject[teamIDS] = [];
        }

        data.forEach((entry) => {
          teamsObject[entry.team_id].push({
            name: entry.employee_name,
            employee_id: entry.employee_id,
            role: entry.role,
            shift: entry.shift,
          });
        });

        setTeams(teamsObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTeam = (selectedShift) => {
    const reqBody = {
      shift_id: shiftsMap[selectedShift],
      bonus: null,
      work_date: date,
    };
    axios
      .post(`http://localhost:8081/lass/teams/addteam`, reqBody)
      .then((res) => {
        if (res.status === 200) {
          setSelectedShift("");
          fetchTeams(date);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendAllocations = () => {
    // I would've made this dynamic so that it sends allocations to everyone however the free trial has a limit on 5 numbers it can be sent to, also theres a credit limit.
    const body = {
      employeeID: 1,
      name: "Tate Johnston",
      role: "Foreman",
      date: date,
      shift: "Dayshift",
      number: "+61468589981",
    };

    axios
      .post(`http://localhost:8081/lass/allocations/send-allocations`, body)
      .then((res) => {
        if (res.status === 200) setAllocationsSent(true);
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
        gap: "10px",
        alignItems: "center",
      }}
    >
      <DateSelector
        onChange={(value) => {
          const dateValue = value.$d;
          const dateStr = new Date(dateValue.toString());
          const year = dateStr.getFullYear();
          const month = String(dateStr.getMonth() + 1).padStart(2, "0");
          const day = String(dateStr.getDate()).padStart(2, "0");
          const fullDate = `${year}-${month}-${day}`;
          resetStates(fullDate);
        }}
      />
      {date && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "80vw",
            gap: "30px",
          }}
        >
          <Box
            sx={{
              flex: "1.8",
              display: "flex",
              flexDirection: "column",
              backgroundColor: Colors.content,
              height: "fit-content",
              maxHeight: "800px",
              border: `2px solid ${Colors.secondary}`,
              borderRadius: "20px",
              padding: "8px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "10px",
              },
            }}
          >
            <Typography
              sx={{
                textDecoration: "underline",
                color: Colors.secondary,
              }}
              variant="h4"
            >
              Available employees for {dateToDMY(date)}
            </Typography>
            {employees.map((employee) => (
              <Box
                key={employee.employee_id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  borderBottom: `2px solid ${Colors.secondary}`,
                }}
              >
                <Box sx={{ flex: "1.2" }}>
                  <AvailableEmployee employee={employee} />
                </Box>
                <Box sx={{ flex: "1", marginRight: "20px" }}>
                  <EmployeeShiftAllocation
                    employee={employee}
                    allocated={allocated}
                    setRoleSelect={setRoleSelect}
                    setTeamSelect={setTeamSelect}
                    roleSelect={roleSelect}
                    teamSelect={teamSelect}
                    teams={teams}
                    date={date}
                    fetchTeams={fetchTeams}
                  />
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              flex: "0.8",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              maxHeight: "800px",
              padding: "8px",
              borderRadius: "20px",
              border: `2px solid ${Colors.secondary}`,
              overflowY: "auto",
              backgroundColor: "white",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "10px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <SearchBar
                options={["Day Shift", "Evening Shift", "Night Shift"]}
                width={"100%"}
                value={selectedShift ? selectedShift : "Select a shift"}
                onChange={(value) => {
                  setSelectedShift(value);
                }}
              />
              <Buttons
                content={"Add Team"}
                color={Colors.content}
                onClick={() => {
                  if (selectedShift) {
                    addTeam(selectedShift);
                  }
                }}
              />
            </Box>
            {Object.entries(teams).map(([team_id, employees]) => (
              <AllocationTeamDisplay team_id={team_id} employees={employees} />
            ))}
            {Object.entries(teams).length > 0 && (
              <>
                <Box sx={{ marginBottom: "10px" }}>
                  {!allocationsSent ? (
                    <Buttons
                      onClick={() => setAllocationConfirmBox(true)}
                      content={"Send Allocations"}
                    />
                  ) : (
                    <Typography variant="h5" sx={{ color: Colors.success }}>
                      Allocations Sent!
                    </Typography>
                  )}
                </Box>
                <DialogueBox
                  open={allocationConfirmBox}
                  onClose={() => setAllocationConfirmBox(false)}
                  dialogueTitle={"Send Allocations?"}
                  dialogueMessage={`Are you sure you want to Send allocations for ${dateToDMY(
                    date
                  )}`}
                  cancelText={"Cancel"}
                  submitText={"Send"}
                  confirmClick={() => {
                    sendAllocations();
                    setAllocationConfirmBox(false);
                  }}
                />
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllocationsContainer;
