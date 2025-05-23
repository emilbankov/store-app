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

export interface ExistingProduct {
    id: number,
    image: string,
    lastUpdated: string,
    name: string,
    price: number,
    quantity: number,
    type: string,
    unit: string
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

export interface ReportItem {
    product: string;
    quantityLoaded: number;
    quantitySold: number;
    quantityNow: number;
    scrap: number | null;
    unit: string;
    total: number;
    image: string;
    loadedAt: string;
}

export interface ReportResponse {
    report: ReportItem[];
}