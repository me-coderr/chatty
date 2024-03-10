import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const { user, chats, selectedChat, fetchAgain, setFetchAgain } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", nd: "flex" }}
      w={{ base: "100%", md: "68%" }}
      height={"100%"}
      overflow={"hidden"}
      alignItems={"center"}
      flexDir={"column"}
      p={3}
      bg={"white"}
      borderRadius={"1g"}
      borderWidth={"1px"}
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
