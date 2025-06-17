import axios from "axios";
import Calendar from "../components/Calendar";
import { Colors } from "../src/assets/Colors";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const RosterContainer = () => {
  const [shiftDates, setShiftDates] = useState([]);
  const { userDetails } = useContext(UserContext);

  const shiftColors = {
    "Day Shift": Colors.primary,
    "Evening Shift": Colors.secondary,
    "Night Shift": "#E1B12C",
    OFF: "#FF6B6B",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/lass/rosters/${userDetails.employeeID}/`)
      .then((data) => {
        const employeeData = data.data.data;
        const fullShiftData = employeeData.map((shift) => ({
          title: shift.shift,
          date: shift.date,
          backgroundColor: shiftColors[shift.shift],
        }));
        setShiftDates(fullShiftData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return <Calendar events={shiftDates} height={"800px"} />;
};

export default RosterContainer;
