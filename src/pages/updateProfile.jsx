import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { userExists } from "../redux/reducers/auth";
import { CustomFetch } from "../constants/config";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const toastId = toast.loading("Updating profile...");

    // Get the avatar file from form data
    const avatarFile = formData.get("avatar");

    // Convert formData to an object
    const newUser = Object.fromEntries(formData);

    // Construct the update data object with the avatar file
    const updateData = { ...newUser, avatar: avatarFile };

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await CustomFetch.put(
        "/user/me/update",
        updateData,
        config
      );
      dispatch(userExists(response.data.user));
      toast.success("Profile edit successful", { id: toastId });
      navigate("/");
    } catch (error) {
      toast.error("Profile edit unsuccessful", { id: toastId });
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { name, username, bio, email } = user;

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        placeItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ marginBottom: "4rem" }}>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Avatar
              sx={{
                width: 200,
                height: 200,
                margin: "auto",
                marginBottom: 2,
              }}
              src={selectedImage || user.avatar.url}
            />
            <input
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleImageChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              defaultValue={username}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="name"
              name="name"
              defaultValue={name}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              defaultValue={email}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="bio"
              name="bio"
              defaultValue={bio}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
            <Link to="/" style={{ textDecoration: "none", marginLeft: 10 }}>
              <Button variant="contained" color="warning">
                Back
              </Button>
            </Link>
            <Link
              to="/update-password"
              style={{ textDecoration: "none", marginLeft: 10 }}
            >
              <Button variant="contained" color="success">
                Change Password
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateProfile;
