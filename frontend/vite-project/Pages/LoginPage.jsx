import { Box, Typography } from "@mui/material";
import Logo from "../components/Logo";
import InputFields from "../components/InputFields";
import Buttons from "../components/Buttons";
import { Colors } from "../src/assets/Colors";
import { useContext, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { InputAdornment, IconButton } from "@mui/material";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import DialogueBox from "../components/DialogueBox";

const LoginPage = () => {
  const { setUserDetails, setIsAdmin, setSuccessfulLogin } =
    useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationEmailFormOpen, setVerificationEmailFormOpen] =
    useState(false);
  const [verifyCodeFormOpen, setVerifyCodeFormOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verifiedAccount, setVerifiedAccount] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [successfulPasswordChange, setSuccessfulPasswordChange] =
    useState(false);

  // even if the passwords didnt match, the query was still being sent
  // if i try to reset the password twice in a row, the successfully changed password

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
          setEmail("");
          setPassword("");
          setVerificationEmail("");
          setVerificationCode("");
          setNewPassword("");
          setRetypedPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendVerificationCode = () => {
    axios
      .post("http://localhost:8081/lass/logIn/send-verification", {
        email: verificationEmail,
      })
      .catch((err) => console.log(err));
  };

  const verifyCode = () => {
    axios
      .post("http://localhost:8081/lass/logIn/verify-code", {
        code: verificationCode,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "approved") {
          setVerifiedAccount("verified");
          setVerifyCodeFormOpen(false);
        } else {
          setVerifiedAccount("unverified");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logIn = (email, password) => {
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
          {verifiedAccount === "verified" ? (
            <>
              {!successfulPasswordChange ? (
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
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
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
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
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
              ) : (
                <Typography variant="h6" sx={{ color: Colors.success }}>
                  Password Successfully Changed
                </Typography>
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
                <Typography sx={{ color: Colors.success }}>
                  Verification Successful
                </Typography>
              )}
            </>
          ) : (
            <>
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
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
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
                onClick={() => {
                  setVerificationEmailFormOpen(true);
                  setFailedLogin(false);
                }}
              />
            </>
          )}
          <DialogueBox
            open={verificationEmailFormOpen}
            onClose={() => setVerificationEmailFormOpen(false)}
            dialogueTitle={"Account Verification"}
            dialogueMessage={
              "An SMS with a 6 digit code will be sent to the phone number linked to this email."
            }
            showTextField={true}
            textFieldName={"Email"}
            textFieldLabel={"Email"}
            textFieldType={"email"}
            cancelText={"Cancel"}
            submitText={"Send SMS"}
            textFieldChange={(e) => setVerificationEmail(e.target.value)}
            confirmClick={() => {
              if (verificationEmail) {
                sendVerificationCode();
                setVerificationEmailFormOpen(false);
                setVerifyCodeFormOpen(true);
              }
            }}
          />
          {verifiedAccount !== "verified" && (
            <DialogueBox
              open={verifyCodeFormOpen}
              onClose={() => setVerifyCodeFormOpen(false)}
              dialogueTitle={`Enter 6 Digit Code sent to number linked to ${verificationEmail}`}
              showTextField={true}
              textFieldName={"Enter Code"}
              textFieldLabel={"Enter Code"}
              textFieldType={"number"}
              textFieldChange={(e) => setVerificationCode(e.target.value)}
              cancelText={"Cancel"}
              submitText={"Verify"}
              confirmClick={() => {
                verifyCode();
              }}
              showFailedMessage={verifiedAccount === "unverified" && true}
              failedMessage={"Incorrect Code"}
            />
          )}
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;
