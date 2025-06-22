import Logo from "../components/Logo";
import { Colors } from "../src/assets/Colors";
import { useState } from "react";
import axios from "axios";
import DialogueBox from "../components/DialogueBox";
import LoginForm from "../components/LoginForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const LoginPage = () => {
  const [verificationEmailFormOpen, setVerificationEmailFormOpen] =
    useState(false);
  const [verifyCodeFormOpen, setVerifyCodeFormOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verifiedAccount, setVerifiedAccount] = useState("");

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
        {verifiedAccount === "verified" ? (
          <ResetPasswordForm
            verifiedEmailTextDisplay={verifiedAccount ? "flex" : "none"}
            verificationEmail={verificationEmail}
            setVerifiedAccount={setVerifiedAccount}
          />
        ) : (
          <LoginForm
            forgotPasswordClick={() => {
              setVerificationEmailFormOpen(true);
              setFailedLogin(false);
            }}
          />
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
      </div>
    </div>
  );
};

export default LoginPage;
