import React from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import logo from "../../Resources/logo.png";
import { Search } from "../SearchBar/index.jsx";
import { useState } from "react";
import { ApiService } from "../../Services/datasetAPIService.js";
import { StudentDetailsModal } from "../StudentDetailsModal/index.jsx";

export const Appbar = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await ApiService.students.getAll();
      const filteredStudent = response.filter(
        (student) => student.adm_number === searchQuery
      );
      setStudentDetails(filteredStudent.length > 0 ? filteredStudent[0] : null);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        alignItems="center"
        p="4"
        width="100%"
        height={"80px"}
        bg="primary.lightest"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      >
        <Flex justifyContent={"flex-start"} align={"center"} gap={"2"}>
          <Box h="80px" p={2} pl={0}>
            <Image cursor="pointer" w="100%" h="100%" src={logo} />
          </Box>
          <Text variant={"body1semiBold"}>Library Management System</Text>
        </Flex>

        <Box w="35%" alignSelf={"right"}>
          <Search
            placeholder={`Search by Student ID`}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
      </Flex>
      <StudentDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        studentDetails={studentDetails}
      />
    </>
  );
};
