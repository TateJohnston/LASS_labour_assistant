import { Box, Dialog, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import axios from "axios";
import DialogueBox from "../components/DialogueBox";
import dateToDMY from "../utilities/dateToDMY";

const ShowEmployeeDetailsContainer = ({ showEmployeeDetails }) => {
  const [revokedSkill, setRevokedSkill] = useState("");
  const [reinstatedSkill, setReinstatedSkill] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [openRevokeDialogueBox, setOpenRevokeDialogueBox] = useState(false);
  const [openReinstateDialogueBox, setOpenReinstateDialogueBox] =
    useState(false);

  const roleDictionary = {
    Foreman: 1,
    "Crane Driver": 2,
    Clerk: 3,
    "Forklift Operator": 5,
    "Truck Driver": 4,
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
              {dateToDMY(new Date(ticketExpiry).toISOString().split("T")[0])}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <Typography variant="h6" sx={{ color: "gray", fontWeight: "bold" }}>
            Last VOC:{" "}
          </Typography>
          <Typography variant="h6">
            {dateToDMY(new Date(lastVOC).toISOString().split("T")[0])}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Buttons
            content={hasSkill ? "Revoke" : "Reinstate"}
            width="100px"
            height="20px"
            backgroundColor={hasSkill ? "#F44C49" : Colors.secondary}
            onClick={() => {
              setSelectedRole(role);
              if (hasSkill) setOpenRevokeDialogueBox(true);
              else setOpenReinstateDialogueBox(true);
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
    axios
      .put(`http://localhost:8081/lass/skills/revoke/${employeeID}/${roleID}`)
      .then((res) => {
        if (res.status === 200) setRevokedSkill(roleID);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const reinstateSkill = (employeeID, roleID) => {
    setReinstatedSkill(roleID);
    axios
      .put(
        `http://localhost:8081/lass/skills/reinstate/${employeeID}/${roleID}`
      )
      .then((res) => {
        if (res.status === 200) setReinstatedSkill(roleID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          flex: "1.5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: `1px solid ${Colors.secondary}`,
        }}
      >
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
          {handleDetails("Date Of Birth", dateToDMY(showEmployeeDetails.DOB))}
          {handleDetails("Age", showEmployeeDetails.age)}
          {handleDetails("Main Role", showEmployeeDetails.main_role)}
          {handleDetails("Email", showEmployeeDetails.email)}
          {handleDetails("Number", showEmployeeDetails.phone_number)}
          {handleDetails("Address", showEmployeeDetails.address)}
          {handleDetails("Emergency Name", showEmployeeDetails.emergency_name)}
          {handleDetails(
            "Emergency Number",
            showEmployeeDetails.emergency_number
          )}
          {handleDetails("Work Email", showEmployeeDetails.work_email)}
        </Box>
      </Box>
      <Box sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
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
        <DialogueBox
          open={openRevokeDialogueBox}
          onClose={() => setOpenRevokeDialogueBox(false)}
          confirmClick={() => {
            revokeSkill(
              showEmployeeDetails.employee_id,
              roleDictionary[selectedRole]
            );
            setOpenRevokeDialogueBox(false);
          }}
          dialogueTitle={`Revoke ${selectedRole} skill for ${showEmployeeDetails.employee_name}`}
          dialogueMessage={"Are you sure?"}
          cancelText={"Cancel"}
          submitText={"Confirm"}
        />
        <DialogueBox
          open={openReinstateDialogueBox}
          onClose={() => setOpenReinstateDialogueBox(false)}
          confirmClick={() => {
            reinstateSkill(
              showEmployeeDetails.employee_id,
              roleDictionary[selectedRole]
            );
            setOpenReinstateDialogueBox(false);
          }}
          dialogueTitle={`Reinstate ${selectedRole} skill for ${showEmployeeDetails.employee_name}`}
          dialogueMessage={"Are you sure?"}
          cancelText={"Cancel"}
          submitText={"Confirm"}
        />
      </Box>
    </Box>
  );
};

export default ShowEmployeeDetailsContainer;
