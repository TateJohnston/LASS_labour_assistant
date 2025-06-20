import { Typography, Avatar, Box } from "@mui/material";
import Logo from "../components/Logo";
import { Colors } from "../src/assets/Colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useState } from "react";
import Buttons from "../components/Buttons";
import Calendar from "../components/Calendar";
import RosterContainer from "../employeeContainers/RosterContainer";
import EmployeeLeaveContainer from "../employeeContainers/LeaveContainer";
import EmployeePayslipsContainer from "../employeeContainers/PayslipsContainer";
import HomeContainer from "../adminContainers/HomeContainer";
import AllocationsContainer from "../adminContainers/AllocationsContainer";
import EmployeesContainer from "../adminContainers/EmployeesContainer";
import LeaveRequestContainer from "../adminContainers/LeaveRequestsContainer";
import LicensesContainer from "../adminContainers/LicensesContainer";
import TeamsContainer from "../adminContainers/TeamsContainer";
import PayrollContainer from "../adminContainers/PayrollContainer";
import DropdownMenu from "../components/DropdownMenu";
import { UserContext } from "../context/UserContext";
import ReportsContainer from "../adminContainers/ReportsContainer";

const AdminPage = () => {
  const [content, setContent] = useState("Home");
  const { userDetails } = useContext(UserContext);

  // if (Object.entries(userDetails).length > 0) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        // width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          padding: "10px",
          borderBottom: "2px solid #1CA89E",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Logo width="150px" />
        </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            flex: "1",
            justifyContent: "start",
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
            {/* {userDetails.name[0]} */}
          </Avatar>
        </div>
      </Box>

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
          {content === "Leave Requests" && <LeaveRequestContainer />}
          {content === "Licenses" && <LicensesContainer />}
          {content === "Teams" && <TeamsContainer />}
          {content === "Reports" && <ReportsContainer />}
          {content === "Payroll" && <PayrollContainer />}
        </Box>
      </div>
    </div>
  );
  // } else {
  //   return "Loading...";
  // }
};

export default AdminPage;
