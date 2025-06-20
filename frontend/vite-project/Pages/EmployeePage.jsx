import { Typography, Avatar, Box, Paper } from "@mui/material";
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
  const { userDetails, setSuccessfulLogin } = useContext(UserContext);
  const [openSignoutForm, setOpenSignoutForm] = useState(false);

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
            borderBottom: "2px solid #1CA89E",
          }}
        >
          <div style={{ flex: "1" }}>
            <Logo width="150px" />
          </div>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "30px",
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
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                onClick={() => setOpenSignoutForm((prev) => !prev)}
                sx={{
                  bgcolor: Colors.primary,
                  color: Colors.secondary,
                  height: "60px",
                  width: "60px",
                  fontSize: "xx-large",
                  "&:hover": {
                    cursor: "pointer",
                    transition: "transform ease 0.3s",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {userDetails.name[0]}
              </Avatar>
              {openSignoutForm && (
                <Paper
                  onClick={() => setSuccessfulLogin(false)}
                  sx={{
                    backgroundColor: Colors.secondary,
                    color: "white",
                    height: "fit-content",
                    width: "100px",
                    position: "absolute",
                    top: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    p: 1,
                    cursor: "pointer",
                  }}
                >
                  Sign Out
                </Paper>
              )}
            </Box>
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
