import React from "react";
import {
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";

export const StudentsTable = ({
  data,
  handleEditStudent,
  handleDeleteBook,
}) => {
  return (
    <TableContainer
      w="80vw"
      h="78vh"
      overflowY="auto"
      border="1px solid #E2E6F0"
      borderRadius={8}
    >
      <Table variant="striped" size="sm">
        <Thead bg="primary.lighter" sx={{ position: "sticky", top: 0 }}>
          <Tr>
            <Th>Student Name</Th>
            <Th>Admission Number</Th>
            <Th>Class</Th>
            <Th>Modification</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item) => (
            <Tr>
              <Td>{item.name}</Td>
              <Td>{item.adm_number}</Td>
              <Td>{item.school_class}</Td>
              <Td>
                <Flex gap={2} py={1} bgColor={"gray.100"}>
                  <IconButton
                    cursor="pointer"
                    p={1}
                    as={MdEdit}
                    onClick={() => handleEditStudent(item.adm_number)}
                  />
                  <IconButton
                    cursor="pointer"
                    p={1}
                    variant={"delete"}
                    as={MdDelete}
                    onClick={() => handleDeleteBook(item.adm_number, "student")}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
