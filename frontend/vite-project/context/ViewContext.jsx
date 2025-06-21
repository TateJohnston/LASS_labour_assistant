import { createContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

export const ViewContext = createContext();

export const UserProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ViewContext.Provider
      value={{
        isMobile,
        isTablet,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
