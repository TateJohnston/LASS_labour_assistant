import { Typography, Avatar, Box, Paper } from "@mui/material";
import Logo from "../components/Logo";
import { Colors } from "../src/assets/Colors";
import { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import Buttons from "../components/Buttons";
import HomeContainer from "../adminContainers/HomeContainer";
import AllocationsContainer from "../adminContainers/AllocationsContainer";
import EmployeesContainer from "../adminContainers/EmployeesContainer";
import LeaveRequestContainer from "../adminContainers/LeaveRequestsContainer";
import LicensesContainer from "../adminContainers/LicensesContainer";
import TeamsContainer from "../adminContainers/TeamsContainer";
import PayrollContainer from "../adminContainers/PayrollContainer";
import { UserContext } from "../context/UserContext";
import ReportsContainer from "../adminContainers/ReportsContainer";
import axios from "axios";
import useSnackBar from "../components/SnackBar";
import dateToDMY from "../utilities/dateToDMY";
import convertDate from "../utilities/convertDate";

const AdminPage = () => {
  const [content, setContent] = useState("Home");
  const { userDetails, setSuccessfulLogin } = useContext(UserContext);
  const [openSignoutForm, setOpenSignoutForm] = useState(false);
  const { showSnack } = useSnackBar();

  const fetchedOverdues = useRef(false);

  useEffect(() => {
    if (content === "Home" && !fetchedOverdues.current) {
      fetchOverdues();
      fetchedOverdues.current = true;
    } else if (content !== "Home") {
      fetchedOverdues.current = false;
    }
  }, [content]);

  const fetchOverdues = () => {
    axios
      .get("http://localhost:8081/lass/licenses/due")
      .then((res) => {
        const data = res.data.data;
        data?.forEach((license) => {
          showSnack(
            `${license.licenser} license is due on ${dateToDMY(
              convertDate(license.expiry)
            )}`
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8081/lass/skills/expiring/tickets")
      .then((res) => {
        const data = res.data.data;
        data?.forEach((ticket) => {
          showSnack(`${ticket.employee_name} has an upcoming expiring ticket`);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8081/lass/skills/expiring/voc")
      .then((res) => {
        const data = res.data.data;
        data?.forEach((voc) => {
          showSnack(`${voc.employee_name} has an upcoming expiring VOC`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (Object.entries(userDetails).length > 0) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
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
            content={"Teams"}
            onClick={() => setContent("Teams")}
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
            content={"Allocations"}
            onClick={() => setContent("Allocations")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Payroll"}
            onClick={() => setContent("Payroll")}
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
            content={"Licenses"}
            onClick={() => setContent("Licenses")}
          />
          <Buttons
            width="150px"
            color={Colors.content}
            content={"Reports"}
            onClick={() => setContent("Reports")}
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
            <Box sx={{ position: "relative" }}>
              <Avatar
                onClick={() => setOpenSignoutForm((prev) => !prev)}
                sx={{
                  border: `2px solid ${Colors.primary}`,
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
                  sx={{
                    backgroundColor: Colors.secondary,
                    color: "white",
                    height: "fit-content",
                    width: "100px",
                    position: "absolute",
                    top: "65px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    p: 1,
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        transition: "transform ease 0.3s",
                        transform: "scale(1.05)",
                        color: Colors.primary,
                      },
                    }}
                    onClick={() => setSuccessfulLogin(false)}
                  >
                    Sign Out
                  </Typography>
                </Paper>
              )}
            </Box>
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
  } else {
    return "Loading...";
  }
};

export default AdminPage;
