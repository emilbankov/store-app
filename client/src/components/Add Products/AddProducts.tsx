import { useState } from 'react';
import './AddProducts.css';

interface Product {
    id: number;
    name: string;
    price: number;
    category: 'fruit' | 'vegetable';
    image: string;
    stock: number;
}

const productImages = {
    apple: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2',
    banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    orange: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9',
    tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea',
    carrot: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
    // Add more as needed
  };

const mockProducts: Product[] = [
    // Fruits
    {
        id: 1,
        name: 'Ябълки (червени)',
        price: 2.99,
        category: 'fruit',
        image: '/images/fruits/red-apple.jpg',
        stock: 50
    },
    {
        id: 2,
        name: 'Ябълки (жълти)',
        price: 2.89,
        category: 'fruit',
        image: '/images/fruits/yellow-apple.jpg',
        stock: 45
    },
    {
        id: 3,
        name: 'Ябълки (зелени)',
        price: 2.79,
        category: 'fruit',
        image: '/images/fruits/green-apple.jpg',
        stock: 40
    },
    {
        id: 4,
        name: 'Авокадо',
        price: 3.99,
        category: 'fruit',
        image: '/images/fruits/avocado.jpg',
        stock: 30
    },
    {
        id: 5,
        name: 'Банани',
        price: 2.49,
        category: 'fruit',
        image: '/images/fruits/banana.jpg',
        stock: 60
    },
    {
        id: 6,
        name: 'Къпини',
        price: 5.99,
        category: 'fruit',
        image: '/images/fruits/blackberry.jpg',
        stock: 25
    },
    {
        id: 7,
        name: 'Череши',
        price: 6.99,
        category: 'fruit',
        image: '/images/fruits/cherry.jpg',
        stock: 20
    },
    {
        id: 8,
        name: 'Кокос',
        price: 4.99,
        category: 'fruit',
        image: '/images/fruits/coconut.jpg',
        stock: 15
    },
    {
        id: 9,
        name: 'Грейпфрут',
        price: 3.49,
        category: 'fruit',
        image: '/images/fruits/grapefruit.jpg',
        stock: 35
    },
    {
        id: 10,
        name: 'Грозде',
        price: 4.99,
        category: 'fruit',
        image: '/images/fruits/grape.jpg',
        stock: 40
    },
    {
        id: 11,
        name: 'Киви',
        price: 0.69,
        category: 'fruit',
        image: '/images/fruits/kiwi.jpg',
        stock: 100
    },
    {
        id: 12,
        name: 'Лимон',
        price: 0.89,
        category: 'fruit',
        image: '/images/fruits/lemon.jpg',
        stock: 80
    },
    {
        id: 13,
        name: 'Лайм',
        price: 0.99,
        category: 'fruit',
        image: '/images/fruits/lime.jpg',
        stock: 70
    },
    {
        id: 14,
        name: 'Мандарина',
        price: 3.29,
        category: 'fruit',
        image: '/images/fruits/mandarin.jpg',
        stock: 45
    },
    {
        id: 15,
        name: 'Манго',
        price: 4.99,
        category: 'fruit',
        image: '/images/fruits/mango.jpg',
        stock: 25
    },
    {
        id: 16,
        name: 'Пъпеш',
        price: 3.99,
        category: 'fruit',
        image: '/images/fruits/melon.jpg',
        stock: 20
    },
    {
        id: 17,
        name: 'Портокал',
        price: 2.99,
        category: 'fruit',
        image: '/images/fruits/orange.jpg',
        stock: 55
    },
    {
        id: 18,
        name: 'Праскова',
        price: 3.49,
        category: 'fruit',
        image: '/images/fruits/peach.jpg',
        stock: 40
    },
    {
        id: 19,
        name: 'Круша',
        price: 3.29,
        category: 'fruit',
        image: '/images/fruits/pear.jpg',
        stock: 45
    },
    {
        id: 20,
        name: 'Ананас',
        price: 5.99,
        category: 'fruit',
        image: '/images/fruits/pineapple.jpg',
        stock: 15
    },
    {
        id: 21,
        name: 'Слива',
        price: 2.99,
        category: 'fruit',
        image: '/images/fruits/plum.jpg',
        stock: 50
    },
    {
        id: 22,
        name: 'Помело',
        price: 4.99,
        category: 'fruit',
        image: '/images/fruits/pomelo.jpg',
        stock: 20
    },

    // Vegetables
    {
        id: 23,
        name: 'Артишок',
        price: 4.99,
        category: 'vegetable',
        image: '/images/vegetables/artichokes.jpg',
        stock: 15
    },
    {
        id: 24,
        name: 'Аспержи',
        price: 6.99,
        category: 'vegetable',
        image: '/images/vegetables/asparagus.jpg',
        stock: 20
    },
    {
        id: 25,
        name: 'Бейби картофи',
        price: 2.49,
        category: 'vegetable',
        image: '/images/vegetables/baby-potato.jpg',
        stock: 60
    },
    {
        id: 26,
        name: 'Цвекло',
        price: 1.99,
        category: 'vegetable',
        image: '/images/vegetables/beetroot.jpg',
        stock: 45
    },
    {
        id: 27,
        name: 'Броколи',
        price: 3.99,
        category: 'vegetable',
        image: '/images/vegetables/broccoli.jpg',
        stock: 35
    },
    {
        id: 28,
        name: 'Зеле',
        price: 2.49,
        category: 'vegetable',
        image: '/images/vegetables/cabbage.jpg',
        stock: 40
    },
    {
        id: 29,
        name: 'Моркови',
        price: 1.79,
        category: 'vegetable',
        image: '/images/vegetables/carrot.jpg',
        stock: 70
    },
    {
        id: 30,
        name: 'Целина',
        price: 2.29,
        category: 'vegetable',
        image: '/images/vegetables/celery.jpg',
        stock: 40
    },
    {
        id: 31,
        name: 'Чери домати',
        price: 3.99,
        category: 'vegetable',
        image: '/images/vegetables/cherry-tomato.jpg',
        stock: 45
    },
    {
        id: 32,
        name: 'Цветни чушки',
        price: 4.99,
        category: 'vegetable',
        image: '/images/vegetables/colored-pepper.jpg',
        stock: 30
    },
    {
        id: 33,
        name: 'Краставица',
        price: 2.49,
        category: 'vegetable',
        image: '/images/vegetables/cucumber.jpg',
        stock: 55
    },
    {
        id: 34,
        name: 'Патладжан',
        price: 2.99,
        category: 'vegetable',
        image: '/images/vegetables/eggplant.jpg',
        stock: 35
    },
    {
        id: 35,
        name: 'Чесън',
        price: 1.49,
        category: 'vegetable',
        image: '/images/vegetables/garlic.jpg',
        stock: 80
    },
    {
        id: 36,
        name: 'Джинджифил',
        price: 3.99,
        category: 'vegetable',
        image: '/images/vegetables/ginger.jpg',
        stock: 25
    },
    {
        id: 37,
        name: 'Зелен фасул',
        price: 3.49,
        category: 'vegetable',
        image: '/images/vegetables/green-beans.jpg',
        stock: 40
    },
    {
        id: 38,
        name: 'Зелени чушки',
        price: 3.99,
        category: 'vegetable',
        image: '/images/vegetables/green-pepper.jpg',
        stock: 45
    },
    {
        id: 39,
        name: 'Зелени чили',
        price: 2.99,
        category: 'vegetable',
        image: '/images/vegetables/green-chilli.jpg',
        stock: 30
    },
    {
        id: 40,
        name: 'Праз',
        price: 2.49,
        category: 'vegetable',
        image: '/images/vegetables/leek.jpg',
        stock: 40
    },
    {
        id: 41,
        name: 'Гъби',
        price: 3.99,
        category: 'vegetable',
        image: '/images/vegetables/mushroom.jpg',
        stock: 35
    },
    {
        id: 42,
        name: 'Лук',
        price: 1.49,
        category: 'vegetable',
        image: '/images/vegetables/onion.jpg',
        stock: 90
    },
    {
        id: 43,
        name: 'Пащърнак',
        price: 2.49,
        category: 'vegetable',
        image: '/images/vegetables/parsnip.jpg',
        stock: 30
    },
    {
        id: 44,
        name: 'Картофи',
        price: 1.99,
        category: 'vegetable',
        image: '/images/vegetables/potato.jpg',
        stock: 100
    },
    {
        id: 45,
        name: 'Лилави картофи',
        price: 3.99,
        category: 'vegetable',
        image: '/images/vegetables/purple-potato.jpg',
        stock: 25
    },
    {
        id: 46,
        name: 'Тиква',
        price: 2.99,
        category: 'vegetable',
        image: '/images/vegetables/pumpkin.jpg',
        stock: 20
    },
    {
        id: 47,
        name: 'Червено зеле',
        price: 2.79,
        category: 'vegetable',
        image: '/images/vegetables/red-cabbage.jpg',
        stock: 35
    },
    {
        id: 48,
        name: 'Червени чили',
        price: 2.99,
        category: 'vegetable',
        image: '/images/vegetables/red-chilli.jpg',
        stock: 30
    },
    {
        id: 49,
        name: 'Червен лук',
        price: 1.79,
        category: 'vegetable',
        image: '/images/vegetables/red-onion.jpg',
        stock: 70
    },
    {
        id: 50,
        name: 'Червени чушки',
        price: 3.99,
        category: 'vegetable',
        image: '/images/vegetables/red-pepper.jpg',
        stock: 40
    },
    {
        id: 51,
        name: 'Шалот',
        price: 2.99,
        category: 'vegetable',
        image: '/images/vegetables/shallot.jpg',
        stock: 35
    },
    {
        id: 52,
        name: 'Шийтаке гъби',
        price: 5.99,
        category: 'vegetable',
        image: '/images/vegetables/shitake-mushroom.jpg',
        stock: 20
    },
    {
        id: 53,
        name: 'Сладки картофи',
        price: 2.99,
        category: 'vegetable',
        image: '/images/vegetables/sweet-potato.jpg',
        stock: 45
    },
    {
        id: 54,
        name: 'Домати',
        price: 2.99,
        category: 'vegetable',
        image: '/images/vegetables/tomato.jpg',
        stock: 60
    },
    {
        id: 55,
        name: 'Измити картофи',
        price: 2.29,
        category: 'vegetable',
        image: '/images/vegetables/washed-potato.jpg',
        stock: 80
    },
    {
        id: 56,
        name: 'Тиквички',
        price: 2.49,
        category: 'vegetable',
        image: '/images/vegetables/zucchini.jpg',
        stock: 45
    }
];

export default function AddProducts() {
    const [filter, setFilter] = useState<'all' | 'fruit' | 'vegetable'>('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const filteredProducts = filter === 'all'
        ? mockProducts
        : mockProducts.filter(product => product.category === filter);

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
                {filteredProducts.map((product) => (
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
                            <p className="price">{product.price.toFixed(2)} лв./кг</p>
                            <p className="stock">Налични: {product.stock} кг</p>
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
                                    {selectedProduct.price.toFixed(2)} лв./кг
                                </p>
                                <p className="modal-stock">
                                    Налични: {selectedProduct.stock} кг
                                </p>
                                <div className="quantity-control">
                                    <label htmlFor="quantity">Продадено количество:</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max={selectedProduct.stock}
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