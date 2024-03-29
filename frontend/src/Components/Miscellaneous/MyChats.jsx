import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  Button,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
import { AddIcon } from "@chakra-ui/icons";
import { getSender } from "../../Config/ChatLogic";

const MyChats = () => {
  // const [loggedUser, setLoggedUser] = useState();
  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    user,
    fetchAgain,
    setFetchAgain,
  } = ChatState();
  const toast = useToast();

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "https://chatty-2ikm.onrender.com/api/chat",
        config
      );
      setChats(data);
    } catch (err) {
      toast({
        title: "Error occured!",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius={"1g"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "20px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        color={"black"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"1g"}
        overflowY={"hidden"}
      >
        {chats ? (
          <>
            <Stack overflowY={"scroll"}>
              {chats?.map((chat) => {
                return (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor={"pointer"}
                    _hover={{ background: "#38B2AC", color: "white" }}
                    bg={selectedChat === chat ? "green" : "grey"}
                    color={selectedChat === chat ? "white" : "black"}
                    w={"100%"}
                    px={3}
                    py={2}
                    key={chat._id}
                    display={"flex"}
                    justifyContent={"start"}
                    width={"96%"}
                    borderRadius={"10px"}
                  >
                    <Box>
                      <Text>
                        {!chat.isGroupChat
                          ? // ? getSender(loggedUser, chat.users)
                            getSender(user, chat.users)
                          : chat.chatName}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
