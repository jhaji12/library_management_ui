import React from "react";
import {
  Flex,
  Text,
  Icon,
  Box,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import {
  Card,
  OverdueBooksTable,
  LendModal,
  ReturnModal,
} from "../../Components/index.js";
import { FaFileExport } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ApiService } from "../../Services/datasetAPIService.js";

export const Overview = () => {
  const toast = useToast();
  const [lendModal, setLendModal] = useState({ open: false, data: null });
  const [returnModal, setReturnModal] = useState({ open: false, data: null });
  const [issuedlist, setIssuedlist] = useState([]);
  const [totalOverdueBooks, setTotalOverdueBooks] = useState(0); // State for total overdue books
  const [totalMembers, setTotalMembers] = useState(0); // State for total members

  const [formData, setFormData] = useState({
    book_id: "",
    issuer_id: "",
    is_student: true,
    days: 7,
    fine: 5,
  });
  const [returnData, setReturnData] = useState({
    book_id: "",
    issuer_id: "",
    is_student: true,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch books data
  const fetchBooks = async () => {
    try {
      const issuedData = await ApiService.issues.getLendBooks();
      setIssuedlist(issuedData);
    } catch (error) {
      console.error("Error fetching issued books:", error);
      toast({
        title: "Error fetching issued books",
        description: error?.response?.data?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to fetch total overdue books
  const fetchTotalOverdueBooks = async () => {
    try {
      const issuedData = await ApiService.issues.getAllIssues();
      const today = new Date();
      const overdueBooks = issuedData.filter(
        (issue) => new Date(issue.due_date) < today
      );
      setTotalOverdueBooks(overdueBooks.length);
    } catch (error) {
      console.error("Error fetching total overdue books:", error);
      toast({
        title: "Error fetching total overdue books:",
        description: error?.response?.data?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to fetch total members
  const fetchTotalMembers = async () => {
    try {
      const students = await ApiService.students.getAll();
      const faculty = await ApiService.faculty.getAll();
      setTotalMembers(students.length + faculty.length);
    } catch (error) {
      console.error("Error fetching total members:", error);
      toast({
        title: "Failed to fetch total members",
        description: error?.response?.data?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchTotalOverdueBooks();
    fetchTotalMembers();
    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReturnInputChange = (e) => {
    setReturnData({ ...returnData, [e.target.name]: e.target.value });
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.school = localStorage.getItem("school_level")
      const response = await ApiService.issues.addIssue(formData);
      // Reset form and state
      setFormData({
        book_id: "",
        issuer_id: "",
        is_student: true,
        days: 7,
        fine: 5,
      });
      setErrorMessage("");
      setLendModal({ open: false, data: null });
      fetchTotalOverdueBooks();
      fetchTotalMembers();
      fetchBooks();
      toast({
        title: "Success",
        description: "Book issued successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle error response
      console.error("Error issuing book:", error);
      setErrorMessage(
        error.message || "An error occurred while issuing the book."
      );
      
      toast({
        title: "Error",
        description:
          error?.response?.data?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    try {
      returnData.school = localStorage.getItem("school_level")
      const response = await ApiService.issues.returnIssue(returnData);
      // Handle success response
      console.log("Book returned successfully:", response);
      // Reset form and state
      setFormData({ book_id: "", issuer_id: "", is_student: true });
      setErrorMessage("");
      setReturnModal({ open: false, data: null });
      fetchTotalOverdueBooks();
      fetchTotalMembers();
      fetchBooks();
      toast({
        title: "Success",
        description: "Book returned successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle error response
      console.error("Error returning book:", error);
      setErrorMessage(
        error.message || "An error occurred while returning the book."
      );
      toast({
        title: "Error",
        description:
        error?.response?.data?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction={"column"} w="100%" h="100%" p={4}>
      <Flex justifyContent="space-between" alignItems="center" gap={4}>
        <Flex gap={4} flex={1}>
          <Card
            p={8}
            flex={1}
            h="100px"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bgColor={"primary.lighter"}
              p={2}
              borderRadius={"4px"}
            >
              <Icon fontSize="20px" as={FaFileExport} color={"primary.main"} />
            </Flex>
            <Flex direction="column">
              <Text variant="body3semiBold">Borrowed Books</Text>
              <Text variant="body1semiBold" color={"success.dark"}>
                {issuedlist.length}
              </Text>
            </Flex>
          </Card>

          <Card
            p={8}
            flex={1}
            h="100px"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bgColor={"primary.lighter"}
              p={2}
              borderRadius={"4px"}
            >
              <Icon fontSize="20px" as={FaFileExport} color={"primary.main"} />
            </Flex>
            <Flex direction="column">
              <Text variant="body3semiBold">Overdue Books</Text>
              <Text variant="body1semiBold" color={"error.dark"}>
                {totalOverdueBooks}
              </Text>
            </Flex>
          </Card>

          <Card
            p={8}
            flex={1}
            h="100px"
            display="flex"
            alignItems="center"
            gap={4}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bgColor={"primary.lighter"}
              p={2}
              borderRadius={"4px"}
            >
              <Icon fontSize="20px" as={FaUsers} color={"primary.main"} />
            </Flex>
            <Flex direction="column">
              <Text variant="body3semiBold">Members</Text>
              <Text variant="body1semiBold" color={"success.dark"}>
                {totalMembers}
              </Text>
            </Flex>
          </Card>
        </Flex>
        <Flex justifyContent="space-evenly" h="100%" flexDir="column">
          <Button
            size="md"
            w="140px"
            onClick={() => setLendModal({ open: true, data: null })}
          >
            Issue
          </Button>
          <Button
            size="md"
            w="140px"
            onClick={() => setReturnModal({ open: true, data: null })}
          >
            Return
          </Button>
        </Flex>
      </Flex>

      <Divider my={4} />

      <Flex gap={4} flexDir="column">
        <Text variant="body2semiBold">Recently Borrowed Books</Text>
        <OverdueBooksTable data={issuedlist} />
      </Flex>
      <LendModal
        isOpen={lendModal.open}
        data={lendModal.data}
        onClose={() => setLendModal({ open: false, data: null })}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleIssueSubmit}
      />
      <ReturnModal
        isOpen={returnModal.open}
        data={returnModal.data}
        onClose={() => setReturnModal({ open: false, data: null })}
        returnData={returnData}
        handleInputChange={handleReturnInputChange}
        handleSubmit={handleReturnSubmit}
      />
    </Flex>
  );
};
