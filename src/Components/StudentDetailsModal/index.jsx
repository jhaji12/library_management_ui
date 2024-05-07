import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export const StudentDetailsModal = ({ isOpen, onClose, studentDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Student Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {studentDetails ? (
            <Flex direction="column">
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Student ID: {studentDetails?.id}
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  Name: {studentDetails?.name}
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  Class: {studentDetails?.school_class}
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Issued Books:
                </Text>
                <Table variant="simple" mt={4}>
                  <Thead>
                    <Tr>
                      <Th>Book ID</Th>
                      <Th>Title</Th>
                      <Th>Author</Th>
                      <Th>Due Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {studentDetails?.books_issued?.map((book) => (
                      <Tr key={book.id}>
                        <Td>{book.bookId}</Td>
                        <Td>{book.title}</Td>
                        <Td>{book.author}</Td>
                        <Td>{book.dueDate}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Flex>
          ) : (
            <Text>No student details found.</Text>
          )}
        </ModalBody>
        <ModalFooter>{/* You can add buttons or actions here */}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
