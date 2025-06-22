import "./App.css";
import LoginPage from "../Pages/LoginPage";
import EmployeePage from "../Pages/EmployeePage";
import AdminPage from "../Pages/AdminPage";
import { UserContext, UserProvider } from "../context/UserContext";
import { useContext } from "react";
import { SnackbarProvider } from "notistack";

const DisplayAccount = () => {
  const { isAdmin, successfulLogin } = useContext(UserContext);
  if (!successfulLogin) {
    return <LoginPage />;
  } else {
    if (isAdmin) {
      return <AdminPage />;
    } else {
      return <EmployeePage />;
    }
  }
};
function App() {
  return (
    <>
      <UserProvider>
        <SnackbarProvider autoHideDuration={6000} maxSnack={10}>
          <DisplayAccount />
        </SnackbarProvider>
      </UserProvider>
    </>
  );
}

export default App;
