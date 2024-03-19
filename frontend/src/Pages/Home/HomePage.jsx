import React, { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../../Components/Authentication/Login";
import Signup from "../../Components/Authentication/Signup";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = ChatState();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));

    if (userData) {
      // console.log("\n\n\nin use effect of home page after logging in\n\n\n");
      setUser(userData);
      navigate("/chats");
    }
  }, [navigate, user]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily={"work sans"} color={"black"}>
          Chatty
        </Text>
      </Box>
      <Box
        bg={"white"}
        color={"black"}
        w={"100%"}
        p={4}
        borderRadius={"1g"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
