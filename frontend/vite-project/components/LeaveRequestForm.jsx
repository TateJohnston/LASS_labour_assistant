import axios from "axios";
import Buttons from "./Buttons";
import SearchBar from "./Searchbar";
import { Typography, Box } from "@mui/material";
import DateRangeSelector from "./DateRangeSelector";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Colors } from "../src/assets/Colors";
import convertDate from "../utilities/convertDate";
import dateToDMY from "../utilities/dateToDMY";

const LeaveRequestForm = ({ setSubmitLeaveRequest, fetchRequests }) => {
  const [open, setOpen] = useState(false);
  const [leaveType, setLeaveType] = useState();
  const [submitted, setSubmitted] = useState(null);
  const [dateRange, setDateRange] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { userDetails } = useContext(UserContext);
  const leaveOptions = [
    { type: "Annual Leave", query: "al_balance" },
    { type: "Long Service Leave", query: "lsl_balance" },
    { type: "Sick Leave", query: "sl_balance" },
    { type: "Day In Lieu", query: "dil_balance" },
    { type: "Maternity Leave", query: "ml_balance" },
  ];

  const toggle = () => setOpen(!open);

  useEffect(() => {
    setStartDate(dateRange.startDate);
    setEndDate(dateRange.endDate);
  }, [dateRange]);

  const submitRequest = () => {
    const leaveRequestObject = {
      employee_id: userDetails.employeeID,
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

  return (
    <>
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

      <Box
        sx={{
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
        {submitted && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {submitted === "Fail" && (
              <Typography sx={{ color: "#F44C49" }} variant="h5">
                Leave request failed, contact HR
              </Typography>
            )}

            <Buttons
              color={Colors.content}
              onClick={() => {
                setSubmitLeaveRequest(false);
                fetchRequests;
              }}
              content={"Back to Leave Requests"}
            />
          </Box>
        )}
        {leaveType && <Typography variant="h6">{leaveType}</Typography>}
        <DateRangeSelector
          toggle={toggle}
          open={open}
          onChange={(range) => {
            setDateRange(range);
            setOpen(false);
          }}
        />
        {!submitted && Object.entries(dateRange).length > 0 && (
          <>
            <Typography variant="h6" sx={{ color: Colors.secondary }}>
              {dateToDMY(convertDate(startDate))} -{" "}
              {dateToDMY(convertDate(endDate))}
            </Typography>{" "}
            <Buttons
              color={Colors.content}
              content={"Submit"}
              onClick={() => submitRequest()}
            />
            <Buttons
              color={Colors.content}
              content={"Cancel"}
              onClick={() => {
                setOpen(false);
                setLeaveType("");
                setStartDate("");
                setEndDate("");
                setSubmitLeaveRequest(false);
                setSubmitted(null);
              }}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default LeaveRequestForm;
