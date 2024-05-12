import React from "react";
import { Overview as OverviewContainer } from "../../Containers/index.js";
import { Flex } from "@chakra-ui/react";

export const Overview = () => {
  return (
    <Flex w="100%" h="100%">
      <OverviewContainer />
    </Flex>
  );
};
