import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#2657a135",
      }}
    >
      <img
        src="https://png.pngtree.com/png-vector/20210702/ourlarge/pngtree-page-not-found-or-error-404-website-png-image_3545450.jpg"
        alt="Not Found"
        width={"400px"}
        height={"400px"}
      />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Page not Found
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        Sorry, the requested page could not be found.
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Go Back HOME
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
