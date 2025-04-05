export interface Product {
    id: number;
    lastUpdated: string;
    name: string;
    unit: string;
    price: number;
    quantity: number;
    type: 'fruit' | 'vegetable';
    image: string;
}

export interface AddProduct {
    name: string;
    category: 'fruits' | 'vegetables';
    image: string;
}