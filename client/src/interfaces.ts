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

export interface Products {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
    date: string;
}

export interface Purchase {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    createdAt: string;
}