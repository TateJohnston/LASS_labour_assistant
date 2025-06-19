import "./App.css";
import LoginPage from "../Pages/LoginPage";
import EmployeePage from "../Pages/EmployeePage";
import AdminPage from "../Pages/AdminPage";
import { UserContext, UserProvider } from "../context/UserContext";
import { useContext } from "react";

function App() {
  // const DisplayAccount = () => {
  //   const { isAdmin, successfulLogin } = useContext(UserContext);
  //   if (!successfulLogin) {
  //     return <LoginPage />;
  //   } else {
  //     if (isAdmin) {
  //       return <AdminPage />;
  //     } else {
  //       return <EmployeePage />;
  //     }
  //   }
  // };

  return (
    <>
      <UserProvider>
        {/* <DisplayAccount /> */}
        <AdminPage />
      </UserProvider>
    </>
  );
}

export default App;
