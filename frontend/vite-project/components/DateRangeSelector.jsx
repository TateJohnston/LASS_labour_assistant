import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeSelector = ({ onChange, open, toggle }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
    onChange(ranges.selection);
  };

  if (!open) return null;

  return (
    <div style={{ zIndex: 10 }}>
      <DateRange
        editableDateInputs
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={range}
      />
      <button onClick={toggle} style={{ marginTop: "10px" }}>
        Close
      </button>
    </div>
  );
};

export default DateRangeSelector;
