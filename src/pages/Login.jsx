import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { CustomFetch } from "../constants/config";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import GoogleButton from "react-google-button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogin, setLogin] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const toggleButton = () => {
    setLogin(!isLogin);
  };

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

  const handleLogin = async (loginCredentials, e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);

    try {
      const { data } = await CustomFetch.post(`/user/login`, loginCredentials);
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (formData, e) => {
    e.preventDefault();

    const toastId = toast.loading("SignUp In...");

    const SignUpData = { ...formData, avatar: formData.avatar[0] };
    setIsLoading(formData.avatar);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await CustomFetch.post(`/user/new`, SignUpData, config);

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
      // window.location.reload();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong",

        {
          id: toastId,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:3000/auth/google/callback", "_self");
  };

  // const LogoutGoogle = () => {
  //   window.open("http://localhost:3000/auth/googleLogout", "_self");
  // };

  return isLogin ? (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "30vw",
          boxShadow: "-10px 10px 10px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 2, textAlign: "center" }}
        >
          Login Form
        </Typography>
        <TextField
          fullWidth
          label="Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          margin="normal"
          sx={{ mt: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={IsLoading}
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href="forget-password" variant="body2">
            Forgot Password?
          </Link>
          {/* <GoogleButton onClick={loginWithGoogle} /> */}
          <Box mt={1}>
            <Link
              href="#"
              variant="body2"
              onClick={toggleButton}
              disabled={IsLoading}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSignUp)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "30vw",
          boxShadow: "-10px 10px 10px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 2, textAlign: "center" }}
        >
          Register Form
        </Typography>
        <Stack position={"relative"} width={"10rem"} margin={"auto"}>
          <Avatar
            sx={{
              width: "10rem",
              height: "10rem",
              objectFit: "contain",
            }}
            src={selectedImage}
          />

          <IconButton
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              bgcolor: "rgba(0, 0, 0, 0.411)",
              ":hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
            component="label"
          >
            <>
              <CameraAltIcon />
              <VisuallyHiddenInput
                type="file"
                {...register("avatar")}
                onChange={handleImageChange}
              />
            </>
          </IconButton>
        </Stack>
        <TextField
          fullWidth
          label="Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 4,
              message: "Name must be at least 5 characters",
            },
          })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Bio"
          margin="normal"
          variant="outlined"
          {...register("bio", {
            required: "bio is required",
          })}
          error={Boolean(errors.username)}
          helperText={errors?.bio?.message}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          margin="normal"
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            minLength: {
              value: 6,
              message: "Confirm Password must be at least 6 characters",
            },
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          margin="normal"
          sx={{ mt: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={IsLoading}
        >
          Register
        </Button>
        <Box mt={1}>
          <Link
            href="#"
            variant="body2"
            onClick={toggleButton}
            disabled={IsLoading}
          >
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
