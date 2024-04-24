import { Stack, Avatar, Typography, Button } from "@mui/material";
import {
  Email,
  CalendarMonth,
  VerifiedUser,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const joinedDate = moment(user?.createdAt).fromNow();
  return (
    <Stack spacing={"1rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard
        heading={"Username"}
        text={user?.username || "Not available"}
        Icon={VerifiedUser}
      />
      <ProfileCard
        heading={"Name"}
        text={user?.name}
        Icon={DriveFileRenameOutline}
      />

      <ProfileCard heading={"Gmail"} text={user?.email} Icon={Email} />

      <ProfileCard heading={"Joined"} text={joinedDate} Icon={CalendarMonth} />
      <Link
        to="/update-profile"
        style={{ textDecoration: "none", marginLeft: 10 }}
      >
        <Button variant="contained" color="warning">
          Edit Profile
        </Button>
      </Link>
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && <Icon />}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
export default Profile;
