import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  toggleAddress: boolean;
  toggleEmail: boolean;
  togglePhone: boolean;
  toggleLinkedIn: boolean;
}

const initialData: ContactInfo = {
  email: "",
  phone: "",
  address: "",
  linkedIn: "",
  toggleAddress: true,
  toggleEmail: true,
  togglePhone: true,
  toggleLinkedIn: false,
};

const ContactInfoForm: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialData);

  const handleInputChange = (
    field: keyof ContactInfo,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setContactInfo({
      ...contactInfo,
      [field]: event.target.value,
    });
  };

  const handleToggleChange = (
    field: keyof ContactInfo,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setContactInfo({
      ...contactInfo,
      [field]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Contact Info:", contactInfo);
    // Handle form submission logic here
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={contactInfo.toggleEmail}
                onChange={(e: any) => handleToggleChange("toggleEmail", e)}
              />
            }
            label="Email"
          />
          <TextField
            fullWidth
            label="Email"
            value={contactInfo.email}
            onChange={(e: any) => handleInputChange("email", e)}
            variant="outlined"
            margin="normal"
            disabled={!contactInfo.toggleEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={contactInfo.togglePhone}
                onChange={(e: any) => handleToggleChange("togglePhone", e)}
              />
            }
            label="Phone"
          />
          <TextField
            fullWidth
            label="Phone"
            value={contactInfo.phone}
            onChange={(e: any) => handleInputChange("phone", e)}
            variant="outlined"
            margin="normal"
            disabled={!contactInfo.togglePhone}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={contactInfo.toggleAddress}
                onChange={(e: any) => handleToggleChange("toggleAddress", e)}
              />
            }
            label="Address"
          />
          <TextField
            fullWidth
            label="Address"
            value={contactInfo.address}
            onChange={(e: any) => handleInputChange("address", e)}
            variant="outlined"
            margin="normal"
            disabled={!contactInfo.toggleAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={contactInfo.toggleLinkedIn}
                onChange={(e: any) => handleToggleChange("toggleLinkedIn", e)}
              />
            }
            label="LinkedIn"
          />
          <TextField
            fullWidth
            label="LinkedIn"
            value={contactInfo.linkedIn}
            onChange={(e: any) => handleInputChange("linkedIn", e)}
            variant="outlined"
            margin="normal"
            disabled={!contactInfo.toggleLinkedIn}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactInfoForm;
