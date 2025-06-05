import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Colors } from "../src/assets/Colors";
import DateSelector from "../components/DateSelector";
import InputFields from "../components/InputFields";
import DoneIcon from "@mui/icons-material/Done";

const LicensesContainer = () => {
  const [licenses, setLicenses] = useState([]);
  const [dueLicenses, setDueLicenses] = useState([]);
  const [dateChange, setDateChange] = useState(null);
  const [costChange, setCostChange] = useState(null);
  const [changes, setChanges] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8081/lass/licenses/")
      .then((res) => {
        setLicenses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/lass/licenses/due`)
      .then((res) => {
        setDueLicenses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateLicense = (licenseID) => {
    const editBody = changes[licenseID];
    if (!editBody) return;
    axios
      .put(`http://localhost:8081/lass/licenses/update/${licenseID}`, editBody)
      .then((res) => {
        setDateChange(null);
        setCostChange(null);
        return axios.get("http://localhost:8081/lass/licenses/");
      })
      .then((res) => {
        setLicenses(res.data.data);
        return axios.get("http://localhost:8081/lass/licenses/due");
      })
      .then((res) => {
        setDueLicenses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        width: "500px",
        height: "fit-content",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "20px",
        border: `2px solid ${Colors.secondary}`,
        boxSizing: "border-box",
        gap: "10px",
        padding: "40px",
        marginBottom: "10px",
        overflowY: "auto",
      }}
    >
      {licenses.map((license) => (
        <Box
          key={license.license_id}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
            width: "100%",
            gap: "5px",
            borderBottom: `2px solid ${Colors.secondary}`,
            padding: "5px 0px",
          }}
        >
          <Typography variant="h4" sx={{ color: Colors.secondary }}>
            {license.licenser}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              textAlign: "start",
            }}
          >
            <Typography sx={{ color: "gray", flex: "1" }} variant="h6">
              Cost Per Month:{" "}
            </Typography>
            <Typography sx={{ flex: "1" }} variant="h6">
              ${license.cost_per_month}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              textAlign: "start",
            }}
          >
            <Typography sx={{ color: "gray", flex: "1" }} variant="h6">
              Expiry:
            </Typography>
            <Typography
              sx={{
                flex: "1",
                color: dueLicenses.some(
                  (duelicense) => duelicense.license_id === license.license_id
                )
                  ? Colors.error
                  : "black",
              }}
              variant="h6"
            >
              {new Date(license.expiry).toISOString().split("T")[0]}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <DateSelector
              width="200px"
              label="Edit Expiry Date"
              onChange={(value) => {
                const dateValue = value.$d;
                const dateStr = new Date(dateValue.toString());
                const year = dateStr.getFullYear();
                const month = String(dateStr.getMonth() + 1).padStart(2, "0");
                const day = String(dateStr.getDate()).padStart(2, "0");
                const fullDate = `${year}-${month}-${day}`;
                setChanges((prev) => ({
                  ...prev,
                  [license.license_id]: {
                    ...prev[license.license_id],
                    expiry: fullDate,
                  },
                }));
              }}
            />
            <InputFields
              label={"Edit Cost"}
              width={"150px"}
              type={"number"}
              onChange={(e) => {
                setChanges((prev) => ({
                  ...prev,
                  [license.license_id]: {
                    ...prev[license.license_id],
                    cost_per_month: e.target.value,
                  },
                }));
              }}
            />
            <DoneIcon
              sx={{
                height: "30px",
                width: "30px",
                backgroundColor: Colors.success,
                borderRadius: "10px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => updateLicense(license.license_id)}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default LicensesContainer;
