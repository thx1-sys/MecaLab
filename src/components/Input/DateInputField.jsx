import React, { useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { motion } from "framer-motion";

const DateInputField = ({
  label,
  name,
  id,
  placeholder,
  value,
  onChange,
  error,
  delay,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleIconClick = () => {
    inputRef.current.focus();
    inputRef.current.showPicker();
  };

  return (
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
          "& input::-webkit-calendar-picker-indicator": {
            display: "none",
          },
        }}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          id={id}
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          label={label}
          placeholder={placeholder}
          inputRef={inputRef}
          inputProps={{
            min: "1900-01-01", // Set a minimum date
            max: "2100-12-31", // Set a maximum date
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <CalendarToday sx={{ color: "white" }} />
              </IconButton>
            </InputAdornment>
          }
          sx={{ color: isFocused || value ? "white" : "transparent" }}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </motion.div>
  );
};

export default DateInputField;
