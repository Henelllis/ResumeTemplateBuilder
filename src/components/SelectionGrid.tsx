import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CardMedia,
} from "@mui/material";
import BlueprintIcon from "@mui/icons-material/Architecture";
import { AppContext } from "../store/AppContext";

const SelectionGrid: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {templates.map((template) => (
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
            >
              <CardMedia>
                <BlueprintIcon
                  sx={{ fontSize: 80, color: "gray", margin: 2 }}
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" component="div">
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
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
