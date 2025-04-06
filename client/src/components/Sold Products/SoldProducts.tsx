import React, { useEffect, useState } from 'react';
import './SoldProducts.css';

const SoldProducts: React.FC = () => {
    const [soldProducts, setSoldProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchSoldProducts = async () => {
            // Hardcoded products for demonstration
            const products = [
                { id: 1, name: 'Product 1', price: 10.99, quantity: 2, image: './images/fruits/avocado.jpg', date: '2023-10-01' },
                { id: 2, name: 'Product 2', price: 15.49, quantity: 1, image: './images/fruits/blackberry.jpg', date: '2023-10-02' },
                { id: 3, name: 'Product 3', price: 7.99, quantity: 5, image: './images/fruits/cherry.jpg', date: '2023-10-03' },
                { id: 4, name: 'Product 4', price: 20.00, quantity: 3, image: './images/fruits/banana.jpg', date: '2023-10-04' },
                { id: 5, name: 'Product 5', price: 5.50, quantity: 10, image: './images/fruits/pineapple.jpg', date: '2023-10-05' },
                { id: 6, name: 'Product 1', price: 10.99, quantity: 2, image: './images/fruits/avocado.jpg', date: '2023-10-01' },
                { id: 7, name: 'Product 2', price: 15.49, quantity: 1, image: './images/fruits/blackberry.jpg', date: '2023-10-02' },
                { id: 8, name: 'Product 3', price: 7.99, quantity: 5, image: './images/fruits/cherry.jpg', date: '2023-10-03' },
                { id: 9, name: 'Product 4', price: 20.00, quantity: 3, image: './images/fruits/banana.jpg', date: '2023-10-04' },
                { id: 51, name: 'Product 5', price: 5.50, quantity: 10, image: './images/fruits/pineapple.jpg', date: '2023-10-05' },
                { id: 12, name: 'Product 1', price: 10.99, quantity: 2, image: './images/fruits/avocado.jpg', date: '2023-10-01' },
                { id: 24, name: 'Product 2', price: 15.49, quantity: 1, image: './images/fruits/blackberry.jpg', date: '2023-10-02' },
                { id: 35, name: 'Product 3', price: 7.99, quantity: 5, image: './images/fruits/cherry.jpg', date: '2023-10-03' },
                { id: 46, name: 'Product 4', price: 20.00, quantity: 3, image: './images/fruits/banana.jpg', date: '2023-10-04' },
                { id: 51, name: 'Product 5', price: 5.50, quantity: 10, image: './images/fruits/pineapple.jpg', date: '2023-10-05' },
            ];
            setSoldProducts(products);
            setTotalProducts(products.length);
        };

        fetchSoldProducts();
    }, []);

    // Calculate current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = soldProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Render pagination
    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <ul className="pagination">
                <li className="page-item">
                    <button onClick={() => paginate(1)} className="page-link" disabled={currentPage === 1}>
                        |&lt;
                    </button>
                </li>
                <li className="page-item">
                    <button onClick={() => paginate(currentPage - 1)} className="page-link" disabled={currentPage === 1}>
                        &lt;
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button onClick={() => paginate(currentPage + 1)} className="page-link" disabled={currentPage === pageNumbers.length}>
                        &gt;
                    </button>
                </li>
                <li className="page-item">
                    <button onClick={() => paginate(pageNumbers.length)} className="page-link" disabled={currentPage === pageNumbers.length}>
                        &gt;|
                    </button>
                </li>
            </ul>
        );
    };

    return (
        <div className="sold-products-container">
            <table className="sold-products-table">
                <thead>
                    <tr>
                        <th>Продукт</th>
                        <th>Снимка</th>
                        <th>Цена на бр.</th>
                        <th>Количество</th>
                        <th>Обща цена</th>
                        <th>Дата на покупка</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td><img src={product.image} alt={product.name} className="sold-product-image" /></td>
                            <td>{product.price.toFixed(2)} лв.</td>
                            <td>{product.quantity}</td>
                            <td>20 лв.</td>
                            <td>{product.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {renderPagination()}
        </div>
    );
};

export default SoldProducts;
