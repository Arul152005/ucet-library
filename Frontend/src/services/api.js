// Base URL for the backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Books API
export const booksAPI = {
  // Get all books
  getAllBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books`);
    return handleResponse(response);
  },

  // Get a book by ID
  getBookById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return handleResponse(response);
  },

  // Create a new book
  createBook: async (bookData) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  },

  // Update a book
  updateBook: async (id, bookData) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  },

  // Delete a book
  deleteBook: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Borrow a book
  borrowBook: async (id, studentId) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}/borrow`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ studentId }),
    });
    return handleResponse(response);
  },

  // Return a book
  returnBook: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}/return`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Students API
export const studentsAPI = {
  // Get all students
  getAllStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/students`);
    return handleResponse(response);
  },

  // Get a student by ID
  getStudentById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`);
    return handleResponse(response);
  },

  // Create a new student
  createStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  // Update a student
  updateStudent: async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  // Delete a student
  deleteStudent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Add a borrowed book to a student
  addBorrowedBook: async (id, bookData) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}/borrowed-books`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData),
    });
    return handleResponse(response);
  },

  // Remove a borrowed book from a student
  removeBorrowedBook: async (id, bookId) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}/borrowed-books`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ bookId }),
    });
    return handleResponse(response);
  },
};

// Admin API
export const adminAPI = {
  // Login admin
  loginAdmin: async (adminData) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });
    return handleResponse(response);
  },

  // Register admin
  registerAdmin: async (adminData) => {
    const response = await fetch(`${API_BASE_URL}/admin/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });
    return handleResponse(response);
  },

  // Get admin profile
  getAdminProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};