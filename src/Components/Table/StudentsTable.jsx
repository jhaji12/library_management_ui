import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from "@chakra-ui/react";

export const StudentsTable = ({ data }) => {
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
            <Th>Books Issued</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item) => (
            <Tr>
              <Td>{item.name}</Td>
              <Td>{item.adm_number}</Td>
              <Td>{item.school_class}</Td>
              <Td>{item.books_issued}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
