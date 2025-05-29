import "./App.css";
import Buttons from "../components/Buttons";
import Logo from "../components/Logo";
import InputFields from "../components/InputFields";
import DropDownButton from "../components/DropDownButton";

function App() {
  return (
    <>
      <Buttons
        padding={"5px"}
        variant={"contained"}
        color={"white"}
        fontWeight={"bold"}
        content={"Log In"}
        width={"200px"}
      />

      <Logo width="800px" />
      <InputFields
        label={"Email"}
        variant={"outlined"}
        width={"300px"}
        size="small"
        color="#1CA89E"
      />
      <DropDownButton />
    </>
  );
}

export default App;
