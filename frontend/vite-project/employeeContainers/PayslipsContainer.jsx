import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DropDownButton from "../components/DropDownButton";
import { ColorLens } from "@mui/icons-material";
import { Colors } from "../src/assets/Colors";

const EmployeePayslipsContainer = () => {
  const [selectedPayslip, setSelectedPayslip] = useState({});
  const [payslips, setPayslips] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/lass/employees/payslips/1")
      .then((res) => {
        const data = res.data.data;
        const sorted = data.sort((a, b) => b.payslip_id - a.payslip_id);
        setPayslips(sorted);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        width: "800px",
        padding: "0px 20px",
      }}
    >
      {Object.keys(selectedPayslip).length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            width: "100%",
            padding: "15px",
            border: `2px solid ${Colors.secondary}`,
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",
            }}
            key={selectedPayslip.payslip_id}
          >
            <Typography
              sx={{ color: Colors.secondary, fontWeight: "bold" }}
              variant="h3"
            >
              ${selectedPayslip.net}
            </Typography>
            <Typography sx={{}} variant="h4">
              {selectedPayslip.pay_day}
            </Typography>

            <DropDownButton
              onClick={() => {
                setSelectedPayslip({});
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Box
              sx={{
                flex: "1.5",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Salary: </Typography>
                <Typography variant="h5" sx={{ color: Colors.secondary }}>
                  ${selectedPayslip.salary}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Overtime: </Typography>
                <Typography variant="h5" sx={{ color: Colors.secondary }}>
                  ${selectedPayslip.overtime}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Bonus: </Typography>
                <Typography variant="h5" sx={{ color: Colors.secondary }}>
                  ${selectedPayslip.bonus}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Upgrades: </Typography>
                <Typography variant="h5" sx={{ color: Colors.secondary }}>
                  ${selectedPayslip.upgrades}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Gross: </Typography>
                <Typography variant="h5" sx={{ color: Colors.secondary }}>
                  ${selectedPayslip.gross}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Tax: </Typography>
                <Typography variant="h5" sx={{ color: "#F44C49" }}>
                  ${selectedPayslip.tax}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                flex: "3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                textAlign: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",

                  gap: "20px",
                }}
              >
                <Typography variant="h3"> Net: </Typography>
                <Typography sx={{ color: Colors.secondary }} variant="h3">
                  {" "}
                  ${selectedPayslip.net}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",

                  gap: "20px",
                }}
              >
                <Typography variant="h3"> Super: </Typography>
                <Typography sx={{ color: Colors.secondary }} variant="h3">
                  {" "}
                  ${selectedPayslip.super}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        payslips.map((payslip) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "60px",
              margin: "10px 50px",
              width: "100%",
              padding: "15px",
              border: `2px solid ${Colors.secondary}`,
              borderRadius: "10px",
            }}
            key={payslip.payslip_id}
          >
            <Typography
              sx={{ color: Colors.secondary, fontWeight: "bold" }}
              variant="h3"
            >
              ${payslip.net}
            </Typography>
            <Typography sx={{}} variant="h4">
              {payslip.pay_day}
            </Typography>

            <DropDownButton
              onClick={() => {
                setSelectedPayslip(payslip);
              }}
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default EmployeePayslipsContainer;
