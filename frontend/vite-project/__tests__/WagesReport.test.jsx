import { queryByText, render } from "@testing-library/react";
import { it, expect } from "vitest";
import { BarChart } from "../components/Charts";
import { Colors } from "chart.js";

it("Barchart functions correctly", () => {
  const mockData = [
    {
      employee_id: 3,
      employee_name: "Noah Smith",
      role_id: 1,
      salary_YTD: "9218.12",
      bonus_YTD: "2625.69",
      upgrades_YTD: "0.00",
      gross_YTD: "12730.34",
      tax_YTD: "3331.20",
      net_YTD: "9399.14",
      super_YTD: "1527.64",
    },
    {
      employee_id: 3,
      employee_name: "Noah Smith",
      role_id: 1,
      salary_YTD: "9218.12",
      bonus_YTD: "2625.69",
      upgrades_YTD: "0.00",
      gross_YTD: "12730.34",
      tax_YTD: "3331.20",
      net_YTD: "9399.14",
      super_YTD: "1527.64",
    },
    {
      employee_id: 6,
      employee_name: "Henry White",
      role_id: 2,
      salary_YTD: "8257.64",
      bonus_YTD: "3580.45",
      upgrades_YTD: "0.00",
      gross_YTD: "12119.24",
      tax_YTD: "3222.74",
      net_YTD: "8896.49",
      super_YTD: "1454.31",
    },
  ];
  const roleDictionary = {
    1: "Foreman",
    2: "Crane Driver",
    3: "Clerk",
    4: "Truck Driver",
    5: "Forklift Operator",
    6: "Payroll Manager",
    7: "Labour Manager",
  };

  const roleColors = {
    1: Colors.secondary,
    2: Colors.success,
    3: Colors.warning,
    4: Colors.error,
    5: "gray",
    6: "blue",
    7: "lightgray",
  };

  const { asFragment } = render(
    <BarChart
      showLegend={false}
      labels={mockData.map(
        (employee) =>
          `${employee.employee_name} - ${roleDictionary[employee.role_id]}`
      )}
      datasets={[
        {
          data: mockData.map((employee) => employee.gross_YTD),
          backgroundColor: mockData.map(
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

  expect(asFragment()).toMatchSnapshot();
});
