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
  Select,
} from "@chakra-ui/react";

export const EditMemberModal = ({
  isOpen,
  onClose,
  memberDetails,
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
        <ModalHeader>Edit Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text>Member Type</Text>
            <Select
              name="member_type"
              value={memberDetails?.member_type}
              onChange={handleInputChange}
              placeholder="Select Member Type"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </Select>
          </Box>
          <Box mb={4}>
            <Text>Name:</Text>
            <Input
              name="name"
              value={memberDetails?.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </Box>
          {/* Render input for either admission number or faculty ID based on selected member type */}
          {memberDetails?.member_type === "student" && (
            <Box mb={4}>
              <Text>Admission Number:</Text>
              <Input
                name="adm_number"
                value={memberDetails?.adm_number}
                onChange={handleInputChange}
                placeholder="Enter admission number"
              />
            </Box>
          )}
          {memberDetails?.member_type === "faculty" && (
            <Box mb={4}>
              <Text>Faculty ID:</Text>
              <Input
                name="faculty_id"
                value={memberDetails?.faculty_id}
                onChange={handleInputChange}
                placeholder="Enter faculty ID"
              />
            </Box>
          )}
          {memberDetails?.member_type === "student" && (
            <Box mb={4}>
              <Text>Class</Text>
              <Input
                name="school_class"
                value={memberDetails?.school_class}
                onChange={handleInputChange}
                placeholder="Enter school_class"
              />
            </Box>
          )}
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
