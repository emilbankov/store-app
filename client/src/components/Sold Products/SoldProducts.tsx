import React, { useEffect, useState } from 'react';
import './SoldProducts.css';
import { getPurchases } from '../../services/purchasesService';
import { Products, Purchase } from '../../interfaces';
import { login } from '../../services/adminService';
import ErrorModal from '../Error Modal/ErrorModal';

const SoldProducts: React.FC = () => {
    const [soldProducts, setSoldProducts] = useState<Products[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

        if (isAuthenticated) {
            fetchSoldProducts();
        }
    }, [currentPage, isAuthenticated]);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ password });
            if (response) {
                setIsAuthenticated(true);
                setErrorMessage(null);
            }
        } catch (error) {
            setErrorMessage('Грешна парола. Моля, опитайте отново.');
            console.error('Login error:', error);
            setPassword('');
        }
    };

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <ul className="sold-pagination">
                <li className="sold-page-item">
                    <button onClick={() => paginate(1)} className="sold-page-link" disabled={currentPage === 1}>
                        |&lt;
                    </button>
                </li>
                <li className="sold-page-item">
                    <button onClick={() => paginate(currentPage - 1)} className="sold-page-link" disabled={currentPage === 1}>
                        &lt;
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className="sold-page-item">
                        <button onClick={() => paginate(number)} className={`sold-page-link ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                    </li>
                ))}
                <li className="sold-page-item">
                    <button onClick={() => paginate(currentPage + 1)} className="sold-page-link" disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </li>
                <li className="sold-page-item">
                    <button onClick={() => paginate(totalPages)} className="sold-page-link" disabled={currentPage === totalPages}>
                        &gt;|
                    </button>
                </li>
            </ul>
        );
    };

    if (!isAuthenticated) {
        return (
            <div className="sold-password-container">
                <form onSubmit={handlePasswordSubmit} className="sold-password-form">
                    <label htmlFor="password">Въведете парола:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Парола"
                        className="sold-password-input"
                    />
                    <button type="submit" className="sold-password-button">Влез</button>
                </form>
                {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            </div>
        );
    }

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
