import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import { toast } from "react-toastify";
import { CustomFetch } from "../constants/config";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("Password and re-entered password do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password should contain at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await CustomFetch.put("user/password/update", data);
      toast.success("Password change successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error || "Password change unsuccessful");
      // console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
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
        Change Your Password
      </Typography>
      <TextField
        type="password"
        id="oldPassword"
        name="oldPassword"
        label="Enter your current password"
        value={data.oldPassword}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        type="password"
        id="newPassword"
        name="newPassword"
        label="Enter your new password"
        value={data.newPassword}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        label="Re-enter your new password"
        value={data.confirmPassword}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Change Password"}
        </Button>
        <Link to="/">
          <Button variant="contained" color="warning">
            Go to Profile
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default UpdatePassword;
