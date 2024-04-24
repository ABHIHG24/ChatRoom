import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, TextField, Typography } from "@mui/material";
import { CustomFetch } from "../constants/config";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error("Password and re-entered password do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should contain at least 8 characters");
      return;
    }

    try {
      const response = await CustomFetch.put(
        `/user/resetPassword/${token}`,
        data
      );
      console.log(response.data);
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Password reset unsuccessful");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Reset Your Password
      </Typography>
      <TextField
        id="password"
        name="password"
        label="Enter your new password"
        type="password"
        variant="outlined"
        value={data.password}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        label="Re-enter your new password"
        type="password"
        variant="outlined"
        value={data.confirmPassword}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Change Password
      </Button>
    </Container>
  );
};

export default ResetPassword;
