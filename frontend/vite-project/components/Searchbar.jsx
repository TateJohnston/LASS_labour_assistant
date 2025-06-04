import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Colors } from "../src/assets/Colors";

const SearchBar = ({ value, onChange, options, label, width }) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      disablePortal
      options={options}
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          "& fieldset": {
            borderColor: Colors.secondary,
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: Colors.secondary,
          },
          "&.Mui-focused fieldset": {
            borderColor: Colors.secondary,
          },
        },
        "& label": {
          color: "#666",
        },
        "& label.Mui-focused": {
          color: Colors.secondary,
        },
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default SearchBar;
