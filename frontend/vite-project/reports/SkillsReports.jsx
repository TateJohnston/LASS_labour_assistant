import { useEffect, useState } from "react";
import { Colors } from "../src/assets/Colors";
import { BarChart, DoughnutChart } from "../components/Charts";
import axios from "axios";

export const SkillsReport = () => {
  const [foremanCount, setForemanCount] = useState(0);
  const [craneCount, setCraneCount] = useState(0);
  const [clerkCount, setClerkCount] = useState(0);
  const [forkCount, setForkCount] = useState(0);
  const [truckCount, setTruckCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/lass/reports/skills-report")
      .then((res) => {
        const data = res.data.data;
        let foreman = 0;
        let crane = 0;
        let fork = 0;
        let clerk = 0;
        let truck = 0;
        data.forEach((employee) => {
          if (employee.foreman === 1) foreman++;
          if (employee.crane === 1) crane++;
          if (employee.clerk === 1) clerk++;
          if (employee.fork === 1) fork++;
          if (employee.truck === 1) truck++;
        });
        setForemanCount(foreman);
        setCraneCount(crane);
        setClerkCount(clerk);
        setForkCount(fork);
        setTruckCount(truck);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BarChart
      showLegend={false}
      labels={[
        "Foreman",
        "Crane Drivers",
        "Clerks",
        "Forklift Operators",
        "Truck Drivers",
      ]}
      datasets={[
        {
          data: [foremanCount, craneCount, clerkCount, forkCount, truckCount],
          backgroundColor: [
            Colors.secondary,
            Colors.success,
            Colors.warning,
            Colors.error,
            "blue",
          ],
        },
      ]}
      xAxisText={"Skills"}
      yAxisText={"Employee Count"}
      xAxisTextFontSize={20}
      yAxisTextFontSize={20}
      tickFontSize={15}
    />
  );
};
