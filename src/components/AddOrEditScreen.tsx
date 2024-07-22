import React, { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppContext } from "../store/AppContext";
import { SCREEN } from "../types";

const AddOrEditScreen: React.FC = () => {
  const { screen, setScreen, setTemplateToUse } = useContext(AppContext);

  let title = "";

  if (screen === "TEMPLATE_ADD_OR_EDIT") {
    title = "TEMPLATES";
  }

  if (screen === "RESUME_FILLING_ADD_OR_EDIT") {
    title = "RESUMES";
  }

  const handleBackClick = () => {
    // Implement the back navigation logic here
    // For example, you could set the screen to a previous state or navigate to a different page
    setScreen(SCREEN.HOME); // Replace with appropriate screen or navigation action
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
      }}
      flexDirection={"column"}
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

      <Typography variant="h3" component="div" textAlign={"center"}>
        {title}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Card
            sx={{
              minWidth: 275,
              minHeight: 275,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
            }}
            onClick={() => {
              if (screen === "TEMPLATE_ADD_OR_EDIT") {
                setScreen(SCREEN.TEMPLATE_BUILDER);
                setTemplateToUse(null);
              }

              if (screen === "RESUME_FILLING_ADD_OR_EDIT") {
                setScreen(SCREEN.TEMPLATE_TO_CHOOSE_FOR_FILLING);
              }
            }}
          >
            <CardContent>
              <AddIcon sx={{ fontSize: 100, color: "blue" }} />
              <Typography variant="h5" component="div" textAlign={"center"}>
                Add
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              minWidth: 275,
              minHeight: 275,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
            }}
            onClick={() => {
              if (screen === "TEMPLATE_ADD_OR_EDIT") {
                setScreen(SCREEN.TEMPLATES_TO_EDIT);
                return;
              }

              if (screen === "RESUME_FILLING_ADD_OR_EDIT") {
                setScreen(SCREEN.RESUME_TO_EDIT);
                return;
              }
            }}
          >
            <CardContent>
              <EditIcon sx={{ fontSize: 100, color: "black" }} />
              <Typography variant="h5" component="div">
                EDIT
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddOrEditScreen;
