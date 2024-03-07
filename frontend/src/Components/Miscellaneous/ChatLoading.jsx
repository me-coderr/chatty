import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
      <Skeleton height={"40px"}></Skeleton>
    </Stack>
  );
};

export default ChatLoading;
