import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Container } from "@mui/material";
import { CustomFetch } from "../constants/config";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOTP] = useState("");

  const handleChange = (event) => {
    setOTP(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Verifying OTP...");

    try {
      const response = await CustomFetch.post(`user/verify-otp`, {
        userId: id,
        otp,
      });
      navigate("/login");
      toast.success("OTP verification successful", { id: toastId });
    } catch (error) {
      toast.error("OTP verification failed", { id: toastId });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          OTP Verification
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="otp"
                label="Enter OTP"
                name="otp"
                autoFocus
                value={otp}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default OTPVerificationPage;
