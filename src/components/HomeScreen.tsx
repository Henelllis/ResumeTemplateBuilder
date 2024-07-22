import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import BlueprintIcon from "@mui/icons-material/Architecture";
import DocumentIcon from "@mui/icons-material/Description";

const HomeScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
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
          >
            <CardContent>
              <BlueprintIcon sx={{ fontSize: 100, color: "blue" }} />
              <Typography variant="h5" component="div" textAlign={"center"}>
                Templates
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
          >
            <CardContent>
              <DocumentIcon sx={{ fontSize: 100, color: "black" }} />
              <Typography variant="h5" component="div">
                Resumes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
