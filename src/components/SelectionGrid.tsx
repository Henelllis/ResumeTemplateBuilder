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
import { SCREEN } from "../types";
import { BlockContext } from "../store/blockContext";

const SelectionGrid: React.FC = () => {
  const { screen, setScreen, setTemplateToUse } = useContext(AppContext);
  const { templates, setMode } = useContext(TemplateBuilderContext);

  let gridItems: any[] = [];

  if (
    screen === SCREEN.TEMPLATES_TO_EDIT ||
    screen === SCREEN.TEMPLATE_TO_CHOOSE_FOR_FILLING
  ) {
    gridItems = templates;
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

      <Grid container spacing={3} justifyContent="center">
        {gridItems.map((template) => (
          <Grid item key={template.id} xs={12} sm={6} md={4} lg={3}>
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
                  setTemplateToUse(template);
                  setMode({ mode: "HTML_EDIT" });
                  setScreen(SCREEN.RESUME_FILLING);
                }

                if (screen === SCREEN.TEMPLATES_TO_EDIT) {
                  setTemplateToUse(template);
                  setScreen(SCREEN.TEMPLATE_BUILDER);
                }

                if (screen === SCREEN.RESUME_TO_EDIT) {
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
                  {template.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.name}
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
