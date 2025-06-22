import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Colors } from "../src/assets/Colors";
import { FormControl } from "@mui/material";

const SearchBar = ({ value, onChange, options, label, width, disabled }) => {
  return (
    <Autocomplete
      disabled={disabled}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      disablePortal
      options={options}
      sx={{
        borderRadius: "5px",
        backgroundColor: "white",
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
