import React, { useEffect, useState } from "react";
import { DateRangePicker } from "mui-daterange-picker";

const DateRangeSelector = ({ onChange, open, toggle }) => {
  return (
    <div>
      <DateRangePicker
        toggle={toggle}
        open={open}
        onChange={onChange}
        wrapperClassName="custom-date-range"
        closeOnClickOutside={false}
      />
    </div>
  );
};

export default DateRangeSelector;
