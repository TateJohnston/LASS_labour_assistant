import { FormControl, InputLabel, Select, MenuItem, Menu } from "@mui/material";

const DropdownSelect = (
  onChange,
  value,
  description,
  menuItem,
  height,
  width
) => {
  return (
    <FormControl sx={{ m: 1, width }} variant="standard">
      <InputLabel>{description}</InputLabel>
      <Select value={value} onChange={onChange}>
        <MenuItem>{menuItem}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
