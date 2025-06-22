import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import Buttons from "./Buttons";
import { useState } from "react";
import DialogueBox from "./DialogueBox";
import axios from "axios";

const AllocationTeamDisplay = ({ team_id, employees, fetchTeams, date }) => {
  const [openDialogue, setOpendialogue] = useState(false);

  const removeTeam = (team_id) => {
    axios
      .delete(`http://localhost:8081/lass/teams/deleteTeam/${team_id}`)
      .then((data) => {
        fetchTeams();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box
        key={team_id}
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: Colors.primary,
          color: Colors.secondary,
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            height: "20px",
            width: "20px",
            backgroundColor: Colors.error,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setOpendialogue(true)}
        >
          X
        </div>
        <DialogueBox
          open={openDialogue}
          onClose={() => setOpendialogue(false)}
          confirmClick={() => {
            removeTeam(team_id);
            setOpendialogue(false);
          }}
          dialogueTitle={`Remove Team ${team_id}?`}
          cancelText={"Cancel"}
          submitText={"Confirm"}
        />
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
                {employee.name}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default AllocationTeamDisplay;
