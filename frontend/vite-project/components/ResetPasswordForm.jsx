import { Box, Typography } from "@mui/material";
import InputFields from "./InputFields";
import Buttons from "../components/Buttons";
import { Colors } from "../src/assets/Colors";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { InputAdornment, IconButton } from "@mui/material";
import axios from "axios";

const ResetPasswordForm = ({
  verifiedEmailTextDisplay,
  verificationEmail,
  setVerifiedAccount,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [successfulPasswordChange, setSuccessfulPasswordChange] =
    useState(false);

  const createPassword = () => {
    if (newPassword !== retypedPassword || !newPassword || !retypedPassword) {
      return setPasswordsMatch(false);
    }
    axios
      .post(`http://localhost:8081/lass/logIn/create-password`, {
        email: verificationEmail,
        password: newPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccessfulPasswordChange(true);
          setNewPassword("");
          setRetypedPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: Colors.content,
        height: "467px",
        width: "400px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {!successfulPasswordChange && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Reset Password
          </Typography>
          <InputFields
            width={"75%"}
            label={"Set Password"}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <InputFields
            width={"75%"}
            label={"Re-type Password"}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setRetypedPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              display: passwordsMatch ? "none" : "flex",
              color: Colors.error,
            }}
          >
            Passwords must match
          </Typography>
          <Buttons
            width={"250px"}
            content={"Create Password"}
            color={Colors.primary}
            fontWeight={"bold"}
            onClick={createPassword}
          />
        </>
      )}

      {successfulPasswordChange && (
        <>
          <Typography variant="h6" sx={{ color: Colors.success }}>
            Password Successfully Changed
          </Typography>
        </>
      )}

      <Buttons
        width={"250px"}
        content={"Back to Login"}
        color={Colors.primary}
        fontWeight={"bold"}
        onClick={() => {
          setVerifiedAccount("");
          setSuccessfulPasswordChange(false);
          setPasswordsMatch(true);
        }}
      />
      {!successfulPasswordChange && (
        <Typography
          sx={{ color: Colors.success, display: { verifiedEmailTextDisplay } }}
        >
          Verification Successful
        </Typography>
      )}
    </Box>
  );
};

export default ResetPasswordForm;
