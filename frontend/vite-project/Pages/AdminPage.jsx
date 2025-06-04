import { Typography, Avatar, Box } from "@mui/material";
import Logo from "../components/Logo";
import { Colors } from "../src/assets/Colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import Buttons from "../components/Buttons";
import Calendar from "../components/Calendar";
import RosterContainer from "../employeeContainers/RosterContainer";
import EmployeeLeaveContainer from "../employeeContainers/LeaveContainer";
import EmployeePayslipsContainer from "../employeeContainers/PayslipsContainer";
import HomeContainer from "../adminContainer/HomeContainer";
import AllocationsContainer from "../adminContainer/AllocationsContainer";
import EmployeesContainer from "../adminContainer/EmployeesContainer";

const AdminPage = () => {
  const [user, setUser] = useState("Labour Manager");
  const [content, setContent] = useState("Home");

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
          {user}
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
            {user[0]}
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
            content={"Home"}
            onClick={() => setContent("Home")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Allocations"}
            onClick={() => setContent("Allocations")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Employees"}
            onClick={() => setContent("Employees")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Leave Requests"}
            onClick={() => setContent("Leave Requests")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Licenses"}
            onClick={() => setContent("Licenses")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Reports"}
            onClick={() => setContent("Reports")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Teams"}
            onClick={() => setContent("Teams")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Payroll"}
            onClick={() => setContent("Payroll")}
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
          {content === "Home" && <HomeContainer />}
          {content === "Allocations" && <AllocationsContainer />}
          {content === "Employees" && <EmployeesContainer />}
        </Box>
      </div>
    </div>
  );
};

export default AdminPage;
