import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { CustomFetch } from "../constants/config";

const ForgetPassword = () => {
  const [submit, isSubmit] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await CustomFetch.post("/user/forgetPassword", {
        email,
      });
      console.log(response);
      isSubmit(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensure full viewport height
      }}
    >
      {submit ? (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4">Thank you</Typography>
          <Typography variant="body1">Please check your email</Typography>
          <div>
            <Link to="/login">
              <Button variant="contained" color="secondary">
                Back
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            className="capitalize font-bold text-gray-600 mb-8"
          >
            You will get an Email
          </Typography>
          <div className="flex justify-center items-center pb-20">
            <Typography
              htmlFor="resetpassword"
              variant="subtitle1"
              className="capitalize font-bold text-gray-600 mr-4"
            >
              Enter your Email:
            </Typography>
            <TextField
              type="email"
              name="email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Send Email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
