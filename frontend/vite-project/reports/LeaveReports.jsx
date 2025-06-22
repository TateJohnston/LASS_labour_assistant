import { useEffect, useState } from "react";
import { Colors } from "../src/assets/Colors";
import { BarChart } from "../components/Charts";
import axios from "axios";

export const LeaveReportChart = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/lass/reports/leave-balances-report`)
      .then((res) => {
        const data = res.data.data;
        setReportData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BarChart
      labels={reportData.map((employee) => employee.employee_name)}
      datasets={[
        {
          label: "Annual Leave Balance",
          data: reportData.map((employee) => employee.al_balance),
          backgroundColor: Colors.primary,
        },
        {
          label: "Long Service Leave Balance",
          data: reportData.map((employee) => employee.lsl_balance),
          backgroundColor: Colors.secondary,
        },
      ]}
      xAxisText={"Employees"}
      yAxisText={"Leave Count (Days)"}
      xAxisTextFontSize={20}
      yAxisTextFontSize={20}
    />
  );
};

export const EmployeeLeaveReportChart = ({ employee }) => {
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    if (employee.employee_id) {
      fetchEmployeeData(employee.employee_id);
    }
  }, [employee]);

  const fetchEmployeeData = (employeeID) => {
    axios
      .get(
        `http://localhost:8081/lass/reports/leave-balances-report?employeeID=${employeeID}`
      )
      .then((res) => {
        const data = res.data.data;

        setReportData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!employee || !employee.employee_id) return null;

  return (
    <BarChart
      showLegend={false}
      labels={[
        "Annual Leave",
        "Long Service Leave",
        "Sick Leave",
        "Days in Lieu",
      ]}
      datasets={[
        {
          label: "Leave Balances",
          data: [
            reportData[0]?.al_balance || 0,
            reportData[0]?.lsl_balance || 0,
            reportData[0]?.sl_balance || 0,
            reportData[0]?.dil_balance || 0,
          ],
          backgroundColor: [
            Colors.primary,
            Colors.secondary,
            Colors.success,
            Colors.warning,
          ],
        },
      ]}
      xAxisText={reportData[0]?.employee_name || ""}
      yAxisText={"Leave Count (Days)"}
      xAxisTextFontSize={20}
      yAxisTextFontSize={20}
      tickFontSize={15}
    />
  );
};
