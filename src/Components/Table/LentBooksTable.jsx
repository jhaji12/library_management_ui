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

export const LentBooksTable = ({ data }) => {
  return (
    <TableContainer
      w="100%"
      h="78vh"
      overflowY="auto"
      border="1px solid #E2E6F0"
      borderRadius={8}
    >
      <Table variant="striped" size="sm">
        <Thead bg="primary.lighter" sx={{ position: "sticky", top: 0 }}>
          <Tr>
            <Th>Book Title</Th>
            <Th>Book Id</Th>
            <Th>Student Name</Th>
            <Th>Admission Number</Th>
            <Th>Faculty Name</Th>
            <Th>Faculty Id</Th>
            <Th>Overdue Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item) => (
            <Tr>
              <Td>{item.title}</Td>
              <Td>{item.book_id}</Td>
              <Td>{item.student_name}</Td>
              <Td>{item.adm_number}</Td>
              <Td>{item.faculty_name}</Td>
              <Td>{item.faculty_id}</Td>
              <Td>{item.overdue_amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
