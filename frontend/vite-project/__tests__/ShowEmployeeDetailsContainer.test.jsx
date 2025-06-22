import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShowEmployeeDetailsContainer from "../adminContainers/ShowEmployeeDetailsContainer";
import { expect } from "vitest";

const mockEmployee = {
  employee_id: 1,
  email: "jacob.taylor@gmail.com",
  DOB: "1964-01-27",
  age: 61,
  phone_number: "0468 589 981",
  address: "12 Kings Park Rd, West Perth, WA 6005",
  emergency_name: "Emily Taylor",
  emergency_number: "0421 234 567",
  work_email: "jacob.taylor@terminals.com.au",
  employee_name: "Jacob Taylor",
  main_role: "Foreman",
  has_foreman_skill: 1,
  last_foreman_voc: "2024-07-01T09:00:00.000Z",
  foreman_ticket_expiry: "2025-08-27T00:00:00.000Z",
  has_crane_skill: null,
  last_crane_voc: null,
  crane_ticket_expiry: null,
  has_clerk_skill: null,
  last_clerk_voc: null,
  has_fork_skill: 0,
  last_fork_voc: "2025-05-27T22:59:55.000Z",
  fork_ticket_expiry: "2025-08-27T00:00:00.000Z",
  has_truck_skill: 1,
  last_truck_voc: "2025-05-27T23:00:30.000Z",
  truck_ticket_expiry: "2025-08-27T00:00:00.000Z",
};

it("displays reinstate button and opens dialogue box when clicked", async () => {
  render(<ShowEmployeeDetailsContainer showEmployeeDetails={mockEmployee} />);

  const revokeButton = screen.getByText("Reinstate");
  expect(revokeButton).toBeInTheDocument();

  await userEvent.click(revokeButton);

  expect(
    screen.getByText("Reinstate Forklift Operator skill for Jacob Taylor")
  ).toBeInTheDocument();

  const confirmButton = screen.getByText("Confirm");
  expect(confirmButton).toBeInTheDocument();

  await userEvent.click(confirmButton);

  expect(screen.getByText("Skill Reinstated")).toBeInTheDocument();
});
