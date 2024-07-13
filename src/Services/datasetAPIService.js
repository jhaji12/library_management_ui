import axios from "axios";
import { constants } from "../constants";
const BASE_URL = constants.VITE_APP_API_BASE_URL;

export const ApiService = {
  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "POST",
        url: `${BASE_URL}/logout/`,
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const response = await axios(config);
      localStorage.removeItem("token");
      localStorage.removeItem("school_level");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTotalBorrowedBooks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/issues/all/`, {
        headers: {
          "School-Level": localStorage.getItem("school_level"),
        },
      });
      return response.data.results.length; // Assuming each item represents a borrowed book
    } catch (error) {
      throw error;
    }
  },

  // New function to get the total number of overdue books
  getTotalOverdueBooks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/issues/all/`, {
        headers: {
          "School-Level": localStorage.getItem("school_level"),
        },
      });
      const today = new Date();
      const overdueBooks = response.data.results.filter(
        (issue) => new Date(issue.due_date) < today
      );
      return overdueBooks.length;
    } catch (error) {
      throw error;
    }
  },

  // New function to get the total number of members (students and faculty)
  getTotalMembers: async () => {
    try {
      const studentsResponse = await axios.get(`${BASE_URL}/students`);
      const facultyResponse = await axios.get(`${BASE_URL}/faculty`);
      const totalStudents = studentsResponse.data.results.length;
      const totalFaculty = facultyResponse.data.results.length;
      return totalStudents + totalFaculty;
    } catch (error) {
      throw error;
    }
  },

  // Books API
  books: {
    getAll: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/books/`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
        });
        return response.data.results;
      } catch (error) {
        throw error;
      }
    },
    getBookById: async (bookId) => {
      try {
        const response = await axios.get(`${BASE_URL}/books/${bookId}/`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    addBook: async (bookData) => {
      try {
        bookData["accession_date"] = new Date().toISOString().split("T")[0];
        const token = localStorage.getItem("token");
        const config = {
          method: "POST",
          url: `${BASE_URL}/books/add/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
          data: bookData,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    editBook: async (bookData) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "PUT",
          url: `${BASE_URL}/books/${bookData.book_id}/edit/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
          data: bookData,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    deleteBook: async (bookId) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "DELETE",
          url: `${BASE_URL}/books/${bookId}/delete/`, // Assuming the API endpoint for deleting a book is `/books/{id}/`
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },

  // Issues API
  issues: {
    getAllIssues: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/issues/all/`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
        });
        return response.data.results;
      } catch (error) {
        throw error;
      }
    },
    getLendBooks: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/issue/`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
        });
        return response.data.results;
      } catch (error) {
        throw error;
      }
    },
    getReturnedBooks: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/return/`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
        });
        return response.data.results;
      } catch (error) {
        throw error;
      }
    },
    addIssue: async (issueData) => {
      try {
        if (
          (issueData.is_student === true) |
          (issueData.is_student === "true")
        ) {
          issueData.is_student = true;
        } else if (
          (issueData.is_student === false) |
          (issueData.is_student === "false")
        ) {
          issueData.is_student = false;
        }
        const token = localStorage.getItem("token");
        const config = {
          method: "POST",
          url: `${BASE_URL}/issue/add/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
          data: issueData,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    returnIssue: async (returnData) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "PUT",
          url: `${BASE_URL}/return/add/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
          data: returnData,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },

  // Students API
  students: {
    getAll: async () => {
      try {
          const response = await axios.get(`${BASE_URL}/students`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
        });
        return response.data.results;
      } catch (error) {
        throw error;
      }
    },
    getStudentById: async (studentId) => {
      try {
        const response = await axios.get(`${BASE_URL}/students/${studentId}/`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    addMember: async (memberData) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "POST",
          url: `${BASE_URL}/students/add/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
          data: memberData,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    editStudent: async (studentData) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "PUT",
          url: `${BASE_URL}/students/${studentData.adm_number}/edit/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
          data: studentData,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    deleteStudent: async (bookId) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "DELETE",
          url: `${BASE_URL}/students/${bookId}/delete/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },

  // Faculty API
  faculty: {
    getAll: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/faculty`, {
          headers: {
            "School-Level": localStorage.getItem("school_level"),
          },
      });
        return response.data.results;
      } catch (error) {
        throw error;
      }
    },
    addMember: async (memberData) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "POST",
          url: `${BASE_URL}/faculty/add/`,
          headers: {
            Authorization: `Token ${token}`,
            "School-Level": localStorage.getItem("school_level"),
          },
          data: memberData,
        };
        const response = await axios(config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    // Add more faculty API methods as needed
  },
};
