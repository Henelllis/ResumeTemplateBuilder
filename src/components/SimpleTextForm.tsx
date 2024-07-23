import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const SimpleTextForm: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted Text:", inputText);
    // Handle form submission logic here
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Simple Input Form
      </Typography>
      <TextField
        fullWidth
        label="Enter text"
        value={inputText}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "1rem" }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default SimpleTextForm;
