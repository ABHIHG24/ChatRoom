import AppLayout from "../components/layout/AppLayout";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box height={"100%"} bgcolor={"#45464a16"}>
      <Typography variant="h5" color="initial" p={"2rem"} textAlign={"center"}>
        Select a friend to Chat
      </Typography>
    </Box>
  );
};
export default AppLayout()(Home);
