import { TextField } from "@mui/material";

const InputFields = ({
  id,
  label,
  variant,
  helperText,
  defaultValue,
  color,
  border = "1px solid #1CA89E ",
  onChange,
  width,
  size,
}) => {
  return (
    <TextField
      onChange={onChange}
      id={id}
      label={label}
      variant={variant}
      helperText={helperText}
      defaultValue={defaultValue}
      size={size}
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          borderRadius: "5px",
          "& fieldset": {
            borderColor: "#1CA89E",
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: "#1CA89E",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1CA89E",
          },
        },
        "& label": {
          color: "#666",
        },
        "& label.Mui-focused": {
          color: "#1CA89E",
        },
      }}
    />
  );
};

export default InputFields;
