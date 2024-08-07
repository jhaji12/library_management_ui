import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  StudentsTable,
  FacultyTable,
  AddMemberModal,
  EditMemberModal,
} from "../../Components";
import { ApiService } from "../../Services/datasetAPIService";

export const Members = () => {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const toast = useToast();
  const [addMemberModal, setAddMemberModal] = useState({
    open: false,
    data: null,
  });
  const [editMemberModal, setEditMemberModal] = useState({
    open: false,
    data: null,
  });
  const [memberDetails, setMemberDetails] = useState({
    member_type: "",
    name: "",
    faculty_id: "",
    school_class: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Make API call to add the book
      memberDetails.school = localStorage.getItem("school_level");
      const response =
        memberDetails.member_type === "student"
          ? await ApiService.students.addMember(memberDetails)
          : await ApiService.faculty.addMember(memberDetails);
      console.log("Member added successfully:", response);
      // Reset book details after submission
      setMemberDetails({
        member_type: "",
        name: "",
        faculty_id: "",
        school_class: "",
      });
      // Close the modal
      setAddMemberModal({ open: false, data: null });
      fetchStudents();
      fetchFaculties();
    } catch (error) {
      console.error("Error adding Member:", error);
      toast({
        title: "Error adding member",
        description: `These inputs are missing ${Object.keys(error?.response?.data)}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditStudent = async (studentId) => {
    try {
      const studentDetails = await ApiService.students.getStudentById(
        studentId
      );
      setMemberDetails(studentDetails);
      setEditMemberModal({ open: true, data: studentDetails });
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast({
        title: "Error fetching student details",
        description: error?.response?.data?.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditSubmit = async () => {
    try {
      console.log("here in edit");
      // Make API call to update member details
      const response =
        memberDetails.member_type === "student"
          ? await ApiService.students.editStudent(memberDetails)
          : await ApiService.faculty.updateFaculty(memberDetails);
      console.log("Member updated successfully:", response);
      // Reset member details after submission
      setMemberDetails({
        member_type: "",
        name: "",
        faculty_id: "",
        school_class: "",
      });
      // Close the modal
      setEditMemberModal({ open: false, data: null });
      // Refetch the list of students or faculties to update the UI
      fetchStudents();
      fetchFaculties();
    } catch (error) {
      console.error("Error updating member:", error);
      toast({
        title: "Error updating member",
        description: error?.response?.data?.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (memberId, memberType) => {
    try {
      if (memberType === "student") {
        // Make API call to delete student
        await ApiService.students.deleteStudent(memberId);
      } else {
        // Make API call to delete faculty
        await ApiService.faculty.deleteFaculty(memberId);
      }
      // Refetch the list of students or faculties to update the UI
      fetchStudents();
      fetchFaculties();
      console.log("Member deleted successfully");
    } catch (error) {
      console.error("Error deleting member:", error);
      toast({
        title: "Error deleting member",
        description: error?.response?.data?.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to fetch students data
  const fetchStudents = async () => {
    try {
      const studentsData = await ApiService.students.getAll();
      setStudents(studentsData);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast({
        title: "Error fetching students",
        description: error?.response?.data?.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to fetch faculties data
  const fetchFaculties = async () => {
    try {
      const facultiesData = await ApiService.faculty.getAll();
      setFaculties(facultiesData);
    } catch (error) {
      console.error("Error fetching faculties:", error);
      toast({
        title: "Error fetching faculties",
        description: error?.response?.data?.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fetch data for students and faculties on component mount
  useEffect(() => {
    fetchStudents();
    fetchFaculties();
  }, []);

  return (
    <Flex p={4} pos="relative">
      <Tabs w="100%">
        <TabList>
          <Tab>Students</Tab>
          <Tab>Faculties</Tab>
        </TabList>
        <TabPanels w="100%">
          <TabPanel>
            <StudentsTable
              data={students}
              handleEditStudent={handleEditStudent}
              handleDeleteBook={handleDelete}
            />
          </TabPanel>
          <TabPanel>
            <FacultyTable data={faculties} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        pos="absolute"
        right={4}
        onClick={() => setAddMemberModal({ open: true, data: null })}
      >
        + Add Member
      </Button>
      <AddMemberModal
        isOpen={addMemberModal.open}
        data={addMemberModal.data}
        onClose={() => setAddMemberModal({ open: false, data: null })}
        memberDetails={memberDetails}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <EditMemberModal
        isOpen={editMemberModal.open}
        data={editMemberModal.data}
        onClose={() => setEditMemberModal({ open: false, data: null })}
        memberDetails={memberDetails}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
      />
    </Flex>
  );
};
