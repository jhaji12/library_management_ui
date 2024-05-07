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
  Select,
  Text,
} from "@chakra-ui/react";

export const ReturnModal = ({
  isOpen,
  onClose,
  returnData,
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
        <ModalHeader>Return Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text>Book ID:</Text>
            <Input
              name="book_id"
              value={returnData?.book_id}
              onChange={handleInputChange}
              placeholder="Enter Book ID"
            />
          </Box>
          <Box mb={4}>
            <Text>Issuer ID:</Text>
            <Input
              name="issuer_id"
              value={returnData?.issuer_id}
              onChange={handleInputChange}
              placeholder="Enter Issuer ID"
            />
          </Box>
          <Box mb={4}>
            <Text>Is Student:</Text>
            <Select
              name="is_student"
              value={returnData?.is_student}
              onChange={handleInputChange}
              placeholder="Select Member Type"
            >
              <option value={true}>Student</option>
              <option value={false}>Faculty</option>
            </Select>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSubmit}>
            Return
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
