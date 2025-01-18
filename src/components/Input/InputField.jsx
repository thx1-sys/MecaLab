import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { motion } from "framer-motion";

const InputField = ({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  error,
  delay,
}) => (
  <motion.div
    className="col-span-2 sm:col-span-1"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    <FormControl
      fullWidth
      error={Boolean(error)}
      variant="outlined"
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px", // Adjust the border radius here
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#DFDFDE",
          "&.Mui-focused": {
            color: "#DFDFDE",
          },
        },
        "& .MuiFormHelperText-root": {
          color: "white",
        },
      }}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        sx={{ color: "white" }}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  </motion.div>
);

export default InputField;
