import { useContext, useEffect, useState } from "react";
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
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { BlockDescriptor } from "../types";
import { AppContext } from "../store/AppContext";

const SectionConfig = ({
  blockDescriptor,
}: {
  blockDescriptor: BlockDescriptor;
}) => {
  const [formValues, setFormValues] = useState({
    fontSize: 15,
    fontType: "Arial",
    colorScheme: "Light",
    margin: 0,
  });

  const { templateToUse } = useContext(AppContext);

  const { currentWorkingTemplate, setCurrentWorkingTemplate } = useContext(
    TemplateBuilderContext
  );

  useEffect(() => {
    if (templateToUse) {
      const block = templateToUse.styles[blockDescriptor];
      if (block) {
        if (currentWorkingTemplate) {
          let stylesInUse = currentWorkingTemplate[blockDescriptor];

          console.log("Styles in use", stylesInUse);

          if (
            block.fontSize !== stylesInUse.fontSize ||
            block.fontType !== stylesInUse.fontType ||
            block.colorScheme !== stylesInUse.colorScheme ||
            block.margin !== stylesInUse.margin
          ) {
            console.log("Setting form values from current working template");
            setFormValues({
              fontSize: stylesInUse.fontSize,
              fontType: stylesInUse.fontType,
              colorScheme: stylesInUse.colorScheme,
              margin: stylesInUse.margin,
            });
          } else {
            console.log("Setting form values from template to use");

            setFormValues({
              fontSize: block.fontSize,
              fontType: block.fontType,
              colorScheme: block.colorScheme,
              margin: block.margin,
            });
          }
        }
      }
    }
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });

    if (!currentWorkingTemplate) return;

    setCurrentWorkingTemplate({
      template: {
        ...currentWorkingTemplate,
        [blockDescriptor]: {
          ...formValues,
          [name]: type === "checkbox" ? checked : value,
        },
      },
    });
  };

  const handleSliderChange = (name: any) => (event: any, newValue: any) => {
    setFormValues({
      ...formValues,
      [name]: newValue,
    });

    if (!currentWorkingTemplate) return;

    setCurrentWorkingTemplate({
      template: {
        ...currentWorkingTemplate,
        [blockDescriptor]: {
          ...formValues,
          [name]: newValue,
        },
      },
    });
  };

  return (
    <Box component="form" sx={{ mt: 3, padding: 5 }}>
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
          <MenuItem value="Light">Light</MenuItem>
          <MenuItem value="Dark">Dark</MenuItem>
          <MenuItem value="Blue">Blue</MenuItem>
          <MenuItem value="Green">Green</MenuItem>
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
      {blockDescriptor === BlockDescriptor.header && (
        <div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="background-image-upload"
            type="file"
            onChange={() => {}}
          />
          <label htmlFor="background-image-upload">
            <Button variant="contained" color="primary" component="span">
              Add Background Image
            </Button>
          </label>
        </div>
      )}
      {blockDescriptor === BlockDescriptor.document && (
        <div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="background-image-upload"
            type="file"
            onChange={() => {}}
          />
          <label htmlFor="background-image-upload">
            <Button variant="contained" color="primary" component="span">
              Add WaterMark Image
            </Button>
          </label>
        </div>
      )}
    </Box>
  );
};

export default SectionConfig;
