import axios from 'axios';

const baseUrl = "http://localhost:8080/purchases";

export const sellProducts = async (id: number, quantity: number) => {
    try {
        const response = await axios.post(`${baseUrl}/create`, {
            id,
            quantity,
        });

        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

