import axios from 'axios';

const baseUrl = "http://localhost:8080/products"; 

export const getProducts = async () => {
    try {
        const response = await axios.get(`${baseUrl}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProducts = async (productData: { name: string; price: number; quantity: number; unit: string, type: string, image: string }) => {
    try {
        const response = await axios.post(`${baseUrl}/add`, productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const removeProduct = async (id: number) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error removing product:', error);
        throw error;
    }
};