import React, { useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { motion } from "framer-motion";
import "./DurationInputField.css"; // Importa el archivo CSS

const DurationInputField = ({
  label,
  name,
  id,
  value,
  onChange,
  error,
  delay,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => !value && setIsFocused(false);

  const parseDuration = (durationValue) => {
    const parsed = parseInt(durationValue, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const incrementDuration = () => {
    const current = parseDuration(value);
    if (current < 4) {
      onChange({ target: { value: current + 1 } });
    }
  };

  const decrementDuration = () => {
    const current = parseDuration(value);
    if (current > 0) {
      onChange({ target: { value: current - 1 } });
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
        error={Boolean(error)}
        variant="outlined"
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
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
          name={name}
          type="number"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          label={label}
          inputRef={inputRef}
          inputProps={{ min: 0, max: 4 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={incrementDuration}>
                <KeyboardArrowUp sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={decrementDuration}>
                <KeyboardArrowDown sx={{ color: "white" }} />
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

export default DurationInputField;
