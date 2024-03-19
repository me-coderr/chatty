import React, { useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../../Components/Miscellaneous/SideDrawer";
import MyChats from "../../Components/Miscellaneous/MyChats";
import ChatBox from "../../Components/Miscellaneous/ChatBox";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { user } = ChatState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("hello from /chats route");
  //   console.log(user);
  //   console.log("-------------");
  // }, []);

  const waitTimer = async (time) => {
    const timer = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
    console.log("Started waiting");
    await timer;
  };

  useEffect(() => {
    const handleBeforeUnload = async (e) => {
      e.preventDefault();
      // console.log("hello as you refreshed");
      navigate("/");
      // e.returnValue = "Are you sure?";
      // await waitTimer(3000);
      // window.confirm("Are you sure?");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
