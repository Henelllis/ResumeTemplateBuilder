import React, { ChangeEvent } from "react";
import { TextField, Container, Grid } from "@mui/material";

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

interface ContactInfoFormProps {
  data: ContactInfo;
  handleInputChange: (value: any) => void;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  data,
  handleInputChange,
}) => {
  const handleLocalInputChange = (
    field: keyof ContactInfo,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange({
      ...data,
      [field]: event.target.value,
    });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {data.toggleEmail && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={data.email}
              onChange={(e: any) => handleLocalInputChange("email", e)}
              variant="outlined"
              margin="normal"
              disabled={!data.toggleEmail}
            />
          </Grid>
        )}
        {data.togglePhone && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              value={data.phone}
              onChange={(e: any) => handleLocalInputChange("phone", e)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        )}
        {data.toggleAddress && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={data.address}
              onChange={(e: any) => handleLocalInputChange("address", e)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        )}
        {data.toggleLinkedIn && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="LinkedIn"
              value={data.linkedIn}
              onChange={(e: any) => handleLocalInputChange("linkedIn", e)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ContactInfoForm;
