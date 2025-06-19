import { useEffect, useState } from "react";
import { Colors } from "../src/assets/Colors";
import { BarChart } from "../components/Charts";
import axios from "axios";

export const WagesReportChart = () => {
  const [reportData, setReportData] = useState([]);

  const roleColors = {
    1: Colors.secondary,
    2: Colors.success,
    3: Colors.warning,
    4: Colors.error,
    5: "gray",
    6: "blue",
    7: "lightgray",
  };

  const roleDictionary = {
    1: "Foreman",
    2: "Crane Driver",
    3: "Clerk",
    4: "Truck Driver",
    5: "Forklift Operator",
    6: "Payroll Manager",
    7: "Labour Manager",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/lass/reports/wages-report`)
      .then((res) => {
        let groupedObject = {};
        const data = res.data.data;
        const sorted = data.sort((a, b) => b.gross_YTD - a.gross_YTD);

        setReportData(sorted);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BarChart
      showLegend={false}
      labels={reportData.map(
        (employee) =>
          `${employee.employee_name} - ${roleDictionary[employee.role_id]}`
      )}
      datasets={[
        {
          data: reportData.map((employee) => employee.gross_YTD),
          backgroundColor: reportData.map(
            (employee) => roleColors[employee.role_id]
          ),
        },
      ]}
      xAxisText={"Employees"}
      yAxisText={"Employees YTD Gross ($)"}
      xAxisTextFontSize={20}
      yAxisTextFontSize={20}
    />
  );
};

export const EmployeeWagesReportChart = ({ employee }) => {
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    if (employee.employee_id) {
      fetchEmployeeData(employee.employee_id);
    }
  }, [employee]);

  const fetchEmployeeData = (employeeID) => {
    axios
      .get(
        `http://localhost:8081/lass/reports/wages-report?employeeID=${employee.employee_id}`
      )
      .then((res) => {
        setReportData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <BarChart
      showLegend={false}
      labels={["Upgrades", "Bonus", "Salary", "Gross", "Super", "Tax", "Net"]}
      datasets={[
        {
          label: "Wages YTD",
          data: [
            reportData[0]?.upgrades_YTD || 0,
            reportData[0]?.bonus_YTD || 0,
            reportData[0]?.salary_YTD || 0,
            reportData[0]?.gross_YTD || 0,
            reportData[0]?.super_YTD || 0,
            reportData[0]?.tax_YTD || 0,
            reportData[0]?.net_YTD,
          ],
          backgroundColor: [
            Colors.primary,
            Colors.secondary,
            "lightgray",
            Colors.warning,
            "gray",
            Colors.error,
            Colors.success,
          ],
        },
      ]}
      xAxisText={reportData[0]?.employee_name || ""}
      yAxisText={"YTD $ Dollars"}
      xAxisTextFontSize={20}
      yAxisTextFontSize={20}
      tickFontSize={15}
    />
  );
};
