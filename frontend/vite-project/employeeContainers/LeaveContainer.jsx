import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";

const EmployeeLeaveContainer = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/lass/leave?employeeID=1").then((res) => {
      const data = res.data.data;
      const balanceObject = [
        { label: "Annual Leave", value: `${data.al_balance} days` },
        { label: "Long Service Leave", value: `${data.lsl_balance} days` },
        { label: "Sick Leave", value: `${data.sl_balance} days` },
        { label: "Days in Lieu", value: `${data.dil_balance} days` },
        { label: "Maternity Leave", value: `${data.ml_balance} days` },
      ];
      setLeaveBalances(balanceObject);
    });

    axios
      .get("http://localhost:8081/lass/leave/requests?employeeID=1")
      .then((res) => {
        const data = res.data.data;
        const sortedByRequestDate = data.sort(
          (a, b) => b.leave_request_id - a.leave_request_id
        );
        setLeaveRequests(sortedByRequestDate);
      });
  }, []);

  const colorScheme = {
    Approved: "#41BC53",
    Pending: "#F3B65C",
    Denied: "#F44C49",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          flex: "1",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          gap: "50px",
          borderRight: `2px solid ${Colors.secondary}`,
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", textDecoration: "underline" }}
          variant="h4"
        >
          Balances
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "50px",
          }}
        >
          {leaveBalances.map((balance, key) => (
            <Box
              sx={{
                textAlign: "start",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",

                borderBottom: `2px solid ${Colors.secondary}`,
              }}
              key={key}
            >
              <Typography variant="h5">{balance.label}: </Typography>
              <Typography variant="h5">{balance.value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          flex: "1",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          overflowY: "scroll",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", textDecoration: "underline" }}
          variant="h4"
        >
          Requests
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          {leaveRequests.map((request) => (
            <Box
              sx={{
                textAlign: "start",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                borderRadius: "5px",
                backgroundColor: colorScheme[request.status],
                padding: "20px",
              }}
              key={request.date}
            >
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                {request.date}{" "}
              </Typography>
              <Typography variant="h5">
                {request.requested_leave_type}
              </Typography>
              {/* <Typography variant="h5">{request.shift}</Typography> */}
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                {request.status}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default EmployeeLeaveContainer;
