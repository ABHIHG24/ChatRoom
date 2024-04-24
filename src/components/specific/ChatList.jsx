import { Box, Stack, Typography } from "@mui/material";
import ChatItem from "../shared/ChatItem";
const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats.length === 0 ? (
        <Box textAlign="center" py={2}>
          <Typography variant="body1" color="textSecondary">
            No Friends?
          </Typography>
        </Box>
      ) : (
        chats?.map((data, index) => {
          const { _id, name, avatar, groupChat, members } = data;

          const newMessagesAlertForChat = newMessagesAlert.find(
            (alert) => alert.chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );

          return (
            <div key={_id}>
              <ChatItem
                index={index}
                newMessagesAlert={newMessagesAlertForChat}
                isOnline={isOnline}
                avatar={avatar}
                name={name}
                _id={_id}
                key={_id}
                groupChat={groupChat}
                sameSender={chatId === _id}
                handleDeleteChat={handleDeleteChat}
              />
            </div>
          );
        })
      )}
    </Stack>
  );
};

export default ChatList;
