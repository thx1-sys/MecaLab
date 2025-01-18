import React from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  Autocomplete,
} from "@mui/material";
import { motion } from "framer-motion";

const AutocompleteField = ({
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
          "& .MuiFormHelperText-root": {
            color: "white",
          },
        }}
      >
        <Autocomplete
          id={id}
          options={options}
          getOptionLabel={(option) => option.label || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              sx={{ color: "white" }}
            />
          )}
          value={value}
          onChange={(event, newValue) =>
            onChange(newValue || { value: "", label: "" })
          }
          PaperComponent={({ children }) => (
            <div
              style={{
                backdropFilter: "blur(10px)",
                background:
                  "linear-gradient(to bottom, rgba(217, 217, 217, 0.1), rgba(115, 115, 115, 0.2))",
                border: "1px solid #999999",
                borderRadius: "8px",
                color: "white", // Asegúrate de que el color del texto sea blanco
              }}
            >
              {children}
            </div>
          )}
          sx={{
            "& .MuiAutocomplete-inputRoot": {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: "white",
            },
            "& .MuiAutocomplete-clearIndicator": {
              color: "white",
            },
            "& .MuiAutocomplete-option": {
              bgcolor: "transparent",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
              "&[aria-selected='true']": {
                bgcolor: "rgba(255, 255, 255, 0.2) !important",
                color: "white",
              },
            },
            "& .MuiAutocomplete-noOptions": {
              color: "white",
            },
            "&::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "4px",
            },
          }}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </motion.div>
  );
};

export default AutocompleteField;
