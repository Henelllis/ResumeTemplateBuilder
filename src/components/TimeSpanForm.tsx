import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import { BlockDescriptor, Entry } from "../types";

interface TimeSpanFormProps {
  data: Entry[];
  handleInputChange: (value: any) => void;
}

const TimeSpanForm: React.FC<TimeSpanFormProps> = ({
  data,
  handleInputChange,
}) => {
  const handleChange = (
    index: number,
    field: keyof Entry,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    handleInputChange(newData);
  };

  const handleAdd = () => {
    handleInputChange([
      {
        title: "",
        establishment: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    handleInputChange(newData);
  };

  console.log("THIS IS WHAT THE DATA LOOKS LIKE", data);

  return (
    <Container>
      {data.map((item, index) => (
        <Grid container spacing={2} key={index}>
          {Object.keys(item).map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={item[field as keyof Entry]}
                onChange={(e: any) =>
                  handleChange(index, field as keyof Entry, e)
                }
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs={12}>
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
        Add Entry
      </Button>
    </Container>
  );
};

export default TimeSpanForm;
