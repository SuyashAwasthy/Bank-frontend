import axios from 'axios';
import handleApiError from '../utils/handleApiError.js'; // Import handleApiError function

// Use environment variables for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/accounts';

// Helper function to get the authentication token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found.');
    throw new Error('No authentication token found.');
  }
  return token;
};

// Function to fetch all accounts (Admin only)
export const fetchAllAccounts = async (page = 1, pageSize = 10,id='') => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { page: page - 1, pageSize ,id},
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });

    return {
      data: response.data.content || [], // Use `content` for accounts list
      totalPages: response.data.totalPages || 1, // Total number of pages
    };
  } catch (error) {
    handleApiError(error); // Use centralized error handling
    throw error; // Re-throw the error after handling
  }
};

// Function to fetch an account by ID (Admin and Customer)
export const fetchAccountById = async (id) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    handleApiError(error); // Use centralized error handling
    throw error; // Re-throw the error after handling
  }
};

// Function to create a new account (Admin only)
export const createAccount = async (accountData) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(API_URL, accountData, config);
    return response.data;
  } catch (error) {
    handleApiError(error); // Use centralized error handling
    throw error; // Re-throw the error after handling
  }
};

// Function to update an account by ID (Admin only)
export const updateAccount = async (id, accountData) => {
  if (!id) {
    console.error('Invalid account ID:', id);
    throw new Error('Invalid account ID');
  }

  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${API_URL}/${id}`, accountData, config);
    return response.data;
  } catch (error) {
    handleApiError(error); // Use centralized error handling
    throw error; // Re-throw the error after handling
  }
};

// Function to delete an account by ID (Admin only)
export const deleteAccount = async (id) => {
  try {
    const token = getAuthToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${API_URL}/${id}`, config);
  } catch (error) {
    handleApiError(error); // Use centralized error handling
    throw error; // Re-throw the error after handling
  }
};