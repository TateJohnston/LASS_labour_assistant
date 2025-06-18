import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import DateSelector from "../components/DateSelector";
import { use, useEffect, useState } from "react";
import axios from "axios";
import InputFields from "../components/InputFields";
import Buttons from "../components/Buttons";
import convertDate from "../utilities/convertDate";
import TeamsCard from "../components/TeamsCard";

const TeamsContainer = () => {
  const [date, setDate] = useState(null);
  const [teams, setTeams] = useState({});
  const [bonus, setBonus] = useState({});

  const fetchTeamsByDate = (fullDate) => {
    if (!fullDate) return;

    axios.get(`http://localhost:8081/lass/teams/${fullDate}`).then((res) => {
      const data = res.data.data;
      const teamsObj = {};
      if (data) {
        data.forEach((employee) => {
          const teamID = employee.team_id;
          if (!teamsObj[teamID]) teamsObj[teamID] = [];
          teamsObj[teamID].push(employee);
        });
        setTeams(teamsObj);
      } else {
        setTeams({});
      }
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
          const convertedDate = convertDate(dateValue);
          fetchTeamsByDate(convertedDate);
          setDate(convertedDate);
        }}
      />
      {date && Object.keys(teams).length > 0 && (
        <TeamsCard
          teams={teams}
          onChange={(team_id, value) => {
            setBonus((prev) => ({
              ...prev,
              [team_id]: value,
            }));
          }}
          onClick={(team_id) => {
            changeBonus(team_id);
            setBonus((prev) => ({ ...prev, [team_id]: "" }));
          }}
          bonus={bonus}
        />
      )}
      {!date && (
        <Typography sx={{ color: "gray" }} variant="h5">
          Select a date to find teams
        </Typography>
      )}
      {date && Object.entries(teams).length === 0 && (
        <Typography sx={{ color: "gray" }} variant="h5">
          No Teams for {date}
        </Typography>
      )}
    </Box>
  );
};
export default TeamsContainer;
