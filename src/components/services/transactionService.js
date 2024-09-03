import axios from 'axios';
// Ensure correct import path for handleApiError
import { handleApiError } from '../utils/handleApiError.js';

// Use environment variables for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api/transactions';

// Helper function to get the authentication token from local storage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No authentication token found.');
    throw new Error('No authentication token found.');
  }
  return token;
};

// Helper function to format date to ISO string
const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }
  return d.toISOString();
};

// Function to fetch all transactions with pagination
export const fetchAllTransactions = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });

    return {
      data: response.data.transactions,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    handleApiError(error);
  }
};

// Function to fetch a transaction by ID
export const fetchTransactionById = async (id) => {
  if (!id) {
    console.error('Invalid transaction ID:', id);
    throw new Error('Invalid transaction ID');
  }

  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to fetch passbook entries for a given account ID
export const getPassbook = async (accountId) => {
  if (!accountId) {
    console.error('Invalid account ID:', accountId);
    throw new Error('Invalid account ID');
  }

  try {
    const response = await axios.get(`${API_URL}/passbook`, {
      params: { accountId },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};