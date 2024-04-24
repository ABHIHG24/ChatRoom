import { Box, Stack, Typography } from "@mui/material";
import { StyledLink } from "../styles/StyledComponents";
import { memo } from "react";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessagesAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <StyledLink
      sx={{
        padding: 0,
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          position: "relative",
          color: sameSender ? "pink" : "unset",
          transition: "background-color 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: sameSender ? "black" : "lightgrey",
            color: sameSender ? "pink" : "red",
          },
        }}
      >
        <Stack direction={"row"}>
          <AvatarCard avatar={avatar} />

          <Stack direction={"column"} marginLeft={"1rem"}>
            <Typography>{name}</Typography>
            {newMessagesAlert && (
              <Typography color={"#43e898"}>
                {newMessagesAlert.count > 1
                  ? `+${newMessagesAlert.count} New Messages`
                  : `+${newMessagesAlert.count} New Message`}
              </Typography>
            )}
          </Stack>
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </Box>
    </StyledLink>
  );
};

export default memo(ChatItem);
