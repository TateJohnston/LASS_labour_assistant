import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import LeaveRequestDetailsContainer from "../adminContainers/LeaveRequestDetailsContainer";

it("dateToDMY date conversion displays 'Invalid Date' when no roster_date is passed", () => {
  const mockRequest = [
    {
      employee_id: 1,
      employee_name: "Jacob Taylor",
      leave_request_id: 27,
      leave_type: "Sick Leave",
      roster_id: null,
      roster_date: null,
      shift: null,
      status: "Pending",
      comment: null,
      al_balance: 29,
      lsl_balance: 70,
      sl_balance: 2,
      dil_balance: 6,
      ml_balance: 0,
      start_date: "2025-06-27",
      end_date: "2025-06-28",
      createdAt: "2025-06-21T11:31:19.000Z",
      updatedAt: "2025-06-21T11:31:19.000Z",
    },
  ];
  const mockStartDate = "2025-06-27";
  const mockEndDate = "2025-06-28";

  const { getByText } = render(
    <LeaveRequestDetailsContainer
      request={mockRequest}
      startDate={mockStartDate}
      endDate={mockEndDate}
    />
  );

  expect(getByText("Invalid Date")).toBeInTheDocument();
});
