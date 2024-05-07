import React from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export const AddBookModal = ({
  isOpen,
  onClose,
  bookDetails,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text>Book Id:</Text>
            <Input
              name="book_id"
              value={bookDetails?.book_id}
              onChange={handleInputChange}
              placeholder="Enter Book Id"
            />
          </Box>
          <Box mb={4}>
            <Text>Title:</Text>
            <Input
              name="title"
              value={bookDetails?.title}
              onChange={handleInputChange}
              placeholder="Enter title"
            />
          </Box>
          <Box mb={4}>
            <Text>Vendor:</Text>
            <Input
              name="vendor"
              value={bookDetails?.vendor}
              onChange={handleInputChange}
              placeholder="Enter vendor"
            />
          </Box>
          <Box mb={4}>
            <Text>Language:</Text>
            <Input
              name="language"
              value={bookDetails?.language}
              onChange={handleInputChange}
              placeholder="Enter language"
            />
          </Box>
          <Box mb={4}>
            <Text>Publication:</Text>
            <Input
              name="publication"
              value={bookDetails?.publication}
              onChange={handleInputChange}
              placeholder="Enter publication"
            />
          </Box>
          <Box mb={4}>
            <Text>Shelf Name:</Text>
            <Input
              name="shelf_name"
              value={bookDetails?.shelf_name}
              onChange={handleInputChange}
              placeholder="Enter shelf name"
            />
          </Box>
          <Box mb={4}>
            <Text>Available Copies:</Text>
            <Input
              type="number"
              name="available_copies"
              value={bookDetails?.available_copies}
              onChange={handleInputChange}
              placeholder="Enter available copies"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSubmit}>
            Add
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
