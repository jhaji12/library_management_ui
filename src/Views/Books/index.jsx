import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  Tag,
  useToast,
} from "@chakra-ui/react";
import {
  BooksTable,
  LentBooksTable,
  AddBookModal,
  EditBookModal,
  Search,
} from "../../Components";
import { ApiService } from "../../Services/datasetAPIService";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lent, setLent] = useState([]);
  const [returned, setReturned] = useState([]);
  const [addBookModal, setAddBookModal] = useState({ open: false, data: null });
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [editBookModal, setEditBookModal] = useState({
    open: false,
    data: null,
  });
  const toast = useToast();

  const [bookDetails, setBookDetails] = useState({
    book_id: "",
    title: "",
    vendor: "",
    language: "",
    publication: "",
    shelf_name: "",
    available_copies: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const fetchBookById = async (bookId) => {
    try {
      const response = await ApiService.books.getBookById(bookId);
      return response;
    } catch (error) {
      console.error("Error fetching book details:", error);
      throw error;
    }
  };

  const handleEditBook = async () => {
    try {
      const response = await ApiService.books.editBook(bookDetails);
      console.log("Book edited successfully:", response);
      setBookDetails({
        book_id: "",
        title: "",
        vendor: "",
        language: "",
        publication: "",
        shelf_name: "",
        available_copies: 0,
      });
      setEditBookModal({ open: false, data: null });
      fetchBooks();
      toast({
        title: "Book Edited",
        description: "The book has been edited successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error editing book:", error);
      toast({
        title: "Error Editing Book",
        description: "An error occurred while editing the book.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await ApiService.books.addBook(bookDetails);
      console.log("Book added successfully:", response);
      setBookDetails({
        book_id: "",
        title: "",
        vendor: "",
        language: "",
        publication: "",
        shelf_name: "",
        available_copies: 0,
      });
      setAddBookModal({ open: false, data: null });
      fetchBooks();
      toast({
        title: "Book Added",
        description: "The book has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        title: "Error Adding Book",
        description: "An error occurred while adding the book.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to fetch books data
  const fetchBooks = async () => {
    try {
      const booksData = await ApiService.books.getAll();
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Function to fetch lent books data
  const fetchLentBooks = async () => {
    try {
      const lentData = await ApiService.issues.getLendBooks();
      setLent(lentData);
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };

  // Function to fetch returned books data
  const fetchReturnedBooks = async () => {
    try {
      const returnedData = await ApiService.issues.getReturnedBooks();
      setReturned(returnedData);
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await ApiService.books.deleteBook(bookId);
      fetchBooks();
      toast({
        title: "Book Deleted",
        description: "The book has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        title: "Error Deleting Book",
        description: "An error occurred while deleting the book.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === "") {
        // If search query is empty, fetch all books
        fetchBooks();
      } else {
        // If search query is not empty, filter books based on search query
        const response = await ApiService.books.getAll();
        const filteredBook = response.filter(
          (book) => book.book_id === searchQuery
        );
        setBooks(filteredBook);
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      toast({
        title: "Error Searching Book",
        description: "An error occurred while searching for the book.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fetch data on initial component mount
  useEffect(() => {
    fetchBooks();
    fetchLentBooks();
    fetchReturnedBooks();
  }, []);

  return (
    <Flex p={4} pos="relative">
      <Tabs
        w="100%"
        onChange={(index) => {
          setActiveTabIndex(index); // Update active tab index
          // Fetch data based on tab index
          if (index === 0) {
            fetchBooks();
          } else if (index === 1) {
            fetchLentBooks();
          } else if (index === 2) {
            fetchReturnedBooks();
          }
        }}
      >
        <TabList>
          <Tab>
            All Books <Tag>{books.length}</Tag>
          </Tab>
          <Tab>
            Issued <Tag>{lent.length}</Tag>
          </Tab>
          <Tab>
            Returned <Tag>{returned.length}</Tag>
          </Tab>
        </TabList>

        <TabPanels w="100%">
          <TabPanel>
            <BooksTable
              data={books}
              setBookDetails={setBookDetails}
              fetchBookById={fetchBookById}
              setEditBookModal={setEditBookModal}
              handleDeleteBook={handleDeleteBook}
            />
          </TabPanel>
          <TabPanel>
            <LentBooksTable data={lent} />
          </TabPanel>
          <TabPanel>
            <LentBooksTable data={returned} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {activeTabIndex === 0 && (
        <Box
          w="300px"
          pos="absolute"
          top={2}
          right={32}
          justifyContent={"center"}
        >
          <Search
            placeholder={`Search book details by Book Id`}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
      )}
      <Button
        pos="absolute"
        right={4}
        onClick={() => setAddBookModal({ open: true, data: null })}
      >
        + Add Book
      </Button>
      <AddBookModal
        isOpen={addBookModal.open}
        data={addBookModal.data}
        onClose={() => setAddBookModal({ open: false, data: null })}
        bookDetails={bookDetails}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <EditBookModal
        isOpen={editBookModal.open}
        data={editBookModal.data}
        onClose={() => setEditBookModal({ open: false, data: null })}
        bookDetails={bookDetails}
        handleInputChange={handleEditInputChange}
        handleSubmit={handleEditBook}
      />
    </Flex>
  );
};
