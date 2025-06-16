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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import calculateDayDifference from "../utilities/calculateDayDifference";
import { Colors } from "../src/assets/Colors";
import Buttons from "../components/Buttons";
// import DialogueBox from "../components/DialogueBox";

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

  const taxCalculator = (gross, dayDiff) => {
    let tax = 0;
    const expectedYearlySalary = gross * (365 / dayDiff);

    if (expectedYearlySalary <= 18200) {
      tax = 0;
    } else if (expectedYearlySalary <= 45000) {
      tax = 0.19 * (expectedYearlySalary - 18200);
    } else if (expectedYearlySalary <= 120000) {
      tax = 5092 + 0.325 * (expectedYearlySalary - 45000);
    } else if (expectedYearlySalary <= 180000) {
      tax = 29467 + 0.37 * (expectedYearlySalary - 120000);
    } else {
      tax = 51667 + 0.45 * (expectedYearlySalary - 180000);
    }

    const payTax = tax / (365 / dayDiff);
    return payTax.toFixed(2);
  };

  const confirmPayslip = () => {
    handleClose();
    setPayconfirmed(true);
    const reqBody = {
      employee_id: employee_id,
      salary: (
        (salary / 365) *
        calculateDayDifference(start_date, end_date)
      ).toFixed(2),
      bonus: bonusTotal,
      upgrades: (upgrades * (10000 / 260)).toFixed(2),
      gross: (
        bonusTotal +
        upgrades +
        (salary / 365) * calculateDayDifference(start_date, end_date)
      ).toFixed(2),
      tax: taxCalculator(
        bonusTotal +
          upgrades +
          (salary / 365) * calculateDayDifference(start_date, end_date),
        calculateDayDifference(start_date, end_date)
      ),
      net: (
        bonusTotal +
        upgrades +
        (salary / 365) * calculateDayDifference(start_date, end_date) -
        taxCalculator(
          bonusTotal +
            upgrades +
            (salary / 365) * calculateDayDifference(start_date, end_date),
          calculateDayDifference(start_date, end_date)
        )
      ).toFixed(2),
      super: (
        (bonusTotal +
          upgrades +
          (salary / 365) * calculateDayDifference(start_date, end_date)) *
        0.12
      ).toFixed(2),
      pay_day: payday,
      release: true,
    };

    axios
      .post(`http://localhost:8081/lass/payroll/create`, reqBody)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8081/lass/payroll/${employee_id}/${start_date}/${end_date}`
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
        }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 650, overflowY: "auto" }}
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
                  {row.date}
                </TableCell>
                <TableCell align="center">
                  {row.available === null ? "On Leave" : "Available"}
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
          overflow: "hidden",
          border: `3px solid ${Colors.secondary}`,
        }}
        component={Paper}
      >
        <Table sx={{ marginBottom: "10px" }}>
          <TableBody>
            <TableRow>
              <TableCell>Salary</TableCell>
              <TableCell>
                $
                {(
                  (salary / 365) *
                  calculateDayDifference(start_date, end_date)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bonus</TableCell>
              <TableCell>${bonusTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Upgrades</TableCell>
              <TableCell>${(upgrades * (10000 / 260)).toFixed(2)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Gross</TableCell>
              <TableCell>
                $
                {(
                  bonusTotal +
                  upgrades +
                  (salary / 365) * calculateDayDifference(start_date, end_date)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Super</TableCell>
              <TableCell>
                $
                {(
                  (bonusTotal +
                    upgrades +
                    (salary / 365) *
                      calculateDayDifference(start_date, end_date)) *
                  0.12
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell>
                $
                {taxCalculator(
                  bonusTotal +
                    upgrades +
                    (salary / 365) *
                      calculateDayDifference(start_date, end_date),
                  calculateDayDifference(start_date, end_date)
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: Colors.secondary }}>Net</TableCell>
              <TableCell sx={{ color: Colors.secondary }}>
                $
                {(
                  bonusTotal +
                  upgrades +
                  (salary / 365) *
                    calculateDayDifference(start_date, end_date) -
                  taxCalculator(
                    bonusTotal +
                      upgrades +
                      (salary / 365) *
                        calculateDayDifference(start_date, end_date),
                    calculateDayDifference(start_date, end_date)
                  )
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <>
          {!status && !payConfirmed ? (
            <Buttons
              width="100px"
              content={"Confirm"}
              onClick={handleClickOpen}
            />
          ) : (
            <Typography sx={{ color: Colors.secondary }}>Paid</Typography>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Confirm Payslip?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to confirm employees payslip for {payday}?
                This cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                onClick={() => {
                  confirmPayslip();
                }}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          {/* <DialogueBox  /> */}
        </>
      </TableContainer>
    </Box>
  );
};

export default EmployeePaySummary;
