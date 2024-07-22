import { useState } from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Slider,
  Box,
} from "@mui/material";

const SectionConfig = () => {
  const [formValues, setFormValues] = useState({
    fontSize: 14,
    fontType: "Arial",
    colorScheme: "light",
    margin: 1,
  });

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSliderChange = (name: any) => (event: any, newValue: any) => {
    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form Values:", formValues);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, padding: 5 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Font Type</InputLabel>
        <Select
          name="fontType"
          value={formValues.fontType}
          onChange={handleInputChange}
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
          <MenuItem value="Verdana">Verdana</MenuItem>
          <MenuItem value="Tahoma">Tahoma</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography gutterBottom>Font Size</Typography>
        <Slider
          name="fontSize"
          value={formValues.fontSize}
          onChange={handleSliderChange("fontSize")}
          step={1}
          min={10}
          max={20}
          valueLabelDisplay="auto"
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Override Color</InputLabel>
        <Select
          name="colorScheme"
          value={formValues.colorScheme}
          onChange={handleInputChange}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="green">Green</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography gutterBottom>Margin</Typography>
        <Slider
          name="margin"
          value={formValues.margin}
          onChange={handleSliderChange("margin")}
          step={0.1}
          min={0.5}
          max={2}
          valueLabelDisplay="auto"
        />
      </FormControl>

      <Button variant="contained" color="primary" type="submit">
        Save Customization
      </Button>
    </Box>
  );
};

export default SectionConfig;
