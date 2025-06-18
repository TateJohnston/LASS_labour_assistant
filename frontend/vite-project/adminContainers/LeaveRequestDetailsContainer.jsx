import { Box, Typography } from "@mui/material";
import ArrowBack from "../components/ArrowBack";
import { Colors } from "../src/assets/Colors";
import Buttons from "../components/Buttons";
import InputFields from "../components/InputFields";
import dateToDMY from "../utilities/dateToDMY";

const LeaveRequestDetailsContainer = ({
  name,
  leaveType,
  startDate,
  endDate,
  requestLength,
  alBalance,
  lslBalance,
  slBalance,
  dilBalance,
  mlBalance,
  request = [],
  onClickApprove,
  onClickDeny,
  status,
  onClickBack,
  commentChange,
  displayHandle = "flex",
  displayMessage,
  content,
  responseColor,
}) => {
  const displayHandler = (key, value) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <Typography variant="h6" sx={{ color: "gray", fontWeight: "bold" }}>
          {key}:{" "}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderBottom: `2px solid ${Colors.primary}`,
          position: "sticky",
          backgroundColor: Colors.content,
          top: 0,
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", color: Colors.secondary }}
          variant="h4"
        >
          {name}{" "}
        </Typography>
        <Typography
          sx={{ fontWeight: "bold", color: Colors.secondary }}
          variant="h4"
        >
          {leaveType}
        </Typography>
        <ArrowBack onClick={onClickBack} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {displayHandler("Status", status)}
          {displayHandler("Start Date", dateToDMY(startDate))}
          {displayHandler("End Date", dateToDMY(endDate))}
          {displayHandler("Total Days Off", requestLength)}
          {displayHandler("al_Balance", alBalance)}
          {displayHandler("lsl_Balance", lslBalance)}
          {displayHandler("sl_balance", slBalance)}
          {displayHandler("dil_balance", dilBalance)}
          {displayHandler("ml_balance", mlBalance)}
          <div
            style={{
              display: displayHandle,
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <InputFields
              helperText
              onChange={commentChange}
              label={"Comment..."}
              multiline
              rows={"3"}
              width={"100%"}
            />

            <Buttons
              onClick={onClickApprove}
              content={"Approve"}
              backgroundColor={Colors.success}
            />

            <Buttons
              onClick={onClickDeny}
              content={"Deny"}
              backgroundColor={Colors.error}
            />
          </div>
          <Typography
            variant="h4"
            sx={{
              display: { displayMessage },
              marginTop: "20px",
              color: responseColor,
              textAlign: "start",
            }}
          >
            {content}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            maxHeight: "600px",
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
            variant="h5"
          >
            Shifts Missed
          </Typography>
          {request.map((dayOff) => (
            <Box
              key={dayOff.roster_id}
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "75%",
                backgroundColor: Colors.secondary,

                alignItems: "center",
                borderRadius: "10px",
                padding: "20px 0px",
              }}
            >
              <Typography
                sx={{
                  flex: "1",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: Colors.primary,
                }}
              >
                {dateToDMY(dayOff.roster_date)}
              </Typography>
              <Typography
                sx={{
                  flex: "1",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: Colors.content,
                }}
              >
                {dayOff.shift}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LeaveRequestDetailsContainer;
