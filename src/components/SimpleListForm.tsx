import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";

const SimpleListForm: React.FC = () => {
  const [items, setItems] = useState<string[]>([""]);

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newItems = [...items];
    newItems[index] = event.target.value;
    setItems(newItems);
  };

  const handleAdd = () => {
    setItems([...items, ""]);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Simple List Form
      </Typography>
      {items.map((item, index) => (
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
