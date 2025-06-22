import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Colors } from "../src/assets/Colors";

const DateSelector = ({
  height,
  onChange,
  label = "Select Date",
  width = "300px",
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          height,
          backgroundColor: "white",
          width,
          borderRadius: "5px",
          textAlign: "center",
        }}
        onChange={(newValue) => onChange(newValue)}
        label={label}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
