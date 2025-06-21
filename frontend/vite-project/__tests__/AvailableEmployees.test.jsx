import { queryByText, render } from "@testing-library/react";
import { it, expect } from "vitest";
import AvailableEmployees from "../components/AvailableEmployees";

it("Available Employees skills show up on allocations page, non held skills do not", () => {
  const mockData = {
    employee_id: 14,
    employee_name: "Sebastian King",
    shift: "Day Shift",
    foreman: null,
    crane: null,
    clerk: 1,
    fork: 1,
    truck: 1,
  };

  const { getByText, queryByText } = render(
    <AvailableEmployees employee={mockData} />
  );
  expect(getByText("Sebastian King")).toBeInTheDocument();
  expect(queryByText("Foreman")).not.toBeInTheDocument();
  expect(queryByText("Crane")).not.toBeInTheDocument();
  expect(getByText("Clerk")).toBeInTheDocument();
  expect(getByText("Fork")).toBeInTheDocument();
  expect(getByText("Truck")).toBeInTheDocument();
});
