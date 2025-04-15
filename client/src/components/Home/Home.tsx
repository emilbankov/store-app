import { useState, useEffect } from 'react';
import { getProducts, removeProduct } from '../../services/productsService';
import { sellProducts } from '../../services/purchasesService';
import './Home.css';
import { Product } from '../../interfaces';
import Search from '../Search/Search';
import { login } from '../../services/adminService';
import ErrorModal from '../Error Modal/ErrorModal';

export default function Home() {
    const [filter, setFilter] = useState<'all' | 'fruits' | 'vegetables'>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [productToRemove, setProductToRemove] = useState<Product | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                console.log(fetchedProducts);
                
                setProducts(fetchedProducts.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [quantity]);

    const filteredProducts = products.filter(product => {
        const matchesFilter = filter === 'all' || product.type === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setQuantity('');
    };

    const handleRemoveStock = async () => {
        if (selectedProduct) {
            try {
                await sellProducts(selectedProduct.id, Number(quantity));
            } catch (error) {
                setErrorMessage('Възникна грешка, моля опитайте отново.');
                setShowErrorModal(true);
            }
        }
        setSelectedProduct(null);
        setQuantity('');
    };

    const handleRemoveProduct = (product: Product) => {
        setProductToRemove(product);
        setShowPasswordModal(true);
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ password });
            if (response) {
                await removeProduct(productToRemove!.id);
                setProducts(products.filter(product => product.id !== productToRemove!.id));
                setShowPasswordModal(false);
                setPassword('');
            } 
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Невалидна парола. Продуктът не беше изтрит.');
            setShowErrorModal(true);
        }
    };

    return (
        <div className="container">
            <Search onSearch={handleSearch} />

            <div className="filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Всички продукти
                </button>
                <button
                    className={`filter-btn ${filter === 'fruits' ? 'active' : ''}`}
                    onClick={() => setFilter('fruits')}
                >
                    Плодове
                </button>
                <button
                    className={`filter-btn ${filter === 'vegetables' ? 'active' : ''}`}
                    onClick={() => setFilter('vegetables')}
                >
                    Зеленчуци
                </button>
            </div>

            <div className="products-grid">
                {filteredProducts?.map((product) => (
                    <div 
                        key={product.id} 
                        className="product-card"
                        onClick={() => handleProductClick(product)}
                    >
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <div 
                                className="remove-icon" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveProduct(product);
                                }}
                            >
                                <img src="./images/svg/clear.svg" alt="Clear" />
                            </div>
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="price">{product.price.toFixed(2)} лв./{product.unit}</p>
                            <p className="quantity">Налични: {product.quantity} {product.unit}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedProduct.name}</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setSelectedProduct(null)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="modal-image">
                                <img src={selectedProduct.image} alt={selectedProduct.name} />
                            </div>
                            <div className="modal-info">
                                <p className="modal-price">
                                    {selectedProduct.price.toFixed(2)} лв./{selectedProduct.unit}
                                </p>
                                <p className="modal-stock">
                                    Налични: {selectedProduct.quantity} {selectedProduct.unit}
                                </p>
                                <div className="quantity-control">
                                    <label htmlFor="quantity">Продадено количество:</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max={selectedProduct.quantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <button 
                                    className="confirm-btn"
                                    onClick={handleRemoveStock}
                                >
                                    Потвърди
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className="remove-product-modal-overlay" onClick={() => setShowPasswordModal(false)}>
                    <div className="remove-product-modal" onClick={e => e.stopPropagation()}>
                        <div className="remove-product-modal-header">
                            <h2>Въведете парола за премахване на продукта</h2>
                        </div>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="remove-product-modal-content">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Парола"
                                    required
                                />
                                <button type="submit" className="remove-product-confirm-btn">Потвърди</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <ErrorModal 
                    message={errorMessage} 
                    onClose={() => setShowErrorModal(false)} 
                />
            )}
        </div>
    );
}