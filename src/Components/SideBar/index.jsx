import React, { useState, useEffect } from "react";
import { Text, Flex, Icon, Button } from "@chakra-ui/react";
import { FaBook, FaUsers, FaChartBar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = ({ activeState, setActiveState, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      icon: FaChartBar,
      text: "Overview",
      link: "/overview",
    },
    {
      icon: FaBook,
      text: "Books",
      link: "/books",
    },
    {
      icon: FaUsers,
      text: "Members",
      link: "/members",
    },
  ];

  useEffect(() => {
    const currentPath =  location.pathname.split("/").pop() || "/overview";
    // Check if the current path is a valid menu link
    const isValidMenuLink = menus.some((menu) => menu.link === `/${currentPath}`);

    // Set active state only if the current path is a valid menu link
    if (isValidMenuLink) {
      setActiveState(`/${currentPath}`);
    } else {
      // If the current path is not a valid menu link, set it to the default
      setActiveState("/overview");
    }
  }, [location, menus]);

  return (
    <Flex
      minW="220px"
      h="calc(100vh - 80px)"
      direction="column"
      justifyContent="space-between"
      borderRight="1px dashed"
      borderColor="gray.200"
      bg="gray.50"
    >
      <Flex
        pt="2"
        direction="column"
        justify="flex-start"
        align="left"
        gap={4}
        h="100%"
      >
        {menus.map((menu, i) => (
          <Flex
            key={i}
            p={4}
            w="90%"
            bgColor="white"
            borderRightRadius="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="flex-start"
            onClick={() => {
              setActiveState(menu.link);
              navigate(menu.link);
            }}
            bg={activeState === menu.link ? "primary.lighter" : ""}
            boxShadow={
              activeState === menu.link
                ? "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                : ""
            }
            _hover={{
              bg: activeState !== menu.link ? "gray.200" : "",
            }}
          >
            <Icon
              as={menu.icon}
              mr="2"
              color={activeState === menu.link ? "primary.main" : "gray.600"}
            />
            <Text
              variant="body3semiBold"
              color={activeState === menu.link ? "primary.main" : "gray.600"}
            >
              {menu.text}
            </Text>
          </Flex>
        ))}
      </Flex>

      {/* <Image src={books} opacity="0.8" /> */}
      <Button w="50%" alignSelf="center" mb={8} onClick={() => handleLogout()}>
        Logout
      </Button>
    </Flex>
  );
};
