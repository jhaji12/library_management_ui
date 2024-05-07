import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  TableContainer,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";

export const BooksTable = ({
  data,
  setBookDetails,
  fetchBookById,
  setEditBookModal,
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
            <Th>Book Id</Th>
            <Th>Accession Date</Th>
            <Th>Title</Th>
            <Th>Vendor</Th>
            <Th>Language</Th>
            <Th>Publication</Th>
            <Th>Shelf</Th>
            <Th>Available Copies</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, id) => (
            <Tr key={id}>
              <Td>{item.book_id}</Td>
              <Td>{item.accession_date}</Td>
              <Td>{item.title}</Td>
              <Td>{item.vendor}</Td>
              <Td>{item.language}</Td>
              <Td>{item.publication}</Td>
              <Td>{item.shelf_name}</Td>
              <Td>{item.available_copies}</Td>
              <Th>
                <Flex gap={2} py={1} bgColor={"gray.100"}>
                  <IconButton
                    cursor="pointer"
                    p={1}
                    as={MdEdit}
                    onClick={async () => {
                      try {
                        const bookId = item.book_id;
                        const bookDetails = await fetchBookById(bookId);
                        setBookDetails(bookDetails);
                        setEditBookModal({ open: true, data: bookDetails });
                      } catch (error) {
                        console.error("Error fetching book details:", error);
                      }
                    }}
                  />
                  <IconButton
                    cursor="pointer"
                    p={1}
                    variant={"delete"}
                    as={MdDelete}
                    onClick={() => handleDeleteBook(item.book_id)}
                  />
                </Flex>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
