import { useEffect, useState } from "react";
import { Colors } from "../src/assets/Colors";
import { BarChart } from "../components/Charts";
import axios from "axios";
import DateRangeSelector from "../components/DateRangeSelector";
import Buttons from "../components/Buttons";
import convertDate from "../utilities/convertDate";
import dateToDMY from "../utilities/dateToDMY";

export const TeamsReport = () => {
  const [reportData, setReportData] = useState([]);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const productivityCalc = (bonus) => {
    // This is the same bonus calculation that my work uses
    const productivity = (bonus - 20) / 3 + 70;
    return productivity;
  };

  const grouped = {};

  reportData.forEach((shift) => {
    if (!grouped[shift.work_date]) {
      grouped[shift.work_date] = {};
    }
    grouped[shift.work_date][shift.shift] = productivityCalc(shift.bonus);
  });

  const labels = Object.keys(grouped);
  const dayData = labels.map((date) => grouped[date]["Day Shift"] ?? 0);
  const eveningData = labels.map((date) => grouped[date]["Evening Shift"] ?? 0);
  const nightData = labels.map((date) => grouped[date]["Night Shift"] ?? 0);

  const shiftColors = {
    "Day Shift": Colors.primary,
    "Evening Shift": Colors.secondary,
    "Night Shift": "#E1B12C",
  };

  const fetchReport = (start_date, end_date) => {
    const parsedStartDate = convertDate(start_date);
    const parsedEndDate = convertDate(end_date);
    setStartDate(parsedStartDate);
    setEndDate(parsedEndDate);
    setOpen(false);
    axios
      .get(
        `http://localhost:8081/lass/reports/teams-report/${parsedStartDate}/${parsedEndDate}`
      )
      .then((res) => {
        const data = res.data.data;

        setReportData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!open && (
        <Buttons content={"Select Date Range"} onClick={() => setOpen(true)} />
      )}
      <DateRangeSelector
        onChange={(value) => {
          fetchReport(value.startDate, value.endDate);
        }}
        open={open}
        toggle={() => setOpen(false)}
      />
      <BarChart
        labels={labels}
        datasets={[
          {
            label: "Day",
            data: dayData,
            backgroundColor: shiftColors["Day Shift"],
          },
          {
            label: "Evening",
            data: eveningData,
            backgroundColor: shiftColors["Evening Shift"],
          },
          {
            label: "Night",
            data: nightData,
            backgroundColor: shiftColors["Night Shift"],
          },
        ]}
        xAxisText={`Shift Productivity Data for ${dateToDMY(
          startDate
        )} - ${dateToDMY(endDate)}`}
        yAxisText={"Containers Moved"}
        xAxisTextFontSize={20}
        yAxisTextFontSize={20}
      />
    </>
  );
};
