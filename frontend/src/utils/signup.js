
import axios from 'axios';

export const signupFunction = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8080/user/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    if (error.response && error.response.data) {
      return error.response.data.message;
    } else {
      return 'An error occurred';
    }
  }
};
