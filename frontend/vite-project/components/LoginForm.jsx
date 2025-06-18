import { Box, Typography, InputAdornment, IconButton } from "@mui/material";
import InputFields from "./InputFields";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Buttons from "./Buttons";
import { useState, useContext } from "react";
import { Colors } from "../src/assets/Colors";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const LoginForm = ({ forgotPasswordClick }) => {
  const { setUserDetails, setIsAdmin, setSuccessfulLogin } =
    useContext(UserContext);
  const [failedLogin, setFailedLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (email, password) => {
    console.log(email, password);
    const logInDetails = {
      email: email,
      password: password,
    };
    axios
      .post(`http://localhost:8081/lass/logIn/`, logInDetails)
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        if (res.data.result === 200) {
          if (data.role_id > 5) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          setUserDetails({ employeeID: data.employee_id, name: data.name });
          setFailedLogin(false);
          setSuccessfulLogin(true);
        } else {
          setFailedLogin(true);
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
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Sign in to get started
      </Typography>
      <InputFields
        value={email}
        width={"75%"}
        label={"Email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputFields
        value={password}
        width={"75%"}
        label={"Password"}
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
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
          display: failedLogin ? "flex" : "none",
          color: Colors.error,
        }}
      >
        Incorrect Login Details
      </Typography>
      <Buttons
        width={"250px"}
        content={"Log In"}
        color={Colors.primary}
        fontWeight={"bold"}
        onClick={() => logIn(email, password)}
      />
      <Buttons
        width={"250px"}
        content={"Forgot Password"}
        color={Colors.primary}
        fontWeight={"bold"}
        onClick={forgotPasswordClick}
      />
    </Box>
  );
};

export default LoginForm;
