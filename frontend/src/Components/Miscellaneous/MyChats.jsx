import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();
  const toast = useToast();

  const fetchChats = () => {};

  return <></>;
};

export default MyChats;
