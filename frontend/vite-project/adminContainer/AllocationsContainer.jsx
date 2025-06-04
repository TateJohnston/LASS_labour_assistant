import { Typography, Box } from "@mui/material";
import DateSelector from "../components/DateSelector";
import SearchBar from "../components/Searchbar";
import { useEffect, useState } from "react";
import { Colors } from "../src/assets/Colors";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import InputFields from "../components/InputFields";
import Buttons from "../components/Buttons";
import DropdownSelect from "../components/DropdownSelect";

const AllocationsContainer = () => {
  const [date, setDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamSelect, setTeamSelect] = useState({});
  const [roleSelect, setRoleSelect] = useState({});
  const [allocated, setAllocated] = useState([]);

  const shiftsMap = { "Night Shift": 1, "Day Shift": 2, "Evening Shift": 3 };
  const rolesMap = {
    Foreman: 1,
    Crane: 2,
    Clerk: 3,
    Truck: 4,
    Fork: 5,
  };

  useEffect(() => {
    console.log("Teams use effect", teams);
  }, [teams]);

  const selectedTeams = (employee_id, value) => {
    setTeamSelect((prev) => ({ ...prev, [employee_id]: value }));
  };

  const selectedRoles = (employee_id, role) => {
    setRoleSelect((prev) => ({ ...prev, [employee_id]: role }));
  };

  const fetchEmployees = (fullDate) => {
    axios
      .get(`http://localhost:8081/lass/allocations/${fullDate}`)
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
        console.log("data return", data);

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

        console.log(teamsObject);
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

  const addEmployeeToTeam = (employee_id, team, role, date) => {
    return axios
      .put(
        `http://localhost:8081/lass/teams/addteam/${date}/${employee_id}/${team}/${rolesMap[role]}`
      )
      .then((res) => {
        console.log("Successful change", res);
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
          setDate(fullDate);
          fetchEmployees(fullDate);
          fetchTeams(fullDate);
        }}
      />
      {date && (
        <Box
          sx={{
            backgroundColor: Colors.content,
            height: "fit-content",
            maxHeight: "800px",
            width: "80vw",
            border: `2px solid ${Colors.secondary}`,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: "1.5",
              gap: "20px",
              maxHeight: "740px",
              paddingRight: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: "20px",
                width: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  flex: "1.8",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  borderRight: `2px solid ${Colors.secondary}`,
                  width: "100%",
                  boxSizing: "border-box",
                  overflowY: "auto",
                  paddingTop: "15px",
                }}
              >
                <Typography
                  sx={{ textDecoration: "underline", color: Colors.secondary }}
                  variant="h4"
                >
                  Available employees for {date}
                </Typography>
                {employees.map((employee) => (
                  <Box
                    key={employee.employee_id}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px 0px",
                      borderBottom: `1px solid ${Colors.secondary}`,
                    }}
                  >
                    <Box
                      sx={{
                        flex: "0.2",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography variant="h6">{employee.shift[0]}</Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                      }}
                    >
                      <Typography variant="h6">
                        {employee.employee_name}
                      </Typography>
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
                    <Box
                      sx={{
                        flex: "1.8",
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
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
                    </Box>
                    <Box
                      sx={{
                        flex: "0.5",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <DoneIcon
                        sx={{
                          backgroundColor:
                            allocated.includes(employee.employee_id) &&
                            Colors.secondary,
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
                          if (teamSelect[employee.employee_id])
                            setAllocated([...allocated, employee.employee_id]);
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  boxSizing: "border-box",
                  overflowY: "auto",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginTop: "20px",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {Object.entries(teams).map(([team_id, employees]) => (
                    <Box
                      key={team_id}
                      sx={{
                        width: "70%",
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
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllocationsContainer;
