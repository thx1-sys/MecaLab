import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { motion } from "framer-motion";

const SelectField = ({
  label,
  name,
  id,
  value,
  onChange,
  options,
  error,
  delay,
}) => {
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
          "& .MuiSelect-icon": {
            color: "white",
          },
          "& .MuiFormHelperText-root": {
            color: "white",
          },
        }}
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          label={label}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "transparent",
                backdropFilter: "blur(10px)",
                background:
                  "linear-gradient(to bottom, rgba(217, 217, 217, 0.1), rgba(115, 115, 115, 0.2))",
                border: "1px solid #999999",
                borderRadius: "8px",
                "& .MuiMenuItem-root": {
                  bgcolor: "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.2) !important",
                },
                "& .MuiMenu-list": {
                  maxHeight: 200, // Adjust the max height as needed
                  overflowY: "auto",
                  paddingRight: "0.2rem",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    borderRadius: "4px",
                  },
                },
              },
            },
          }}
          sx={{ color: "white" }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ color: option.value === "" ? "gray" : "white" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </motion.div>
  );
};

export default SelectField;
