import { Typography, Avatar, Box } from "@mui/material";
import Logo from "../components/Logo";
import { Colors } from "../src/assets/Colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import Calendar from "../components/Calendar";
import RosterContainer from "../employeeContainers/RosterContainer";
import EmployeeLeaveContainer from "../employeeContainers/LeaveContainer";
import EmployeePayslipsContainer from "../employeeContainers/PayslipsContainer";
import { UserContext } from "../context/UserContext";

const EmployeePage = () => {
  const [content, setContent] = useState("Roster");
  const { userDetails } = useContext(UserContext);

  if (Object.entries(userDetails).length > 0) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100vw",
            height: "75px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderBottom: "2px solid #1CA89E",
          }}
        >
          <Logo width="200px" />
          <Typography
            variant="h2"
            sx={{ color: Colors.primary, fontFamily: "sans-serif" }}
          >
            {userDetails.name}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <NotificationsIcon
              onClick={() => {
                console.log("works");
              }}
              sx={{
                height: "40px",
                width: "40px",
                "&:hover": {
                  cursor: "pointer",
                  transition: "transform ease 0.3s",
                  transform: "scale(1.05)",
                },
              }}
            />
            <Avatar
              sx={{
                bgcolor: Colors.primary,
                color: Colors.secondary,
                height: "60px",
                width: "60px",
                fontSize: "xx-large",
              }}
            >
              {userDetails.name[0]}
            </Avatar>
          </div>
        </div>
        <div
          style={{
            backgroundColor: Colors.primary,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "30px",
              paddingTop: "20px",
            }}
          >
            <Buttons
              width="150px"
              color={Colors.content}
              content={"Roster"}
              onClick={() => setContent("Roster")}
            />
            <Buttons
              width="150px"
              color={Colors.content}
              content={"Leave"}
              onClick={() => setContent("Leave")}
            />
            <Buttons
              width="150px"
              color={Colors.content}
              content={"Payslips"}
              onClick={() => setContent("Payslips")}
            />
          </Box>
          <Box
            sx={{
              height: "100%",
              backgroundColor: Colors.primary,
              display: "flex",
              marginTop: "25px",
              justifyContent: "center",
              paddingTop: "0",
            }}
          >
            <Box
              sx={{
                backgroundColor: Colors.content,
                height: "fit-content",
                maxHeight: "800px",
                width: content === "Roster" ? "60%" : "fit-content",
                border: `2px solid ${Colors.secondary}`,
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "50px",
                overflowY: "auto",
              }}
            >
              {content === "Roster" && <RosterContainer />}
              {content === "Leave" && <EmployeeLeaveContainer />}
              {content === "Payslips" && <EmployeePayslipsContainer />}
            </Box>
          </Box>
        </div>
      </div>
    );
  } else {
    return "Loading";
  }
};

export default EmployeePage;
