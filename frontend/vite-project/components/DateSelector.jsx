import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BasicDatePicker = ({ width, onChange }) => {
  let today = new Date();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={onChange}
        defaultValue={dayjs(today)}
        label="Select Date"
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
