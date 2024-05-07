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

export const FacultyTable = ({ data }) => {
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
            <Th>Name</Th>
            <Th>Faculty Id</Th>
            <Th>Books Issued</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item) => (
            <Tr>
              <Td>{item.name}</Td>
              <Td>{item.faculty_id}</Td>
              <Td>{item.books_issued}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
