import React, { useEffect, useState } from 'react';
import './SoldProducts.css';
import { getPurchases } from '../../services/purchasesService';
import { Products, Purchase } from '../../interfaces';

const SoldProducts: React.FC = () => {
    const [soldProducts, setSoldProducts] = useState<Products[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchSoldProducts = async () => {
            try {
                const response = await getPurchases(currentPage);
                const products = response.purchases.map((purchase: Purchase) => ({
                    id: purchase.id,
                    name: purchase.product.name,
                    quantity: purchase.quantity,
                    price: purchase.price,
                    image: purchase.product.image,
                    date: purchase.createdAt,
                }));
                setSoldProducts(products);
                setTotalPages(response.total_pages);
            } catch (error) {
                console.error('Error fetching sold products:', error);
            }
        };

        fetchSoldProducts();
    }, [currentPage]);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
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
                    <button onClick={() => paginate(currentPage + 1)} className="page-link" disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </li>
                <li className="page-item">
                    <button onClick={() => paginate(totalPages)} className="page-link" disabled={currentPage === totalPages}>
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
                    {soldProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td><img src={product.image} alt={product.name} className="sold-product-image" /></td>
                            <td>{(product.price / product.quantity).toFixed(2)} лв.</td>
                            <td>{product.quantity}</td>
                            <td>{product.price.toFixed(2)} лв.</td>
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
