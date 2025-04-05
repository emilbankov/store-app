import { useState, useEffect } from 'react';
import { getProducts } from '../../services/productsService';
import './Home.css';
import { Product } from '../../interfaces';

export default function Home() {
    const [filter, setFilter] = useState<'all' | 'fruit' | 'vegetable'>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
console.log(products);

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(product => product.type === filter);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setQuantity(1);
    };

    const handleRemoveStock = () => {
        if (selectedProduct) {
            console.log(`Removing ${quantity}kg from ${selectedProduct.name}`);
        }
        setSelectedProduct(null);
        setQuantity(1);
    };

    return (
        <div className="container">
            <div className="filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Всички продукти
                </button>
                <button
                    className={`filter-btn ${filter === 'fruit' ? 'active' : ''}`}
                    onClick={() => setFilter('fruit')}
                >
                    Плодове
                </button>
                <button
                    className={`filter-btn ${filter === 'vegetable' ? 'active' : ''}`}
                    onClick={() => setFilter('vegetable')}
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
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="price">{product.price.toFixed(2)} лв./{product.unit}</p>
                            <p className="stock">Налични: {product.quantity} {product.unit}</p>
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
                                        onChange={(e) => setQuantity(Number(e.target.value))}
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
        </div>
    );
}