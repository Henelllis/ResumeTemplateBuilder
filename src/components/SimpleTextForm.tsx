import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

interface SimpleTextFormProps {
  data: string;
  handleInputChange: (value: any) => void;
}

const SimpleTextForm: React.FC<SimpleTextFormProps> = ({
  data,
  handleInputChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event.target.value);
  };

  return (
    <Container>
      <TextField
        fullWidth
        label="Enter text"
        value={data}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
      />
    </Container>
  );
};

export default SimpleTextForm;
