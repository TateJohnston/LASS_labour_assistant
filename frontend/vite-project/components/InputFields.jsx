import { TextField } from "@mui/material";
import { Colors } from "../src/assets/Colors";

const InputFields = ({
  id,
  label,
  variant,
  helperText,
  defaultValue,
  onChange,
  width,
  size,
  InputProps,
  type,
  rows,
  multiline,
  maxRows,
}) => {
  return (
    <TextField
      {...(multiline && { multiline })}
      {...(rows && { rows })}
      {...(maxRows && { maxRows })}
      onChange={onChange}
      id={id}
      label={label}
      variant={variant}
      helperText={helperText}
      defaultValue={defaultValue}
      size={size}
      InputProps={InputProps}
      type={type}
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
    />
  );
};

export default InputFields;
