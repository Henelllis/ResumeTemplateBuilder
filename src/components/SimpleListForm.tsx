import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";

interface SimpleListFormProps {
  data: Array<string>;
  handleInputChange: (value: any) => void;
}

const SimpleListForm: React.FC<SimpleListFormProps> = ({
  data,
  handleInputChange,
}) => {
  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = [...data];
    newItems[index] = event.target.value;
    handleInputChange(newItems);
  };

  const handleAdd = () => {
    handleInputChange([...data, ""]);
  };

  const handleRemove = (index: number) => {
    const newItems = data.filter((_, i) => i !== index);
    handleInputChange(newItems);
  };

  return (
    <Container>
      {data.map((item, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={`Item ${index + 1}`}
              value={item}
              onChange={(e: any) => handleChange(index, e)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Item
      </Button>
    </Container>
  );
};

export default SimpleListForm;
