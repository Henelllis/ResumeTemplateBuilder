import React, { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CardMedia,
  IconButton,
} from "@mui/material";
import BlueprintIcon from "@mui/icons-material/Architecture";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppContext } from "../store/AppContext";
import { TemplateBuilderContext } from "../store/TemplateBuilderContext";
import { Resume, SCREEN, Template } from "../types";
import { BlockContext } from "../store/blockContext";
import { ResumeFillingContext } from "../store/ResumeFillingContext";

const SelectionGrid: React.FC = () => {
  const { screen, setScreen, setTemplateToUse } = useContext(AppContext);
  const { templates, setMode } = useContext(TemplateBuilderContext);
  const { resumes, setTemplateData } = useContext(ResumeFillingContext);

  let gridItems: Array<any> = [];

  let title = "";

  if (screen === SCREEN.TEMPLATES_TO_EDIT) {
    title = "Select a template to edit";
    gridItems = templates;
  } else if (screen === SCREEN.TEMPLATE_TO_CHOOSE_FOR_FILLING) {
    title = "Select a template for your Resume";
    gridItems = templates;
  } else if (screen === SCREEN.RESUME_TO_EDIT) {
    title = "Select a resume to edit";

    gridItems = resumes;
  }

  const handleBackClick = () => {
    if (screen === SCREEN.TEMPLATES_TO_EDIT) {
      setScreen(SCREEN.TEMPLATE_ADD_OR_EDIT);
    }

    if (screen === SCREEN.RESUME_TO_EDIT) {
      setScreen(SCREEN.RESUME_FILLING_ADD_OR_EDIT);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "text.primary",
        }}
        onClick={handleBackClick}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems={"center"}
        flexDirection="column"
      >
        <h1>{title}</h1>
        {gridItems.map((gridItem) => (
          <Grid item key={gridItem.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
              }}
              onClick={() => {
                if (screen === SCREEN.TEMPLATE_TO_CHOOSE_FOR_FILLING) {
                  setTemplateToUse(gridItem as Template);
                  setMode({ mode: "HTML_EDIT" });
                  setScreen(SCREEN.RESUME_FILLING);
                }

                if (screen === SCREEN.TEMPLATES_TO_EDIT) {
                  setTemplateToUse(gridItem as Template);
                  setScreen(SCREEN.TEMPLATE_BUILDER);
                }

                if (screen === SCREEN.RESUME_TO_EDIT) {
                  console.log(JSON.stringify(gridItem, null, 2));
                  setTemplateToUse((gridItem as Resume).template);
                  setTemplateData((gridItem as Resume).templateData);
                  setScreen(SCREEN.RESUME_FILLING);
                }
              }}
            >
              <CardMedia>
                <BlueprintIcon
                  sx={{ fontSize: 80, color: "gray", margin: 2 }}
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" component="div">
                  {gridItem.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {gridItem.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SelectionGrid;
