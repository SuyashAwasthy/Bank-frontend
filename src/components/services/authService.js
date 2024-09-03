import axios from 'axios';

const LOGIN_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';

// Function to handle user registration
export const register = async (formData) => {
  const form = new FormData();
  form.append('firstName', formData.firstName);
  form.append('lastName', formData.lastName);
  form.append('email', formData.email);
  form.append('password', formData.password);
  form.append('aadhaarCard', formData.aadhaarCard);
  form.append('panCard', formData.panCard);
  form.append('role', formData.role);

  try {
    const response = await axios.post(`${LOGIN_API_URL}/register`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Improved error handling
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Function to handle login and token storage
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${LOGIN_API_URL}/login`, { email, password });
    const { token } = response.data;

    if (token) {
      localStorage.setItem('token', token);
      return token;
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error('Login failed. Please check your credentials.');
  }
};

// Function to verify if the token belongs to an admin
export const verifyAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(`${LOGIN_API_URL}/verify-admin`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming a 200 status code indicates the user is an admin
    return response.status === 200;
  } catch (error) {
    console.error('Admin verification failed:', error.response?.data || error.message);
    return false;
  }
};

// Function to verify if the logged-in user is verified
// export const verifyUser = async (customerId) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${LOGIN_API_URL}/verify-user`, {
//       params: { customerId },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // Should return true or false
//   } catch (error) {
//     console.error('User verification failed:', error);
//     return false;
//   }
// };

// Function to logout and clear token
export const logout = () => {
  localStorage.removeItem('token');
};