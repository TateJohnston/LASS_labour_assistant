import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import calculateDayDifference from "../utilities/calculateDayDifference";
import { Colors } from "../src/assets/Colors";
import Buttons from "../components/Buttons";
import DialogueBox from "../components/DialogueBox";
import {
  taxCalculator,
  calculateGross,
  calculateNet,
  calculateSalary,
  calculateSuper,
  calculateUpgrades,
} from "../utilities/payrollCalculator";
import dateToDMY from "../utilities/dateToDMY";

const EmployeePaySummary = ({
  employee_id,
  start_date,
  end_date,
  payday,
  status,
}) => {
  const [rows, setRows] = useState([]);
  const [bonusTotal, setBonusTotal] = useState(0);
  const [salary, setSalary] = useState(0);
  const [upgrades, setUpgrades] = useState(0);
  const [open, setOpen] = useState(false);
  const [payConfirmed, setPayconfirmed] = useState(false);

  const dateDiff = calculateDayDifference(start_date, end_date);
  const paySalary = calculateSalary(salary, dateDiff);
  const payUpgrades = calculateUpgrades(upgrades);
  const gross = calculateGross(bonusTotal, payUpgrades, paySalary);
  const super_ = calculateSuper(gross);
  const tax = taxCalculator(gross, dateDiff);
  const net = calculateNet(gross, tax);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createSummaryData = (
    date,
    available,
    shift,
    role_worked,
    grade_worked,
    shift_bonus
  ) => {
    return { date, available, shift, role_worked, grade_worked, shift_bonus };
  };

  const confirmPayslip = () => {
    const reqBody = {
      employee_id: employee_id,
      salary: paySalary,
      bonus: bonusTotal,
      upgrades: payUpgrades,
      gross: gross,
      tax: tax,
      net: net,
      super: super_,
      pay_day: payday,
      release: true,
    };
    axios
      .post(`http://localhost:8081/lass/payroll/create`, reqBody)
      .then((res) => {
        setPayconfirmed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8081/lass/payroll/summary/${employee_id}/${start_date}/${end_date}`
      )
      .then((res) => {
        const data = res.data.data;
        let rowArr = [];
        let bonus = 0;
        let upgrades = [];
        data.forEach((date) => {
          rowArr.push(
            createSummaryData(
              date.date,
              date.available,
              date.shift,
              date.role_worked,
              date.grade_worked,
              date.shift_bonus
            )
          );
          bonus += date.shift_bonus;
          if (date.employee_grade < date.grade_worked) {
            if (date.grade_worked !== null) {
              upgrades.push(date.grade_worked - date.employee_grade);
            }
          }
        });
        console.log(upgrades);
        setUpgrades(upgrades.reduce((a, b) => a + b, 0));
        setRows(rowArr);
        setSalary(data[0].salary);
        setBonusTotal(bonus);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <TableContainer
        sx={{
          padding: "10px",
          height: "600px",
          border: `3px solid ${Colors.secondary}`,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "10px",
          },
        }}
        component={Paper}
      >
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="Pay Summary Table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "medium" }}
              >
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Available?
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Shift
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Role Worked
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Grade Worked
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Bonus
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dateToDMY(row.date)}
                </TableCell>
                <TableCell align="center">
                  {row.available === 0 ? "Not Available" : "Available"}
                </TableCell>
                <TableCell align="center">{row.shift}</TableCell>
                <TableCell align="center">
                  {row.role_worked === null ? "n/a" : row.role_worked}
                </TableCell>
                <TableCell align="center">
                  {row.grade_worked === null ? "n/a" : row.grade_worked}
                </TableCell>
                <TableCell align="center">
                  ${row.shift_bonus === null ? 0 : row.shift_bonus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        sx={{
          padding: "10px",
          width: "300px",
          height: "fit-content",
          border: `3px solid ${Colors.secondary}`,
        }}
        component={Paper}
      >
        <Table sx={{ marginBottom: "10px" }}>
          <TableBody>
            <TableRow>
              <TableCell>Salary</TableCell>
              <TableCell>${paySalary.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bonus</TableCell>
              <TableCell>${bonusTotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Upgrades</TableCell>
              <TableCell>${payUpgrades.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gross</TableCell>
              <TableCell>${gross.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Super</TableCell>
              <TableCell>${super_.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell>${tax.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: Colors.secondary }}>Net</TableCell>
              <TableCell sx={{ color: Colors.secondary }}>
                ${net.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <>
          {!status && !payConfirmed ? (
            payday ? (
              <Buttons
                width="100px"
                content={payday ? "Confirm" : "Select Payday"}
                onClick={payday && handleClickOpen}
              />
            ) : (
              <Typography sx={{ color: Colors.error }}>
                No Payday Selected
              </Typography>
            )
          ) : (
            <Typography sx={{ color: Colors.secondary }}>Paid</Typography>
          )}
          <DialogueBox
            open={open}
            onClose={handleClose}
            dialogueTitle={`Confirm Payslip?`}
            dialogueMessage={` Are you sure you want to confirm employees payslip for ${payday}?
                This cannot be undone.`}
            cancelText={"Disagree"}
            submitText={"Agree"}
            confirmClick={() => {
              confirmPayslip();
              handleClose();
            }}
          />
        </>
      </TableContainer>
    </Box>
  );
};

export default EmployeePaySummary;
