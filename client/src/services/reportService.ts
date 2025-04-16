import axios from 'axios';

const baseUrl = "http://localhost:9090/report";

export const report = async (startDate: string) => {
    try {
        const response = await axios.get(`${baseUrl}?startDate=${startDate}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching purchases:', error);
        throw error;
    }
};
