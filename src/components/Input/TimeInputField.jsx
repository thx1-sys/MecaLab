import React, { useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { motion } from "framer-motion";

const TimeInputField = ({ label, name, id, value, onChange, error, delay }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState(false);
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

  const validateTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours >= 8 && hours <= 20;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (validateTime(newValue)) {
      setLocalError(false);
      onChange(e);
    } else {
      setLocalError(true);
    }
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
        error={Boolean(error) || localError}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": {
              borderColor: localError ? "red" : "white",
            },
            "&:hover fieldset": {
              borderColor: localError ? "red" : "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: localError ? "red" : "white",
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
          "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
            {
              "-webkit-appearance": "none",
              margin: 0,
            },
          "& input[type=number]": {
            "-moz-appearance": "textfield",
          },
        }}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          id={id}
          type="time"
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          label={label}
          inputRef={inputRef}
          inputProps={{ min: "08:00", max: "20:00" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <AccessTime sx={{ color: "white" }} />
              </IconButton>
            </InputAdornment>
          }
          sx={{ color: isFocused || value ? "white" : "transparent" }}
        />
        {(error || localError) && (
          <FormHelperText>
            {error || "La hora debe estar entre 08:00 y 20:00"}
          </FormHelperText>
        )}
      </FormControl>
    </motion.div>
  );
};

export default TimeInputField;
