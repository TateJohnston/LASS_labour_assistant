import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateSelector = ({ onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          backgroundColor: "white",
          width: "300px",
          borderRadius: "5px",
          textAlign: "center",
        }}
        onChange={(newValue) => onChange(newValue)}
        label="Select Date"
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
