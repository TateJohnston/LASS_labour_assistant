import { Box, Typography } from "@mui/material";
import Logo from "../components/Logo";
import InputFields from "../components/InputFields";
import Buttons from "../components/Buttons";
import { Colors } from "../src/assets/Colors";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { InputAdornment, IconButton } from "@mui/material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo width="700px" />
      </div>
      <div
        style={{
          backgroundColor: Colors.primary,
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          <InputFields width={"75%"} label={"Email"} />
          <InputFields
            width={"75%"}
            label={"Password"}
            type={showPassword ? "text" : "password"}
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
          <Buttons
            width={"250px"}
            content={"Log In"}
            color={Colors.primary}
            fontWeight={"bold"}
          />
          <Buttons
            width={"250px"}
            content={"Forgot Password"}
            color={Colors.primary}
            fontWeight={"bold"}
          />
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;
