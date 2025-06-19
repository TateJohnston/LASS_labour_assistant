import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, isAfter } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeSelector = ({ onChange, open, toggle }) => {
  const [range, setRange] = useState([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    const selected = ranges.selection;
    setRange([selected]);
    if (
      selected.startDate &&
      selected.endDate &&
      isAfter(selected.endDate, selected.startDate)
    ) {
      onChange(selected);
    }
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
