export interface Product {
    id: number;
    lastUpdated: string;
    name: string;
    unit: string;
    price: number;
    quantity: number;
    type: 'fruits' | 'vegetables';
    image: string;
}

export interface AddProduct {
    name: string;
    category: 'fruits' | 'vegetables';
    image: string;
}