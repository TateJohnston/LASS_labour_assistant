import { queryByText, render } from "@testing-library/react";
import { it, expect } from "vitest";
import AllocationTeamDisplay from "../components/AllocationTeamDisplay";

it("Teams Card Displays correct data when the employee is in the team", () => {
  const mockData = [
    {
      name: "Lucas Brown",
      employee_id: 2,
      role: "Foreman",
      shift: "Day Shift",
    },
    {
      name: "Charlie Harris",
      employee_id: 7,
      role: "Crane Driver",
      shift: "Day Shift",
    },
  ];

  const { getByText } = render(<AllocationTeamDisplay employees={mockData} />);

  expect(getByText("Foreman:")).toBeInTheDocument();
  expect(getByText("Lucas Brown")).toBeInTheDocument();
  expect(getByText("Day Shift:")).toBeInTheDocument();
  expect(getByText("Crane Driver:")).toBeInTheDocument();
  expect(getByText("Charlie Harris")).toBeInTheDocument();
});
