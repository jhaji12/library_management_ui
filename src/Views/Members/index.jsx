import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
} from "@chakra-ui/react";
import { StudentsTable, FacultyTable, AddMemberModal } from "../../Components";
import { ApiService } from "../../Services/datasetAPIService";

export const Members = () => {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [addMemberModal, setAddMemberModal] = useState({
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
      fetchFaculties;
    } catch (error) {
      console.error("Error adding Member:", error);
      // Handle error
    }
  };

  // Function to fetch students data
  const fetchStudents = async () => {
    try {
      const studentsData = await ApiService.students.getAll();
      setStudents(studentsData);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Function to fetch faculties data
  const fetchFaculties = async () => {
    try {
      const facultiesData = await ApiService.faculty.getAll();
      setFaculties(facultiesData);
    } catch (error) {
      console.error("Error fetching faculties:", error);
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
            <StudentsTable data={students} />
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
    </Flex>
  );
};
