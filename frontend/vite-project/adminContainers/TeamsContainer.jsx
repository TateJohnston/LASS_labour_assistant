import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import DateSelector from "../components/DateSelector";
import { use, useEffect, useState } from "react";
import axios from "axios";
import InputFields from "../components/InputFields";
import Buttons from "../components/Buttons";

const TeamsContainer = () => {
  const [date, setDate] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState({});
  const [bonus, setBonus] = useState({});

  const fetchTeamsByDate = (fullDate) => {
    if (!fullDate) return;

    axios.get(`http://localhost:8081/lass/teams/${fullDate}`).then((res) => {
      const data = res.data.data;
      setEmployees(data);

      const teamsObj = {};

      data.forEach((employee) => {
        const teamID = employee.team_id;
        if (!teamsObj[teamID]) teamsObj[teamID] = [];
        teamsObj[teamID].push(employee);
      });
      setEmployees(data);
      setTeams(teamsObj);
    });
  };

  const changeBonus = (team_id) => {
    const bonusBody = { bonus: bonus[team_id], team_id: team_id };
    axios
      .put(`http://localhost:8081/lass/teams/updatebonus`, bonusBody)
      .then((res) => {
        fetchTeamsByDate(date);
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
          fetchTeamsByDate(fullDate);
          setDate(fullDate);
        }}
      />
      {date && Object.keys(teams).length > 0 && (
        <Box
          sx={{
            backgroundColor: Colors.content,
            height: "fit-content",
            maxHeight: "800px",
            width: "1200px",
            border: `2px solid ${Colors.secondary}`,
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              alignItems: "end",
              gap: "20px",
            }}
          >
            {Object.entries(teams).map(([team_id, team]) => (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  key={team_id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: Colors.primary,
                    color: Colors.secondary,
                    borderRadius: "8px",
                    padding: "20px 0px",
                    width: "100%",
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
                    }}
                  >
                    {team.length > 0 && (
                      <>
                        <Typography sx={{}} variant="h5">
                          {team[0].shift}:
                        </Typography>
                        <Typography sx={{}} variant="h5">
                          Team {team_id}
                        </Typography>
                      </>
                    )}
                  </Box>

                  {team.map((employee) => (
                    <Box
                      key={employee.employee_id}
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
                        {employee.employee_name}
                      </Typography>
                    </Box>
                  ))}
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
                      Bonus:
                    </Typography>
                    <Typography
                      sx={{
                        flex: "1",
                        padding: "5px",
                        textAlign: "start",
                        fontWeight: "bold",
                        color: Colors.success,
                      }}
                    >
                      ${team[0].bonus === null ? "0" : team[0].bonus}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    alignItems: "center",
                    marginTop: "5px",
                    width: "100%",
                  }}
                >
                  <InputFields
                    type={"number"}
                    label={"Update Bonus..."}
                    width={"60%"}
                    value={bonus[team_id] || ""}
                    margin={"none"}
                    onChange={(e) => {
                      setBonus((prev) => ({
                        ...prev,
                        [team_id]: e.target.value,
                      }));
                    }}
                  />
                  <Buttons
                    content={"Submit"}
                    onClick={() => {
                      changeBonus(team_id);
                      setBonus((prev) => ({ ...prev, [team_id]: "" }));
                    }}
                    height="56px"
                    width="40%"
                  />
                </Box>
              </Box>
            ))}
            <Box></Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default TeamsContainer;
