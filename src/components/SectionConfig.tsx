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
  const [formValues, setFormValues] = useState<{
    fontSize?: number;
    fontType?: string;
    colorScheme?: string;
    margin?: number;
  }>({
    fontSize: undefined,
    fontType: undefined,
    colorScheme: undefined,
    margin: undefined,
  });

  const { templateToUse } = useContext(AppContext);

  const { currentWorkingTemplate, setCurrentWorkingTemplate } = useContext(
    TemplateBuilderContext
  );

  useEffect(() => {
    console.log("IN USE EFFECT OF SECTION CONFIG");
    if (templateToUse) {
      console.log("WE HAVE TO TEMPLATE TO USE");

      const block = templateToUse.styles[blockDescriptor];
      if (block) {
        if (currentWorkingTemplate) {
          let stylesInUse = currentWorkingTemplate[blockDescriptor];

          console.log("stylesInUse", JSON.stringify(stylesInUse, null, 2));
          console.log("block", JSON.stringify(block, null, 2));

          let fontSize = undefined;
          if (stylesInUse.fontSize) {
            fontSize = stylesInUse.fontSize;
          }

          let fontType = undefined;
          if (stylesInUse.fontType) {
            fontType = stylesInUse.fontType;
          }

          let colorScheme = undefined;
          if (stylesInUse.colorScheme) {
            colorScheme = stylesInUse.colorScheme;
          }

          let margin = undefined;
          if (stylesInUse.margin) {
            margin = stylesInUse.margin;
          }

          setFormValues({
            fontSize: fontSize,
            fontType: fontType,
            colorScheme: colorScheme,
            margin: margin,
          });
        } else {
          console.log("IN ELSE STATEMENT OF BLOCK", block);
          setFormValues({
            fontSize: block.fontSize,
            fontType: block.fontType,
            colorScheme: block.colorScheme,
            margin: block.margin,
          });
        }
      }
    } else {
      console.log("NO TEMPLATE TO USE");
      if (currentWorkingTemplate) {
        console.log("CURRENT WORKING TEMPLATE", currentWorkingTemplate);

        console.log("BLOCK DESCRIPTOR", blockDescriptor);
        const block = currentWorkingTemplate[blockDescriptor];

        console.log("CURRENT WORKING TEMPLATE BLOCK", block);

        if (block) {
          if (currentWorkingTemplate) {
            let stylesInUse = currentWorkingTemplate[blockDescriptor];

            console.log("stylesInUse", JSON.stringify(stylesInUse, null, 2));
            console.log("block", JSON.stringify(block, null, 2));

            let fontSize = undefined;
            if (stylesInUse.fontSize) {
              fontSize = stylesInUse.fontSize;
            }

            let fontType = undefined;
            if (stylesInUse.fontType) {
              fontType = stylesInUse.fontType;
            }

            let colorScheme = undefined;
            if (stylesInUse.colorScheme) {
              colorScheme = stylesInUse.colorScheme;
            }

            let margin = undefined;
            if (stylesInUse.margin) {
              margin = stylesInUse.margin;
            }

            console.log("SETTING FORM VALUES", {
              fontSize: fontSize,
              fontType: fontType,
              colorScheme: colorScheme,
              margin: margin,
            });

            setFormValues({
              fontSize: fontSize,
              fontType: fontType,
              colorScheme: colorScheme,
              margin: margin,
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

  console.log("FORM VALUES", formValues);

  if (!formValues.colorScheme) {
    console.log("NO COLOR SCHEME");
  }

  return (
    <Box component="form" sx={{ mt: 3, padding: 5 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Font Type</InputLabel>
        <Select
          name="fontType"
          value={formValues.fontType || "Arial"}
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
          value={formValues.fontSize || 12}
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
          value={formValues.colorScheme || "Light"}
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
          value={formValues.margin || 0}
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
