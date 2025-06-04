import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import Buttons from "../components/Buttons";
import DateSelector from "../components/DateSelector";
import DateRangeSelector from "../components/DateRangeSelector";
import DropDownButton from "../components/DropDownButton";
import SearchBar from "../components/Searchbar";

const EmployeeLeaveContainer = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [submitLeaveRequest, setSubmitLeaveRequest] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [leaveType, setLeaveType] = useState();
  const [submitted, setSubmitted] = useState(null);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    setStartDate(dateRange.startDate);
    setEndDate(dateRange.endDate);
  }, [dateRange]);

  const submitRequest = () => {
    const leaveRequestObject = {
      employee_id: 1,
      leave_type: leaveType,
      status: "Pending",
      comment: null,
      start_date: startDate,
      end_date: endDate,
    };

    axios
      .post("http://localhost:8081/lass/leave/request", leaveRequestObject)
      .then((res) => {
        if (res.status === 200) {
          setLeaveType();
          setStartDate();
          setEndDate();
          setSubmitted("Success");
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err.error);
        setSubmitted("Fail");
      });
  };

  const leaveOptions = [
    { type: "Annual Leave", query: "al_balance" },
    { type: "Long Service Leave", query: "lsl_balance" },
    { type: "Sick Leave", query: "sl_balance" },
    { type: "Day In Lieu", query: "dil_balance" },
    { type: "Maternity Leave", query: "ml_balance" },
  ];

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
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {submitted === "Success" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography sx={{ color: Colors.secondary }} variant="h5">
            Leave request successfully submitted!
          </Typography>
        </Box>
      )}
      {submitted === "Fail" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography sx={{ color: "#F44C49" }} variant="h5">
            Leave request failed, contact HR
          </Typography>
          <Buttons color={Colors.content} content={"Request Again"}></Buttons>
          <Buttons color={Colors.content} content={"Home"}></Buttons>
        </Box>
      )}
      {submitLeaveRequest ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
          }}
        >
          {!leaveType && (
            <SearchBar
              width={"300px"}
              value={"Select Leave Type..."}
              options={leaveOptions.map((option) => option.type)}
              onChange={(value) => {
                setOpen(true);
                setLeaveType(value);
                setSubmitted(null);
              }}
            />
          )}
          {leaveType && <Typography variant="h6">{leaveType}</Typography>}
          <DateRangeSelector
            toggle={toggle}
            open={open}
            onChange={(range) => setDateRange(range)}
          />
          <Buttons
            color={Colors.content}
            content={"Submit"}
            onClick={() => submitRequest()}
          ></Buttons>
          <Buttons
            color={Colors.content}
            content={"Cancel"}
            onClick={() => {
              setOpen(false);
              setLeaveType();
              setStartDate();
              setEndDate();
              setSubmitLeaveRequest(false);
              setSubmitted(null);
            }}
          ></Buttons>
        </div>
      ) : (
        <div
          style={{
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
                  key={request.leave_request_id}
                >
                  <Typography sx={{ fontWeight: "bold" }} variant="h6">
                    {request.start_date}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }} variant="h6">
                    --
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }} variant="h6">
                    {request.end_date}
                  </Typography>
                  <Typography variant="h6">{request.leave_type}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </div>
      )}
      {!submitLeaveRequest && (
        <Buttons
          color={Colors.content}
          content={"Submit Leave Request"}
          onClick={() => setSubmitLeaveRequest(true)}
        ></Buttons>
      )}
    </div>
  );
};

export default EmployeeLeaveContainer;
