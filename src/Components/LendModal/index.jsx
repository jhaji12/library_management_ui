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

export const LendModal = ({
  isOpen,
  onClose,
  formData,
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
        <ModalHeader>Issue Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text>Book ID:</Text>
            <Input
              name="book_id"
              value={formData?.book_id}
              onChange={handleInputChange}
              placeholder="Enter Book ID"
            />
          </Box>
          <Box mb={4}>
            <Text>Issuer ID:</Text>
            <Input
              name="issuer_id"
              value={formData?.issuer_id}
              onChange={handleInputChange}
              placeholder="Enter Issuer ID"
            />
          </Box>
          <Box mb={4}>
            <Text>Is Student:</Text>
            <Select
              name="is_student"
              value={formData?.is_student}
              onChange={handleInputChange}
              placeholder="Select Member Type"
            >
              <option value={true}>Student</option>
              <option value={false}>Faculty</option>
            </Select>
          </Box>
          <Box mb={4}>
            <Text>Days:</Text>
            <Input
              name="days"
              type="number"
              value={formData?.days}
              onChange={handleInputChange}
              placeholder="Enter number of days for lending"
            />
          </Box>
          <Box mb={4}>
            <Text>Fine:</Text>
            <Input
              name="fine"
              type="number"
              value={formData?.fine}
              onChange={handleInputChange}
              placeholder="Enter the amount for overdue per day"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
