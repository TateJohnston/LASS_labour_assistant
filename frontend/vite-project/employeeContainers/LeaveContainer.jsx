import { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import Buttons from "../components/Buttons";
import { UserContext } from "../context/UserContext";
import LeaveRequestForm from "../components/LeaveRequestForm";
import DropDownButton from "../components/DropDownButton";
import dateToDMY from "../utilities/dateToDMY";

const EmployeeLeaveContainer = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [submitLeaveRequest, setSubmitLeaveRequest] = useState(false);
  const [viewComment, setViewComment] = useState(null);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8081/lass/leave?employeeID=${userDetails.employeeID}`
      )
      .then((res) => {
        const data = res.data.data;
        const balanceObject = [
          { label: "Annual Leave", value: `${data.al_balance} days` },
          { label: "Long Service Leave", value: `${data.lsl_balance} days` },
          { label: "Sick Leave", value: `${data.sl_balance} days` },
          { label: "Days in Lieu", value: `${data.dil_balance} days` },
          { label: "Maternity Leave", value: `${data.ml_balance} days` },
        ];
        setLeaveBalances(balanceObject);
        fetchRequests();
      });
  }, []);

  const fetchRequests = () => {
    axios
      .get(
        `http://localhost:8081/lass/leave/requests?employeeID=${userDetails.employeeID}`
      )
      .then((res) => {
        const data = res.data.data;
        if (data) {
          const sortedByRequestDate = data.sort(
            (a, b) => b.leave_request_id - a.leave_request_id
          );
          setLeaveRequests(sortedByRequestDate);
        }
      });
  };

  const colorScheme = {
    Approved: "#41BC53",
    Pending: "#F3B65C",
    Denied: "#F44C49",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {submitLeaveRequest ? (
        <LeaveRequestForm
          submitLeaveRequest={submitLeaveRequest}
          setSubmitLeaveRequest={setSubmitLeaveRequest}
          fetchRequests={fetchRequests()}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "1200px",
            maxHeight: "600px",
          }}
        >
          <Box
            sx={{
              flex: "1",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
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
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "10px",
              },
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
                    alignItems: "center",
                    borderRadius: "5px",
                    backgroundColor: colorScheme[request.status],
                    padding: "20px",
                  }}
                  key={request.leave_request_id}
                >
                  <Typography sx={{ flex: "1" }} variant="h6">
                    {request.leave_type}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bold", flex: "1.5" }}
                    variant="h6"
                  >
                    {dateToDMY(request.start_date)} -{" "}
                    {dateToDMY(request.end_date)}
                  </Typography>
                  <Box sx={{ flex: "0.2", position: "relative" }}>
                    <DropDownButton
                      onClick={() =>
                        setViewComment(
                          viewComment === request.leave_request_id
                            ? null
                            : request.leave_request_id
                        )
                      }
                    />
                    {viewComment === request.leave_request_id && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "40px",
                          right: 0,
                          backgroundColor: "white",
                          border: `1px solid ${Colors.secondary}`,
                          borderRadius: "4px",
                          zIndex: 10,
                          padding: "10px",
                          minWidth: "200px",
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          Comment
                        </Typography>
                        <Typography>
                          {request.comment || "No comment provided."}
                        </Typography>
                        <Buttons
                          width="50%"
                          height="30px"
                          onClick={() => setViewComment(null)}
                          content={"Close"}
                          color={Colors.secondary}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
      {!submitLeaveRequest && (
        <Buttons
          color={Colors.content}
          content={"Submit Leave Request"}
          onClick={() => setSubmitLeaveRequest(true)}
        ></Buttons>
      )}
    </Box>
  );
};

export default EmployeeLeaveContainer;
