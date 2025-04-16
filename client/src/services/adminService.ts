import axios from 'axios';

export const login = async (credentials: { password: string }) => {
  try {
    const response = await axios.post("http://localhost:9090/admin/login", credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
