import { useState, useRef } from 'react';
import './AddProducts.css';
import Search from '../Search/Search';
import { mockProducts } from './mockProducts';
import ErrorModal from '../Error Modal/ErrorModal';
import { AddProduct } from "../../interfaces";
import { login } from '../../services/adminService';
import { addProducts } from '../../services/productsService';
type UnitType = 'кг.' | 'бр.' | '-';

export default function AddProducts() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [filter, setFilter] = useState<'all' | 'fruits' | 'vegetables'>('all');
    const [selectedProduct, setSelectedProduct] = useState<AddProduct | null>(null);
    const [formData, setFormData] = useState({
        quantity: '',
        unitType: '-' as UnitType,
        price: ''
    });
    const [products] = useState(mockProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

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
            if (passwordInputRef.current) {
                passwordInputRef.current.focus();
            }
        }
    };

    const closeModal = () => {
        setErrorMessage(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddStock = async () => {
        if (selectedProduct) {
            const quantity = parseFloat(formData.quantity);
            const price = parseFloat(formData.price);

            if (isNaN(quantity) || isNaN(price)) {
                setErrorMessage("Моля, въведете валидни стойности.");
                return;
            }

            const productData = {
                name: selectedProduct.name,
                price: price,
                quantity: quantity,
                unit: formData.unitType,
                type: selectedProduct.category,
                image: selectedProduct.image
            };

            try {
                const response = await addProducts(productData);
                console.log('Product added successfully:', response);
            } catch (error) {
                setErrorMessage('Failed to add product. Please try again.');
                console.error('Error adding product:', error);
            }
        }
        setSelectedProduct(null);
        setFormData({ quantity: '', unitType: '-', price: '' });
    };

    if (!isAuthenticated) {
        return (
            <div className="add-products-password-container">
                <form onSubmit={handlePasswordSubmit} className="add-products-password-form">
                    <label htmlFor="password">Въведете парола:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Парола"
                        ref={passwordInputRef}
                    />
                    <button type="submit">Влез</button>
                </form>
                {errorMessage && <ErrorModal message={errorMessage} onClose={closeModal} />}
            </div>
        );
    }

    const filteredProducts = products.filter((product) => {
        const matchesFilter = filter === 'all' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (newFilter: 'all' | 'fruits' | 'vegetables') => {
        setFilter(newFilter);
    };

    const handleProductClick = (product: AddProduct) => {
        setSelectedProduct(product);
        setFormData({
            quantity: '',
            unitType: '-',
            price: ''
        });
    };

    return (
        <div className="add-products-container">
            <Search onSearch={handleSearch} />
            
            <div className="add-products-filters">
                <button
                    className={`add-products-filter-btn ${filter === 'all' ? 'add-products-active' : ''}`}
                    onClick={() => handleFilterChange('all')}
                >
                    Всички продукти
                </button>
                <button
                    className={`add-products-filter-btn ${filter === 'fruits' ? 'add-products-active' : ''}`}
                    onClick={() => handleFilterChange('fruits')}
                >
                    Плодове
                </button>
                <button
                    className={`add-products-filter-btn ${filter === 'vegetables' ? 'add-products-active' : ''}`}
                    onClick={() => handleFilterChange('vegetables')}
                >
                    Зеленчуци
                </button>
            </div>

            <div className="add-products-grid">
                {filteredProducts.map((product) => (
                    <div 
                        key={product.name} 
                        className="add-product-card"
                        onClick={() => handleProductClick(product)}
                    >
                        <div className="add-product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="add-product-info">
                            <h3>{product.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="add-products-modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="add-products-modal" onClick={e => e.stopPropagation()}>
                        <div className="add-products-modal-header">
                            <h2>{selectedProduct.name}</h2>
                            <button 
                                className="add-products-close-btn"
                                onClick={() => setSelectedProduct(null)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="add-products-modal-content">
                            <div className="add-products-modal-main">
                                <div className="add-products-modal-image">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                                </div>
                                <div className="add-products-modal-info">
                                    <form className="add-products-form" onSubmit={(e) => e.preventDefault()}>
                                        <div className="add-products-form-group">
                                            <label htmlFor="unitType">Мерна единица:</label>
                                            <select
                                                id="unitType"
                                                name="unitType"
                                                value={formData.unitType}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    unitType: e.target.value as UnitType
                                                }))}
                                                className="add-products-select"
                                            >
                                                <option value="-" hidden>--- Избери ---</option>
                                                <option value="кг.">Килограм</option>
                                                <option value="бр.">Брой</option>
                                            </select>
                                        </div>

                                        {formData.unitType !== '-' && (
                                            <>
                                                <div className="add-products-form-group">
                                                    <label htmlFor="quantity">
                                                        {formData.unitType === 'кг.' ? 'Количество (кг):' : 
                                                         formData.unitType === 'бр.' ? 'Брой:' : 'Количество:'}
                                                    </label>
                                                    <input
                                                        id="quantity"
                                                        name="quantity"
                                                        type="number"
                                                        min="0.1"
                                                        step={formData.unitType === 'кг.' ? "0.1" : "1"}
                                                        value={formData.quantity}
                                                        onChange={handleInputChange}
                                                        placeholder={formData.unitType === 'кг.' ? "Количество" : "Брой"}
                                                    />
                                                </div>
                                                
                                                <div className="add-products-form-group">
                                                    <label htmlFor="price">
                                                        {`Цена за ${formData.unitType}:`}
                                                    </label>
                                                    <input
                                                        id="price"
                                                        name="price"
                                                        type="number"
                                                        min="0.01"
                                                        step="0.01"
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                        placeholder="Цена"
                                                    />
                                                </div>
                                            </>
                                        )}
                                        
                                        {formData.unitType !== '-' && (
                                            <div className="add-products-form-summary">
                                                <p>
                                                    {`Общо ${formData.unitType}: ${formData.quantity || 0}`}
                                                </p>
                                                <p>Обща стойност: {(Number(formData.quantity) * Number(formData.price)).toFixed(2)} лв.</p>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                            {formData.unitType !== '-' && (
                                <button 
                                    className="add-products-confirm-btn"
                                    onClick={handleAddStock}
                                >
                                    Добави
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}