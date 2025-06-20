import SearchBar from "../components/Searchbar";
import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import { useState, useEffect } from "react";
import axios from "axios";
import DropDownButton from "../components/DropDownButton";
import LeaveRequestDetailsContainer from "./LeaveRequestDetailsContainer";
import DialogueBox from "../components/DialogueBox";
import dateToDMY from "../utilities/dateToDMY";

const LeaveRequestContainer = () => {
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [showLeaveRequestPage, setShowLeaveRequestPage] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [comment, setComment] = useState("");
  const [approvedLeave, setApprovedLeave] = useState(false);
  const [denyLeave, setDenyLeave] = useState(false);
  const [openApproveDialogueBox, setOpenApproveDialogueBox] = useState(false);
  const [openDenyDialogueBox, setOpenDenyDialogueBox] = useState(false);

  const leaveOptions = [
    { type: "Annual Leave", query: "al_balance" },
    { type: "Long Service Leave", query: "lsl_balance" },
    { type: "Sick Leave", query: "sl_balance" },
    { type: "Day In Lieu", query: "dil_balance" },
    { type: "Maternity Leave", query: "ml_balance" },
  ];

  const colorScheme = {
    Approved: Colors.success,
    Pending: Colors.warning,
    Denied: Colors.error,
  };

  useEffect(() => {
    fetchRequests();
    axios
      .get(`http://localhost:8081/lass/employees/`)
      .then((res) => {
        const data = res.data.data;
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let filtered = requests.sort(
      (a, b) => b.leave_request_id - a.leave_request_id
    );

    if (selectedEmployee) {
      filtered = filtered.filter(
        (request) => request.name === selectedEmployee
      );
    }
    if (selectedFilter) {
      filtered = filtered.filter(
        (request) => request.status === selectedFilter
      );
    }
    setFilteredRequests(filtered);
  }, [selectedEmployee, selectedFilter, requests]);

  const fetchRequests = () => {
    axios
      .get(`http://localhost:8081/lass/leave/requests`)
      .then((res) => {
        const data = res.data.data;
        setRequests(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const specificRequestHandler = (request) => {
    const leaveRequestID = request.leave_request_id;
    axios
      .get(`http://localhost:8081/lass/leave/request/${leaveRequestID}`)
      .then((res) => {
        const data = res.data.data;
        setSelectedRequest(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approveRequest = async () => {
    axios
      .put(`http://localhost:8081/lass/leave/requests/approve/`, {
        comment: comment,
        start_date: selectedRequest[0].start_date,
        end_date: selectedRequest[0].end_date,
        employee_id: selectedRequest[0].employee_id,
        leave_request_id: selectedRequest[0].leave_request_id,
        decrement_amount: selectedRequest.length,
        leave_type: selectedRequest[0].leave_type,
      })
      .then((data) => {
        setApprovedLeave(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const denyRequest = async () => {
    axios
      .put(
        `http://localhost:8081/lass/leave/requests/deny/${selectedRequest[0].leave_request_id}`,
        { comment: comment }
      )
      .then((data) => {
        setDenyLeave(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        width: "900px",
        height: "700px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "20px",
        border: `2px solid ${Colors.secondary}`,
        boxSizing: "border-box",
        padding: "10px 0px",
        overflowY: "hidden",
        gap: "10px",
      }}
    >
      {showLeaveRequestPage && selectedRequest.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "95%",
            gap: "20px",
          }}
        >
          <LeaveRequestDetailsContainer
            name={selectedRequest[0].employee_name}
            leaveType={selectedRequest[0].leave_type}
            startDate={selectedRequest[0].start_date}
            endDate={selectedRequest[0].end_date}
            requestLength={selectedRequest.length}
            alBalance={selectedRequest[0].al_balance}
            lslBalance={selectedRequest[0].lsl_balance}
            slBalance={selectedRequest[0].sl_balance}
            dilBalance={selectedRequest[0].dil_balance}
            mlBalance={selectedRequest[0].ml_balance}
            request={selectedRequest}
            status={selectedRequest[0].status}
            onClickApprove={() => {
              setOpenApproveDialogueBox(true);
            }}
            onClickDeny={() => {
              setOpenDenyDialogueBox(true);
            }}
            commentChange={(e) => {
              setComment(e.target.value);
            }}
            onClickBack={() => {
              setShowLeaveRequestPage(false);
              setSelectedRequest({});
              fetchRequests();
            }}
            displayHandle={approvedLeave || denyLeave ? "none" : "flex"}
            content={
              approvedLeave ? "Leave Approved" : denyLeave ? "Leave Denied" : ""
            }
            responseColor={
              approvedLeave
                ? Colors.success
                : denyLeave
                ? Colors.error
                : "black"
            }
          />
          <DialogueBox
            open={openApproveDialogueBox}
            onClose={() => setOpenApproveDialogueBox(false)}
            confirmClick={() => {
              approveRequest();
              setOpenApproveDialogueBox(false);
            }}
            dialogueTitle={"Approve Leave Request?"}
            cancelText={"Cancel"}
            submitText={"Confirm"}
          />
          <DialogueBox
            open={openDenyDialogueBox}
            onClose={() => setOpenDenyDialogueBox(false)}
            confirmClick={() => {
              denyRequest();
              setOpenDenyDialogueBox(false);
            }}
            dialogueTitle={"Deny Leave Request?"}
            cancelText={"Cancel"}
            submitText={"Confirm"}
          />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              width: "100%",
              borderBottom: `2px solid ${Colors.secondary}`,
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0px",
            }}
          >
            <SearchBar
              options={employees.map((employee) => employee.employee_name)}
              width={"400px"}
              value={selectedEmployee ? selectedEmployee : "Search..."}
              onChange={(value) => {
                setSelectedEmployee(value);
              }}
            />
            <SearchBar
              options={["Approved", "Pending", "Denied"]}
              width={"200px"}
              value={selectedFilter ? selectedFilter : "Filter..."}
              onChange={(value) => {
                setSelectedFilter(value);
              }}
            />
          </Box>
          <Box
            sx={{
              display: showLeaveRequestPage ? "none" : "flex",
              flexDirection: "column",
              width: "95%",
              gap: "20px",
              marginTop: "10px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "10px",
              },
              paddingRight: "5px",
            }}
          >
            {filteredRequests.map((request) => (
              <Box
                key={request.leave_request_id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  backgroundColor: colorScheme[request.status],
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: "20px 0px",
                }}
              >
                <Typography variant="h5" sx={{ flex: "1", fontWeight: "bold" }}>
                  {request.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontStyle: "italic", flex: "1" }}
                >
                  {dateToDMY(request.start_date)}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontStyle: "italic", flex: "0.3" }}
                >
                  -
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontStyle: "italic", flex: "1" }}
                >
                  {dateToDMY(request.end_date)}
                </Typography>

                <Typography variant="h5" sx={{ flex: "1", fontWeight: "bold" }}>
                  {request.status}
                </Typography>
                <DropDownButton
                  flex={"0.5"}
                  onClick={() => {
                    setShowLeaveRequestPage(true);
                    specificRequestHandler(request);
                  }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
export default LeaveRequestContainer;
