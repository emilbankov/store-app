import { useState, useRef, useEffect } from 'react';
import './AddProducts.css';
import Search from '../Search/Search';
import ErrorModal from '../Error Modal/ErrorModal';
import { AddProduct, ExistingProduct } from "../../interfaces";
import { login } from '../../services/adminService';
import { addProducts, getProducts } from '../../services/productsService';
import { mockProducts } from './mockProducts';

export default function AddProducts() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [filter, setFilter] = useState<'all' | 'fruits' | 'vegetables'>('all');
    const [selectedProduct, setSelectedProduct] = useState<AddProduct | null>(null);
    const [formData, setFormData] = useState({
        quantity: '',
        unit: '',
        price: ''
    });
    const [existingProducts, setExistingProducts] = useState<ExistingProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getProducts();
            setExistingProducts(fetchedProducts.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
                unit: formData.unit,
                type: selectedProduct.category,
                image: selectedProduct.image
            };

            try {
                await addProducts(productData);
                await fetchProducts();
            } catch (error) {
                setErrorMessage('Failed to add product. Please try again.');
                console.error('Error adding product:', error);
            }
        }
        setSelectedProduct(null);
        setFormData({ quantity: '', unit: '-', price: '' });
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

    const filteredProducts = mockProducts.filter((product) => {
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
        
        const existingProduct = existingProducts?.find(p => p.name === product.name);
        setFormData({
            quantity: existingProduct ? existingProduct.quantity.toString() : '',
            unit: existingProduct ? existingProduct.unit.toString() : '-',
            price: existingProduct ? existingProduct.price.toString() : ''
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
                                            <label htmlFor="unit">Мерна единица:</label>
                                            <select
                                                id="unit"
                                                name="unit"
                                                value={formData.unit}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    unit: e.target.value
                                                }))}
                                                className="add-products-select"
                                            >
                                                <option value="-" hidden>--- Избери ---</option>
                                                <option value="кг.">Килограм</option>
                                                <option value="бр.">Брой</option>
                                            </select>
                                        </div>

                                        {formData.unit !== '-' && (
                                            <>
                                                <div className="add-products-form-group">
                                                    <label htmlFor="quantity">
                                                        {formData.unit === 'кг.' ? 'Количество (кг):' :
                                                            formData.unit === 'бр.' ? 'Брой:' : 'Количество:'}
                                                    </label>
                                                    <input
                                                        id="quantity"
                                                        name="quantity"
                                                        type="number"
                                                        min="0.1"
                                                        step={formData.unit === 'кг.' ? "0.1" : "1"}
                                                        value={formData.quantity}
                                                        onChange={handleInputChange}
                                                        placeholder={formData.unit === 'кг.' ? "Количество" : "Брой"}
                                                    />
                                                </div>

                                                <div className="add-products-form-group">
                                                    <label htmlFor="price">
                                                        {`Цена за ${formData.unit}:`}
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

                                        {formData.unit !== '-' && (
                                            <div className="add-products-form-summary">
                                                <p>
                                                    {`Общо ${formData.unit}: ${formData.quantity || 0}`}
                                                </p>
                                                <p>Обща стойност: {(Number(formData.quantity) * Number(formData.price)).toFixed(2)} лв.</p>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                            {formData.unit !== '-' && (
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